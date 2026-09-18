export interface CategoryConfig {
  slug: string
  label: string
  goldText: string
  whiteText: string
  subtext: string
  ctaText: string
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

export function getAllCategories(): string[] {
  return Object.keys(categoryConfigs)
}
