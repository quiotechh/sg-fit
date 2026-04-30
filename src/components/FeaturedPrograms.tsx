"use client";

import { Dumbbell, Salad, Trophy, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    Icon: Dumbbell,
    title: "Workout Programs",
    desc: "Structured training plans built for real results — from beginner to advanced.",
  },
  {
    Icon: Salad,
    title: "Nutrition Guides",
    desc: "Meal plans and guides designed to fuel your training and transform your body.",
  },
  {
    Icon: Trophy,
    title: "Hit Your Goals",
    desc: "Stay consistent, celebrate milestones, and keep pushing every single day.",
  },
  {
    Icon: Users,
    title: "SGians Community",
    desc: "Train alongside thousands of women who push each other to show up and get results.",
  },
];

export default function FeaturedPrograms() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 xl:px-16 py-24 xl:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 xl:gap-20 items-center">
          {/* ── Left: Copy + features ───────────────────────────────── */}
          <div className="flex flex-col gap-12 order-2 md:order-1">
            {/* Headline */}
            <div className="flex flex-col gap-4">
              <p className="text-sm sm:text-base font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]" style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Programs
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-6xl font-black leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
                Everything you need
                <br />
                to reach your goals.
              </h2>
              <p className="text-base font-semibold text-zinc-400 max-w-sm leading-relaxed [font-family:var(--font-barlow)]">
                One platform, designed to keep you consistent and moving toward
                the body and life you want.
              </p>
            </div>

            {/* 2x2 Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {features.map(({ Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="flex flex-col gap-2.5"
                >
                  <Icon className="size-6 text-zinc-950 stroke-[1.5]" />
                  <p className="text-sm font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">
                    {title}
                  </p>
                  <p className="text-sm font-semibold text-zinc-400 leading-relaxed [font-family:var(--font-barlow)]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-2 lg:gap-3">
              <Link
                href="/programs/workouts"
                className="inline-flex items-center justify-center whitespace-nowrap border-2 bg-zinc-950 text-white text-sm md:text-xs lg:text-xs xl:text-sm font-black uppercase tracking-widest px-8 md:px-4 lg:px-5 xl:px-8 py-4 rounded-lg hover:bg-white hover:border-zinc-950 hover:text-zinc-950 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
              >
                Browse Workout Plans
              </Link>
              <Link
                href="/programs/nutrition"
                className="inline-flex items-center justify-center whitespace-nowrap border-2 border-zinc-950 text-zinc-950 rounded-lg text-sm md:text-xs lg:text-xs xl:text-sm font-black uppercase tracking-widest px-8 md:px-4 lg:px-5 xl:px-8 py-4 hover:bg-zinc-950 hover:text-white active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
              >
                Browse Nutrition Plans
              </Link>
            </div>
          </div>

          {/* ── Right: Image + floating UI cards ───────────────────── */}
          <div className="relative order-1 md:order-2">
            {/* Main image */}
            <div className="relative w-full aspect-3/4 md:aspect-4/5 xl:aspect-3/4 rounded-3xl overflow-hidden bg-zinc-200">
              {/*
                Replace with:
                <Image src="/images/programs-feature.jpg" alt="SG FIT Programs" fill className="object-cover object-top" />
              */}
              <div className="w-full h-full bg-linear-to-br from-zinc-200 to-zinc-300" />
            </div>

            {/* Floating card — top left: active program */}
            <div className="absolute -top-4 -left-4 sm:-left-8 bg-white border border-zinc-100 rounded-2xl shadow-xl px-5 py-4 flex flex-col gap-1 w-52">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-950 [font-family:var(--font-barlow)]">
                Active Program
              </p>
              <p className="text-sm font-black text-zinc-950 [font-family:var(--font-barlow)]">
                6-Week Shred 🔥
              </p>
              <div className="w-full bg-zinc-100 rounded-full h-1.5 mt-1">
                <div
                  className="bg-zinc-950 h-1.5 rounded-full"
                  style={{ width: "62%" }}
                />
              </div>
              <p className="text-[10px] font-bold text-zinc-400 [font-family:var(--font-barlow)]">
                Week 4 of 6 · 62% done
              </p>
            </div>

            {/* Floating card — bottom right: community shoutout */}
            <div className="absolute -bottom-4 -right-4 sm:-right-8 bg-zinc-950 rounded-2xl shadow-xl px-5 py-4 flex flex-col gap-1 w-56">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-950 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-black text-zinc-950 [font-family:var(--font-barlow)]">
                    SG
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white [font-family:var(--font-barlow)]">
                    Sharon Gambu
                  </p>
                  <p className="text-[9px] font-semibold text-zinc-400 [font-family:var(--font-barlow)]">
                    Just now
                  </p>
                </div>
              </div>
              <p className="text-xs font-semibold text-zinc-300 leading-snug [font-family:var(--font-barlow)]">
                {'"'}Epic work SGians. Keep going — results don{"'"}t lie. 💪&quot;
              </p>
            </div>

            {/* Floating pill — top right: members */}
            <div className="absolute top-6 -right-4 sm:-right-6 bg-white border border-zinc-100 rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <span className="text-base">⚡</span>
              <span className="text-xs font-black uppercase tracking-wide text-amber-500 [font-family:var(--font-barlow)]">
                10K+ Members
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
