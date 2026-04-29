"use client"

import Link from "next/link"
import Image from "next/image"

const stats = [
  { value: "2M+", label: "Instagram" },
  { value: "917K+", label: "TikTok" },
  { value: "175K+", label: "Youtube" },
  { value: "🇿🇦", label: "South Africa" },
]

export default function AboutSection() {

  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-24 xl:py-32">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-20 items-center">

          {/* ── Left: Rounded image ─────────────────────────────── */}
          <div className="relative">
            {/* Image container — rounded, tall, not full bleed */}
            <div className="relative w-full aspect-3/4 rounded-3xl overflow-hidden bg-zinc-200">
              <Image
                src="/images/sharon-about.jpeg"
                alt="Sharon Gambu"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Tag on photo */}
              <div className="absolute top-6 left-6">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-950 bg-amber-400 px-3 py-1.5 [font-family:var(--font-barlow)]">
                  Founder · SG FIT
                </span>
              </div>
            </div>
          </div>

        {/* ── Right: Minimal text ─────────────────────────────── */}
        <div
          className="flex flex-col justify-center gap-14"
        >

          {/* Eyebrow */}
          <p
            className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-500 [font-family:var(--font-barlow)]"
          >
            Meet Sharon
          </p>

          {/* Headline */}
          <h2
            className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-[0.9] tracking-tight [font-family:var(--font-barlow)]"
          >
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #09090b" }}
            >
              Action.
            </span>
            <br />
            <span className="text-zinc-950">Discipline.</span>
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #09090b" }}
            >
              Results.
            </span>
          </h2>

          {/* Bio */}
          <p
            className="text-base font-semibold text-zinc-500 leading-relaxed max-w-sm [font-family:var(--font-barlow)]"
          >
            South African fitness entrepreneur. Luxury retreat instructor.
            Founder of SG FIT. Building Africa{"'"}s strongest women — one transformation at a time.
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-4 gap-0 border-t border-zinc-200 pt-10"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5 border-r border-zinc-200 last:border-r-0 pr-4 pl-4 first:pl-0">
                <span className="text-2xl xl:text-3xl font-black text-zinc-950 [font-family:var(--font-barlow)]">
                  {s.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 [font-family:var(--font-barlow)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
          >
            <Link
              href="/get-started"
              className="inline-block bg-zinc-950 text-white text-sm font-black uppercase tracking-widest px-10 py-4 rounded-lg hover:bg-zinc-800 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
            >
              Start Your Transformation
            </Link>
          </div>

        </div>
        </div>
      </div>
    </section>
  )
}