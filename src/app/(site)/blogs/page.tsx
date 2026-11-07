import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogList } from "@/components/blog/blog-list";
import { getPublishedBlogs } from "@/lib/blog-store";

export const metadata: Metadata = { title: "Blogs | Futurist Daniel Owusu-Koranteng" };

export default async function BlogsPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <section className="bg-navy-900 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <Link href="/" className="group mb-8 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="max-w-3xl">
            <h1 className="mb-6 font-serif text-5xl font-bold text-white md:text-6xl">
              Insights &amp; <span className="text-gold-500">Articles</span>
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              Perspectives on human rights, environmental justice, trade unionism, and alternative dispute resolution
              from Daniel Owusu-Koranteng.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}
