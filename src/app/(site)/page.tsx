import { Hero } from "@/components/home/hero";
import { Media } from "@/components/home/media";
import { AboutTeaser } from "@/components/home/about-teaser";
import { Impact } from "@/components/home/impact";
import { FeaturedBooks } from "@/components/home/featured-books";
import { Gallery } from "@/components/home/gallery";
import { BlogPreview } from "@/components/home/blog-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Media />
      <AboutTeaser />
      <Impact />
      <FeaturedBooks />
      <Gallery />
      <BlogPreview />
    </>
  );
}
