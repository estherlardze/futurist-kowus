import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-navy-900">
      <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
        <Image src="/images/hero.jpeg" alt=" Daniel Owusu-Koranteng" fill priority className="object-cover object-top" />
        <div className="absolute inset-0 bg-linear-to-r from-navy-900 via-navy-900/60 to-navy-900/10" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-900/50 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-500" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-28">
        <div className="animate-rise max-w-2xl space-y-6">
          <p className="text-sm font-semibold tracking-widest text-gold-500">Author · Activist · ADR Practitioner</p>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] text-white md:text-6xl">
            Futurist <span className="text-gold-500">Daniel</span>
            <br />
            Owusu-Koranteng
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            Award-winning author, co-founder and Executive Director of Wacam, and President of Ghana&rsquo;s National
            Association of ADR Practitioners. A man who rose from humble beginnings to represent Africa on the world
            stage - from the ITF Dockers Steering Committee in Geneva to the halls of Ghana&rsquo;s Public Utilities
            Regulatory Commission.
          </p>
          <p className="text-lg leading-relaxed text-white/80">
            For over three decades, Daniel has dedicated his life to protecting mining communities, advancing
            workers&rsquo; rights, and building a more just and sustainable Africa through law, literature, and
            relentless advocacy.
          </p>
          <p className="text-lg leading-relaxed text-white/80">
            His work has inspired generations of advocates, challenged systems of injustice, and amplified the voices of
            communities often left unheard.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="#books" className="inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-3.5 text-base font-bold text-navy-950 shadow-lg transition-colors hover:bg-gold-400">
              Explore Books
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10">
              My full story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
