import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, FileText } from "lucide-react";
import { isAdmin } from "@/lib/admin-auth";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

// Reads the login cookie, so it must render at request time (inside Suspense)
async function AuthGate({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");
  return <>{children}</>;
}

export default function DashboardLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-50" />}>
      <AuthGate>
        <Shell>{children}</Shell>
      </AuthGate>
    </Suspense>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7f4] md:flex-row">
      <aside className="relative flex shrink-0 flex-col overflow-hidden bg-linear-to-b from-navy-950 via-navy-900 to-navy-800 p-4 text-white md:sticky md:top-0 md:h-screen md:w-64">
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold-500/15 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gold-500" />

        <Link href="/admin" className="relative mb-8 flex items-center gap-1.5 px-3 pt-4">
          <span className="font-serif text-xl font-bold">Futurist</span>
          <span className="font-serif text-xl font-bold text-gold-500">Kowus</span>
        </Link>

        <p className="relative mb-2 hidden px-3 text-xs font-semibold uppercase tracking-widest text-white/40 md:block">Manage</p>
        <nav className="relative flex gap-2 md:flex-1 md:flex-col">
          <Link href="/admin" className="flex items-center gap-3 rounded-xl bg-gold-500 px-3 py-2.5 text-sm font-semibold text-navy-950 shadow-lg">
            <FileText className="h-4 w-4" /> Blogs
          </Link>
        </nav>

        <div className="relative mt-2 flex gap-2 md:flex-col md:border-t md:border-white/10 md:pt-3">
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <ExternalLink className="h-4 w-4" /> View website
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-[radial-gradient(60rem_30rem_at_100%_-10%,var(--color-gold-100),transparent_60%)] p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
