import { WorkoutSection } from "./workoutTypes"

// Real client content — SG.FIT 4-Week Home Workout Program (PDF supplied by client).
// Bodyweight/home version of the same "20 distinct days" pattern used by
// fourWeekShredShape.ts — no cyclical generator, each day written out in full.

export interface FourWeekHomeWorkoutDay {
  weekNumber: number
  dayNumber: number
  name: string
  focus: string
  duration: string
  sections: WorkoutSection[]
}

const warmup = (): WorkoutSection => ({
  type: "warmup",
  label: "Warm-Up",
  subtitle: "Prepare the joints and raise body temperature",
  exercises: [
    { name: "General warm-up", sets: 1, reps: "5 min", rest: "—", tempo: "Easy", notes: "Prepare the joints and raise body temperature." },
  ],
})

const cooldown = (): WorkoutSection => ({
  type: "cooldown",
  label: "Cool-down",
  subtitle: "5–7 mins",
  exercises: [
    { name: "Easy stretching & breathing", sets: 1, reps: "5–7 min", rest: "—", notes: "Focus on the trained areas." },
  ],
})

export const fourWeekHomeWorkoutDays: FourWeekHomeWorkoutDay[] = [
  // ── WEEK 1 — Build the Foundation ──────────────────────────────────────
  {
    weekNumber: 1,
    dayNumber: 1,
    name: "Glutes & Legs",
    focus: "Glutes, Quads & Hamstrings",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes, Quads & Hamstrings · progressive overload",
        exercises: [
          { name: "Hip Thrusts", sets: 3, reps: "15", rest: "30 sec", tempo: "2-1-2", notes: "Pause and squeeze at the top." },
          { name: "Squats", sets: 3, reps: "15", rest: "30 sec", tempo: "3-1-1", notes: "Keep chest tall and control the lowering." },
          { name: "Donkey Kicks", sets: 3, reps: "15/leg", rest: "30 sec", tempo: "2-1-2", notes: "Drive through the heel; keep hips square." },
          { name: "Walking Lunges", sets: 3, reps: "10/leg", rest: "45 sec", tempo: "2-0-2", notes: "Controlled steps; stay tall." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Squat Pulses", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Stay low and keep tension." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 1,
    dayNumber: 2,
    name: "Core & Conditioning",
    focus: "Core & Conditioning",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
          { name: "Russian Twists", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Rotate smoothly through the torso." },
          { name: "Heel Touches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Reach side to side without rushing." },
          { name: "Leg Scissors", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Controlled", notes: "Keep the movement small and controlled." },
          { name: "Plank Hip Dips", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Brace the core and move through the hips." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jumping Jacks", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Land softly and keep a steady pace." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 1,
    dayNumber: 3,
    name: "Lower Body Burn",
    focus: "Glutes & Legs",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Legs · progressive overload",
        exercises: [
          { name: "Reverse Lunges", sets: 3, reps: "10/leg", rest: "45 sec", tempo: "2-0-2", notes: "Controlled step back." },
          { name: "Hip Thrusts", sets: 3, reps: "15", rest: "30 sec", tempo: "2-1-2", notes: "Squeeze at the top." },
          { name: "Donkey Kicks", sets: 3, reps: "15/leg", rest: "30 sec", tempo: "2-1-2", notes: "Avoid rotating the hips." },
          { name: "Squats", sets: 3, reps: "15", rest: "45 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Walking Lunges", sets: 2, reps: "10/leg", rest: "45 sec", tempo: "2-0-2", notes: "Keep front knee tracking over toes." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Hip Thrusts", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish with controlled pulses." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 1,
    dayNumber: 4,
    name: "Upper Body & Abs",
    focus: "Chest, Arms & Core",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Chest, Arms & Core · progressive overload",
        exercises: [
          { name: "Knee Push-ups", sets: 3, reps: "10–15", rest: "45 sec", tempo: "2-0-2", notes: "Keep body aligned from knees to shoulders." },
          { name: "Knee Crunches", sets: 3, reps: "15", rest: "30 sec", tempo: "Controlled", notes: "Brace the core; avoid pulling on the neck." },
          { name: "Leg Crunches", sets: 3, reps: "15", rest: "30 sec", tempo: "Controlled", notes: "Move with control." },
          { name: "Heel Touches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Controlled side reaches." },
          { name: "Russian Twists", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Keep the torso controlled." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Mountain Climbers", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Finish at a steady pace." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 1,
    dayNumber: 5,
    name: "Full Body",
    focus: "Full Body",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Full Body · progressive overload",
        exercises: [
          { name: "Jumping Jacks", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Use a steady pace." },
          { name: "Squats", sets: 3, reps: "15", rest: "30 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Knee Push-ups", sets: 3, reps: "10–15", rest: "45 sec", tempo: "2-0-2", notes: "Modify reps as needed." },
          { name: "Reverse Lunges", sets: 3, reps: "10/leg", rest: "45 sec", tempo: "2-0-2", notes: "Stay balanced." },
          { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jumping Jacks", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Final conditioning push." },
        ],
      },
      cooldown(),
    ],
  },

  // ── WEEK 2 — Build Strength & Endurance ─────────────────────────────────
  {
    weekNumber: 2,
    dayNumber: 1,
    name: "Glute Strength",
    focus: "Glutes & Quads",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Quads · progressive overload",
        exercises: [
          { name: "Hip Thrusts", sets: 4, reps: "15", rest: "30 sec", tempo: "2-1-2", notes: "Strong squeeze at the top." },
          { name: "Squats", sets: 4, reps: "15", rest: "30 sec", tempo: "3-1-1", notes: "Controlled lowering." },
          { name: "Donkey Kicks", sets: 3, reps: "18/leg", rest: "30 sec", tempo: "2-1-2", notes: "Keep hips square." },
          { name: "Reverse Lunges", sets: 3, reps: "12/leg", rest: "45 sec", tempo: "2-0-2", notes: "Drive through the front foot." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Hip Thrusts", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Constant tension." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 2,
    name: "Core HIIT",
    focus: "Core & Conditioning",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Jumping Jacks", sets: 4, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Steady, controlled pace." },
          { name: "Mountain Climbers", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Brace the core." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Smooth rotation." },
          { name: "Leg Scissors", sets: 3, reps: "35 sec", rest: "30 sec", tempo: "Controlled", notes: "Keep legs controlled." },
          { name: "Plank Hip Dips", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Keep shoulders stable." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Heel Touches", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled finish." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 3,
    name: "Legs & Glutes",
    focus: "Glutes, Quads & Hamstrings",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes, Quads & Hamstrings · progressive overload",
        exercises: [
          { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "45 sec", tempo: "2-0-2", notes: "Stay tall." },
          { name: "Hip Thrusts", sets: 4, reps: "12", rest: "30 sec", tempo: "2-1-2", notes: "Pause at the top." },
          { name: "Squats", sets: 3, reps: "18", rest: "45 sec", tempo: "3-1-1", notes: "Smooth controlled reps." },
          { name: "Donkey Kicks", sets: 3, reps: "18/leg", rest: "30 sec", tempo: "2-1-2", notes: "Move from the hip." },
          { name: "Reverse Lunges", sets: 3, reps: "12/leg", rest: "45 sec", tempo: "2-0-2", notes: "Controlled step back." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Squats", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Stay in tension." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 4,
    name: "Core & Upper Body",
    focus: "Core, Chest & Arms",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core, Chest & Arms · progressive overload",
        exercises: [
          { name: "Knee Push-ups", sets: 3, reps: "12–15", rest: "45 sec", tempo: "2-0-2", notes: "Keep elbows controlled." },
          { name: "Knee Crunches", sets: 3, reps: "18", rest: "30 sec", tempo: "Controlled", notes: "Brace the core." },
          { name: "Leg Crunches", sets: 3, reps: "18", rest: "30 sec", tempo: "Controlled", notes: "Control both directions." },
          { name: "Heel Touches", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Reach side to side." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Rotate smoothly." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Plank Hip Dips", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Controlled", notes: "Strong brace." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 5,
    name: "Full Body Burn",
    focus: "Full Body",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Full Body · progressive overload",
        exercises: [
          { name: "Squats", sets: 3, reps: "18", rest: "30 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "45 sec", tempo: "2-0-2", notes: "Controlled stride." },
          { name: "Knee Push-ups", sets: 3, reps: "12–15", rest: "45 sec", tempo: "2-0-2", notes: "Stop before form breaks." },
          { name: "Mountain Climbers", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
          { name: "Jumping Jacks", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Maintain a steady rhythm." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jumping Jacks", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Final push." },
        ],
      },
      cooldown(),
    ],
  },

  // ── WEEK 3 — Sculpt & Progress ──────────────────────────────────────────
  {
    weekNumber: 3,
    dayNumber: 1,
    name: "Glute Focus",
    focus: "Glutes & Legs",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Legs · progressive overload",
        exercises: [
          { name: "Hip Thrusts", sets: 4, reps: "15", rest: "30 sec", tempo: "2-1-2", notes: "Increase time under tension." },
          { name: "Squats", sets: 4, reps: "18", rest: "30 sec", tempo: "3-1-1", notes: "Controlled eccentric." },
          { name: "Donkey Kicks", sets: 3, reps: "20/leg", rest: "30 sec", tempo: "2-1-2", notes: "Pause at the top." },
          { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "45 sec", tempo: "2-0-2", notes: "Controlled stride." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Hip Thrusts", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Stay under tension." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 2,
    name: "Core Challenge",
    focus: "Core & Conditioning",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Mountain Climbers", sets: 4, reps: "40 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Core braced." },
          { name: "Plank Hip Dips", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Maintain alignment." },
          { name: "Knee Crunches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Do not pull on neck." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Smooth rotation." },
          { name: "Leg Scissors", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Controlled", notes: "Small controlled range." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jumping Jacks", sets: 4, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Land softly." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 3,
    name: "Lower Body Sculpt",
    focus: "Glutes, Quads & Hamstrings",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes, Quads & Hamstrings · progressive overload",
        exercises: [
          { name: "Reverse Lunges", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-0-2", notes: "Stable front leg." },
          { name: "Squats", sets: 3, reps: "20", rest: "30 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Hip Thrusts", sets: 4, reps: "15", rest: "30 sec", tempo: "2-1-2", notes: "Strong squeeze." },
          { name: "Donkey Kicks", sets: 3, reps: "20/leg", rest: "30 sec", tempo: "2-1-2", notes: "Stable pelvis." },
          { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "45 sec", tempo: "2-0-2", notes: "Stay tall." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Squats", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled burn." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 4,
    name: "Core & Push",
    focus: "Core & Upper Body",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Upper Body · progressive overload",
        exercises: [
          { name: "Knee Push-ups", sets: 4, reps: "12–15", rest: "45 sec", tempo: "2-0-2", notes: "Controlled lowering." },
          { name: "Leg Crunches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Move smoothly." },
          { name: "Heel Touches", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Controlled side reaches." },
          { name: "Knee Crunches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Brace the core." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Rotate without rushing." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Plank Hip Dips", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Controlled", notes: "Finish with a strong brace." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 5,
    name: "Full Body Conditioning",
    focus: "Full Body",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Full Body · progressive overload",
        exercises: [
          { name: "Jumping Jacks", sets: 4, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Steady pace." },
          { name: "Squats", sets: 3, reps: "20", rest: "30 sec", tempo: "3-1-1", notes: "Controlled." },
          { name: "Reverse Lunges", sets: 3, reps: "12/leg", rest: "45 sec", tempo: "2-0-2", notes: "Balanced reps." },
          { name: "Knee Push-ups", sets: 3, reps: "15", rest: "45 sec", tempo: "2-0-2", notes: "Keep form strict." },
          { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jumping Jacks", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Final conditioning." },
        ],
      },
      cooldown(),
    ],
  },

  // ── WEEK 4 — Finish Strong ──────────────────────────────────────────────
  {
    weekNumber: 4,
    dayNumber: 1,
    name: "Glutes & Legs Challenge",
    focus: "Glutes & Quads",
    duration: "40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Quads · progressive overload",
        exercises: [
          { name: "Hip Thrusts", sets: 4, reps: "15", rest: "30 sec", tempo: "2-1-2", notes: "Strong controlled reps." },
          { name: "Squats", sets: 4, reps: "20", rest: "30 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Walking Lunges", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-0-2", notes: "Stable steps." },
          { name: "Donkey Kicks", sets: 3, reps: "20/leg", rest: "30 sec", tempo: "2-1-2", notes: "Pause at the top." },
          { name: "Reverse Lunges", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-0-2", notes: "Controlled step back." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Squats", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Stay low." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 4,
    dayNumber: 2,
    name: "Core & Conditioning Challenge",
    focus: "Core & Conditioning",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Jumping Jacks", sets: 5, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Maintain rhythm." },
          { name: "Mountain Climbers", sets: 4, reps: "40 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Smooth rotation." },
          { name: "Plank Hip Dips", sets: 3, reps: "30", rest: "30 sec", tempo: "Controlled", notes: "Strong brace." },
          { name: "Leg Scissors", sets: 3, reps: "45 sec", rest: "30 sec", tempo: "Controlled", notes: "Keep movement controlled." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Heel Touches", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled finish." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 4,
    dayNumber: 3,
    name: "Glute Burn",
    focus: "Glutes & Hamstrings",
    duration: "40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Hamstrings · progressive overload",
        exercises: [
          { name: "Hip Thrusts", sets: 4, reps: "18", rest: "30 sec", tempo: "2-1-2", notes: "Strong squeeze." },
          { name: "Walking Lunges", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-0-2", notes: "Controlled stride." },
          { name: "Donkey Kicks", sets: 3, reps: "20/leg", rest: "30 sec", tempo: "2-1-2", notes: "Stable hips." },
          { name: "Squats", sets: 3, reps: "20", rest: "30 sec", tempo: "3-1-1", notes: "Stay controlled." },
          { name: "Reverse Lunges", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-0-2", notes: "Stay balanced." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Hip Thrusts", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Final glute burn." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 4,
    dayNumber: 4,
    name: "Core & Upper Body Challenge",
    focus: "Core, Chest & Arms",
    duration: "30–35 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core, Chest & Arms · progressive overload",
        exercises: [
          { name: "Knee Push-ups", sets: 4, reps: "15", rest: "45 sec", tempo: "2-0-2", notes: "Stop before form breaks." },
          { name: "Knee Crunches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Controlled reps." },
          { name: "Leg Crunches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Control both directions." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Smooth rotation." },
          { name: "Heel Touches", sets: 3, reps: "30", rest: "30 sec", tempo: "Controlled", notes: "Controlled side reaches." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Plank Hip Dips", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Controlled", notes: "Strong final brace." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 4,
    dayNumber: 5,
    name: "SG.FIT Final Full Body Challenge",
    focus: "Full Body",
    duration: "40–45 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Full Body · progressive overload",
        exercises: [
          { name: "Jumping Jacks", sets: 3, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Warm into the circuit." },
          { name: "Squats", sets: 3, reps: "20", rest: "30 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Hip Thrusts", sets: 3, reps: "18", rest: "30 sec", tempo: "2-1-2", notes: "Strong squeeze." },
          { name: "Knee Push-ups", sets: 3, reps: "15", rest: "45 sec", tempo: "2-0-2", notes: "Controlled lowering." },
          { name: "Walking Lunges", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-0-2", notes: "Stay balanced." },
          { name: "Mountain Climbers", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Finish strong." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jumping Jacks", sets: 3, reps: "45 sec", rest: "45 sec", tempo: "Continuous", notes: "Final conditioning push." },
        ],
      },
      cooldown(),
    ],
  },
]
