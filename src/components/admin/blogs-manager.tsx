"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutGrid, List, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { formatDate, type BlogPost } from "@/lib/blogs";
import { BlogForm } from "./blog-form";

type View = "list" | "grid";

function StatusBadge({ status }: { status: BlogPost["status"] }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "published" ? "bg-green-100 text-green-800" : "bg-gold-100 text-navy-900"}`}>
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

function Actions({ blog, deleting, onEdit, onDelete }: { blog: BlogPost; deleting: boolean; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex shrink-0 items-center">
      <button onClick={onEdit} aria-label={`Edit ${blog.title}`} className="rounded-full p-2 text-ink-muted hover:bg-navy-50 hover:text-navy-900">
        <Pencil className="h-4 w-4" />
      </button>
      <button onClick={onDelete} disabled={deleting} aria-label={`Delete ${blog.title}`} className="rounded-full p-2 text-ink-muted hover:bg-red-50 hover:text-red-600 disabled:opacity-50">
        {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function BlogsManager() {
  const [view, setView] = useState<View>("list");

  // Remember the chosen layout (per browser); fall back silently if storage is blocked
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kowus-blog-view");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "grid" || saved === "list") setView(saved);
    } catch {}
  }, []);
  const changeView = (v: View) => {
    setView(v);
    try {
      localStorage.setItem("kowus-blog-view", v);
    } catch {}
  };

  const [blogs, setBlogs] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState("");
  // undefined = closed, null = new article, BlogPost = editing
  const [editing, setEditing] = useState<BlogPost | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<string | null>(null);

  const router = useRouter();
  const [version, setVersion] = useState(0);
  const load = () => setVersion((v) => v + 1);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/blogs")
      .then(async (res) => {
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (!cancelled) setBlogs(data.blogs);
      })
      .catch(() => !cancelled && setError("Could not load blogs"));
    return () => {
      cancelled = true;
    };
  }, [version, router]);

  async function remove(b: BlogPost) {
    if (!window.confirm(`Delete "${b.title}"? This cannot be undone.`)) return;
    setDeleting(b.id);
    const res = await fetch(`/api/admin/blogs/${b.id}`, { method: "DELETE" });
    setDeleting(null);
    if (!res.ok) {
      setError((await res.json().catch(() => null))?.message ?? "Could not delete");
      return;
    }
    load();
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-navy-900">Blogs</h1>
          <p className="text-sm text-ink-muted">Articles shown on the website&apos;s blog pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <div role="group" aria-label="Layout" className="inline-flex rounded-full border border-navy-100 bg-white p-1">
            {([["list", List, "List view"], ["grid", LayoutGrid, "Grid view"]] as const).map(([key, Icon, label]) => (
              <button
                key={key}
                onClick={() => changeView(key)}
                aria-label={label}
                aria-pressed={view === key}
                title={label}
                className={`rounded-full p-2 transition-colors ${view === key ? "bg-navy-900 text-white" : "text-ink-muted hover:text-navy-900"}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">
            <Plus className="h-4 w-4" /> New article
          </button>
        </div>
      </div>

      {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      {blogs === null ? (
        <div className="flex justify-center py-20 text-ink-muted"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-navy-100 py-20 text-center text-ink-muted">
          No articles yet. Click <span className="font-semibold text-navy-900">New article</span> to add one.
        </div>
      ) : view === "list" ? (
        <ul className="space-y-3">
          {blogs.map((b) => (
            <li key={b.id} className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4">
              <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-navy-50 sm:block">
                {b.image && <Image src={b.image} alt="" fill sizes="96px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-navy-900">{b.title}</p>
                <p className="truncate text-xs text-ink-muted">
                  {b.category} · {formatDate(b.publishedAt)}
                </p>
              </div>
              <StatusBadge status={b.status} />
              <Actions blog={b} deleting={deleting === b.id} onEdit={() => setEditing(b)} onDelete={() => remove(b)} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {blogs.map((b) => (
            <li key={b.id} className="flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow hover:shadow-card">
              <div className="relative aspect-video bg-linear-to-br from-navy-100 to-gold-100">
                {b.image && <Image src={b.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />}
                <div className="absolute left-3 top-3">
                  <StatusBadge status={b.status} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="line-clamp-2 font-semibold text-navy-900">{b.title}</p>
                <p className="text-xs text-ink-muted">
                  {b.category} · {formatDate(b.publishedAt)}
                </p>
                <div className="mt-auto flex justify-end pt-3">
                  <Actions blog={b} deleting={deleting === b.id} onEdit={() => setEditing(b)} onDelete={() => remove(b)} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing !== undefined && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-950/60 p-4 backdrop-blur-sm sm:py-10">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-pop sm:p-8">
            <button onClick={() => setEditing(undefined)} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-navy-50 p-2 hover:bg-navy-100">
              <X className="h-4 w-4" />
            </button>
            <h2 className="mb-6 font-serif text-2xl text-navy-900">{editing ? "Edit article" : "New article"}</h2>
            <BlogForm
              blog={editing}
              onCancel={() => setEditing(undefined)}
              onSaved={() => {
                setEditing(undefined);
                load();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
