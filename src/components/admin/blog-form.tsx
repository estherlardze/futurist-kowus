"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";
import { RichTextEditor } from "./rich-text-editor";

const field =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30";

type Values = Omit<BlogPost, "id" | "slug">;

const today = () => new Date().toISOString().slice(0, 10);

const empty = (): Values => ({
  title: "",
  excerpt: "",
  category: "",
  image: "",
  author: "Daniel Owusu-Koranteng",
  publishedAt: today(),
  readTime: 5,
  status: "published",
  content: "",
});

export function BlogForm({
  blog,
  onSaved,
  onCancel,
}: {
  blog: BlogPost | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [v, setV] = useState<Values>(() => (blog ? { ...blog } : empty()));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((p) => ({ ...p, [k]: val }));

  async function uploadFeatured(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Upload failed");
      set("image", data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(blog ? `/api/admin/blogs/${blog.id}` : "/api/admin/blogs", {
        method: blog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Could not save");
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  const label = "mb-1 block text-sm font-medium text-navy-900";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className={label} htmlFor="title">Title</label>
        <input id="title" className={field} value={v.title} onChange={(e) => set("title", e.target.value)} placeholder="Article title" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="category">Category</label>
          <input id="category" className={field} value={v.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Human Rights" />
        </div>
        <div>
          <label className={label} htmlFor="readTime">Read time (minutes)</label>
          <input id="readTime" type="number" min={1} className={field} value={v.readTime} onChange={(e) => set("readTime", Number(e.target.value))} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="author">Author</label>
          <input id="author" className={field} value={v.author} onChange={(e) => set("author", e.target.value)} />
        </div>
        <div>
          <label className={label} htmlFor="publishedAt">Published date</label>
          <input id="publishedAt" type="date" className={field} value={v.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" rows={3} className={`${field} resize-none`} value={v.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary shown on article cards" />
      </div>

      <div>
        <span className={label}>Content</span>
        <RichTextEditor value={v.content} onChange={(html) => set("content", html)} placeholder="Write the full article here…" />
      </div>

      <div>
        <span className={label}>Featured image</span>
        {v.image ? (
          <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-navy-100 bg-navy-50">
            <Image src={v.image} alt="Featured" fill sizes="384px" className="object-cover" />
            <button type="button" onClick={() => set("image", "")} aria-label="Remove image" className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex aspect-video w-full max-w-sm flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-100 text-sm text-ink-muted transition-colors hover:border-gold-500 hover:text-navy-900"
          >
            {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
            {uploading ? "Uploading…" : "Upload image (JPG, PNG, WebP · max 4MB)"}
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadFeatured(f);
            e.target.value = "";
          }}
        />
      </div>

      <div>
        <label className={label} htmlFor="status">Status</label>
        <select id="status" className={field} value={v.status} onChange={(e) => set("status", e.target.value as Values["status"])}>
          <option value="published">Published (visible on the website)</option>
          <option value="draft">Draft (hidden)</option>
        </select>
      </div>

      {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex justify-end gap-3 border-t border-navy-100 pt-5">
        <button type="button" onClick={onCancel} className="rounded-full px-6 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-50">
          Cancel
        </button>
        <button type="submit" disabled={saving || uploading} className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-60">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {blog ? "Save changes" : "Create article"}
        </button>
      </div>
    </form>
  );
}
