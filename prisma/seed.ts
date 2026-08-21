import { prisma } from "../src/lib/prisma"
import { Prisma } from "../src/generated/prisma/client"
import { weeklyPlans } from "../src/data/weeklyPlans"
import { dayPlans } from "../src/data/dayPlans"

const PROGRAM_SLUGS = ["6-week-shred", "hiit-ignite"] as const

async function main() {
  const program1 = await prisma.program.upsert({
    where: { slug: "6-week-shred" },
    update: {},
    create: {
      slug: "6-week-shred",
      category: "workouts",
      title: "6-Week Shred",
      subtitle: "Burn fat, build lean muscle",
      description:
        "A progressive 6-week cutting program combining heavy strength training with strategic cardio to torch body fat while preserving hard-earned muscle. Built for women who are serious about getting lean.",
      price: 49,
      originalPrice: 79,
      duration: "6 Weeks",
      level: "Intermediate",
      sessions: "5x / week",
      totalWeeks: 6,
      tags: ["Fat Loss", "Strength", "HIIT"],
      includes: [
        "6 weeks of progressive training",
        "4 sessions per week",
        "Push · Pull · Legs · HIIT days",
        "Warmup, Main, Finisher & Cooldown",
        "Week-by-week coaching cues",
        "Sets, reps, rest & tempo for every exercise",
      ],
      highlights: [
        "Combines strength & cardio strategically to maximise fat loss",
        "Built around progressive overload — you get stronger every week",
        "Designed to preserve muscle while in a calorie deficit",
      ],
      bgClass: "from-zinc-700 to-zinc-950",
    },
  })

  const program2 = await prisma.program.upsert({
    where: { slug: "hiit-ignite" },
    update: {},
    create: {
      slug: "hiit-ignite",
      category: "workouts",
      title: "HIIT Ignite",
      subtitle: "4-week cardio & conditioning",
      description:
        "A high-intensity 4-week program built to skyrocket your cardio fitness, burn maximum calories, and improve your overall conditioning. No equipment needed — train anywhere.",
      price: 39,
      duration: "4 Weeks",
      level: "All Levels",
      sessions: "5x / week",
      totalWeeks: 4,
      tags: ["Cardio", "Fat Loss", "No Equipment"],
      includes: [
        "4 weeks of progressive conditioning",
        "4 sessions per week",
        "HIIT · Cardio · Strength · Circuit days",
        "Warmup, Main, Finisher & Cooldown",
        "Week-by-week coaching cues",
        "Sets, reps, rest & tempo for every exercise",
      ],
      highlights: [
        "Zero equipment — train at home, hotel, or gym",
        "Scales for complete beginners and advanced athletes",
        "Maximises calorie burn in under 45 minutes per session",
      ],
      bgClass: "from-zinc-600 to-zinc-900",
    },
  })

  await prisma.program.upsert({
    where: { slug: "sgfit-nutrition-guide" },
    update: {},
    create: {
      slug: "sgfit-nutrition-guide",
      category: "nutrition",
      title: "SGFIT Nutrition Guide",
      subtitle: "Eat Well. Feel Good. Live Better.",
      description:
        "A practical guide to enjoying food, building balanced meals and creating a healthier lifestyle without making food your enemy — by Sharon Gambu. No rigid diets, no banned foods, just a simple formula for eating well and sustaining it long-term.",
      price: 29,
      duration: "Lifetime Access",
      level: "All Levels",
      totalWeeks: 0,
      fileKey: "nutrition/sgfit-nutrition-guide.pdf",
      tags: ["Nutrition", "Meal Plans", "Digital Guide"],
      includes: [
        "Build-your-own-plate formula (protein, carbs, veg, fruit/fats)",
        "7-day meal inspiration plan",
        "Healthier swaps for your favourite foods",
        "SG.FIT kitchen recipes",
        "Full grocery list template",
        "Delivered instantly to your email as a PDF",
      ],
      highlights: [
        "No rigid dieting — a flexible formula you adapt to your own goals",
        "Simple, familiar recipes using ingredients you already know",
        "Written from real lived experience, not generic meal-plan templates",
      ],
      bgClass: "from-zinc-700 to-zinc-950",
    },
  })

  const programsBySlug: Record<string, { id: string }> = {
    "6-week-shred": program1,
    "hiit-ignite": program2,
  }

  // ── DayTemplate rows — one per (program, week, day) ────────────────────
  for (const slug of PROGRAM_SLUGS) {
    const programId = programsBySlug[slug].id
    const weeks = weeklyPlans[slug]

    for (let i = 0; i < weeks.length; i++) {
      const weekNumber = i + 1
      const days = weeks[i].days

      for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const dayNumber = dayIndex + 1
        const dayMeta = days[dayIndex]
        const plan = dayPlans[`${slug}-d${dayNumber}`]
        if (!plan) continue

        const tip = plan.weekTips[weekNumber - 1] ?? plan.weekTips[0]
        const sections = plan.sections as unknown as Prisma.InputJsonValue

        await prisma.dayTemplate.upsert({
          where: { programId_weekNumber_dayNumber: { programId, weekNumber, dayNumber } },
          update: {
            name: dayMeta.name,
            focus: dayMeta.focus,
            duration: dayMeta.duration,
            tip,
            sections,
          },
          create: {
            programId,
            weekNumber,
            dayNumber,
            name: dayMeta.name,
            focus: dayMeta.focus,
            duration: dayMeta.duration,
            tip,
            sections,
          },
        })
      }
    }
  }
}

main()
  .then(() => console.log("Seed complete"))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
