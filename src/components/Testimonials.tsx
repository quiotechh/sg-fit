"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const testimonials = [
  {
    id: "1",
    name: "Anika R.",
    image: "/testimonials/anika.jpg",
    product: "14 Day Detox Tea",
    highlight: "Lost 4 lbs in the first week and felt completely cleansed.",
    review: "My digestion improved almost immediately. I have more energy throughout the day and the bloating is completely gone.",
  },
  {
    id: "2",
    name: "James T.",
    image: "/testimonials/james.jpg",
    product: "14 Day Slim Capsule",
    highlight: "I was skeptical — but this actually works.",
    review: "After two weeks I could feel the difference. My appetite reduced, my energy went up and I dropped two dress sizes.",
  },
  {
    id: "3",
    name: "Priya S.",
    image: "/testimonials/priya.jpg",
    product: "14 Day Detox Tea",
    highlight: "The best detox I've ever tried. Simple and effective.",
    review: "I've done many detoxes before. This one was the most gentle yet effective. Tastes great and does exactly what it promises.",
  },
  {
    id: "4",
    name: "Marcus B.",
    image: "/testimonials/marcus.jpg",
    product: "14 Day Slim Capsule",
    highlight: "Three weeks in and my waistline is visibly smaller.",
    review: "Combined with my workouts these capsules accelerated everything. Recovery is faster and my body composition has genuinely shifted.",
  },
  {
    id: "5",
    name: "Fatima O.",
    image: "/testimonials/fatima.jpg",
    product: "14 Day Detox Tea",
    highlight: "No more afternoon slumps — my energy is consistent all day.",
    review: "I drink it every morning now. My skin looks clearer, my stomach feels lighter, and I finally feel like myself again.",
  },
  {
    id: "6",
    name: "Leila K.",
    image: "/testimonials/leila.jpg",
    product: "14 Day Slim Capsule",
    highlight: "Ordered a second pack before I even finished the first.",
    review: "It just works. No jitters, no crash — just steady results. My clothes fit better and my confidence is at an all-time high.",
  },
]

const doubled = [...testimonials, ...testimonials]

function StarRow() {
  return (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" style={{ fill: "#C9953A" }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const isInteracting = useRef(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const SPEED = 0.7

    const tick = () => {
      if (!isInteracting.current) {
        el.scrollLeft += SPEED
        // Seamless loop — reset when first half is consumed
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    // Mouse drag (desktop)
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      isInteracting.current = true
      dragStartX.current = e.pageX - el.offsetLeft
      dragScrollLeft.current = el.scrollLeft
      el.style.cursor = "grabbing"
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      el.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5
    }
    const onMouseUp = () => {
      isDragging.current = false
      isInteracting.current = false
      el.style.cursor = "grab"
    }
    const onMouseLeave = () => {
      isDragging.current = false
      isInteracting.current = false
      el.style.cursor = "grab"
    }

    // Touch (mobile/tablet)
    const onTouchStart = () => { isInteracting.current = true }
    const onTouchEnd = () => {
      setTimeout(() => { isInteracting.current = false }, 1200)
    }

    el.style.cursor = "grab"
    el.addEventListener("mousedown", onMouseDown)
    el.addEventListener("mousemove", onMouseMove)
    el.addEventListener("mouseup", onMouseUp)
    el.addEventListener("mouseleave", onMouseLeave)
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchend", onTouchEnd)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      el.removeEventListener("mousedown", onMouseDown)
      el.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("mouseup", onMouseUp)
      el.removeEventListener("mouseleave", onMouseLeave)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return (
    <section className="bg-black w-full overflow-hidden py-16 sm:py-20 xl:py-24">

      {/* Heading */}
      <div className="text-center px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" style={{ fill: "#C9953A" }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span
            className="text-sm sm:text-base font-medium [font-family:var(--font-barlow)]"
            style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Based on 2,400+ Happy Customers
          </span>
        </div>

        <h2 className="uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl mb-4">
          <span className="font-black sm:hidden" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>WHAT REAL{" "}</span>
          <span className="font-black hidden sm:inline" style={{ WebkitTextStroke: "2px white", color: "transparent" }}>WHAT REAL{" "}</span>
          <span className="font-black text-white">USERS SAY</span>
        </h2>
        <p className="text-white/50 text-sm sm:text-base font-medium [font-family:var(--font-barlow)] uppercase tracking-widest max-w-xl mx-auto">
          Real people. Real results. No filters.
        </p>
      </div>

      {/* Scrollable track — auto-scrolls + drag/swipe manual control */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 px-3 overflow-x-auto select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            className="w-[72vw] sm:w-85 lg:w-95 shrink-0 flex flex-col"
          >
            {/* Image with gradient + name overlay */}
            <div className="relative w-full aspect-4/5 overflow-hidden rounded-sm mb-4">
              <div className="absolute inset-0 bg-zinc-800" />
              {t.image && (
                <Image src={t.image} alt={t.name} fill className="object-cover object-top" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="text-white font-black uppercase [font-family:var(--font-barlow)] leading-none text-xl sm:text-2xl mb-1.5">
                  {t.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" style={{ color: "#C9953A" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-widest [font-family:var(--font-barlow)]" style={{ color: "#C9953A" }}>
                    Verified Buyer
                  </span>
                </div>
              </div>
            </div>

            {/* Stars + review */}
            <div className="px-1">
              <StarRow />
              <p className="text-white/90 text-sm sm:text-base [font-family:var(--font-barlow)] leading-relaxed">
                <span className="font-black">{t.highlight} </span>
                <span className="text-white/60 font-medium">{t.review}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12 sm:mt-16 px-4">
        <Link
          href="/shop"
          className="inline-block bg-white text-zinc-950 font-black uppercase tracking-widest text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 [font-family:var(--font-barlow)] hover:bg-zinc-200 active:scale-95 transition-all duration-150"
        >
          Shop Now →
        </Link>
      </div>

    </section>
  )
}
