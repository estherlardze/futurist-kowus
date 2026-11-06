import type { BlogInput } from "./blogs";

/** Validates the JSON sent by the dashboard. Returns the clean input or an error message. */
export function parseBlogInput(body: unknown): { ok: true; data: BlogInput } | { ok: false; message: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const title = str(b.title);
  const excerpt = str(b.excerpt);
  const category = str(b.category);
  const author = str(b.author);
  const content = typeof b.content === "string" ? b.content : "";
  const image = str(b.image);
  const publishedAt = str(b.publishedAt);
  const readTime = Number(b.readTime);
  const status = b.status === "draft" ? "draft" : "published";

  if (title.length < 3) return { ok: false, message: "Title must be at least 3 characters" };
  if (excerpt.length < 10) return { ok: false, message: "Excerpt must be at least 10 characters" };
  if (category.length < 2) return { ok: false, message: "Category is required" };
  if (author.length < 2) return { ok: false, message: "Author is required" };
  if (!content.trim()) return { ok: false, message: "Content is required" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) return { ok: false, message: "Published date is required" };
  if (!Number.isFinite(readTime) || readTime < 1) return { ok: false, message: "Read time must be at least 1 minute" };
  if (image && !/^(\/api\/uploads\/[\w.-]+|\/images\/[\w.-]+)$/.test(image)) {
    return { ok: false, message: "Invalid image" };
  }

  return { ok: true, data: { title, excerpt, category, author, content, image, publishedAt, readTime: Math.round(readTime), status } };
}
