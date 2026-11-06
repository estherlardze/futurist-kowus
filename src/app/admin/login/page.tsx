"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, User } from "lucide-react";

const input =
  "w-full rounded-xl border border-navy-100 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: fd.get("username"), password: fd.get("password") }),
    }).catch(() => null);
    if (res?.ok) {
      router.replace("/admin");
      return;
    }
    setError((await res?.json().catch(() => null))?.message ?? "Could not sign in");
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-neutral-950">
      {/* Photo fills the right half on desktop (so more than just the head shows) and the whole screen on mobile */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
        <Image src="/images/hero.jpeg" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_25%] opacity-60 lg:opacity-100" />
        <div className="absolute inset-0 bg-black/50 lg:bg-linear-to-r lg:from-neutral-950 lg:via-black/30 lg:to-transparent" />
      </div>
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/25 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-500" />

      <div className="relative z-10 flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
      <div className="animate-rise w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>

        <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-white/10 bg-white p-8 shadow-pop sm:p-10">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-500 shadow-card">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-navy-900">
                Futurist <span className="text-gold-600">Kowus</span>
              </p>
              <p className="mt-1 text-sm text-ink-muted">Sign in to manage your blogs</p>
            </div>
          </div>

          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-navy-900">Username</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input id="username" name="username" autoComplete="username" required className={input} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-900">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`${input} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-muted hover:bg-navy-50 hover:text-navy-900"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 font-semibold text-navy-950 shadow-lg transition-colors hover:bg-gold-400 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
          </button>
        </form>
      </div>
      </div>
    </main>
  );
}
