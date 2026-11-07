import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = { title: "Contact | Futurist Daniel Owusu-Koranteng" };

const info = [
  { icon: Phone, label: "Call to order books", value: site.phoneDisplay, href: `tel:${site.phone}` },
  { icon: MessageCircle, label: "WhatsApp", value: site.phoneDisplay, href: `https://wa.me/${site.whatsapp}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Location", value: site.location },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-900 pb-20 pt-32 text-center">
        <div className="mx-auto max-w-3xl space-y-6 px-6">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Get in <span className="text-gold-500">Touch</span>
          </h1>
          <p className="text-lg text-white/80">
            Want to buy a book, invite Dr. Daniel to speak, or send a question? Call or message us and we will get back
            to you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {info.map((i) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-100 text-navy-900">
                    <i.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">{i.label}</span>
                    <span className="font-medium text-navy-900">{i.value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition-shadow";
              return i.href ? (
                <a key={i.label} href={i.href} className={`${cls} hover:shadow-card`}>{inner}</a>
              ) : (
                <div key={i.label} className={cls}>{inner}</div>
              );
            })}
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
