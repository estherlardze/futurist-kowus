import type { Metadata } from "next";
import Image from "next/image";
import { Award, Heart, Users } from "lucide-react";
import { achievements, expertise, timeline } from "@/lib/about-data";
import { familyGallery } from "@/lib/gallery";
import { SectionHeading } from "@/components/layout/section-heading";

export const metadata: Metadata = { title: "About | Dr. Futurist Daniel Owusu-Koranteng" };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <header className="bg-navy-900 pb-24 pt-32 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
          <div className="animate-rise space-y-6">
            <h1 className="text-center font-serif text-5xl leading-[1.1] md:text-7xl">Daniel Owusu-Koranteng</h1>
            <p className="border-l-2 border-gold-500 pl-6 text-center text-xl font-light leading-relaxed opacity-90 md:text-2xl">
              A man of many missions - Award-winning author, trade unionist, environmental activist, and ADR
              practitioner with over 30 years dedicated to human rights, social justice, and sustainable development
              across Africa.
            </p>
          </div>
        </div>
      </header>

      {/* Life story */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="My Journey"
            title="The Story of"
            highlight="Paying My Debt"
            text="A life shaped by loss, resilience, and an unwavering commitment to serve vulnerable communities."
          />
          <div className="space-y-16">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
                <Image src="/images/life2.jpeg" alt="Education Journey" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-3xl font-bold text-navy-900">Roots &amp; Early Years</h3>
                <div className="space-y-2 leading-relaxed text-ink-muted md:text-lg">
                  <p>
                    Born into the Asona Royal Family of Akropong Akuapem with roots in Obom—a military settlement of
                    Akyem Warriors. Daniel&apos;s heritage is steeped in history and courage. His early years were
                    marked by a profound loss: the death of his father, Rev. Jacob Asiedu Koranteng, a Presbyterian
                    Church Minister, when Daniel was just nine years old.
                  </p>
                  <p>
                    This tragedy forced his mother, the late Mrs. Dora Koranteng Asiedu, to move the family to
                    Nkawkaw, where she struggled tirelessly to educate her children. It was during these difficult
                    times at Nkawkaw Secondary School (Kawsec) that young Daniel made a covenant with himself: if he
                    could achieve a high level of education, he would dedicate his life to empowering vulnerable
                    people.
                  </p>
                </div>
                <h3 className="font-serif text-3xl font-bold text-navy-900">Building the Foundation</h3>
                <div className="space-y-4 leading-relaxed text-ink-muted md:text-lg">
                  <p>
                    Daniel&apos;s educational journey began at Kwadaso Agricultural College (1976-1979), where he earned
                    a Certificate in General Agriculture. He went on to excel academically, winning the Dr. J.K.
                    Baffour-Senkyire Award for being the Best Student in the Diploma in Agricultural Extension and Farm
                    Management Final Examinations at KNUST (1982-1985).
                  </p>
                  <p>
                    He continued his education with a BSc in Agriculture from KNUST (1988-1992), later earning an M.A.
                    in Human Resource Development from the University of Cape Coast (2004-2005). His passion for
                    justice led him to pursue Executive Masters in Alternative Dispute Resolution and Professional
                    Paralegal Studies, equipping him with the tools to advocate for those without a voice.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-r-2xl border-l-4 border-gold-500 bg-navy-50 p-8 md:p-12">
              <blockquote className="space-y-4">
                <p className="font-serif text-lg italic leading-relaxed text-navy-900 sm:text-2xl md:text-3xl">
                  “I share the view of CNN that I am a man of many Missions because I have to perform many missions in
                  order to pay my heavy debt owed to society, nature and many people.”
                </p>
                <footer className="text-lg font-semibold text-ink-muted">— Daniel Owusu-Koranteng</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Journey"
            title="Career"
            highlight="Milestones"
            text="Three decades of service to workers, communities, and the environment—a journey of unwavering commitment to justice and human dignity."
          />
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 bg-gold-500/30 md:block" aria-hidden="true" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={item.title} className="relative grid items-center gap-8 md:grid-cols-2">
                  <div className={`z-10 flex justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:justify-start ${i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}>
                    <div className="rounded-full bg-gold-500 px-6 py-2 text-lg font-bold text-navy-950 shadow-lg">{item.year}</div>
                  </div>
                  <div className={i % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2"}>
                    <div className="rounded-2xl border border-navy-100 bg-gold-100/50 p-8 transition-all hover:-translate-y-1 hover:border-gold-500/40">
                      <h3 className="mb-3 font-serif text-2xl font-bold text-navy-900">{item.title}</h3>
                      <p className="leading-relaxed text-ink-muted">{item.description}</p>
                    </div>
                  </div>
                  <div className={`hidden md:block ${i % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Family"
            title="The Foundation of"
            highlight="Everything"
            text="Behind every mission is a family that supports, inspires, and gives purpose to the work."
          />
          <div className="space-y-16">
            <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm">
              <div className="grid items-center gap-12 p-8 lg:grid-cols-2 lg:gap-16 lg:p-12">
                <div className="order-2 flex flex-col justify-center space-y-6 lg:order-1">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gold-600">
                      <Heart className="h-6 w-6" />
                      <span className="text-sm font-semibold uppercase tracking-wide">Life Partner</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">Hannah Owusu-Koranteng</h3>
                  </div>
                  <div className="space-y-4 leading-relaxed text-ink-muted sm:text-lg">
                    <p>
                      Hannah Owusu-Koranteng is an accomplished environmentalist, human rights advocate, and Associate
                      Executive Director of the Wassa Association of Communities Affected by Mining (WACAM) — the
                      Ghana-based civil society organization she co-founded with her husband, Dr. Daniel
                      Owusu-Koranteng. She has dedicated much of her life to supporting mining-affected communities and
                      strengthening environmental protection, community rights, and governance accountability in
                      Ghana&apos;s extractive sector.
                    </p>
                    <p>
                      Before joining WACAM full time, she worked for nearly two decades with the Ministry of Food and
                      Agriculture and later served as Coordinator of the Rural Workers Project with the General
                      Agricultural Workers Union (GAWU). She holds a Certificate in General Agriculture (Kwadaso
                      Agricultural College), a Diploma in Horticulture (KNUST), and an M.A. in Environmental Management
                      and Policy (University of Cape Coast).
                    </p>
                    <p>
                      Because of her leadership in environmental and community rights advocacy, Hannah has received
                      international recognition — notably the “Right the Wrong” Award from Oxfam America, presented in
                      Boston for her work empowering women and marginalized mining communities, and the Abena Korantemaa
                      Oral History Prize for her contributions to indigenous rights storytelling and grassroots
                      empowerment.
                    </p>
                    <p>
                      Their partnership represents not just a marriage, but a shared commitment to creating lasting
                      change in Ghana and beyond.
                    </p>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative hidden h-[31rem] w-full sm:block md:h-[43.75rem]">
                    <div className="absolute right-0 top-0 h-[52%] w-[65%] overflow-hidden rounded-[2rem] border-4 border-white shadow-lg">
                      <Image src="/images/han.jpeg" alt="Hannah Owusu-Koranteng" fill sizes="30vw" className="object-cover" />
                    </div>
                    <div className="absolute left-0 top-[28%] z-10 h-[50%] w-[55%] overflow-hidden rounded-[2rem] border-4 border-white shadow-lg">
                      <Image src="/images/hannah.jpeg" alt="Hannah Owusu-Koranteng" fill sizes="30vw" className="object-cover" />
                    </div>
                    <div className="absolute -bottom-10 right-[5%] h-[52%] w-[60%] overflow-hidden rounded-[2rem] border-4 border-white shadow-lg">
                      <Image src="/images/hannah.jpeg" alt="Hannah Owusu-Koranteng" fill sizes="30vw" className="object-cover" />
                    </div>
                  </div>
                  <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border-4 border-white shadow-lg sm:hidden">
                    <Image src="/images/hannah.jpeg" alt="Hannah Owusu-Koranteng" fill sizes="100vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 text-gold-600">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Daughter</span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-navy-900">Akua Owusu-Koranteng (ESQ)</h4>
                <p className="leading-relaxed text-ink-muted">
                  Daniel&apos;s daughter, carrying forward the family&apos;s values and commitment to making a positive
                  impact in the world.
                </p>
                <Image src="/images/akua.jpeg" alt="Akua Owusu-Koranteng" height={300} width={400} className="mx-auto rounded-xl object-cover" />
              </div>
              <div className="space-y-4 rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 text-gold-600">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Son</span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-navy-900">Dr. Kojo Owusu-Koranteng</h4>
                <p className="leading-relaxed text-ink-muted">
                  Daniel&apos;s son, a medical professional who continues the family tradition of service to humanity
                  through his work in healthcare.
                </p>
                <Image src="/images/m6.jpeg" alt="Kojo Owusu-Koranteng" height={300} width={400} className="mx-auto rounded-xl" />
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-gold-500/20 bg-white text-center lg:flex-row">
              <Image src="/images/adwoa.jpeg" alt="Daniel Owusu-Koranteng's Grandchildren" height={300} width={400} className="mx-auto rounded-lg" />
              <div className="flex flex-col items-center justify-center px-8 py-6">
                <h4 className="mb-2 font-serif text-2xl font-bold text-navy-900 md:text-3xl">The Next Generation</h4>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-ink-muted">
                  Daniel&apos;s grandchildren, Nana Afia and Nana Adwoa, have already begun showing interest in reading
                  and books. His literary awards serve as inspiration for them to develop a strong reading culture,
                  ensuring that the family&apos;s commitment to education and knowledge continues into future
                  generations.
                </p>
              </div>
              <Image src="/images/afia.jpeg" alt="Daniel Owusu-Koranteng's Grandchildren" height={300} width={400} className="mx-auto rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {familyGallery.map((f) => (
                <div key={f.src} className="group relative aspect-square overflow-hidden rounded-xl shadow-lg">
                  <Image src={f.src} alt={f.title} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-gold-100 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Expertise"
            title="Areas of"
            highlight="Competence"
            text="Multi-disciplinary expertise spanning agriculture, labor rights, environmental justice, and conflict resolution—all dedicated to empowering vulnerable communities."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-navy-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-900 transition-colors group-hover:bg-navy-900 group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-navy-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Recognition"
            title="Awards &"
            highlight="Recognition"
            text="Honored locally and internationally for dedication to human rights, environmental justice, workers' rights, and literary excellence."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {achievements.map((a) => (
              <article key={a.title} className="group relative overflow-hidden rounded-xl border border-navy-100 bg-navy-50/60 p-8 transition-colors hover:border-gold-500/40">
                <div className="absolute right-4 top-4 rounded-full bg-gold-500 px-4 py-1.5 text-sm font-bold text-navy-950">{a.year}</div>
                <Award className="mb-4 h-10 w-10 text-gold-500/50 transition-colors group-hover:text-gold-500" />
                <h3 className="mb-2 pr-20 font-serif text-2xl font-bold text-navy-900">{a.title}</h3>
                <p className="mb-3 text-sm font-semibold text-navy-700">{a.organization}</p>
                <p className="leading-relaxed text-ink-muted">{a.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
