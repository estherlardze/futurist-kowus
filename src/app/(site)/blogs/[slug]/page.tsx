import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/blogs";
import { getPublishedBlogBySlug, getPublishedBlogs } from "@/lib/blog-store";
import { BlogCard } from "@/components/blog/blog-card";

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) notFound();

  const related = (await getPublishedBlogs()).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <section className="bg-navy-900 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <Link href="/blogs" className="group mb-8 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Articles</span>
          </Link>
          <span className="mb-6 block w-fit rounded-full bg-gold-500/20 px-3 py-1 text-xs font-semibold text-gold-400">{post.category}</span>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">{post.title}</h1>
          <p className="mb-8 text-lg leading-relaxed text-white/80">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            <span className="font-semibold text-white">{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime} min read</span>
          </div>
        </div>
      </section>

      <article className="py-16">
        <div className="mx-auto max-w-7xl space-y-6 px-6">
          {post.image && (
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-50">
              <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover object-top" />
            </div>
          )}
          {/* Trusted HTML written by the site owner in the dashboard editor */}
          <div className="rich-text text-lg text-ink-muted" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="-mb-24 bg-navy-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 font-serif text-3xl text-navy-900">
              Related <span className="text-gold-600">Articles</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
