import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPublishedBlogs } from "@/lib/blog-store";
import { BlogCard } from "@/components/blog/blog-card";

export async function BlogPreview() {
  const posts = (await getPublishedBlogs()).slice(0, 3);

  return (
    <section id="blog" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl text-navy-900">
              From the <span className="font-semibold text-gold-600">Blog</span>
            </h2>
            <p className="text-ink-muted">Insights, perspectives, and reflections on human rights, environmental justice, and public service.</p>
          </div>
          <Link href="/blogs" className="group flex shrink-0 items-center gap-2 font-bold text-navy-900">
            View All Blogs <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="py-12 text-center text-ink-muted">No articles yet — check back soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
