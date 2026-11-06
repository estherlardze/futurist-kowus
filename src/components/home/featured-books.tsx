"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { books, type Book } from "@/lib/books";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/layout/section-heading";

function BuyModal({ book, onClose }: { book: Book; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const msg = encodeURIComponent(`Hello, I would like to buy "${book.title}".`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={book.title}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 rounded-full bg-navy-50 p-2 transition-colors hover:bg-navy-100">
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-navy-50">
          <Image src={book.cover} alt={book.title} fill sizes="100vw" className="object-contain" />
        </div>

        <div className="flex flex-col gap-5 p-8">
          <div>
            <span className="mb-3 inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-navy-900">{book.category}</span>
            <h3 className="font-serif text-2xl leading-tight text-navy-900">{book.title}</h3>
            <p className="text-sm text-ink-muted">by {book.author}</p>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">{book.description}</p>

          <div className="grid grid-cols-2 gap-3 border-t border-navy-100 pt-4 text-sm">
            {book.details.map((d) => (
              <div key={d.label}>
                <span className="block text-xs uppercase tracking-wide text-ink-muted">{d.label}</span>
                <span className="font-medium">{d.value}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-navy-50 p-5">
            <p className="mb-1 font-semibold text-navy-900">Want a copy? Contact us to buy.</p>
            <p className="mb-4 text-sm text-ink-muted">Call or message us and we will arrange your order and delivery.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${site.phone}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 font-semibold text-navy-950 hover:bg-gold-400">
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </a>
              <a href={`https://wa.me/${site.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3 font-semibold text-white hover:bg-navy-800">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Order: ${book.title}`)}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-navy-100 px-5 py-3 font-semibold text-navy-900 hover:bg-white">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedBooks() {
  const [selected, setSelected] = useState<Book | null>(null);

  return (
    <section id="books" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          center={false}
          title="Featured"
          highlight="Books"
          text="Award-winning books on social justice, environmental advocacy, and personal reflections from decades of public service."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book.id} className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-8 transition-all hover:shadow-card">
              <button onClick={() => setSelected(book)} className="block text-left" aria-label={`View ${book.title}`}>
                <div className="relative mb-6 aspect-square overflow-hidden rounded-lg bg-navy-50">
                  <Image src={book.cover} alt={book.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top transition-transform duration-300 group-hover:scale-105" />
                </div>
              </button>
              <p className="mb-1 text-xs font-semibold text-navy-700">{book.category}</p>
              <h3 className="mb-1 font-serif text-xl text-navy-900">{book.title}</h3>
              <p className="mb-3 text-sm text-ink-muted">by {book.author}</p>
              <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">{book.description}</p>
              <div className="mt-auto flex items-center justify-between border-t border-navy-100 pt-6">
                <span className="text-sm font-semibold text-navy-900">Call to order</span>
                <button onClick={() => setSelected(book)} className="rounded-full bg-gold-500 px-6 py-2 font-semibold text-navy-950 transition-colors hover:bg-gold-400">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <BuyModal book={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
