"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the drawer is open: lock page scroll, close on Escape, and close if the screen grows to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors hover:text-navy-900 ${
      pathname === href ? "text-navy-900 font-semibold" : "text-ink/70"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 bg-paper transition-all duration-300 ${
          scrolled ? "bg-paper/95 shadow-sm backdrop-blur-md border-b border-navy-100" : ""
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="font-serif text-xl font-bold text-navy-900">Futurist</span>
            <span className="font-serif text-xl font-bold text-gold-600">Kowus</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </div>

          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-navy-800 md:inline-flex"
          >
            <Phone className="h-4 w-4" /> Call to order
          </a>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full p-2 text-ink/70 transition-colors hover:bg-navy-50 md:hidden"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer - outside the header so the header's blur doesn't clip it */}
      <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        {/* Dim backdrop fades in */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel slides in from the left */}
        <aside
          id="mobile-menu"
          className={`absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-navy-900 shadow-pop transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gold-500" />

          <div className="flex h-16 items-center justify-between px-6 pt-1">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold text-white">Futurist</span>
              <span className="font-serif text-xl font-bold text-gold-500">Kowus</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-4 pt-6">
            {navLinks.map((l, i) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  // Links glide in one after the other
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                  className={`rounded-xl px-4 py-3.5 font-serif text-2xl transition-all duration-300 ease-out ${
                    open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                  } ${active ? "bg-white/10 text-gold-500" : "text-white/85 hover:bg-white/5 hover:text-white"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div
            style={{ transitionDelay: open ? "380ms" : "0ms" }}
            className={`p-6 transition-all duration-300 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <a
              href={`tel:${site.phone}`}
              tabIndex={open ? 0 : -1}
              className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              <Phone className="h-4 w-4" /> Call to order
            </a>
            <p className="mt-3 text-center text-xs text-white/50">{site.phoneDisplay}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
