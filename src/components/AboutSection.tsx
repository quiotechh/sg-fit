"use client"

import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import type { IconType } from "react-icons"

type Stat = {
  value: string
  label: string
  Icon: IconType | null
  color?: string
  emoji?: string
  href?: string
}

const stats: Stat[] = [
  { value: "2M+",   label: "Instagram",   Icon: FaInstagram, color: "#E1306C", href: "https://www.instagram.com/sharon_gambu/" },
  { value: "917K+", label: "TikTok",      Icon: FaTiktok,    color: "#010101", href: "https://www.tiktok.com/@sharongambu" },
  { value: "175K+", label: "Youtube",     Icon: FaYoutube,   color: "#FF0000", href: "https://www.youtube.com/@Sharon_ngambu" },
  { value: "",      label: "South Africa", Icon: null, emoji: "🇿🇦" },
]

export default function AboutSection() {

  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-16 sm:py-20 xl:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 xl:gap-20 items-center">

          {/* ── Left: Rounded image ─────────────────────────────── */}
          <div className="relative order-2 md:order-1">
            {/* Image container — rounded, tall, not full bleed */}
            <div className="relative w-full aspect-3/4 md:aspect-3/5 xl:aspect-3/4 rounded-3xl overflow-hidden bg-zinc-200">
              <Image
                src="/sg-fit-about-2.jpg"
                alt="Sharon Gambu"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Tag on photo */}
              <div className="absolute top-6 left-6">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] px-3 py-1.5 [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", color: "#1a1a1a" }}>
                  Founder · SG FIT
                </span>
              </div>
            </div>
          </div>

        {/* ── Right: Minimal text ─────────────────────────────── */}
        <div
          className="flex flex-col justify-center gap-14 order-1 md:order-2"
        >

          {/* Eyebrow + Headline grouped so gap-14 doesn't split them */}
          <div className="flex flex-col gap-4">
            <p
              className="text-sm sm:text-base font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]"
              style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Meet Sharon Gambu
            </p>

          {/* Headline */}
          <h2
            className="text-5xl sm:text-6xl md:text-4xl lg:text-6xl xl:text-7xl font-black uppercase leading-[1.05] tracking-tight [font-family:var(--font-barlow)]"
          >
            <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Action.</span>
            <span className="hidden sm:inline md:hidden text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Action.</span>
            <span className="hidden md:inline lg:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Action.</span>
            <span className="hidden lg:inline text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Action.</span>
            <br />
            <span className="text-zinc-950">Discipline.</span>
            <br />
            <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Results.</span>
            <span className="hidden sm:inline md:hidden text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Results.</span>
            <span className="hidden md:inline lg:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Results.</span>
            <span className="hidden lg:inline text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Results.</span>
          </h2>
          </div>

          {/* Bio */}
          <p
            className="text-base font-semibold text-zinc-500 leading-relaxed max-w-sm [font-family:var(--font-barlow)]"
          >
            South African fitness entrepreneur. Luxury retreat instructor.
            Founder of SG FIT. Building Africa{"'"}s strongest women — one transformation at a time.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-y-8 sm:flex border-t border-zinc-300 pt-10">
            {stats.map((s, i) => {
              const inner = (
                <div className="flex flex-row items-center gap-2 sm:gap-1.5 md:gap-1 lg:gap-1.5 xl:gap-2">
                  {s.Icon ? (
                    <s.Icon
                      style={{ color: s.color }}
                      className="h-8 w-8 sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 shrink-0"
                    />
                  ) : (
                    <span className="text-3xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl leading-none shrink-0 text-center">{s.emoji}</span>
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    {s.value && (
                      <span className="text-sm sm:text-base md:text-xs lg:text-base xl:text-lg font-black text-zinc-950 [font-family:var(--font-barlow)] leading-none">
                        {s.value}
                      </span>
                    )}
                    <span className="text-[11px] sm:text-[9px] md:text-[8px] lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400 [font-family:var(--font-barlow)]">
                      {s.label}
                    </span>
                  </div>
                </div>
              )

              // mobile: 2-col grid — left-col items (0,2) have no border; right-col items (1,3) have border-l
              // desktop: flex row — all items flex-1; items 1-3 have border-l separator
              const mobilePl   = (i === 0 || i === 2) ? "pl-0"          : "pl-4 border-l border-zinc-300"
              const desktopCls = i === 0
                ? "sm:pl-0 sm:pr-4 md:pr-2 lg:pr-4 xl:pr-6 sm:border-l-0"
                : "sm:px-4 md:px-2 lg:px-4 xl:px-6 sm:border-l sm:border-zinc-300"

              return (
                <div
                  key={s.label}
                  className={`flex items-center pr-4 sm:flex-1 ${mobilePl} ${desktopCls}`}
                >
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex hover:opacity-70 transition-opacity duration-150"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </div>
              )
            })}
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