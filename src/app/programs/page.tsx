import Link from "next/link"
import { Dumbbell, Salad, ArrowRight, Zap, Target, Users } from "lucide-react"

const workoutIncludes = [
  "Strength & Powerlifting plans",
  "HIIT & Cardio workouts",
  "Yoga & Mobility sessions",
  "Beginner to advanced tracks",
  "Weekly workout calendars",
]

const nutritionIncludes = [
  "Structured meal plans",
  "Macro & calorie guides",
  "Recipe libraries",
  "Supplement recommendations",
  "Flexible dieting strategies",
]

const valueProps = [
  {
    Icon: Zap,
    title: "Science-backed",
    desc: "Every program is rooted in evidence-based training and nutrition principles — no guesswork, no fads.",
  },
  {
    Icon: Target,
    title: "Goal-specific",
    desc: "Whether you're losing fat, building muscle, or improving endurance — there's a program for you.",
  },
  {
    Icon: Users,
    title: "Built for real women",
    desc: "Designed by Sharon Gambu for women at every level — from first-timers to seasoned athletes.",
  },
]

export default function ProgramsPage() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen md:h-[75vh] lg:h-[78vh] xl:h-screen w-full overflow-hidden bg-white">

        {/* Video — drop your file in /public/videos/programs.mp4 when ready */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        >
          {/* <source src="/videos/programs.mp4" type="video/mp4" /> */}
        </video>

        {/* Bottom gradient so text is always legible */}
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-black via-black/55 to-transparent" />

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
                CHOOSE YOUR PATH.
              </span>
              <br />
              <span className="text-white/80">
                train smarter.<br />
                eat better.
              </span>
            </h1>

            <p className="text-white/60 text-sm sm:text-base xl:text-lg font-medium max-w-4xl mb-8 [font-family:var(--font-barlow)] leading-relaxed">
              Two focused categories — workout programs and nutrition guides — everything you need
              to transform your body and your habits.
            </p>

            <a
              href="#categories"
              className="inline-block bg-white text-zinc-950 text-sm sm:text-base font-black uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-zinc-100 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
            >
              Explore Programs
            </a>

          </div>
        </div>

      </section>

      {/* ── CATEGORY CARDS ───────────────────────────────────────────── */}
      <section id="categories" className="bg-white">

        {/* Section header */}
        <div className="pt-16 sm:pt-20 pb-10 sm:pb-12 text-center px-4 sm:px-6">
          <h2 className="uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-4xl sm:text-5xl xl:text-6xl">
            <span
              className="font-black sm:hidden"
              style={{ WebkitTextStroke: "1px black", color: "transparent" }}
            >
              WHAT WE{" "}
            </span>
            <span
              className="font-black hidden sm:inline"
              style={{ WebkitTextStroke: "2px black", color: "transparent" }}
            >
              WHAT WE{" "}
            </span>
            <span className="font-black text-black">OFFER</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-500 text-sm sm:text-base lg:text-lg font-medium [font-family:var(--font-barlow)] max-w-xl mx-auto">
            Pick your focus. Follow the plan. See the results.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-5 px-6 sm:px-10 xl:px-16 pb-16 sm:pb-20">

          {/* ── Workout Programs Card ── */}
          <Link
            href="/programs/workouts"
            className="group relative flex flex-col flex-1 rounded-2xl border-2 border-zinc-950 overflow-hidden bg-zinc-900 md:h-auto md:min-h-96 lg:min-h-[560px] xl:min-h-[75vh] transition-transform duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl"
          >
            {/* Image placeholder — replace with <Image> when asset is ready */}
            <div className="absolute inset-0 bg-linear-to-br from-zinc-700 to-zinc-950 group-hover:scale-105 transition-transform duration-700 ease-in-out" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10" />

            {/* Card number — always at top, in flow */}
            <div className="relative z-10 p-6 sm:p-8 shrink-0">
              <span className="text-white/30 font-black [font-family:var(--font-barlow)] text-5xl sm:text-6xl xl:text-8xl tracking-tight leading-none">
                01
              </span>
            </div>

            {/* Spacer — on lg+ (fixed height) this pushes content to bottom */}
            <div className="flex-1" />

            {/* Content — in flow on mobile, anchored to bottom on lg+ via flex */}
            <div className="relative z-10 p-6 sm:p-8 xl:p-10 xl:pb-14 flex flex-col gap-3 sm:gap-4 xl:gap-5">

              <div className="flex items-center gap-3">
                <Dumbbell className="size-5 sm:size-6 stroke-[1.5]" style={{ color: "#F0CC72" }} />
                <span
                  className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] [font-family:var(--font-barlow)]"
                  style={{
                    background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Workout Programs
                </span>
              </div>

              <h3 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-2xl sm:text-4xl xl:text-5xl text-white">
                Train with
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  purpose.
                </span>
              </h3>

              <p className="text-white/60 text-sm sm:text-base font-medium [font-family:var(--font-barlow)] leading-relaxed max-w-md">
                Structured training plans built for real results — whether you&apos;re just starting
                or chasing your next PR.
              </p>

              <ul className="space-y-1.5">
                {workoutIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-white/50 text-xs sm:text-sm font-medium [font-family:var(--font-barlow)]"
                  >
                    <span className="text-white/30 font-black text-xs select-none">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="inline-flex items-center gap-3 border-2 border-white/30 group-hover:border-white text-white text-xs sm:text-sm font-black uppercase tracking-widest px-6 py-3 [font-family:var(--font-barlow)] transition-all duration-300 group-hover:bg-white group-hover:text-zinc-950 rounded-lg w-fit mt-1 sm:mt-2">
                Browse Workouts
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>

            </div>
          </Link>

          {/* ── Nutrition Guides Card ── */}
          <Link
            href="/programs/nutrition"
            className="group relative flex flex-col flex-1 rounded-2xl border-2 border-zinc-950 overflow-hidden bg-zinc-900 md:h-auto md:min-h-96 lg:min-h-[560px] xl:min-h-[75vh] transition-transform duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl"
          >
            {/* Image placeholder — replace with <Image> when asset is ready */}
            <div className="absolute inset-0 bg-linear-to-br from-zinc-700 to-zinc-950 group-hover:scale-105 transition-transform duration-700 ease-in-out" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10" />

            {/* Card number — always at top, in flow */}
            <div className="relative z-10 p-6 sm:p-8 shrink-0">
              <span className="text-white/30 font-black [font-family:var(--font-barlow)] text-5xl sm:text-6xl xl:text-8xl tracking-tight leading-none">
                02
              </span>
            </div>

            {/* Spacer — on lg+ (fixed height) this pushes content to bottom */}
            <div className="flex-1" />

            {/* Content — in flow on mobile, anchored to bottom on lg+ via flex */}
            <div className="relative z-10 p-6 sm:p-8 xl:p-10 xl:pb-14 flex flex-col gap-3 sm:gap-4 xl:gap-5">

              <div className="flex items-center gap-3">
                <Salad className="size-5 sm:size-6 stroke-[1.5]" style={{ color: "#F0CC72" }} />
                <span
                  className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] [font-family:var(--font-barlow)]"
                  style={{
                    background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Nutrition Guides
                </span>
              </div>

              <h3 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-2xl sm:text-4xl xl:text-5xl text-white">
                Fuel your
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  transformation.
                </span>
              </h3>

              <p className="text-white/60 text-sm sm:text-base font-medium [font-family:var(--font-barlow)] leading-relaxed max-w-md">
                Meal plans and nutrition guides designed to complement your training and get real,
                lasting results.
              </p>

              <ul className="space-y-1.5">
                {nutritionIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-white/50 text-xs sm:text-sm font-medium [font-family:var(--font-barlow)]"
                  >
                    <span className="text-white/30 font-black text-xs select-none">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="inline-flex items-center gap-3 border-2 border-white/30 group-hover:border-white text-white text-xs sm:text-sm font-black uppercase tracking-widest px-6 py-3 [font-family:var(--font-barlow)] transition-all duration-300 group-hover:bg-white group-hover:text-zinc-950 rounded-lg w-fit mt-1 sm:mt-2">
                Browse Nutrition
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>

            </div>
          </Link>

        </div>
      </section>

      {/* ── WHY OUR PROGRAMS WORK ────────────────────────────────────── */}
      <section className="bg-zinc-950 py-20 sm:py-24 xl:py-32 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12 sm:mb-16">
            <p
              className="text-xs sm:text-sm font-black uppercase tracking-[0.28em] mb-3 [font-family:var(--font-barlow)]"
              style={{
                background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The SG Fit Difference
            </p>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)]">
              <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>Why Our Programs</span>
              <span className="hidden sm:inline text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>Why Our Programs</span>
              <br />
              <span className="text-white">Actually Work.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 xl:gap-16">
            {valueProps.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto sm:mx-0">
                  <Icon
                    className="size-5 stroke-[1.5]"
                    style={{ color: "#F0CC72" }}
                  />
                </div>
                <p className="text-sm font-black uppercase tracking-wide text-white [font-family:var(--font-barlow)]">
                  {title}
                </p>
                <p className="text-sm font-semibold text-zinc-400 leading-relaxed [font-family:var(--font-barlow)]">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── NOT SURE WHERE TO START? ─────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24 px-6 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] mb-4">
            <span className="sm:hidden text-transparent" style={{ WebkitTextStroke: "1px #09090b" }}>Not Sure Where</span>
            <span className="hidden sm:inline text-transparent" style={{ WebkitTextStroke: "2px #09090b" }}>Not Sure Where</span>
            <br />
            <span className="text-zinc-950">To Start?</span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base font-medium [font-family:var(--font-barlow)] max-w-md mx-auto mb-10 leading-relaxed">
            Pick the path that matches your biggest focus right now — you can always stack the other one later.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs/workouts"
              className="group inline-flex items-center gap-3 bg-zinc-950 text-white text-sm font-black uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-zinc-800 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] justify-center"
            >
              <Dumbbell className="size-4 stroke-[1.5]" />
              I want to train harder
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/programs/nutrition"
              className="group inline-flex items-center gap-3 border-2 border-zinc-950 text-zinc-950 text-sm font-black uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-zinc-950 hover:text-white active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] justify-center"
            >
              <Salad className="size-4 stroke-[1.5]" />
              I want to eat better
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

        </div>
      </section>

    </main>
  )
}
