import "server-only";

/**
 * Tiny GitHub "contents" API client. Saving through it makes a commit in your repo,
 * which is what lets the dashboard work on Vercel (read-only disk): Vercel redeploys on every push.
 *
 * Env vars:  GITHUB_TOKEN  (fine-grained token, Repository > Contents: Read and write)
 *            GITHUB_REPO   (owner/name, e.g. "sleekteq/kowus-site")
 *            GITHUB_BRANCH (optional, default "main")
 */
const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH || "main";

export const githubEnabled = Boolean(token && repo);

function url(path: string) {
  return `https://api.github.com/repos/${repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function headers(accept = "application/vnd.github+json"): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "kowus-dashboard",
  };
}

async function fail(res: Response, action: string): Promise<never> {
  let detail = "";
  try {
    detail = (await res.json()).message ?? "";
  } catch {}
  if (res.status === 401 || res.status === 403) {
    throw new Error(`GitHub rejected the token (${action}). Check GITHUB_TOKEN has Contents: Read and write on the repo.`);
  }
  if (res.status === 404) throw new Error(`GitHub repo or branch not found (${action}). Check GITHUB_REPO and GITHUB_BRANCH.`);
  throw new Error(`GitHub error ${res.status} (${action}) ${detail}`.trim());
}

/** Returns the file's text and sha, or null if it doesn't exist. */
export async function getTextFile(path: string): Promise<{ text: string; sha: string } | null> {
  const res = await fetch(`${url(path)}?ref=${encodeURIComponent(branch)}`, { headers: headers(), cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) return fail(res, "read");
  const data = await res.json();
  if (data.encoding === "base64" && typeof data.content === "string") {
    return { text: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
  }
  // Files over 1MB come back without inline content — fetch the raw bytes instead
  const raw = await fetch(`${url(path)}?ref=${encodeURIComponent(branch)}`, {
    headers: headers("application/vnd.github.raw+json"),
    cache: "no-store",
  });
  if (!raw.ok) return fail(raw, "read");
  return { text: await raw.text(), sha: data.sha };
}

/** Returns the raw bytes of a file, or null if it doesn't exist. */
export async function getBinaryFile(path: string): Promise<Buffer | null> {
  const res = await fetch(`${url(path)}?ref=${encodeURIComponent(branch)}`, {
    headers: headers("application/vnd.github.raw+json"),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) return fail(res, "read");
  return Buffer.from(await res.arrayBuffer());
}

async function getSha(path: string): Promise<string | undefined> {
  const res = await fetch(`${url(path)}?ref=${encodeURIComponent(branch)}`, { headers: headers(), cache: "no-store" });
  if (res.status === 404) return undefined;
  if (!res.ok) return fail(res, "read");
  return (await res.json()).sha;
}

/** Create or update a file (one commit). Pass the sha you read to update an existing file. */
export async function putFile(path: string, content: Buffer | string, message: string, sha?: string) {
  const body = {
    message,
    branch,
    sha,
    content: Buffer.from(content).toString("base64"),
  };
  const res = await fetch(url(path), {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (res.status === 409 || res.status === 422) {
    throw new Error("The file changed on GitHub while saving. Please try again.");
  }
  if (!res.ok) return fail(res, "save");
}

export async function deleteFile(path: string, message: string) {
  const sha = await getSha(path);
  if (!sha) return;
  const res = await fetch(url(path), {
    method: "DELETE",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch }),
    cache: "no-store",
  });
  if (!res.ok && res.status !== 404) return fail(res, "delete");
}
