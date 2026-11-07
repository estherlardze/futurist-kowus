import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { ScrollToTop } from "./scroll-to-top";

export function Footer() {
  return (
    <footer className="pt-24">
      <div className="relative overflow-hidden bg-navy-900 px-4 py-20 md:p-24">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 border-b border-white/20 py-4 pt-8 text-sm text-white md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-serif text-lg">{site.fullName}</p>
            <p className="text-white/70">
              Championing human rights, environmental justice, and sustainable development across Africa.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">Quick links</p>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block text-white/80 hover:text-gold-400">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">Contact</p>
            <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-white/80 hover:text-gold-400">
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-white/80 hover:text-gold-400">
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-6 flex max-w-7xl flex-col items-start justify-between gap-4 text-xs text-white/70 md:flex-row md:items-center">
          <p>© 2026 Futurist Kowus. All rights reserved.</p>
          <p>
            Website Designed by{" "}
            <a href="https://sleekteqsolutions.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-400 underline underline-offset-4 transition-colors hover:text-white">
              Sleekteq Solutions
            </a>
          </p>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
}
