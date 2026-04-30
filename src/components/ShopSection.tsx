"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const supplements = [
  {
    id: "tea",
    tab: "Detox Tea",
    name: "14 Day Detox Tea",
    tagline: "Burns Fat & Speeds Metabolism",
    description:
      "100% organic premium tea designed to cleanse your system, boost energy, and accelerate fat burning — naturally.",
    image: "/products/tea-bag-1.png",
    price: "$34.99",
    originalPrice: "$44.99",
    badge: "Best Seller",
    stats: [
      { value: "14", label: "Day detox cycle" },
      { value: "100%", label: "Organic ingredients" },
      { value: "2×", label: "Metabolism boost" },
    ],
  },
  {
    id: "capsule",
    tab: "Slim Capsule",
    name: "14 Day Slim Capsule",
    tagline: "Colon Detox & Weight Support",
    description:
      "Science-backed capsules that support weight loss, healthy energy levels and bowel movement. 400mg per capsule, 60 count.",
    image: "/products/slim-capsules-1.png",
    price: "$29.99",
    originalPrice: "$39.99",
    badge: "New",
    stats: [
      { value: "400mg", label: "Per capsule" },
      { value: "60", label: "Capsules inside" },
      { value: "3×", label: "Daily benefits" },
    ],
  },
]

const gymwear = [
  { id: "1", name: "SG Fit Training Set", price: "$79.99", image: "/products/gymwear-1.jpg" },
  { id: "2", name: "SG Fit Sports Bra", price: "$34.99", image: "/products/gymwear-2.jpg" },
  { id: "3", name: "SG Fit Leggings", price: "$49.99", image: "/products/gymwear-3.jpg" },
]

export default function ShopSection() {
  const [activeTab, setActiveTab] = useState<"tea" | "capsule">("tea")
  const product = supplements.find((s) => s.id === activeTab)!
  const gymwearRef = useRef<HTMLDivElement>(null)

  // One-time scroll hint on mobile to reveal horizontal scroll
  useEffect(() => {
    const el = gymwearRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.scrollTo({ left: 90, behavior: "smooth" })
            setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 650)
          }, 400)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-white w-full">

      {/* ── Heading ────────────────────────────────────────────────── */}
      <div className="pt-16 sm:pt-20 pb-10 sm:pb-14 text-center px-4 sm:px-6">
        <h2 className="uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl">
          <span className="font-black sm:hidden" style={{ WebkitTextStroke: "1px black", color: "transparent" }}>SHOP THE{" "}</span>
          <span className="font-black hidden sm:inline" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>SHOP THE{" "}</span>
          <span className="font-black text-black">COLLECTION</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-zinc-500 text-sm sm:text-base lg:text-lg font-medium [font-family:var(--font-barlow)] max-w-xl mx-auto">
          Premium supplements and activewear — built for results.
        </p>
      </div>

      {/* ── Supplements Block ───────────────────────────────────────── */}
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24 pb-16 sm:pb-20">

        {/* Toggle */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex border-2 border-black rounded-full p-1 gap-1">
            {supplements.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id as "tea" | "capsule")}
                className={`px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest [font-family:var(--font-barlow)] transition-all duration-300 ${
                  activeTab === s.id
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product split layout */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-16 xl:gap-24">

          {/* Product image — 3D floating effect */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div
              className="relative transition-all duration-700"
              style={{
                filter:
                  "drop-shadow(0px 40px 60px rgba(0,0,0,0.28)) drop-shadow(0px 12px 24px rgba(0,0,0,0.18)) drop-shadow(0px 4px 8px rgba(0,0,0,0.10))",
                transform: "perspective(900px) rotateY(-6deg) rotateX(2deg)",
              }}
            >
              <Image
                key={product.id}
                src={product.image}
                alt={product.name}
                width={420}
                height={520}
                className="w-65 md:w-60 lg:w-95 xl:w-105 h-auto object-contain transition-opacity duration-500"
                priority
              />
            </div>
          </div>

          {/* Product details */}
          <div className="flex-1 w-full lg:max-w-lg xl:max-w-xl">

            {/* Badge + name */}
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 [font-family:var(--font-barlow)]">
                {product.badge}
              </span>
            </div>

            <h3
              className="font-black uppercase [font-family:var(--font-barlow)] leading-none text-zinc-950 mb-2 text-3xl sm:text-4xl xl:text-5xl"
            >
              {product.name}
            </h3>
            <p
              className="uppercase tracking-widest text-xs sm:text-sm font-semibold mb-5 [font-family:var(--font-barlow)]"
              style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {product.tagline}
            </p>

            <p className="text-zinc-600 text-sm sm:text-base font-medium [font-family:var(--font-barlow)] leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>

            {/* Stats */}
            <div className="flex gap-0 mb-8 border-t border-b border-zinc-100 divide-x divide-zinc-100 py-5">
              {product.stats.map((stat) => (
                <div key={stat.label} className="flex-1 text-center px-4">
                  <p
                    className="font-black [font-family:var(--font-barlow)] leading-none mb-1 text-2xl sm:text-3xl"
                    style={{ background: "linear-gradient(135deg, #7A4F0D, #C9953A, #7A4F0D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-zinc-400 text-[10px] sm:text-xs font-medium [font-family:var(--font-barlow)] uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-zinc-950 font-black text-2xl sm:text-3xl [font-family:var(--font-barlow)]">
                {product.price}
              </span>
              <span className="text-zinc-400 line-through text-base sm:text-lg font-medium [font-family:var(--font-barlow)]">
                {product.originalPrice}
              </span>
              <span className="text-xs font-black uppercase tracking-wide text-white bg-zinc-800 px-2.5 py-1 [font-family:var(--font-barlow)]">
                Save{" "}
                {Math.round(
                  ((parseFloat(product.originalPrice.replace("$", "")) -
                    parseFloat(product.price.replace("$", ""))) /
                    parseFloat(product.originalPrice.replace("$", ""))) *
                    100
                )}
                %
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="flex-1 text-center whitespace-nowrap text-zinc-950 font-black uppercase tracking-widest rounded-lg text-xs md:text-xs lg:text-sm px-5 md:px-4 lg:px-8 py-4 [font-family:var(--font-barlow)] active:scale-95 transition-all duration-150"
                style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
              >
                Add to Cart
              </Link>
              <Link
                href="/shop"
                className="flex-1 text-center whitespace-nowrap border-2 border-zinc-950 text-zinc-950 font-black uppercase tracking-widest text-xs md:text-xs lg:text-sm px-5 md:px-4 lg:px-8 py-4 [font-family:var(--font-barlow)] hover:bg-zinc-950 hover:text-white transition-all rounded-lg duration-200"
              >
                View Product →
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Gymwear Block ───────────────────────────────────────────── */}
      <div className="border-t border-zinc-100 px-4 sm:px-8 lg:px-16 xl:px-24 pt-14 sm:pt-18 pb-16 sm:pb-20">

        {/* Gymwear heading */}
        <div className="mb-10 sm:mb-12">
          <p
            className="uppercase tracking-widest text-xs sm:text-sm font-bold mb-2 [font-family:var(--font-barlow)]"
            style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Explore
          </p>
          <h3 className="uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-3xl sm:text-4xl xl:text-5xl">
            <span className="font-black sm:hidden" style={{ WebkitTextStroke: "1px black", color: "transparent" }}>THE{" "}</span>
            <span className="font-black hidden sm:inline lg:hidden" style={{ WebkitTextStroke: "1px black", color: "transparent" }}>THE{" "}</span>
            <span className="font-black hidden lg:inline" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>THE{" "}</span>
            <span className="font-black text-black">SG FIT COLLECTION</span>
          </h3>
        </div>

        {/* Gymwear — mobile: horizontal scroll | tablet: horizontal scroll | desktop: 3-col grid */}
        <div
          ref={gymwearRef}
          className="flex flex-row overflow-x-auto gap-4 pb-3 snap-x snap-mandatory md:gap-5 lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none lg:gap-6"
        >
          {gymwear.map((item) => (
            <div key={item.id} className="group shrink-0 w-[72vw] md:w-[44vw] lg:w-auto lg:shrink">

              {/* Image card */}
              <div className="relative aspect-3/4 bg-zinc-100 overflow-hidden mb-4 rounded-sm">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* placeholder until images are added */
                  <div className="w-full h-full bg-zinc-900 flex items-end p-5">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <span className="relative text-white/40 text-xs font-bold uppercase tracking-widest [font-family:var(--font-barlow)]">
                      Image coming soon
                    </span>
                  </div>
                )}

                {/* hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Link
                    href="/shop"
                    className="bg-white text-zinc-950 text-xs font-black uppercase tracking-widest px-6 py-2.5 [font-family:var(--font-barlow)] hover:bg-zinc-950 hover:text-white transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              {/* Product info */}
              <p className="text-zinc-950 font-black uppercase tracking-wide text-sm sm:text-base [font-family:var(--font-barlow)] mb-1">
                {item.name}
              </p>
              <p
                className="font-medium text-sm lg:text-base xl:text-lg [font-family:var(--font-barlow)]"
                style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {item.price}
              </p>

            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/shop"
            className="inline-block border-2 border-zinc-950 text-zinc-950 font-black uppercase tracking-widest text-sm px-10 py-3.5 [font-family:var(--font-barlow)] hover:bg-zinc-950 hover:text-white transition-all rounded-lg duration-200"
          >
            View All Products →
          </Link>
        </div>

      </div>

    </section>
  )
}
