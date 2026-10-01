"use client"

import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen md:h-[75vh] lg:h-[78vh] xl:h-screen w-full overflow-hidden bg-white -mt-19 xl:-mt-21">

      {/* Mobile hero */}
      <Image
        src="/sgfit-mobile-hero.jpg"
        alt="SG.FIT — build your body through action, discipline and consistency"
        fill
        priority
        sizes="(max-width: 639px) 100vw, 0px"
        className="object-cover sm:hidden"
      />

      {/* Desktop hero */}
      <Image
        src="/sgfit-desktop-hero.jpg"
        alt="SG.FIT — build your body through action, discipline and consistency"
        fill
        priority
        sizes="(min-width: 640px) 100vw, 0px"
        className="hidden object-cover sm:block"
      />

      {/* Gradient so centered text stays legible wherever it sits on the photo */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      {/* Hero content — centered column, sitting in the lower-middle of the frame, Nike-style */}
      <div className="absolute inset-x-0 bottom-[14%] sm:bottom-[10%] xl:bottom-[8%] px-6 flex flex-col items-center text-center">

        <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-3xl sm:text-5xl xl:text-6xl mb-3">
          <span
            style={{
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Build Your Body
          </span>
        </h1>

        <p className="text-white text-xs sm:text-sm xl:text-base font-semibold mb-6 leading-snug max-w-52 sm:max-w-xs xl:max-w-sm">
          Train with Sharon Gambu&apos;s structured 4-week programs.
        </p>

        {/* <p className="text-white/60 text-sm sm:text-base xl:text-lg font-medium max-w-4xl mb-8 [font-family:var(--font-barlow)] leading-relaxed">
          Science-backed fitness programs built for people who are serious about results.
          Train harder, recover smarter, and transform your body — for good.
        </p> */}

        <Link
          href="/signup"
          className="inline-block bg-white text-zinc-950 text-xs sm:text-base font-black uppercase tracking-widest px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:bg-zinc-100 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
        >
          Start Your Journey
        </Link>

      </div>

    </section>
  )
}
