"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { Heart } from "lucide-react";

const programs = [
  { label: "Workout Programs", href: "/programs/workouts" },
  { label: "Nutrition Guides", href: "/programs/nutrition" },
  { label: "Memberships", href: "/memberships" },
  { label: "Community", href: "/community" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Retreats", href: "/retreats" },
  { label: "Affiliates", href: "/affiliates" },
  { label: "Contact Us", href: "/contact" },
];

const support = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refunds" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "X / Twitter", href: "https://twitter.com", Icon: FaXTwitter },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe() {
    if (!email) return;
    // TODO: wire to your email provider
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="bg-zinc-950 text-white">
      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-14 xl:py-16 flex flex-col xl:flex-row items-center justify-between gap-10">
          {/* Headline */}
          <div className="text-center xl:text-left">
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-amber-400 mb-2 [font-family:var(--font-barlow)]">
              Stay in the Loop
            </p>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.75rem] font-black uppercase tracking-tight leading-none [font-family:var(--font-barlow)]">
              Train Smarter.
              <br className="hidden sm:block" />{" "}
              <span className="text-amber-400">Live Stronger.</span>
            </h2>
          </div>

          {/* Newsletter */}
          <div className="w-full xl:w-auto xl:min-w-105 flex flex-col gap-2">
            {submitted ? (
              <p className="text-sm font-bold uppercase tracking-widest text-amber-400 text-center xl:text-left [font-family:var(--font-barlow)]">
                ✓ You&apos;re in! Check your inbox.
              </p>
            ) : (
              <>
                <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-white/15 focus-within:border-amber-400/60 transition-colors duration-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white placeholder:text-zinc-500 outline-none [font-family:var(--font-barlow)]"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-amber-400 text-zinc-950 text-sm font-black uppercase tracking-widest px-6 hover:bg-amber-300 active:scale-95 transition-all duration-150 whitespace-nowrap [font-family:var(--font-barlow)]"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] font-semibold text-zinc-500 pl-1 [font-family:var(--font-barlow)]">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Grid ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-16 xl:py-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 xl:gap-8">
        {/* Brand column */}
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold text-zinc-400 leading-relaxed max-w-xs [font-family:var(--font-barlow)]">
            Premium fitness programs built around your goals — training,
            nutrition, and community in one place.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 mt-1">
            {socials.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-zinc-400 hover:text-white hover:border-white/40 hover:bg-white/8 transition-all duration-200"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-6 [font-family:var(--font-barlow)]">
            Programs
          </p>
          <ul className="flex flex-col gap-3.5">
            {programs.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-bold uppercase tracking-wide text-zinc-300 hover:text-white transition-colors duration-150 [font-family:var(--font-barlow)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-6 [font-family:var(--font-barlow)]">
            Company
          </p>
          <ul className="flex flex-col gap-3.5">
            {company.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-bold uppercase tracking-wide text-zinc-300 hover:text-white transition-colors duration-150 [font-family:var(--font-barlow)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-6 [font-family:var(--font-barlow)]">
            Support
          </p>
          <ul className="flex flex-col gap-3.5">
            {support.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-bold uppercase tracking-wide text-zinc-300 hover:text-white transition-colors duration-150 [font-family:var(--font-barlow)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom Strip ───────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 [font-family:var(--font-barlow)]">
            © {new Date().getFullYear()} SG Fit. All rights reserved.
          </p>

          {/* Made with love by Quiotech */}
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 [font-family:var(--font-barlow)]">
            Made with{" "}
            <Heart className="size-3.5 fill-amber-400 text-amber-400" /> by{" "}
            <Link
              href="https://quiotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Quiotech
            </Link>
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors [font-family:var(--font-barlow)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors [font-family:var(--font-barlow)]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
