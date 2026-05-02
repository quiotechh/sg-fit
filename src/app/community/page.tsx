"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ImageIcon,
  Heart,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";

const goldGradient = "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)";

const included = [
  { icon: Users, text: "Private SGians community feed" },
  { icon: ImageIcon, text: "Share your progress photos" },
  { icon: Heart, text: "Like & comment on member posts" },
  { icon: MessageCircle, text: "Daily engagement with fellow SGians" },
  { icon: Shield, text: "Moderated, safe space" },
  { icon: Check, text: "Cancel anytime — no contracts" },
];

const guidelines = [
  "Be kind, supportive and encouraging to all members.",
  "No hate speech, bullying, or body shaming of any kind.",
  "Share your own content only — no reposts without credit.",
  "No spam, promotional content, or unsolicited DMs.",
  "Keep content fitness and wellness focused.",
  "Violations may result in permanent removal.",
];

const testimonials = [
  {
    avatar: "LM",
    name: "Lerato M.",
    text: "Being an SGian changed everything. The accountability here is unreal — people actually show up for each other.",
  },
  {
    avatar: "TN",
    name: "Thandi N.",
    text: "I've never felt so motivated. Posting my progress and having people cheer me on keeps me consistent every single week.",
  },
  {
    avatar: "AO",
    name: "Amara O.",
    text: "Worth every cent. The community is positive, the vibe is immaculate, and Sharon's energy flows through all of us.",
  },
];

export default function CommunityPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ── HERO ── */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/community/sgfit-community-hero.jpg"
          alt="SGians Community"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient — matches hero.tsx */}
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black via-black/55 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 xl:px-16 pb-16 sm:pb-24 xl:pb-28">
          <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl mb-5">
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Community
            </span>
            <span className="block text-white/80">BECOME AN SGIAN.</span>
          </h1>
        </div>
      </section>
      {/* ── WHAT IS THE COMMUNITY — image right, text left ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-24 xl:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400 mb-4 [font-family:var(--font-barlow)]">
                  What is SGians?
                </p>
                <h2 className="text-4xl sm:text-5xl font-black uppercase leading-[0.9] tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                  More than
                  <br />
                  <span
                    className="font-black"
                    style={{
                      background: goldGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    a community.
                  </span>
                </h2>
              </div>
              <p className="text-base font-semibold text-zinc-500 leading-relaxed max-w-md [font-family:var(--font-barlow)]">
                SGians is a private, paid membership community where SG FIT
                members connect, share their fitness journey, post progress
                photos, and hold each other accountable — every single day.
              </p>
              <p className="text-base font-semibold text-zinc-500 leading-relaxed max-w-md [font-family:var(--font-barlow)]">
                No judgement. No noise. Just real women doing the work and
                showing up for each other.
              </p>
            </div>

            {/* Image — capped height so it doesn't overflow viewport */}
            <div className="relative w-full rounded-3xl overflow-hidden h-80 sm:h-105 lg:h-120 xl:h-140">
              <Image
                src="/community/sgfit-community-1.jpg"
                alt="SGians Group"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING + WHAT'S INCLUDED ── */}
      <section className="bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-24 xl:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
            {/* Left: Pricing card */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500 mb-4 [font-family:var(--font-barlow)]">
                  Membership
                </p>
                <h2 className="text-4xl sm:text-5xl font-black uppercase leading-[0.9] tracking-tight [font-family:var(--font-barlow)]">
                  <span
                    className="block sm:hidden"
                    style={{
                      WebkitTextStroke: "1px white",
                      color: "transparent",
                    }}
                  >
                    One price.
                  </span>
                  <span
                    className="hidden sm:block"
                    style={{
                      WebkitTextStroke: "2px white",
                      color: "transparent",
                    }}
                  >
                    One price.
                  </span>
                  <br />
                  <span className="text-white">Everything included.</span>
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-end gap-2 py-8 border-y border-white/10">
                <span className="text-7xl font-black text-white [font-family:var(--font-barlow)]">
                  $29
                </span>
                <div className="mb-3 flex flex-col">
                  <span className="text-sm font-black text-zinc-400 [font-family:var(--font-barlow)]">
                    / month
                  </span>
                  <span className="text-xs font-semibold text-zinc-600 [font-family:var(--font-barlow)]">
                    Cancel anytime
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <div className="flex flex-col gap-4">
                {included.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: goldGradient }}
                    >
                      <Icon className="size-3.5 text-zinc-950" />
                    </div>
                    <p className="text-sm font-semibold text-zinc-300 [font-family:var(--font-barlow)]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/community/checkout"
                className="inline-flex items-center justify-center w-full sm:w-auto text-zinc-950 text-sm font-black uppercase tracking-widest px-12 py-4 rounded-xl active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
                style={{ background: goldGradient }}
              >
                Join SGians — $29/mo
              </Link>
              <p className="text-xs font-semibold text-zinc-600 [font-family:var(--font-barlow)]">
                Secure payment via Stripe. Auto-renews monthly.
              </p>
            </div>

            {/* Right: Two images — single on mobile/tablet, side-by-side on xl+ */}
            <div className="flex gap-4 items-end">
              <div
                className="relative flex-1 rounded-2xl overflow-hidden"
                style={{ height: "580px" }}
              >
                <Image
                  src="/community/sgfit-community-3.jpg"
                  alt="SGians training together"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div
                className="relative flex-1 rounded-2xl overflow-hidden hidden xl:block"
                style={{ height: "460px" }}
              >
                <Image
                  src="/community/sgfit-community-2.jpg"
                  alt="SGians community"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-24 xl:py-32">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400 mb-4 [font-family:var(--font-barlow)]">
            SGians Speak
          </p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase leading-[0.9] tracking-tight text-zinc-950 mb-14 [font-family:var(--font-barlow)]">
            Real people.
            <br />
            Real results.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-zinc-50 border border-zinc-100 rounded-2xl p-7 flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: goldGradient }}
                  >
                    <span className="text-xs font-black text-zinc-950 [font-family:var(--font-barlow)]">
                      {t.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-zinc-950 [font-family:var(--font-barlow)]">
                      {t.name}
                    </p>
                    <p
                      className="text-[10px] font-black uppercase tracking-wider [font-family:var(--font-barlow)]"
                      style={{
                        background: goldGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      SGian ⚡
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-zinc-500 leading-relaxed [font-family:var(--font-barlow)]">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDELINES ── */}
      <section className="bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-24 xl:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative w-full aspect-3/4 rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/community/sgfit-community-4.jpg"
                alt="SGians community vibe"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500 mb-4 [font-family:var(--font-barlow)]">
                  Community Standards
                </p>
                <h2 className="text-4xl sm:text-5xl font-black uppercase leading-[0.9] tracking-tight text-white [font-family:var(--font-barlow)]">
                  Good vibes.
                  <br />
                  <span
                    style={{
                      background: goldGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Only.
                  </span>
                </h2>
                <p className="mt-4 text-sm font-semibold text-zinc-400 max-w-sm leading-relaxed [font-family:var(--font-barlow)]">
                  To keep this space safe and positive for every member, we ask
                  all SGians to follow these guidelines.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {guidelines.map((g, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-4 border-b border-white/8 last:border-0"
                  >
                    <span className="text-xs font-black text-zinc-600 mt-0.5 shrink-0 [font-family:var(--font-barlow)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-zinc-400 leading-snug [font-family:var(--font-barlow)]">
                      {g}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — uses image 1 (group with bags, light bg) ── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[70vh] sm:h-[80vh]">
          <Image
            src="/community/sgfit-community-hero.jpg"
            alt="Join SGians"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Centered overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p
            className="text-[10px] font-black uppercase tracking-[0.28em] mb-4 [font-family:var(--font-barlow)]"
            style={{
              background: goldGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ready to join?
          </p>
          <h2 className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-[0.88] tracking-tight text-white mb-6 [font-family:var(--font-barlow)]">
            Become an SGian.
          </h2>
          <p className="text-base font-semibold text-white/60 max-w-sm mb-10 [font-family:var(--font-barlow)]">
            $29/month. Cancel anytime. Start today.
          </p>
          <Link
            href="/community/checkout"
            className="inline-flex items-center justify-center text-zinc-950 text-sm font-black uppercase tracking-widest px-12 py-4 rounded-xl active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
            style={{ background: goldGradient }}
          >
            Join SGians — $29/mo
          </Link>
        </div>
      </section>
    </main>
  );
}
