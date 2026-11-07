"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";

const field =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30";

/** Static form: opens the visitor's email app with the message pre-filled. */
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const next: Record<string, string> = {};
    if (d.name.trim().length < 2) next.name = "Name must be at least 2 characters";
    if (d.phone.trim().length < 10) next.phone = "Please enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(d.email)) next.email = "Please enter a valid email address";
    if (d.subject.trim().length < 3) next.subject = "Subject must be at least 3 characters";
    if (d.message.trim().length < 10) next.message = "Message must be at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = `${d.message}\n\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-navy-100 bg-white p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Full name</label>
          <input id="name" name="name" className={field} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">Phone</label>
          <input id="phone" name="phone" type="tel" className={field} />
          {err("phone")}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" className={field} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium">Subject</label>
        <input id="subject" name="subject" className={field} />
        {err("subject")}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={5} className={field} />
        {err("message")}
      </div>
      <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-400">
        <Send className="h-4 w-4" /> Send message
      </button>
    </form>
  );
}
