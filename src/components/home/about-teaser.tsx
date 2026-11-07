import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutTeaser() {
  return (
    <section id="about" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-card shadow-card">
              <Image
                src="/images/about.jpeg"
                alt="Daniel Owusu-Koranteng Portrait"
                width={640}
                height={480}
                className="aspect-[12/14] h-full w-full object-cover transition-all duration-500 hover:grayscale"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden max-w-xs rounded-xl border border-navy-100 bg-white p-6 shadow-pop md:block">
              <p className="font-serif text-lg font-semibold italic text-navy-900">The man of many missions.</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">About Daniel</span>
            </div>
            <h2 className="font-serif text-4xl font-bold leading-tight text-navy-900">
              A Life Dedicated to <span className="text-gold-600">Justice &amp; Service</span>
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">
              Daniel Owusu-Koranteng is an award-winning author, human rights advocate, and environmental activist with
              over three decades of experience in trade unionism, agriculture, and alternative dispute resolution. As
              Executive Director of Wacam and President of the Ghana National Association of ADR Practitioners, he has
              dedicated his life to protecting the rights of vulnerable communities and promoting sustainable
              development.
            </p>
            <p className="leading-relaxed text-ink-muted">
              His distinguished career includes serving as General Secretary of the Maritime and Dockworkers Union
              (2012-2020), Commissioner of the Public Utilities Regulatory Commission (2014-2021), and representing
              Africa on international platforms including the International Transport Workers&apos; Federation. He holds
              an M.A. in Human Resource Development and multiple executive certifications in ADR and paralegal studies.
              His autobiography “Paying My Debt” won the First Prize at the Ghana Association of Writers Literary
              Awards, and his poetry collection “The Wanderer&apos;s Poems” earned the People&apos;s Choice Best Poet
              Award for 2024.
            </p>
            <Link
              href="/about"
              className="flex w-fit items-center gap-1 rounded-full bg-gold-500 px-8 py-4 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Read My Full Story <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
