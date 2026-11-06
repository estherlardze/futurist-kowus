"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";
import { BlogCard } from "./blog-card";

type Filter = "latest" | "oldest";

export function BlogList({ posts: allPosts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("latest");

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...allPosts]
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
      .sort((a, b) => {
        const d = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        return filter === "latest" ? d : -d;
      });
  }, [allPosts, query, filter]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-full border border-navy-100 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
          />
        </div>
        <div className="flex gap-2">
          {(["latest", "oldest"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                filter === f ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-900 hover:bg-navy-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-ink-muted">
        Showing <span className="font-semibold text-ink">{posts.length}</span> {posts.length === 1 ? "article" : "articles"}
        {query && (
          <>
            {" "}
            matching <span className="font-semibold text-ink">{query}</span>
          </>
        )}
      </p>

      {posts.length === 0 ? (
        <p className="py-12 text-center text-ink-muted">No articles found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
