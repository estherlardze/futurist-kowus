import Image from "next/image";
import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { formatDate, type BlogPost } from "@/lib/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition-all duration-300 hover:border-gold-500 hover:shadow-card">
        <div className="relative aspect-video overflow-hidden bg-navy-50">
          {post.image ? (
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-navy-100 to-gold-100" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="w-fit rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-navy-900">{post.category}</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors group-hover:text-gold-600"><Eye className="h-4 w-4" />Read</span>
          </div>
          <h3 className="mb-3 line-clamp-2 font-serif text-xl font-bold text-navy-900 transition-colors group-hover:text-gold-600">{post.title}</h3>
          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
          <div className="flex items-center justify-between border-t border-navy-100 pt-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime} min read</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
