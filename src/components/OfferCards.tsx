"use client"

import { useState } from "react"
import Link from "next/link"

const cards = [
  {
    id: "programs",
    num: "01",
    label: "Programs",
    href: "/programs",
    image: "/images/programs.jpg",
    back: {
      tagline: "Train with\npurpose",
      items: [
        "Strength & Powerlifting",
        "HIIT & Cardio",
        "Yoga & Mobility",
        "Body Recomposition",
        "Beginner Foundations",
      ],
    },
  },
  {
    id: "shop",
    num: "02",
    label: "Shop",
    href: "/shop",
    image: "/images/shop.jpg",
    back: {
      tagline: "Gear up.\nLevel up.",
      items: [
        "Training Apparel",
        "Resistance Equipment",
        "Supplements & Nutrition",
        "Recovery Tools",
        "SG Fit Merch",
      ],
    },
  },
  {
    id: "community",
    num: "03",
    label: "Community",
    href: "/community",
    image: "/images/community.jpg",
    back: {
      tagline: "Stronger\ntogether",
      items: [
        "Monthly Challenges",
        "Member Leaderboard",
        "Live Q&A Sessions",
        "Transformation Stories",
        "Private Forums",
      ],
    },
  },
]

function CardFront({ card, padding }: { card: typeof cards[0], padding: string }) {
  return (
    <div
      className="w-full h-full bg-white bg-cover bg-center"
      style={{ backgroundImage: `url('${card.image}')` }}
    >
      {/* gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10" />

      {/* card number — top left */}
      <div className={`absolute top-0 left-0 ${padding}`}>
        <span className="text-white/40 font-black [font-family:var(--font-barlow)] text-6xl sm:text-7xl md:text-8xl xl:text-9xl tracking-tight leading-none">
          {card.num}
        </span>
      </div>

      {/* bottom row — label + arrow */}
      <div className={`absolute bottom-0 left-0 right-0 ${padding} flex items-end justify-between`}>
        <span className="text-white font-black uppercase tracking-wide [font-family:var(--font-barlow)] leading-none text-2xl sm:text-3xl xl:text-4xl">
          {card.label}
        </span>
        <span className="text-white/60 text-xl xl:text-2xl font-light mb-0.5">→</span>
      </div>
    </div>
  )
}

function CardBack({ card, padding }: { card: typeof cards[0], padding: string }) {
  return (
    <div className="w-full h-full bg-zinc-950">
      {/* subtle gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "linear-gradient(90deg, #C9953A, #F0CC72, #B8841F)" }} />

      {/* ghost number — background decoration */}
      <span className="absolute -bottom-4 right-4 xl:right-6 text-white/15 font-black [font-family:var(--font-barlow)] leading-none select-none text-[9rem] sm:text-[11rem] xl:text-[13rem]">
        {card.num}
      </span>

      <div className={`absolute inset-0 flex flex-col justify-between ${padding} pt-5 sm:pt-6 xl:pt-8`}>

        {/* top section */}
        <div>
          {/* number · label */}
          <p className="text-white/30 text-[10px] xl:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3 xl:mb-4 [font-family:var(--font-barlow)]">
            {card.num} &nbsp;·&nbsp; {card.label}
          </p>

          {/* tagline — gold gradient */}
          <h3
            className="font-black uppercase [font-family:var(--font-barlow)] leading-none mb-4 sm:mb-5 xl:mb-7 text-xl sm:text-3xl xl:text-4xl"
            style={{
              whiteSpace: "pre-line",
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {card.back.tagline}
          </h3>

          {/* divider */}
          <div className="w-8 h-0.5 mb-3 sm:mb-4 xl:mb-5" style={{ background: "linear-gradient(90deg, #C9953A, #F0CC72)" }} />

          {/* items */}
          <ul className="space-y-1.5 sm:space-y-2 xl:space-y-2.5">
            {card.back.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-white/50 text-xs xl:text-sm font-medium [font-family:var(--font-barlow)]"
              >
                <span className="font-black text-xs select-none" style={{ color: "#C9953A" }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* explore button */}
        <Link
          href={card.href}
          className="inline-flex items-center justify-between w-full text-zinc-950 text-xs xl:text-sm font-black uppercase tracking-widest px-5 xl:px-6 py-2 sm:py-2.5 xl:py-3 [font-family:var(--font-barlow)] rounded-lg group transition-opacity duration-200 hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
          onClick={(e) => e.stopPropagation()}
        >
          Explore {card.label}
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>

      </div>
    </div>
  )
}

export default function OfferCards() {
  const [flipped, setFlipped] = useState<string | null>(null)

  return (
    <section className="bg-white w-full">

      {/* Heading */}
      <div className="pt-16 sm:pt-20 pb-8 sm:pb-10 text-center px-4 sm:px-6">
        <h2 className="uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl">
          <span className="font-black sm:hidden" style={{ WebkitTextStroke: "1px black", color: "transparent" }}>WHAT WE{" "}</span>
          <span className="font-black hidden sm:inline" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>WHAT WE{" "}</span>
          <span className="font-black text-black">OFFER</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-zinc-500 text-sm sm:text-base lg:text-lg font-medium [font-family:var(--font-barlow)] max-w-xl mx-auto">
          Everything you need to train, gear up, and grow — in one place.
        </p>
      </div>

      {/* ── DESKTOP (lg+) — 3D flip ──────────────────────────────────── */}
      <div className="hidden lg:flex flex-row gap-8 px-12 pb-16">
        {cards.map((card) => {
          const isFlipped = flipped === card.id
          const shadow = isFlipped
            ? "0 8px 16px rgba(0,0,0,0.10), 0 24px 48px rgba(0,0,0,0.14), 0 48px 80px rgba(0,0,0,0.12)"
            : "0 4px 8px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.10), 0 32px 56px rgba(0,0,0,0.10)"
          return (
            <div
              key={card.id}
              className="relative flex-1 h-[38vh] min-h-72 xl:h-[70vh] xl:min-h-105"
              style={{ perspective: "1200px" }}
              onMouseEnter={() => setFlipped(card.id)}
              onMouseLeave={() => setFlipped(null)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: shadow,
                    transition: "box-shadow 300ms ease",
                  }}
                >
                  <CardFront card={card} padding="p-6 xl:p-8" />
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    WebkitTransform: "rotateY(180deg)",
                    boxShadow: shadow,
                    transition: "box-shadow 300ms ease",
                  }}
                >
                  <CardBack card={card} padding="px-7 xl:px-10 pb-6 xl:pb-8" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── MOBILE / TABLET (<lg) — opacity fade, no 3D ─────────────── */}
      <div className="flex lg:hidden flex-col md:flex-row gap-7 sm:gap-6 md:gap-6 px-4 sm:px-6 md:px-6 pb-12 sm:pb-16">
        {cards.map((card) => {
          const isFlipped = flipped === card.id
          return (
            <div
              key={card.id}
              className="relative flex-1 h-[64vh] min-h-80 md:h-[50vw] md:min-h-56 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
              style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.10), 0 32px 56px rgba(0,0,0,0.10)" }}
              onClick={() => setFlipped(isFlipped ? null : card.id)}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: isFlipped ? 0 : 1, pointerEvents: isFlipped ? "none" : "auto" }}
              >
                <CardFront card={card} padding="p-5 sm:p-6" />
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 bg-white transition-opacity duration-500"
                style={{ opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? "auto" : "none" }}
              >
                <CardBack card={card} padding="px-5 sm:px-7 pb-5 sm:pb-6" />
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
