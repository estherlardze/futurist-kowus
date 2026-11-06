"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { gallery, type GalleryImage } from "@/lib/gallery";
import { SectionHeading } from "@/components/layout/section-heading";

export function Gallery() {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Captured"
            highlight="Moments"
            text="A glimpse into the journey of advocacy, leadership, and public engagement."
          />
          <div className="grid auto-rows-[250px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {gallery.map((img) => (
              <button
                key={img.src}
                onClick={() => setActive(img)}
                aria-label={`View ${img.title}`}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl ${img.large ? "md:col-span-2 md:row-span-2" : ""} ${img.wide ? "md:col-span-2" : ""} ${img.tall ? "md:row-span-2" : ""}`}
              >
                <Image src={img.src} alt={img.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} aria-label="Close image" className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/90">
              <X className="h-5 w-5" />
            </button>
            <div className="flex max-h-[85vh] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <Image src={active.src} alt={active.title} width={900} height={1200} className="mx-auto max-h-[85vh] w-auto object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
