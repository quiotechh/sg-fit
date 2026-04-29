"use client"

import Image from "next/image"
import Link from "next/link"

const tiles = [
  // Top-left
  { src: "/cta/1.jpg", alt: "Member training",   w: "26%", top: "3%",  left: "1%",  z: 2, rot: "-2deg"   },
  // Upper-mid — partially behind T0, creates first overlap
  { src: "/cta/2.jpg", alt: "Member workout",    w: "31%", top: "14%", left: "19%", z: 1, rot: "1.5deg"  },
  // Top-right
  { src: "/cta/3.jpg", alt: "Member yoga",       w: "23%", top: "2%",  left: "54%", z: 2, rot: "2deg"    },
  // Far-right top — overlaps T2 edge
  { src: "/cta/4.jpg", alt: "Community group",   w: "21%", top: "9%",  left: "72%", z: 3, rot: "-1.5deg" },
  // LARGE dominant center — diagonal anchor
  { src: "/cta/5.jpg", alt: "Member progress",   w: "35%", top: "40%", left: "23%", z: 2, rot: "-1deg"   },
  // Mid-right — overlaps T4 edge and T3 bottom
  { src: "/cta/6.jpg", alt: "Member stretching", w: "23%", top: "31%", left: "64%", z: 3, rot: "1.5deg"  },
  // Bottom-left
  { src: "/cta/7.jpg", alt: "Member running",    w: "26%", top: "64%", left: "3%",  z: 3, rot: "1deg"    },
  // Bottom-right — overlaps T5 bottom edge
  { src: "/cta/8.jpg", alt: "Group session",     w: "27%", top: "62%", left: "60%", z: 4, rot: "-2deg"   },
]

export default function CTASection() {
  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0 px-6 sm:px-10 md:px-0 py-16 sm:py-20 md:py-10 lg:py-20 xl:py-24">

        {/* ── LEFT — Text + CTA ──────────────────────────────────────── */}
        <div className="flex-1 md:flex-[0.75] lg:flex-1 md:pl-8 lg:pl-16 xl:pl-24 md:pr-4 lg:pr-10">
          <p
            className="uppercase tracking-widest text-xs sm:text-sm font-bold mb-3 md:mb-2 lg:mb-4 [font-family:var(--font-barlow)]"
            style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Join the movement
          </p>

          <h2 className="uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl md:text-3xl lg:text-5xl xl:text-6xl mb-4 md:mb-3 lg:mb-6">
            {/* Mobile: lighter 1px stroke */}
            <span className="font-black block sm:hidden" style={{ WebkitTextStroke: "1px black", color: "transparent" }}>
              A COMMUNITY
            </span>
            {/* Tablet+: normal 2px stroke */}
            <span className="font-black hidden sm:block" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>
              A COMMUNITY
            </span>
            <span className="font-black text-black block">BUILT FOR YOU</span>
          </h2>

          <p className="text-zinc-600 text-base sm:text-lg md:text-sm lg:text-base font-medium [font-family:var(--font-barlow)] leading-relaxed max-w-md mb-2 md:mb-2 lg:mb-3">
            Real people. Real transformations. No judgement.
          </p>
          <p className="text-zinc-500 text-sm sm:text-base md:text-xs lg:text-sm font-medium [font-family:var(--font-barlow)] leading-relaxed max-w-md mb-7 md:mb-5 lg:mb-10">
            Join thousands of women who have taken control of their fitness journey — with the programs, products, and community to back them up.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/get-started"
              className="inline-block whitespace-nowrap text-zinc-950 font-black uppercase tracking-widest text-sm px-8 py-4 md:text-xs md:tracking-wide md:px-5 md:py-3 lg:text-sm lg:tracking-widest lg:px-10 lg:py-4 [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150"
              style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
            >
              Get Started →
            </Link>
            <Link
              href="/community"
              className="inline-block whitespace-nowrap border-2 border-zinc-950 text-zinc-950 font-black uppercase tracking-widest text-sm px-8 py-4 md:text-xs md:tracking-wide md:px-5 md:py-3 lg:text-sm lg:tracking-widest lg:px-10 lg:py-4 [font-family:var(--font-barlow)] hover:bg-zinc-950 hover:text-white transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* ── RIGHT — Photo collage ───────────────────────────────────── */}

        {/* DESKTOP collage (lg+) — scattered absolute tiles */}
        <div className="hidden md:block flex-1 md:flex-[1.25] lg:flex-1 relative h-[64vh] md:h-[60vh] lg:h-[64vh] md:pr-2 lg:pr-8 xl:pr-12">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -inset-10 rounded-[48px] bg-[radial-gradient(900px_500px_at_55%_50%,rgba(0,0,0,0.04),transparent_60%)]" />

          {tiles.map((t, i) => (
            <figure
              key={i}
              style={{
                width: t.w,
                top: t.top,
                left: t.left,
                zIndex: t.z,
                transform: `rotate(${t.rot})`,
              }}
              className="absolute rounded-2xl transition-all duration-300 shadow-lg shadow-black/25 p-2 bg-white origin-center hover:scale-[1.04] hover:z-10 hover:shadow-2xl hover:shadow-black/30"
            >
              <div className="rounded-xl overflow-hidden bg-zinc-200">
                <div className="relative w-full" style={{ paddingTop: "130%" }}>
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="20vw"
                    priority={i < 3}
                    className="object-cover object-center transition duration-500 grayscale hover:grayscale-0 hover:brightness-105"
                  />
                </div>
              </div>
            </figure>
          ))}
        </div>

        {/* MOBILE / TABLET collage (<lg) — 2 col grid */}
        <div className="md:hidden w-full grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-zinc-200">
              <Image src={tiles[0].src} alt={tiles[0].alt} fill className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-200">
              <Image src={tiles[2].src} alt={tiles[2].alt} fill className="object-cover" />
            </div>
            <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-zinc-200">
              <Image src={tiles[4].src} alt={tiles[4].alt} fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 mt-6">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-200">
              <Image src={tiles[1].src} alt={tiles[1].alt} fill className="object-cover" />
            </div>
            <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-zinc-200">
              <Image src={tiles[3].src} alt={tiles[3].alt} fill className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-200">
              <Image src={tiles[5].src} alt={tiles[5].alt} fill className="object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
