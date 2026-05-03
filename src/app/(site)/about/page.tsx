import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import { Users, Dumbbell, Salad, ShoppingBag, Zap, Heart, Globe } from "lucide-react"

const socialStats = [
  { value: "2M+",   label: "Instagram",  Icon: FaInstagram, color: "#E1306C", href: "https://www.instagram.com/sharon_gambu/" },
  { value: "917K+", label: "TikTok",     Icon: FaTiktok,    color: "#09090b", href: "https://www.tiktok.com/@sharongambu" },
  { value: "175K+", label: "YouTube",    Icon: FaYoutube,   color: "#FF0000", href: "https://www.youtube.com/@Sharon_ngambu" },
  { value: "53.9K+",label: "SG FIT IG",  Icon: FaInstagram, color: "#E1306C", href: "https://www.instagram.com/sgfit.global/" },
]

const offerings = [
  {
    Icon: Dumbbell,
    label: "Workout Programs",
    desc: "Science-backed training plans for every level — strength, HIIT, yoga, and more.",
    href: "/programs/workouts",
    cta: "Browse Programs",
  },
  {
    Icon: Salad,
    label: "Nutrition Guides",
    desc: "Macro mastery, meal plans, and flexible dieting strategies that actually work.",
    href: "/programs/nutrition",
    cta: "Browse Guides",
  },
  {
    Icon: ShoppingBag,
    label: "Shop",
    desc: "Detox teas, SlimCaps, and premium activewear designed for the modern woman.",
    href: "/shop",
    cta: "Shop Now",
  },
  {
    Icon: Globe,
    label: "Luxury Retreats",
    desc: "Intimate fitness retreats hosted by Sharon — train, recover, and transform.",
    href: "/retreats",
    cta: "View Retreats",
  },
  {
    Icon: Users,
    label: "SGians Community",
    desc: "A private community of thousands of women committed to showing up every day.",
    href: "/community",
    cta: "Join SGians",
  },
]

const values = [
  {
    num: "01",
    title: "Action",
    desc: "Getting in shape doesn't happen by wishing — it happens through consistent, intentional effort. Every session counts.",
  },
  {
    num: "02",
    title: "Discipline",
    desc: "Motivation gets you started. Discipline keeps you going. SG FIT is built around systems that make showing up easier.",
  },
  {
    num: "03",
    title: "Results",
    desc: "No fads, no shortcuts. Every program, product, and piece of content is designed to drive real, lasting transformation.",
  },
]

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* ── HERO — identical structure to homepage hero ─────────────── */}
      <section className="relative h-screen md:h-[75vh] lg:h-[78vh] xl:h-screen w-full overflow-hidden bg-zinc-950 -mt-19 xl:-mt-21">

        <Image
          src="/sg-fit-about-2.jpg"
          alt="Sharon Gambu — SG FIT"
          fill
          className="object-cover object-center xl:object-[center_15%] opacity-75"
          priority
        />

        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-18 xl:px-16 xl:pb-15">
          <div className="max-w-10xl">

            <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl mb-5">
              <span style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Our Story.
              </span>
              <br />
              <span className="text-white/80">
                built on action,<br />
                discipline &amp; results.
              </span>
            </h1>

            <p className="text-white/60 text-sm sm:text-base xl:text-lg font-medium max-w-2xl mb-8 [font-family:var(--font-barlow)] leading-relaxed">
              SG FIT was born from a simple belief — every woman deserves to feel strong, confident, and fully in control of her body.
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

      {/* ── SHARON'S STORY ───────────────────────────────────────────── */}
      <section className="bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-16 sm:py-20 xl:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 xl:gap-20 items-center">

            {/* Image */}
            <div className="relative order-2 md:order-1">
              <div className="relative w-full aspect-3/4 md:aspect-3/5 xl:aspect-3/4 rounded-3xl overflow-hidden bg-zinc-200">
                <Image
                  src="/sg-fit-about-2.jpg"
                  alt="Sharon Gambu"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] px-3 py-1.5 [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", color: "#1a1a1a" }}>
                    Founder · SG FIT
                  </span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-8 order-1 md:order-2">
              <div className="flex flex-col gap-4">
                <p className="text-sm font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Meet Sharon Gambu
                </p>
                <h2 className="text-5xl sm:text-6xl md:text-4xl lg:text-6xl xl:text-7xl font-black uppercase leading-[1.05] tracking-tight [font-family:var(--font-barlow)]">
                  <span className="md:hidden lg:inline text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Action.</span>
                  <span className="hidden md:inline lg:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Action.</span>
                  <br />
                  <span className="text-zinc-950">Discipline.</span>
                  <br />
                  <span className="md:hidden lg:inline text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Results.</span>
                  <span className="hidden md:inline lg:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Results.</span>
                </h2>
              </div>

              <p className="text-base font-semibold text-zinc-500 leading-relaxed [font-family:var(--font-barlow)]">
                Sharon Gambu is a South African fitness entrepreneur, wellness advocate, and the founder of SG FIT. With over 3 million followers across her platforms, Sharon has built one of Africa&apos;s most engaged fitness communities — fuelled by raw authenticity and real results.
              </p>
              <p className="text-base font-semibold text-zinc-500 leading-relaxed [font-family:var(--font-barlow)]">
                From hosting luxury fitness retreats in Cape Town to building programs used by women across the world, Sharon&apos;s mission has always been the same: help women transform their bodies and mindsets through action, not excuses.
              </p>

              {/* Social stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border-t border-zinc-200 pt-8">
                {socialStats.map(({ value, label, Icon, color, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1.5 hover:opacity-70 transition-opacity">
                    <Icon style={{ color }} className="size-5" />
                    <span className="text-lg font-black text-zinc-950 [font-family:var(--font-barlow)] leading-none">{value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">{label}</span>
                  </a>
                ))}
              </div>

              <Link
                href="/get-started"
                className="inline-block bg-zinc-950 text-white text-sm font-black uppercase tracking-widest px-10 py-4 rounded-lg hover:bg-zinc-800 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] w-fit"
              >
                Start Your Transformation
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16 sm:py-20 xl:py-28 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-4 [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              What We Stand For
            </p>
            <h2 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl">
              <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>The SG FIT</span>
              <span className="hidden sm:inline text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>The SG FIT</span>
              <br />
              <span className="text-white">Philosophy.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 xl:gap-12">
            {values.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-5 border-t border-white/10 pt-8">
                <span className="text-6xl font-black [font-family:var(--font-barlow)] leading-none" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {num}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white [font-family:var(--font-barlow)]">{title}</h3>
                <p className="text-sm sm:text-base font-semibold text-zinc-400 leading-relaxed [font-family:var(--font-barlow)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 xl:py-28 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-4 [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              The SG FIT Ecosystem
            </p>
            <h2 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl text-zinc-950">
              <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Everything</span>
              <span className="hidden sm:inline text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Everything</span>
              <br />
              <span className="text-zinc-950">You Need.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
            {offerings.map(({ Icon, label, desc, href, cta }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col gap-5 border-2 border-zinc-100 rounded-2xl p-7 xl:p-8 hover:border-zinc-950 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="size-5 text-white stroke-[1.5]" style={{ color: "#F0CC72" }} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">{label}</h3>
                  <p className="text-sm font-semibold text-zinc-500 leading-relaxed [font-family:var(--font-barlow)]">{desc}</p>
                </div>
                <span className="text-xs font-black uppercase tracking-widest [font-family:var(--font-barlow)] mt-auto" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY CTA ────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16 sm:py-20 xl:py-24 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-5 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Private Community
            </p>
            <h2 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl">
              <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>Join The</span>
              <span className="hidden sm:inline text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>Join The</span>
              <br />
              <span className="text-white">SGians.</span>
            </h2>
            <p className="text-sm sm:text-base font-semibold text-zinc-400 max-w-md [font-family:var(--font-barlow)] leading-relaxed">
              Connect with thousands of women pushing each other to show up, stay consistent, and crush their fitness goals — together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 text-sm font-black uppercase tracking-widest px-10 py-4 rounded-full hover:bg-zinc-200 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] whitespace-nowrap"
            >
              <Heart className="size-4" />
              Join SGians
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white text-sm font-black uppercase tracking-widest px-10 py-4 rounded-full hover:border-white/60 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] whitespace-nowrap"
            >
              <Zap className="size-4" />
              Start Training
            </Link>
          </div>
        </div>

        {/* Fading separator */}
        <div className="mt-14 sm:mt-16 xl:mt-20 h-0.5 w-4/5 sm:w-2/3 xl:w-1/2 mx-auto" style={{ background: "linear-gradient(to right, transparent, #52525b, transparent)" }} />
      </section>

    </main>
  )
}
