import { prisma } from "../src/lib/prisma"
import { Prisma } from "../src/generated/prisma/client"
import { fourWeekShredShapeDays } from "../src/data/fourWeekShredShape"
import { fourWeekHomeWorkoutDays } from "../src/data/fourWeekHomeWorkout"
import { fourWeekChairProgramDays } from "../src/data/fourWeekChairProgram"

async function main() {
  const program3 = await prisma.program.upsert({
    where: { slug: "4-week-shred-shape" },
    update: {},
    create: {
      slug: "4-week-shred-shape",
      category: "workouts",
      title: "4-Week Shred & Shape",
      subtitle: "Build strength, sculpt your shape, finish strong",
      description:
        "A structured 4-week progressive training program designed to build strength, improve fitness and support consistency. The program moves from foundation work into strength, sculpting and a final challenge week.",
      price: 449,
      duration: "4 Weeks",
      level: "Intermediate",
      sessions: "5x / week",
      totalWeeks: 4,
      tags: ["Strength", "Glutes & Quads", "Full Body"],
      includes: [
        "20 structured workouts",
        "5 sessions per week",
        "Warmup, Main, Finisher & Cooldown",
        "Sets, reps, rest & tempo for every exercise",
        "Exercise demonstration videos from the SG.FIT filmed library",
        "Week-by-week progression — Foundation → Strength → Sculpt → Finish Strong",
      ],
      highlights: [
        "Progressive 4-week structure — moves from foundation work to a final challenge week",
        "Glute & lower-body focused programming, balanced with upper body and core work",
        "Every exercise includes filmed demonstrations, sets, reps, rest and tempo — nothing left to guess",
      ],
      bgClass: "from-zinc-700 to-zinc-950",
    },
  })

  const program4 = await prisma.program.upsert({
    where: { slug: "4-week-home-workout" },
    update: {},
    create: {
      slug: "4-week-home-workout",
      category: "workouts",
      title: "4-Week Home Workout Program",
      subtitle: "No equipment, full progression, straight from home",
      description:
        "A structured 4-week progressive home training program designed around the SG.FIT home exercise videos already filmed. The program progresses from foundation work into higher-volume sculpting, conditioning and a final challenge week.",
      price: 449,
      duration: "4 Weeks",
      level: "All Levels",
      sessions: "5x / week",
      totalWeeks: 4,
      tags: ["Home Workout", "No Equipment", "Full Body"],
      includes: [
        "20 structured workouts",
        "5 sessions per week",
        "Warmup, Main, Finisher & Cool-down",
        "Sets, reps/time, rest, tempo & coaching notes",
        "Exercise demonstrations from the SG.FIT filmed home library",
        "Week-by-week progression — Foundation → Strength & Endurance → Sculpt → Finish Strong",
      ],
      highlights: [
        "Zero equipment — every move uses just your bodyweight, train anywhere",
        "Progressive 4-week structure — moves from foundation work to a final challenge week",
        "Every exercise includes filmed demonstrations, sets, reps, rest and tempo — nothing left to guess",
      ],
      bgClass: "from-zinc-700 to-zinc-950",
    },
  })

  // Bonus program — never purchased directly. Auto-granted (amountPaid: 0)
  // to anyone who buys a real workout-category program — see
  // handleChargeSuccess in the Paystack webhook.
  const chairProgram = await prisma.program.upsert({
    where: { slug: "4-week-chair-program" },
    update: {},
    create: {
      slug: "4-week-chair-program",
      category: "workouts",
      title: "4-Week Chair Program",
      subtitle: "Low-impact, seated & standing chair workouts",
      description:
        "A structured 4-week progressive training program built entirely around chair-based movements — seated and standing exercises that are gentle on the joints while still building strength and conditioning.",
      price: 0,
      duration: "4 Weeks",
      level: "All Levels",
      sessions: "5x / week",
      totalWeeks: 4,
      isBonus: true,
      tags: ["Chair Workout", "Low Impact", "Full Body"],
      includes: [
        "20 structured workouts",
        "5 sessions per week",
        "Warm-up, main workout, finisher and cool-down",
        "Sets, reps/time, rest, tempo and coaching notes",
        "Exercise demonstrations from the SG.FIT filmed library",
        "Included free with any workout program purchase",
      ],
      highlights: [
        "Low-impact — seated and standing chair movements, easy on the joints",
        "Progressive structure — builds from foundation work to a final challenge week",
        "Every exercise includes filmed demonstrations, sets, reps, rest and tempo — nothing left to guess",
      ],
      bgClass: "from-zinc-700 to-zinc-950",
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

  // ── 4-Week Shred & Shape — real client content, 20 distinct days ───────
  for (const day of fourWeekShredShapeDays) {
    const sections = day.sections as unknown as Prisma.InputJsonValue

    await prisma.dayTemplate.upsert({
      where: {
        programId_weekNumber_dayNumber: {
          programId: program3.id,
          weekNumber: day.weekNumber,
          dayNumber: day.dayNumber,
        },
      },
      update: {
        name: day.name,
        focus: day.focus,
        duration: day.duration,
        sections,
      },
      create: {
        programId: program3.id,
        weekNumber: day.weekNumber,
        dayNumber: day.dayNumber,
        name: day.name,
        focus: day.focus,
        duration: day.duration,
        sections,
      },
    })
  }

  // ── 4-Week Home Workout — real client content, 20 distinct days ────────
  for (const day of fourWeekHomeWorkoutDays) {
    const sections = day.sections as unknown as Prisma.InputJsonValue

    await prisma.dayTemplate.upsert({
      where: {
        programId_weekNumber_dayNumber: {
          programId: program4.id,
          weekNumber: day.weekNumber,
          dayNumber: day.dayNumber,
        },
      },
      update: {
        name: day.name,
        focus: day.focus,
        duration: day.duration,
        sections,
      },
      create: {
        programId: program4.id,
        weekNumber: day.weekNumber,
        dayNumber: day.dayNumber,
        name: day.name,
        focus: day.focus,
        duration: day.duration,
        sections,
      },
    })
  }

  // ── 4-Week Chair Program — real client content, 20 distinct days ───────
  for (const day of fourWeekChairProgramDays) {
    const sections = day.sections as unknown as Prisma.InputJsonValue

    await prisma.dayTemplate.upsert({
      where: {
        programId_weekNumber_dayNumber: {
          programId: chairProgram.id,
          weekNumber: day.weekNumber,
          dayNumber: day.dayNumber,
        },
      },
      update: {
        name: day.name,
        focus: day.focus,
        duration: day.duration,
        sections,
      },
      create: {
        programId: chairProgram.id,
        weekNumber: day.weekNumber,
        dayNumber: day.dayNumber,
        name: day.name,
        focus: day.focus,
        duration: day.duration,
        sections,
      },
    })
  }
}

main()
  .then(() => console.log("Seed complete"))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
