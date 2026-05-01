export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "All Levels"

export interface CategoryConfig {
  slug: string
  label: string
  goldText: string
  whiteText: string
  subtext: string
  ctaText: string
}

export interface Program {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  price: number
  originalPrice?: number
  duration: string
  level: Difficulty
  sessions?: string
  tags: string[]
  includes: string[]
  highlights: string[]
  bgClass: string
}

// ─── Category configs ──────────────────────────────────────────────────────
// Add new categories here — no new route files needed
export const categoryConfigs: Record<string, CategoryConfig> = {
  workouts: {
    slug: "workouts",
    label: "Workout Programs",
    goldText: "TRAIN WITH PURPOSE.",
    whiteText: "strength. endurance. results.",
    subtext:
      "Structured training plans built for real results — from beginner foundations to advanced performance. Every program is designed to progressively challenge you and keep you on track.",
    ctaText: "Browse Programs",
  },
  nutrition: {
    slug: "nutrition",
    label: "Nutrition Guides",
    goldText: "FUEL YOUR TRANSFORMATION.",
    whiteText: "eat smarter. recover faster.",
    subtext:
      "Meal plans and nutrition guides designed to complement your training, simplify your relationship with food, and drive the results you're working for.",
    ctaText: "Browse Guides",
  },
}

// ─── All programs ─────────────────────────────────────────────────────────
// Add new programs here — they automatically appear on the right category page
export const programs: Program[] = [
  // ── WORKOUTS ──────────────────────────────────────────────────────────────
  {
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
    tags: ["Fat Loss", "Strength", "HIIT"],
    includes: [
      "42 daily workout plans",
      "Exercise video demonstrations",
      "Progressive overload tracker",
      "Weekly check-in templates",
      "Supplement guide PDF",
      "Access to SGians community",
    ],
    highlights: [
      "Combines strength & cardio strategically to maximise fat loss",
      "Built around progressive overload — you get stronger every week",
      "Designed to preserve muscle while in a calorie deficit",
    ],
    bgClass: "from-zinc-700 to-zinc-950",
  },
  {
    slug: "power-builder",
    category: "workouts",
    title: "Power Builder",
    subtitle: "8-week strength & muscle program",
    description:
      "An 8-week hypertrophy-focused program designed to build serious strength and muscle mass. Uses periodisation principles to ensure constant progression and prevent plateaus.",
    price: 59,
    duration: "8 Weeks",
    level: "Advanced",
    sessions: "4x / week",
    tags: ["Strength", "Muscle", "Powerlifting"],
    includes: [
      "56 daily workout plans",
      "Lift tracking spreadsheet",
      "1-rep max calculator",
      "Recovery & deload guide",
      "Pre-workout nutrition tips",
      "Community accountability group",
    ],
    highlights: [
      "Periodised for constant strength gains over 8 weeks",
      "Focuses on the big compound movements that build real size",
      "Includes structured deload weeks to prevent burnout",
    ],
    bgClass: "from-zinc-800 to-zinc-950",
  },
  {
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
    tags: ["Cardio", "Fat Loss", "No Equipment"],
    includes: [
      "28 bodyweight workout plans",
      "Heart rate zone guide",
      "Warm-up & cool-down library",
      "Calorie burn tracker",
      "Beginner & advanced modifications",
    ],
    highlights: [
      "Zero equipment — train at home, hotel, or gym",
      "Scales for complete beginners and advanced athletes",
      "Maximises calorie burn in under 45 minutes per session",
    ],
    bgClass: "from-zinc-600 to-zinc-900",
  },
  {
    slug: "glute-focus",
    category: "workouts",
    title: "Glute & Legs Focus",
    subtitle: "Sculpt your lower body",
    description:
      "A targeted 6-week lower-body program laser-focused on building and shaping the glutes, hamstrings, and quads. Combines resistance training with activation work for maximum results.",
    price: 44,
    duration: "6 Weeks",
    level: "Beginner",
    sessions: "4x / week",
    tags: ["Glutes", "Lower Body", "Sculpting"],
    includes: [
      "42 targeted workout plans",
      "Glute activation routine",
      "Mind-muscle connection guide",
      "Resistance band recommendations",
      "Progress photo templates",
    ],
    highlights: [
      "Dedicated glute activation built into every single session",
      "Progresses from bodyweight to loaded movements safely",
      "Includes home & gym variations for every exercise",
    ],
    bgClass: "from-zinc-700 to-zinc-900",
  },
  {
    slug: "total-body-reset",
    category: "workouts",
    title: "Total Body Reset",
    subtitle: "Beginner foundations program",
    description:
      "The perfect starting point. A 6-week beginner program designed to build your fitness base, establish healthy habits, and give you the confidence to level up. No experience needed.",
    price: 34,
    duration: "6 Weeks",
    level: "Beginner",
    sessions: "3x / week",
    tags: ["Beginner", "Full Body", "Foundations"],
    includes: [
      "18 beginner-friendly workouts",
      "Form & technique video library",
      "Habit-building tracker",
      "Beginner nutrition overview",
      "Weekly motivation check-ins",
    ],
    highlights: [
      "Designed for absolute beginners — zero experience needed",
      "Only 3 sessions per week — easy to fit into your schedule",
      "Full video library showing exactly how to do every exercise",
    ],
    bgClass: "from-zinc-600 to-zinc-800",
  },
  {
    slug: "yoga-mobility",
    category: "workouts",
    title: "Yoga & Mobility Flow",
    subtitle: "Move better, recover faster",
    description:
      "A 4-week mobility and yoga program designed to improve flexibility, joint health, and recovery. Perfect as a standalone routine or as a complement to any of our training programs.",
    price: 29,
    duration: "4 Weeks",
    level: "All Levels",
    sessions: "3x / week",
    tags: ["Yoga", "Mobility", "Recovery"],
    includes: [
      "12 guided flow sessions",
      "Morning mobility routines",
      "Post-workout stretch library",
      "Breathing & relaxation guide",
      "Sleep & recovery tips",
    ],
    highlights: [
      "Perfect for active recovery days alongside any training program",
      "Improves posture, joint health, and range of motion",
      "Guided audio cues included in every session",
    ],
    bgClass: "from-zinc-500 to-zinc-800",
  },

  // ── NUTRITION ─────────────────────────────────────────────────────────────
  {
    slug: "macro-mastery",
    category: "nutrition",
    title: "Macro Mastery",
    subtitle: "Flexible dieting — eat what you love",
    description:
      "Learn how to count and track macros so you can eat the foods you enjoy while still hitting your body composition goals. No food restrictions, just education and structure.",
    price: 39,
    originalPrice: 59,
    duration: "Lifetime Access",
    level: "All Levels",
    tags: ["Macros", "Flexible Dieting", "Fat Loss"],
    includes: [
      "Complete macro calculation guide",
      "7-day sample meal plan",
      "100+ macro-tracked recipes",
      "Eating out & social event guide",
      "Supplement recommendations",
      "Private nutrition community",
    ],
    highlights: [
      "No banned foods — every food fits, no restriction mindset",
      "Works for fat loss AND muscle gain — just adjust the numbers",
      "Includes a full restaurant & takeaway ordering guide",
    ],
    bgClass: "from-zinc-700 to-zinc-950",
  },
  {
    slug: "clean-bulk-blueprint",
    category: "nutrition",
    title: "Clean Bulk Blueprint",
    subtitle: "Build muscle without excess fat",
    description:
      "A structured nutrition guide for women looking to build muscle and strength without gaining unnecessary body fat. Covers calorie surplus strategies, protein timing, and meal prep.",
    price: 44,
    duration: "Lifetime Access",
    level: "Intermediate",
    tags: ["Muscle Gain", "Bulking", "High Protein"],
    includes: [
      "Calorie surplus calculator",
      "High-protein meal plans (4 weeks)",
      "Meal prep guide & batch cook recipes",
      "Supplement stack recommendations",
      "Progress tracking templates",
    ],
    highlights: [
      "Strategically minimises fat gain during a calorie surplus",
      "Optimised protein timing around training for maximum muscle",
      "Includes vegetarian-friendly protein swaps throughout",
    ],
    bgClass: "from-zinc-800 to-zinc-950",
  },
  {
    slug: "cut-and-lean-plan",
    category: "nutrition",
    title: "Cut & Lean Plan",
    subtitle: "Structured fat loss nutrition",
    description:
      "A no-nonsense 12-week nutrition plan built around a sustainable calorie deficit to help you lose fat steadily while maintaining muscle and keeping your energy levels high.",
    price: 39,
    duration: "12 Weeks",
    level: "All Levels",
    tags: ["Fat Loss", "Cutting", "Meal Plans"],
    includes: [
      "12-week progressive meal plan",
      "Weekly calorie deficit targets",
      "Fat loss plateau-breaking guide",
      "80+ low-calorie recipes",
      "Hunger management strategies",
      "Reverse dieting guide",
    ],
    highlights: [
      "Sustainable approach — no crash dieting or extreme restriction",
      "Progressive calorie adjustments to keep fat loss moving",
      "Includes a full plateau-busting protocol for when progress stalls",
    ],
    bgClass: "from-zinc-600 to-zinc-900",
  },
  {
    slug: "plant-based-power",
    category: "nutrition",
    title: "Plant-Based Power",
    subtitle: "Vegan & vegetarian performance nutrition",
    description:
      "A complete nutrition guide for plant-based athletes and those looking to eat less meat without sacrificing performance or results. High-protein, whole-food focused.",
    price: 34,
    duration: "Lifetime Access",
    level: "All Levels",
    tags: ["Vegan", "Vegetarian", "Plant-Based"],
    includes: [
      "Plant-based protein source guide",
      "4-week meal plan (vegan & veggie options)",
      "Supplement guide for plant-based athletes",
      "75+ plant-based recipes",
      "Nutrient deficiency prevention guide",
    ],
    highlights: [
      "Every meal hits 30g+ of complete plant-based protein",
      "Covers B12, iron, zinc & omega-3 — the nutrients most people miss",
      "Fully separate vegan AND vegetarian meal options throughout",
    ],
    bgClass: "from-zinc-700 to-zinc-900",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────
export function getProgramsByCategory(category: string): Program[] {
  return programs.filter((p) => p.category === category)
}

export function getProgramBySlug(category: string, slug: string): Program | undefined {
  return programs.find((p) => p.category === category && p.slug === slug)
}

export function getAllCategories(): string[] {
  return Object.keys(categoryConfigs)
}
