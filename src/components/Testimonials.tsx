"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

// Real customer results. Names and quotes are deliberately NOT shown: we don't
// have them for most of these, and three of the images are the customer's own
// message (screenshotted), so the photo IS the testimonial. Don't add invented
// names or reviews here.
const testimonials = [
  { id: "1", src: "/testimonials/testimonial1.jpeg", alt: "Customer before and after photos" },
  {
    id: "2",
    src: "/testimonials/testimonial2.jpeg",
    alt: "Customer before and after photos with her message: after trying many slimming products, she saw a difference within 14 days of using SG tea",
  },
  { id: "3", src: "/testimonials/testimonial3.jpeg", alt: "Customer before and after photos" },
  {
    id: "4",
    src: "/testimonials/testimonial4.jpeg",
    alt: "Customer before and after photos with her message: she stopped using SG tea for a couple of months and is back, because the tea is real and it works",
  },
  {
    id: "5",
    src: "/testimonials/testimonial5.jpeg",
    alt: "Customer day 11 progress photos with her message: she can't wait to make another order",
  },
  { id: "6", src: "/testimonials/testimonial6.jpeg", alt: "Customer before and after photos" },
]

const doubled = [...testimonials, ...testimonials]

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
            Based on 100+ Happy Customers
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
          <div key={`${t.id}-${i}`} className="w-[72vw] sm:w-85 lg:w-95 shrink-0">
            {/* Fixed 4:5 frame (same card size as before, sized for every screen).
                object-contain, not object-cover: cover crops the message text off
                the bottom of the chat screenshots. */}
            <div className="relative w-full aspect-4/5 overflow-hidden rounded-sm bg-zinc-900">
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 640px) 72vw, 380px"
                draggable={false}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12 sm:mt-16 px-4">
        <Link
          href="/programs"
          className="inline-block bg-white text-zinc-950 font-black uppercase tracking-widest text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 [font-family:var(--font-barlow)] hover:bg-zinc-200 active:scale-95 rounded-lg transition-all duration-150"
        >
          Browse Programs →
        </Link>
      </div>

    </section>
  )
}
