export type BlogStatus = "published" | "draft";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Path such as /api/uploads/abc.jpg or /images/m4.jpeg. Empty = no image. */
  image: string;
  author: string;
  publishedAt: string; // YYYY-MM-DD
  readTime: number;
  status: BlogStatus;
  /** HTML written in the dashboard's TipTap editor. */
  content: string;
}

export type BlogInput = Omit<BlogPost, "id" | "slug"> & { slug?: string };

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
