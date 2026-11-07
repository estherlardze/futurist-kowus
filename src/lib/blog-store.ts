import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { BlogInput, BlogPost } from "./blogs";
import { deleteFile, getBinaryFile, getTextFile, githubEnabled, putFile } from "./github-content";

/**
 * Storage without a database.
 *  - Blogs:  content/blogs.json
 *  - Images: content/uploads/*  (served by /api/uploads/[name])
 *
 * Where it saves:
 *  - GITHUB_TOKEN + GITHUB_REPO set  -> commits to your GitHub repo (use this on Vercel;
 *                                       Vercel redeploys from the push)
 *  - otherwise                       -> writes to disk (local `npm run dev`, or a VPS)
 *
 * Visitors always read the copy bundled with the deployed site, so the public site only
 * changes after the redeploy. The dashboard reads the newest copy so you never see stale data.
 */
const ROOT = process.cwd();
export const UPLOADS_DIR = path.join(ROOT, "content", "uploads");
const BLOGS_FILE = path.join(ROOT, "content", "blogs.json");
const BLOGS_REPO_PATH = "content/blogs.json";
const uploadRepoPath = (name: string) => `content/uploads/${name}`;

const readOnlyHost = Boolean(process.env.VERCEL);

function assertCanWrite() {
  if (!githubEnabled && readOnlyHost) {
    throw new Error("Saving isn't set up on this host yet: add GITHUB_TOKEN and GITHUB_REPO in the Vercel environment variables.");
  }
}

// ---------- reading ----------

async function readLocal(): Promise<BlogPost[]> {
  try {
    return JSON.parse(await fs.readFile(BLOGS_FILE, "utf8")) as BlogPost[];
  } catch {
    return [];
  }
}

/** Newest copy - used by the dashboard and before every write. */
async function readLatest(): Promise<{ posts: BlogPost[]; sha?: string }> {
  if (githubEnabled) {
    const file = await getTextFile(BLOGS_REPO_PATH);
    return file ? { posts: JSON.parse(file.text) as BlogPost[], sha: file.sha } : { posts: [] };
  }
  return { posts: await readLocal() };
}

async function writePosts(posts: BlogPost[], sha: string | undefined, message: string) {
  const json = JSON.stringify(posts, null, 2);
  if (githubEnabled) {
    await putFile(BLOGS_REPO_PATH, json, message, sha);
    return;
  }
  await fs.mkdir(path.dirname(BLOGS_FILE), { recursive: true });
  const tmp = `${BLOGS_FILE}.tmp`;
  await fs.writeFile(tmp, json, "utf8");
  await fs.rename(tmp, BLOGS_FILE);
}

const byDateDesc = (a: BlogPost, b: BlogPost) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

/** Dashboard list (includes drafts, always the newest copy). */
export async function getAllBlogs() {
  return (await readLatest()).posts.sort(byDateDesc);
}

/** Public site (published only, from the deployed copy). */
export async function getPublishedBlogs() {
  return (await readLocal()).filter((p) => p.status === "published").sort(byDateDesc);
}

export async function getPublishedBlogBySlug(slug: string) {
  return (await getPublishedBlogs()).find((p) => p.slug === slug) ?? null;
}

// ---------- writing ----------

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "post"
  );
}

function uniqueSlug(base: string, posts: BlogPost[], ignoreId?: string) {
  let slug = base;
  let n = 2;
  while (posts.some((p) => p.slug === slug && p.id !== ignoreId)) slug = `${base}-${n++}`;
  return slug;
}

export async function createBlog(input: BlogInput) {
  assertCanWrite();
  const { posts, sha } = await readLatest();
  const post: BlogPost = { ...input, id: randomUUID(), slug: uniqueSlug(slugify(input.slug || input.title), posts) };
  await writePosts([post, ...posts], sha, `Add blog: ${post.title}`);
  return post;
}

export async function updateBlog(id: string, input: BlogInput) {
  assertCanWrite();
  const { posts, sha } = await readLatest();
  const i = posts.findIndex((p) => p.id === id);
  if (i === -1) return null;
  const updated: BlogPost = { ...input, id, slug: uniqueSlug(slugify(input.slug || posts[i].slug), posts, id) };
  posts[i] = updated;
  await writePosts(posts, sha, `Update blog: ${updated.title}`);
  return updated;
}

export async function deleteBlog(id: string) {
  assertCanWrite();
  const { posts, sha } = await readLatest();
  const post = posts.find((p) => p.id === id);
  if (!post) return false;
  const rest = posts.filter((p) => p.id !== id);
  await writePosts(rest, sha, `Delete blog: ${post.title}`);

  // Remove the uploaded featured image if nothing else uses it
  const m = post.image.match(/^\/api\/uploads\/([\w.-]+)$/);
  if (m && !rest.some((p) => p.image === post.image || p.content.includes(post.image))) {
    try {
      await removeUpload(m[1]);
    } catch {
      // The blog is already deleted; a leftover image file is harmless
    }
  }
  return true;
}

// ---------- images ----------

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export async function saveImage(file: File) {
  const ext = EXT[file.type];
  if (!ext) throw new Error("Only JPG, PNG or WebP images are allowed");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Image must be 4MB or smaller");
  assertCanWrite();

  const name = `${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  if (githubEnabled) {
    await putFile(uploadRepoPath(name), bytes, `Upload image ${name}`);
  } else {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOADS_DIR, name), bytes);
  }
  return `/api/uploads/${name}`;
}

async function removeUpload(name: string) {
  if (githubEnabled) await deleteFile(uploadRepoPath(name), `Delete image ${name}`);
  else await fs.rm(path.join(UPLOADS_DIR, name), { force: true });
}

/**
 * Image bytes for /api/uploads/[name]. Uses the deployed copy first; if the image was uploaded
 * after the last deploy (so it isn't bundled yet) it is fetched from GitHub.
 */
export async function readUpload(name: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(path.join(UPLOADS_DIR, name));
  } catch {
    return githubEnabled ? getBinaryFile(uploadRepoPath(name)) : null;
  }
}
