"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "pwa-install-dismissed";
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 3000;

function recentlyDismissed() {
  try {
    const t = Number(localStorage.getItem(DISMISS_KEY));
    return t > 0 && Date.now() - t < DISMISS_DAYS * 864e5;
  } catch {
    return false;
  }
}

export default function InstallPrompt() {
  const [event, setEvent] = useState<InstallEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone || recentlyDismissed()) return;

    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    };

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as InstallEvent);
      show();
    };
    const onInstalled = () => {
      setVisible(false);
      setEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // iOS Safari has no install event; show manual instructions instead.
    const ua = navigator.userAgent;
    const isIos = /iphone|ipad|ipod/i.test(ua) && !/crios|fxios|edgios/i.test(ua);
    if (isIos) {
      timer = setTimeout(() => {
        setIos(true);
        setVisible(true);
      }, SHOW_DELAY_MS);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  }

  async function install() {
    if (!event) return;
    await event.prompt();
    const { outcome } = await event.userChoice;
    setEvent(null);
    if (outcome === "accepted") setVisible(false);
    else dismiss();
  }

  if (!visible || (!event && !ios)) return null;

  return (
    <div
      role="dialog"
      aria-label="Install app"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-xl bg-navy-900 p-4 text-white shadow-2xl ring-1 ring-gold-500/40 sm:left-auto sm:right-4 sm:bottom-4"
    >
      <button
        onClick={dismiss}
        aria-label="Close"
        className="absolute right-2 top-2 rounded p-1 text-white/60 hover:text-white"
      >
        <X size={18} />
      </button>
      <div className="flex items-start gap-3 pr-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-192.png" alt="" width={48} height={48} className="rounded-lg" />
        <div className="min-w-0">
          <p className="font-semibold text-gold-400">Install Futurist Kowus</p>
          {ios ? (
            <p className="mt-1 text-sm text-white/80">
              Tap <Share size={14} className="mx-0.5 inline -translate-y-px" aria-label="Share" /> then{" "}
              <strong>Add to Home Screen</strong> to get the app.
            </p>
          ) : (
            <p className="mt-1 text-sm text-white/80">Add the app to your phone for quick access and updates.</p>
          )}
        </div>
      </div>
      {!ios && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={install}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gold-500 px-4 py-2 text-sm font-bold text-navy-900 hover:bg-gold-400"
          >
            <Download size={16} /> Install app
          </button>
          <button onClick={dismiss} className="rounded-md px-4 py-2 text-sm text-white/70 hover:text-white">
            Not now
          </button>
        </div>
      )}
    </div>
  );
}
