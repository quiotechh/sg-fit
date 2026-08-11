import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ChevronRight, Clock, Zap, Users, CheckCircle } from "lucide-react";
import {
  getPurchasedProgram,
  getProgramWeeksGrouped,
  getCompletedDayIds,
} from "@/lib/programs";
import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { title: "My Program" };

  const { slug } = await params;
  const program = await getPurchasedProgram(session.user.id, "workouts", slug);
  return { title: program ? `${program.title} — My Programs` : "My Program" };
}

export default async function MyProgramDetailPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { slug } = await params;

  const program = await getPurchasedProgram(session.user.id, "workouts", slug);
  if (!program) notFound();

  const weeks = await getProgramWeeksGrouped(program.id);
  const completedDayIds = await getCompletedDayIds(program.purchaseId);

  const totalDays = weeks.reduce((sum, week) => sum + week.days.length, 0);
  const completedCount = completedDayIds.size;

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* ── SPLIT HERO ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-10 xl:px-16 py-6 sm:py-12 xl:py-14">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 text-[11px] font-bold uppercase tracking-widest [font-family:var(--font-barlow)] mb-6 sm:mb-10">
            <Link
              href="/my-programs"
              className="hover:text-zinc-950 transition-colors"
            >
              My Programs
            </Link>
            <ChevronRight className="size-3 shrink-0" />
            <Link
              href="/my-programs/workouts"
              className="hover:text-zinc-950 transition-colors"
            >
              My Workout Programs
            </Link>
            <ChevronRight className="size-3 shrink-0" />
            <span className="text-zinc-950">{program.title}</span>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 xl:gap-14 items-start">
            {/* ── LEFT: Visual panel ─────────────────────────────────────── */}
            <div
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-linear-to-br ${program.bgClass}
                min-h-72 sm:min-h-120 lg:min-h-150 xl:min-h-165
                flex flex-col justify-between p-6 sm:p-10 xl:p-12`}
            >
              {/* Top: label + tags */}
              <div className="flex flex-col gap-3">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Workout Program
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-3 py-1 [font-family:var(--font-barlow)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: decorative large ghost title */}
              <div className="select-none">
                <h2
                  className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-[clamp(3rem,8vw,6rem)] text-transparent"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)" }}
                >
                  {program.title}
                </h2>
                {/* Level badge */}
                <div className="mt-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-white text-zinc-950 px-4 py-1.5 rounded-full [font-family:var(--font-barlow)]">
                    {program.level}
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Info panel ──────────────────────────────────────── */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:sticky lg:top-8">
              {/* Title block */}
              <div className="flex flex-col gap-2.5">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Workout Program
                </p>
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                  {program.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-zinc-500 [font-family:var(--font-barlow)]">
                  {program.subtitle}
                </p>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
                  <Clock className="size-3.5 shrink-0" />
                  {program.duration}
                </span>
                <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
                  <Users className="size-3.5 shrink-0" />
                  4x / Week
                </span>
                <span className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 [font-family:var(--font-barlow)]">
                  <Zap className="size-3.5 shrink-0" />
                  {program.level}
                </span>
              </div>

              <div className="h-px bg-zinc-100" />

              {/* Description */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)]">
                  About This Program
                </p>
                <p className="text-sm sm:text-base font-medium text-zinc-500 [font-family:var(--font-barlow)] leading-relaxed">
                  {program.description}
                </p>
              </div>

              <div className="h-px bg-zinc-100" />

              {/* Includes */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-950 [font-family:var(--font-barlow)] mb-1">
                  What&apos;s Included
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5">
                  {program.includes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center shrink-0">
                        <CheckCircle className="size-3 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-zinc-700 [font-family:var(--font-barlow)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WEEKLY PLAN ────────────────────────────────────────────────── */}
      <section className="bg-zinc-50 border-t border-zinc-100 px-4 sm:px-10 xl:px-16 py-14 sm:py-18 xl:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          {/*
          <div className="mb-10 sm:mb-12">
            <p
              className="text-[10px] font-black uppercase tracking-[0.28em] mb-1.5 [font-family:var(--font-barlow)]"
              style={{
                background:
                  "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Schedule
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
              Your Program
            </h2>
            <p className="mt-1.5 text-sm font-medium text-zinc-400 [font-family:var(--font-barlow)]">
              {weeks.length} weeks · 4 sessions per week
            </p>
          </div>
          */}
          <div className="mb-10 sm:mb-12 flex items-center justify-between gap-6">
            <div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.28em] mb-1.5 [font-family:var(--font-barlow)]"
                style={{
                  background:
                    "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Schedule
              </p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                Your Program
              </h2>
              <p className="mt-1.5 text-sm font-medium text-zinc-400 [font-family:var(--font-barlow)]">
                {completedCount}/{totalDays} days completed
              </p>
            </div>

            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#e4e4e7"
                  strokeWidth="6"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#C9953A"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={
                    2 *
                    Math.PI *
                    28 *
                    (1 - (totalDays > 0 ? completedCount / totalDays : 0))
                  }
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-zinc-950 [font-family:var(--font-barlow)]">
                {totalDays > 0
                  ? Math.round((completedCount / totalDays) * 100)
                  : 0}
                %
              </span>
            </div>
          </div>

          {/* Weeks */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {weeks.map((week) => (
              <div key={week.weekNumber} className="flex flex-col gap-4">
                {/* Week header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #C9953A, #F0CC72)",
                    }}
                  />
                  <span className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-400 [font-family:var(--font-barlow)]">
                    Week {week.weekNumber}
                  </span>
                  <div className="flex-1 h-px bg-zinc-200" />
                </div>

                {/* Day rows */}
                <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden divide-y divide-zinc-100 shadow-sm">
                  {week.days.map((day) => (
                    <Link
                      key={day.dayNumber}
                      href={`/my-programs/workouts/${slug}/week/${week.weekNumber}/day/${day.dayNumber}`}
                      className="group flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 hover:bg-zinc-50 transition-colors duration-150"
                    >
                      {/* Number badge */}
                      {/*
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-950 flex items-center justify-center shrink-0">
                        <span className="text-xs font-black text-white [font-family:var(--font-barlow)]">
                          {day.dayNumber}
                        </span>
                      </div>
                      */}
                      {completedDayIds.has(day.id) ? (
                        <div
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #C9953A, #F0CC72)",
                          }}
                        >
                          <CheckCircle className="size-4 sm:size-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-950 flex items-center justify-center shrink-0">
                          <span className="text-xs font-black text-white [font-family:var(--font-barlow)]">
                            {day.dayNumber}
                          </span>
                        </div>
                      )}

                      {/* Name + focus */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] leading-tight">
                          {day.name}
                        </p>
                        <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-0.5 truncate">
                          {day.focus}
                        </p>
                      </div>

                      {/* Duration + chevron */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:block text-xs font-bold text-zinc-400 [font-family:var(--font-barlow)] uppercase tracking-wide">
                          {day.duration}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-zinc-100 group-hover:bg-zinc-950 flex items-center justify-center transition-colors duration-200">
                          <ChevronRight className="size-3.5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
