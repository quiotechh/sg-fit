export interface WorkoutDay {
  name: string
  focus: string
  duration: string
}

export interface ProgramWeek {
  days: WorkoutDay[]
}

export const weeklyPlans: Record<string, ProgramWeek[]> = {
  "6-week-shred": Array.from({ length: 6 }, (_, i) => {
    const w = i + 1
    const isMid  = w >= 3
    const isPeak = w >= 5
    return {
      days: [
        {
          name: isPeak ? "Peak Push" : isMid ? "Push Day B" : "Push Day",
          focus: "Chest · Shoulders · Triceps",
          duration: isPeak ? "55 mins" : isMid ? "50 mins" : "45 mins",
        },
        {
          name: isPeak ? "Peak Pull" : isMid ? "Pull Day B" : "Pull Day",
          focus: "Back · Biceps · Rear Delts",
          duration: isPeak ? "55 mins" : isMid ? "50 mins" : "45 mins",
        },
        {
          name: isPeak ? "Legs & Glutes — Peak" : "Legs & Glutes",
          focus: "Quads · Hamstrings · Glutes",
          duration: isPeak ? "60 mins" : isMid ? "55 mins" : "50 mins",
        },
        {
          name: isPeak ? "Final HIIT" : isMid ? "HIIT Escalation" : "HIIT Finisher",
          focus: "Full Body",
          duration: isPeak ? "45 mins" : isMid ? "40 mins" : "35 mins",
        },
      ],
    }
  }),

  "hiit-ignite": Array.from({ length: 4 }, (_, i) => {
    const w = i + 1
    const isPeak = w >= 3
    return {
      days: [
        {
          name: isPeak ? "Upper HIIT — Intense" : "Upper HIIT",
          focus: "Chest · Shoulders · Arms",
          duration: isPeak ? "40 mins" : "35 mins",
        },
        {
          name: isPeak ? "Lower HIIT — Intense" : "Lower HIIT",
          focus: "Quads · Hamstrings · Calves",
          duration: isPeak ? "40 mins" : "35 mins",
        },
        {
          name: "Core & Conditioning",
          focus: "Core · Cardio",
          duration: isPeak ? "35 mins" : "30 mins",
        },
        {
          name: isPeak ? "Total Body Peak" : "Total Body Burn",
          focus: "Full Body",
          duration: isPeak ? "45 mins" : "40 mins",
        },
      ],
    }
  }),
}
