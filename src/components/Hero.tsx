"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen md:h-[75vh] lg:h-[78vh] xl:h-screen w-full overflow-hidden bg-white">

      {/* Video — drop your file in /public/videos/hero.mp4 when ready */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      >
        {/* <source src="/videos/hero.mp4" type="video/mp4" /> */}
      </video>

      {/* Bottom gradient so text is always legible */}
      <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black via-black/55 to-transparent" />

      {/* Hero content — bottom-left, sitting on the gradient */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-18 xl:px-16 xl:pb-15">
        <div className="max-w-10xl">

          <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl mb-5">
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
            href="/get-started"
            className="inline-block bg-white text-zinc-950 text-sm sm:text-base font-black uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-zinc-100 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
          >
            Start Your Journey
          </Link>

        </div>
      </div>

    </section>
  )
}
