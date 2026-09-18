import { WorkoutSection } from "./workoutTypes"

// Real client content — SG.FIT 4-Week Shred & Shape (PDF supplied by client).
// Unlike weeklyPlans/dayPlans (a 4-day cycle repeated with per-week tips),
// this program has 20 genuinely distinct workouts, so each day is written out
// in full rather than generated from a template.

export interface FourWeekShredShapeDay {
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

export const fourWeekShredShapeDays: FourWeekShredShapeDay[] = [
  // ── WEEK 1 — Build the Foundation ──────────────────────────────────────
  {
    weekNumber: 1,
    dayNumber: 1,
    name: "Glutes & Quads",
    focus: "Glutes & Quads",
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Quads · progressive overload",
        exercises: [
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Pause and squeeze at the top." },
          { name: "Goblet Squat", sets: 3, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Keep chest tall and knees tracking over toes." },
          { name: "Walking Lunges", sets: 3, reps: "10/leg", rest: "60 sec", tempo: "2-0-2", notes: "Controlled steps." },
          { name: "Leg Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Drive through the mid-foot; don't lock knees." },
          { name: "Leg Extension", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Control the lowering phase." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Bodyweight Squat Pulses", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Stay low and keep tension." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 1,
    dayNumber: 2,
    name: "Upper Body Strength",
    focus: "Back, Chest, Shoulders & Arms",
    duration: "45–50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Back, Chest, Shoulders & Arms · progressive overload",
        exercises: [
          { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Pull elbows toward ribs." },
          { name: "Chest Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-0-2", notes: "Control the return." },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-0-2", notes: "Brace your core." },
          { name: "Pulldown Machine", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Use the filmed machine variation." },
          { name: "Lateral Raises", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Avoid swinging." },
          { name: "Bicep Curl", sets: 3, reps: "12", rest: "45 sec", tempo: "2-0-2", notes: "Keep elbows close." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Push-ups", sets: 2, reps: "AMRAP", rest: "45 sec", tempo: "Controlled", notes: "Stop when good form breaks; modify if needed." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 1,
    dayNumber: 3,
    name: "Glutes & Hamstrings",
    focus: "Glutes & Hamstrings",
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Hamstrings · progressive overload",
        exercises: [
          { name: "Romanian Deadlift", sets: 4, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Hinge at the hips; neutral spine." },
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Full range and strong squeeze." },
          { name: "Hamstring Curl", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Control both directions." },
          { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Keep dumbbells close to legs." },
          { name: "Cable Kickbacks", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-1-2", notes: "Move from the hip." },
          { name: "Glute Abduction Machine", sets: 3, reps: "20", rest: "45 sec", tempo: "2-1-2", notes: "Pause at the open position." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Bodyweight Squat Pulses", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled pulses." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 1,
    dayNumber: 4,
    name: "Core & Conditioning",
    focus: "Core & Conditioning",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
          { name: "Russian Twists", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Rotate through the torso." },
          { name: "Bicycle Crunch", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Keep neck relaxed." },
          { name: "Flutter Kicks", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Controlled", notes: "Keep movement small." },
          { name: "Heel Touches", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Controlled side reaches." },
          { name: "Side Plank", sets: 3, reps: "30 sec/side", rest: "30 sec", tempo: "Static", notes: "Keep body aligned." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jump Squats", sets: 3, reps: "20 sec", rest: "40 sec", tempo: "Explosive", notes: "Land softly; use a low-impact squat option if needed." },
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
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Full Body · progressive overload",
        exercises: [
          { name: "Goblet Squat", sets: 3, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Dumbbell Romanian Deadlift", sets: 3, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Neutral spine." },
          { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Control the return." },
          { name: "Dumbbell Chest Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-0-2", notes: "Keep wrists stacked." },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "60 sec", tempo: "2-0-2", notes: "Brace the trunk." },
          { name: "Reverse Lunges", sets: 3, reps: "10/leg", rest: "60 sec", tempo: "2-0-2", notes: "Stable front leg." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Bodyweight Squat Pulses", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled tension." },
        ],
      },
      cooldown(),
    ],
  },

  // ── WEEK 2 — Build Strength ─────────────────────────────────────────────
  {
    weekNumber: 2,
    dayNumber: 1,
    name: "Glute Strength",
    focus: "Glutes & Quads",
    duration: "50–55 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Quads · progressive overload",
        exercises: [
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Challenging but controlled load." },
          { name: "Sumo Squat", sets: 4, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Push knees out." },
          { name: "Leg Press", sets: 3, reps: "10", rest: "75 sec", tempo: "2-1-2", notes: "Progress load only if form is solid." },
          { name: "Reverse Lunges", sets: 3, reps: "10/leg", rest: "60 sec", tempo: "2-0-2", notes: "Drive through front leg." },
          { name: "Leg Extension", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Controlled squeeze." },
          { name: "Glute Abduction Machine", sets: 3, reps: "20", rest: "45 sec", tempo: "2-1-2", notes: "Don't bounce." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Bodyweight Squat Pulses", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Constant tension." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 2,
    name: "Upper Body Strength",
    focus: "Back, Chest, Shoulders & Arms",
    duration: "45–50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Back, Chest, Shoulders & Arms · progressive overload",
        exercises: [
          { name: "Pulldown Machine", sets: 4, reps: "10", rest: "75 sec", tempo: "2-1-2", notes: "Controlled." },
          { name: "Dumbbell Chest Press", sets: 4, reps: "10", rest: "75 sec", tempo: "2-0-2", notes: "Controlled lowering." },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "60 sec", tempo: "2-0-2", notes: "Avoid arching the lower back." },
          { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Full comfortable range." },
          { name: "Hammer Curl", sets: 3, reps: "12", rest: "45 sec", tempo: "2-0-2", notes: "No swinging." },
          { name: "Push-ups", sets: 3, reps: "AMRAP", rest: "45 sec", tempo: "Controlled", notes: "Modify as needed." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Lateral Raises", sets: 2, reps: "15", rest: "30 sec", tempo: "2-1-2", notes: "Light, controlled reps." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 3,
    name: "Lower Body Sculpt",
    focus: "Glutes, Hamstrings & Quads",
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes, Hamstrings & Quads · progressive overload",
        exercises: [
          { name: "Romanian Deadlift", sets: 3, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Controlled eccentric." },
          { name: "Goblet Squat", sets: 3, reps: "15", rest: "60 sec", tempo: "3-1-1", notes: "Smooth reps." },
          { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "60 sec", tempo: "2-0-2", notes: "Stay tall." },
          { name: "Hamstring Curl", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Squeeze at contraction." },
          { name: "Cable Kickbacks", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-1-2", notes: "Stable pelvis." },
          { name: "Calf Raises", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Pause at top." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Sumo Squat", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Controlled", notes: "Continuous controlled reps." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 4,
    name: "Core & HIIT",
    focus: "Core & Conditioning",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Jump Squats", sets: 4, reps: "20 sec", rest: "40 sec", tempo: "Explosive", notes: "Soft landing; low-impact option." },
          { name: "Mountain Climbers", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
          { name: "Bicycle Crunch", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Don't rush." },
          { name: "Russian Twists", sets: 3, reps: "20", rest: "30 sec", tempo: "Controlled", notes: "Rotate smoothly." },
          { name: "Flutter Kicks", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Controlled", notes: "Small kicks." },
          { name: "Side Plank", sets: 3, reps: "30 sec/side", rest: "30 sec", tempo: "Static", notes: "Brace the core." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Heel Touches", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled pace." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 2,
    dayNumber: 5,
    name: "Full Body Strength",
    focus: "Full Body",
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Full Body · progressive overload",
        exercises: [
          { name: "Sumo Squat", sets: 3, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Strong hip hinge." },
          { name: "Chest Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-0-2", notes: "Controlled lowering." },
          { name: "Pulldown Machine", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Squeeze the back." },
          { name: "Reverse Lunges", sets: 3, reps: "10/leg", rest: "60 sec", tempo: "2-0-2", notes: "Stable front leg." },
          { name: "Hammer Curl", sets: 3, reps: "12", rest: "45 sec", tempo: "2-0-2", notes: "No swinging." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jump Squats", sets: 3, reps: "20 sec", rest: "40 sec", tempo: "Explosive", notes: "Soft landing." },
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
    focus: "Glutes & Quads",
    duration: "50–55 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Quads · progressive overload",
        exercises: [
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Increase load slightly if ready." },
          { name: "Goblet Squat", sets: 4, reps: "10", rest: "60 sec", tempo: "3-1-1", notes: "Controlled eccentric." },
          { name: "Cable Kickbacks", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-1-2", notes: "Stable torso." },
          { name: "Leg Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Controlled range." },
          { name: "Glute Abduction Machine", sets: 3, reps: "20", rest: "45 sec", tempo: "2-1-2", notes: "Pause at peak." },
          { name: "Bodyweight Squat Pulses", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Keep tension." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Sumo Squat", sets: 2, reps: "12", rest: "30 sec", tempo: "Controlled", notes: "Short controlled sets." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 2,
    name: "Upper Body Sculpt",
    focus: "Back, Chest, Shoulders & Arms",
    duration: "45–50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Back, Chest, Shoulders & Arms · progressive overload",
        exercises: [
          { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Controlled return." },
          { name: "Dumbbell Chest Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-0-2", notes: "Stable shoulders." },
          { name: "Lateral Raises", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "No swinging." },
          { name: "Front Raises", sets: 3, reps: "12", rest: "45 sec", tempo: "2-1-2", notes: "Comfortable range." },
          { name: "Bicep Curl", sets: 3, reps: "12", rest: "45 sec", tempo: "2-0-2", notes: "Slow lowering." },
          { name: "Push-ups", sets: 3, reps: "AMRAP", rest: "45 sec", tempo: "Controlled", notes: "Modify as needed." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Hammer Curl", sets: 2, reps: "15", rest: "30 sec", tempo: "2-0-2", notes: "Controlled burnout." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 3,
    name: "Hamstrings & Glutes",
    focus: "Hamstrings & Glutes",
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Hamstrings & Glutes · progressive overload",
        exercises: [
          { name: "Dumbbell Romanian Deadlift", sets: 4, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Keep dumbbells close." },
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "10", rest: "60 sec", tempo: "3-1-1", notes: "Pause at top." },
          { name: "Hamstring Curl", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Controlled." },
          { name: "Walking Lunges", sets: 3, reps: "10/leg", rest: "60 sec", tempo: "2-0-2", notes: "Controlled stride." },
          { name: "Cable Kickbacks", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-1-2", notes: "Stable torso." },
          { name: "Glute Abduction Machine", sets: 3, reps: "20", rest: "45 sec", tempo: "2-1-2", notes: "No bouncing." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Bodyweight Squat Pulses", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Stay in tension." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 4,
    name: "Core & Conditioning",
    focus: "Core & Conditioning",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Core braced." },
          { name: "Side Plank", sets: 3, reps: "35 sec/side", rest: "30 sec", tempo: "Static", notes: "Maintain alignment." },
          { name: "Bicycle Crunch", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Don't rush." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Smooth rotation." },
          { name: "Flutter Kicks", sets: 3, reps: "35 sec", rest: "30 sec", tempo: "Controlled", notes: "Small kicks." },
          { name: "Heel Touches", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Side reaches." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jump Squats", sets: 4, reps: "20 sec", rest: "40 sec", tempo: "Explosive", notes: "Soft landing or low impact." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 3,
    dayNumber: 5,
    name: "Lower Body Burn",
    focus: "Glutes, Quads & Calves",
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes, Quads & Calves · progressive overload",
        exercises: [
          { name: "Goblet Squat", sets: 3, reps: "15", rest: "60 sec", tempo: "3-1-1", notes: "Controlled." },
          { name: "Sumo Squat", sets: 3, reps: "15", rest: "60 sec", tempo: "3-1-1", notes: "Knees track with toes." },
          { name: "Reverse Lunges", sets: 3, reps: "12/leg", rest: "60 sec", tempo: "2-0-2", notes: "Controlled step back." },
          { name: "Leg Extension", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Squeeze at top." },
          { name: "Calf Raises", sets: 4, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Full comfortable range." },
          { name: "Glute Abduction Machine", sets: 3, reps: "20", rest: "45 sec", tempo: "2-1-2", notes: "Pause at peak." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Bodyweight Squat Pulses", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Final burn." },
        ],
      },
      cooldown(),
    ],
  },

  // ── WEEK 4 — Finish Strong ──────────────────────────────────────────────
  {
    weekNumber: 4,
    dayNumber: 1,
    name: "Glutes & Quads Challenge",
    focus: "Glutes & Quads",
    duration: "50–55 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Quads · progressive overload",
        exercises: [
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Challenging controlled load." },
          { name: "Sumo Squat", sets: 4, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Leg Press", sets: 4, reps: "10", rest: "75 sec", tempo: "2-1-2", notes: "Progress only with strong form." },
          { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "60 sec", tempo: "2-0-2", notes: "Stable steps." },
          { name: "Leg Extension", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Controlled." },
          { name: "Glute Abduction Machine", sets: 3, reps: "20", rest: "45 sec", tempo: "2-1-2", notes: "Constant tension." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Bodyweight Squat Pulses", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Stay low." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 4,
    dayNumber: 2,
    name: "Upper Body Challenge",
    focus: "Back, Chest, Shoulders & Arms",
    duration: "45–50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Back, Chest, Shoulders & Arms · progressive overload",
        exercises: [
          { name: "Pulldown Machine", sets: 4, reps: "10", rest: "75 sec", tempo: "2-1-2", notes: "Controlled." },
          { name: "Dumbbell Chest Press", sets: 4, reps: "10", rest: "75 sec", tempo: "2-0-2", notes: "Controlled lowering." },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "60 sec", tempo: "2-0-2", notes: "Brace core." },
          { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Full comfortable range." },
          { name: "Lateral Raises", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "No swinging." },
          { name: "Hammer Curl", sets: 3, reps: "12", rest: "45 sec", tempo: "2-0-2", notes: "Controlled." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Push-ups", sets: 2, reps: "AMRAP", rest: "45 sec", tempo: "Controlled", notes: "Stop before form breaks." },
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
    duration: "50 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Glutes & Hamstrings · progressive overload",
        exercises: [
          { name: "Dumbbell Romanian Deadlift", sets: 4, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Slow lowering." },
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Strong squeeze." },
          { name: "Reverse Lunges", sets: 3, reps: "12/leg", rest: "60 sec", tempo: "2-0-2", notes: "Controlled." },
          { name: "Hamstring Curl", sets: 3, reps: "15", rest: "45 sec", tempo: "2-1-2", notes: "Full comfortable range." },
          { name: "Cable Kickbacks", sets: 3, reps: "15/leg", rest: "45 sec", tempo: "2-1-2", notes: "Stable torso." },
          { name: "Glute Abduction Machine", sets: 3, reps: "25", rest: "45 sec", tempo: "2-1-2", notes: "Keep tension." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Sumo Squat", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled burn." },
        ],
      },
      cooldown(),
    ],
  },
  {
    weekNumber: 4,
    dayNumber: 4,
    name: "Core & Conditioning Challenge",
    focus: "Core & Conditioning",
    duration: "35–40 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Core & Conditioning · progressive overload",
        exercises: [
          { name: "Jump Squats", sets: 5, reps: "20 sec", rest: "40 sec", tempo: "Explosive", notes: "Soft landing or low-impact option." },
          { name: "Mountain Climbers", sets: 4, reps: "40 sec", rest: "30 sec", tempo: "Controlled-fast", notes: "Keep hips stable." },
          { name: "Bicycle Crunch", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Maintain control." },
          { name: "Russian Twists", sets: 3, reps: "24", rest: "30 sec", tempo: "Controlled", notes: "Rotate smoothly." },
          { name: "Side Plank", sets: 3, reps: "40 sec/side", rest: "30 sec", tempo: "Static", notes: "Strong brace." },
          { name: "Flutter Kicks", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Controlled", notes: "Small kicks." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Heel Touches", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Controlled pace." },
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
    duration: "55–60 min",
    sections: [
      warmup(),
      {
        type: "main",
        label: "Main",
        subtitle: "Full Body · progressive overload",
        exercises: [
          { name: "Dumbbell Hip Thrust", sets: 4, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Strong controlled reps." },
          { name: "Goblet Squat", sets: 3, reps: "12", rest: "60 sec", tempo: "3-1-1", notes: "Controlled depth." },
          { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "75 sec", tempo: "3-1-1", notes: "Strong hip hinge." },
          { name: "Dumbbell Chest Press", sets: 3, reps: "12", rest: "60 sec", tempo: "2-0-2", notes: "Stable shoulders." },
          { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec", tempo: "2-1-2", notes: "Control the return." },
          { name: "Reverse Lunges", sets: 3, reps: "10/leg", rest: "60 sec", tempo: "2-0-2", notes: "Stay balanced." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Finisher burnout",
        exercises: [
          { name: "Jump Squats", sets: 3, reps: "30 sec", rest: "45 sec", tempo: "Explosive", notes: "Soft landing; low-impact option if needed." },
        ],
      },
      cooldown(),
    ],
  },
]
