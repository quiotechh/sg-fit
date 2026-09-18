import Image from "next/image"
import Link from "next/link"

interface PageHeroProps {
  goldText: string
  whiteText: string
  subtext: string
  ctaText: string
  ctaHref: string
}

export default function PageHero({
  goldText,
  whiteText,
  subtext,
  ctaText,
  ctaHref,
}: PageHeroProps) {
  return (
    <section className="relative h-screen md:h-[75vh] lg:h-[78vh] xl:h-screen w-full overflow-hidden bg-white -mt-19 xl:-mt-21">

      <Image
        src="/workout-program-page-hero-mobile.jpg"
        alt="SG Fit programs"
        fill
        priority
        sizes="(max-width: 639px) 100vw, 0px"
        className="object-cover sm:hidden"
      />

      <Image
        src="/programs-page-hero.jpg"
        alt="SG Fit programs"
        fill
        priority
        sizes="(min-width: 640px) 100vw, 0px"
        className="hidden object-cover sm:block"
      />

      <div className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-black via-black/55 to-transparent" />

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
              {goldText}
            </span>
            <br />
            <span className="text-white/80">{whiteText}</span>
          </h1>

          <p className="text-white/60 text-sm sm:text-base xl:text-lg font-medium max-w-4xl mb-8 [font-family:var(--font-barlow)] leading-relaxed">
            {subtext}
          </p>

          <Link
            href={ctaHref}
            className="inline-block bg-white text-zinc-950 text-xs sm:text-base font-black uppercase tracking-widest px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-zinc-100 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
          >
            {ctaText}
          </Link>

        </div>
      </div>

    </section>
  )
}
