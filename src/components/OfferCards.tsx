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
        <span className="text-white/40 font-black [font-family:var(--font-barlow)] text-2xl sm:text-3xl xl:text-4xl tracking-wide">
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
    <>
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-950" />

      <div className={`absolute inset-0 flex flex-col justify-between ${padding} pt-5 sm:pt-6 xl:pt-8`}>

        {/* top section */}
        <div>
          {/* number · label */}
          <p className="text-zinc-400 text-[10px] xl:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3 xl:mb-4 [font-family:var(--font-barlow)]">
            {card.num} &nbsp;·&nbsp; {card.label}
          </p>

          {/* tagline — large, split across lines */}
          <h3
            className="text-zinc-950 font-black uppercase [font-family:var(--font-barlow)] leading-none mb-4 sm:mb-5 xl:mb-7 text-xl sm:text-3xl xl:text-4xl"
            style={{ whiteSpace: "pre-line" }}
          >
            {card.back.tagline}
          </h3>

          {/* divider */}
          <div className="w-8 h-0.5 bg-zinc-200 mb-3 sm:mb-4 xl:mb-5" />

          {/* items */}
          <ul className="space-y-1.5 sm:space-y-2 xl:space-y-2.5">
            {card.back.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-zinc-500 text-xs xl:text-sm font-medium [font-family:var(--font-barlow)]"
              >
                <span className="text-zinc-300 font-black text-xs select-none">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* explore button */}
        <Link
          href={card.href}
          className="inline-flex items-center justify-between w-full border-2 border-zinc-950 text-zinc-950 text-xs xl:text-sm font-black uppercase tracking-widest px-5 xl:px-6 py-2 sm:py-2.5 xl:py-3 [font-family:var(--font-barlow)] hover:bg-zinc-950 hover:text-white transition-colors duration-200 group"
          onClick={(e) => e.stopPropagation()}
        >
          Explore {card.label}
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>

      </div>
    </>
  )
}

export default function OfferCards() {
  const [flipped, setFlipped] = useState<string | null>(null)

  return (
    <section className="bg-white w-full">

      {/* Heading */}
      <div className="pt-12 sm:pt-16 pb-8 sm:pb-10 text-center px-4 sm:px-6">
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
      <div className="hidden lg:flex flex-row gap-5 px-12 pb-16">
        {cards.map((card) => {
          const isFlipped = flipped === card.id
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
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 border-2 border-black rounded-2xl overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CardFront card={card} padding="p-6 xl:p-8" />
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 bg-white border-2 border-black rounded-2xl overflow-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <CardBack card={card} padding="px-7 xl:px-10 pb-6 xl:pb-8" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── MOBILE / TABLET (<lg) — opacity fade, no 3D ─────────────── */}
      <div className="flex lg:hidden flex-col md:flex-row gap-4 px-4 sm:px-6 md:px-6 pb-12 sm:pb-16">
        {cards.map((card) => {
          const isFlipped = flipped === card.id
          return (
            <div
              key={card.id}
              className="relative flex-1 h-[64vh] min-h-80 md:h-[50vw] md:min-h-56 rounded-xl sm:rounded-2xl border-2 border-black overflow-hidden cursor-pointer"
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
