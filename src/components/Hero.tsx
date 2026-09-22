"use client"

import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen md:h-[75vh] lg:h-[78vh] xl:h-screen w-full overflow-hidden bg-white -mt-19 xl:-mt-21">

      {/* Mobile hero */}
      <Image
        src="/sgfit-mobile-hero.jpg"
        alt="SG Fit — build your body through action, discipline and consistency"
        fill
        priority
        sizes="(max-width: 639px) 100vw, 0px"
        className="object-cover sm:hidden"
      />

      {/* Desktop hero */}
      <Image
        src="/sgfit-desktop-hero.jpg"
        alt="SG Fit — build your body through action, discipline and consistency"
        fill
        priority
        sizes="(min-width: 640px) 100vw, 0px"
        className="hidden object-cover sm:block"
      />

      {/* Bottom gradient so text is always legible */}
      <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black via-black/55 to-transparent" />

      {/* Hero content — bottom-left, sitting on the gradient */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-18 xl:px-16 xl:pb-15">
        <div className="max-w-10xl">

          <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-2xl sm:text-5xl xl:text-6xl mb-5">
            <span
              style={{
                background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BUILD YOUR BODY
            </span>
            <br />
            <span className="text-white/80">
              it happens through action,<br />
              discipline &amp; consistency.
            </span>
          </h1>

          <p className="text-white/60 text-sm sm:text-base xl:text-lg font-medium max-w-4xl mb-8 [font-family:var(--font-barlow)] leading-relaxed">
            Science-backed fitness programs built for people who are serious about results.
            Train harder, recover smarter, and transform your body — for good.
          </p>

          <Link
            href="/signup"
            className="inline-block bg-white text-zinc-950 text-xs sm:text-base font-black uppercase tracking-widest px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-zinc-100 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
          >
            Start Your Journey
          </Link>

        </div>
      </div>

    </section>
  )
}
