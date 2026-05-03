export interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  tempo?: string
  notes?: string
}

export type SectionType = "warmup" | "main" | "finisher" | "cooldown"

export interface WorkoutSection {
  type: SectionType
  label: string
  subtitle: string
  exercises: Exercise[]
}

export interface DayPlan {
  weekTips: string[]
  sections: WorkoutSection[]
}

// Key: `${slug}-d${dayNum}` e.g. "6-week-shred-d1"
// weekTips[weekIndex] maps 1:1 with week number (0-indexed)
export const dayPlans: Record<string, DayPlan> = {

  // ── 6-WEEK SHRED ──────────────────────────────────────────────────────────

  "6-week-shred-d1": {
    weekTips: [
      "Focus on form and mind-muscle connection. Control every rep — no rushing.",
      "Same exercises, tighten the form. Your second week should feel more dialled in.",
      "Increase weight by 5% where possible. Push closer to failure on the last set.",
      "Add a drop set to the final set of each main exercise for extra intensity.",
      "Peak phase. Every set should be challenging. Leave nothing on the floor.",
      "Final push day. Max effort. Beat last week's reps or weight — even by one.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Prime your shoulders · 8 mins",
        exercises: [
          { name: "Arm circles", sets: 2, reps: "30 sec", rest: "10s", tempo: "steady", notes: "Forward then backward." },
          { name: "Band pull-aparts", sets: 2, reps: "15 reps", rest: "15s", tempo: "controlled" },
          { name: "Shoulder rolls", sets: 1, reps: "30 sec", rest: "0s" },
          { name: "Lateral raises (light)", sets: 2, reps: "12 reps", rest: "20s", tempo: "controlled", notes: "Warm-up weight only." },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "Progressive overload · push focus",
        exercises: [
          { name: "Bench press / Push-ups", sets: 3, reps: "10–12", rest: "60–90s", tempo: "2-1-2", notes: "RPE 7. Stop 2 reps before failure." },
          { name: "Overhead press", sets: 3, reps: "10–12", rest: "60–90s", tempo: "2-1-2", notes: "Neutral spine. Slow reps." },
          { name: "Incline DB press", sets: 3, reps: "10–12", rest: "60s", tempo: "2-1-2" },
          { name: "Lateral raises", sets: 3, reps: "12–15", rest: "45s", tempo: "controlled", notes: "Light weight, strict form." },
          { name: "Tricep pushdown", sets: 3, reps: "12–15", rest: "45s", tempo: "controlled", notes: "Elbows fixed. Full extension." },
          { name: "Skull crushers", sets: 2, reps: "10–12", rest: "60s", tempo: "2-1-2", notes: "Control the descent." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Chest burnout",
        exercises: [
          { name: "Push-up burnout", sets: 1, reps: "Max reps", rest: "0s", notes: "Go until failure. No pausing." },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Release chest & shoulders · 5 mins",
        exercises: [
          { name: "Doorway chest stretch", sets: 1, reps: "45 sec", rest: "0s", notes: "Both sides." },
          { name: "Tricep overhead stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Cross-body shoulder stretch", sets: 1, reps: "30 sec each", rest: "0s" },
        ],
      },
    ],
  },

  "6-week-shred-d2": {
    weekTips: [
      "Initiate every pull with your lats, not your arms. Think 'elbows to pockets'.",
      "Week 2 — keep strict form. No momentum. Every rep should be felt in the back.",
      "Add weight where form allows. Squeeze hard at the peak contraction.",
      "Superset the last set of rows with a pull-apart for maximum back pump.",
      "Peak phase — add a drop set to the last set of each main exercise.",
      "Final pull day. Beat your week 5 reps or weight. Finish strong.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Activate your back · 7 mins",
        exercises: [
          { name: "Cat-cow", sets: 2, reps: "10 reps", rest: "10s", notes: "Slow and deliberate." },
          { name: "Scapular retractions", sets: 2, reps: "15 reps", rest: "15s", tempo: "controlled" },
          { name: "Face pulls (band)", sets: 2, reps: "15 reps", rest: "20s" },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "Progressive overload · pull focus",
        exercises: [
          { name: "Lat pulldown / Pull-ups", sets: 3, reps: "10–12", rest: "60–90s", tempo: "2-1-2", notes: "Chest up. Squeeze lats at the bottom." },
          { name: "Seated cable row", sets: 3, reps: "10–12", rest: "60–90s", tempo: "2-1-2" },
          { name: "Single-arm DB row", sets: 3, reps: "10–12 each", rest: "60s", tempo: "2-1-2", notes: "Drive elbow back, not up." },
          { name: "Chest-supported row", sets: 2, reps: "12–15", rest: "45s", tempo: "controlled" },
          { name: "Bicep curls", sets: 3, reps: "12–15", rest: "45s", tempo: "2-1-2", notes: "No swinging. Control the negative." },
          { name: "Hammer curls", sets: 2, reps: "12–15", rest: "45s", tempo: "controlled" },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Isometric hold burnout",
        exercises: [
          { name: "Isometric chin-up hold", sets: 3, reps: "20 sec hold", rest: "15s", notes: "Hold at the top. Squeeze lats hard." },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Release back & biceps · 5 mins",
        exercises: [
          { name: "Overhead lat stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Bicep wall stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Child's pose", sets: 1, reps: "45 sec", rest: "0s" },
        ],
      },
    ],
  },

  "6-week-shred-d3": {
    weekTips: [
      "Drive through your heels on all pressing movements. Squeeze glutes hard at the top.",
      "Week 2 — add a 1-second pause at the bottom of every squat.",
      "Increase squat and RDL weight. Push for progressive overload.",
      "Add a 2-sec pause at the bottom of squats. This builds serious strength.",
      "Peak week. Superset hip thrusts with glute bridges. Maximum burn.",
      "Final leg day. Every set to near-failure. Leave nothing.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Activate glutes · 8 mins",
        exercises: [
          { name: "Glute bridges", sets: 2, reps: "15 reps", rest: "15s", notes: "Squeeze hard at the top." },
          { name: "Clamshells (band)", sets: 2, reps: "15 each", rest: "15s" },
          { name: "Hip circles", sets: 1, reps: "10 each direction", rest: "10s" },
          { name: "Bodyweight squats", sets: 2, reps: "12 reps", rest: "20s", tempo: "controlled" },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "Progressive overload · glute & leg focus",
        exercises: [
          { name: "Barbell squat / Goblet squat", sets: 4, reps: "10–12", rest: "90s", tempo: "2-1-2", notes: "Chest tall. Knees track over toes." },
          { name: "Romanian deadlift (RDL)", sets: 3, reps: "10–12", rest: "60–90s", tempo: "3-1-1", notes: "Hinge at hips. Slight knee bend." },
          { name: "Hip thrust", sets: 4, reps: "12–15", rest: "60s", tempo: "2-2-1", notes: "Full hip extension. Squeeze at top." },
          { name: "Walking lunges", sets: 3, reps: "12 each leg", rest: "60s", tempo: "controlled" },
          { name: "Leg curl (machine)", sets: 3, reps: "12–15", rest: "45s", tempo: "2-1-2" },
          { name: "Lateral band walks", sets: 2, reps: "15 each", rest: "30s", notes: "Keep tension in the band." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Glute burnout",
        exercises: [
          { name: "Glute bridge burnout", sets: 1, reps: "Max reps", rest: "0s", notes: "Hold the last rep for 10 seconds." },
          { name: "Squat pulse", sets: 1, reps: "30 reps", rest: "0s" },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Release hips & hamstrings · 5 mins",
        exercises: [
          { name: "Hip flexor lunge stretch", sets: 1, reps: "45 sec each", rest: "0s" },
          { name: "Hamstring forward fold", sets: 1, reps: "30 sec", rest: "0s" },
          { name: "Seated glute stretch", sets: 1, reps: "30 sec each", rest: "0s" },
        ],
      },
    ],
  },

  "6-week-shred-d4": {
    weekTips: [
      "Keep rest periods strict. Heart rate should stay elevated throughout.",
      "Week 2 — reduce rest by 5 seconds on each interval.",
      "Add one extra round to the main circuit this week.",
      "Push pace on the sprints. Go as hard as you can for the full 20 seconds.",
      "Peak phase — minimal rest. Every round at max effort.",
      "Final HIIT session. 100% effort. Finish this program the way you started it.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Elevate heart rate · 5 mins",
        exercises: [
          { name: "Jumping jacks", sets: 1, reps: "60 sec", rest: "15s" },
          { name: "High knees", sets: 1, reps: "30 sec", rest: "10s" },
          { name: "Dynamic hip circles", sets: 1, reps: "30 sec", rest: "10s" },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "HIIT circuit · 3 rounds",
        exercises: [
          { name: "Burpees", sets: 3, reps: "10 reps", rest: "30s", tempo: "explosive", notes: "Full range. Jump and clap at the top." },
          { name: "Jump squats", sets: 3, reps: "15 reps", rest: "20s", tempo: "explosive" },
          { name: "Mountain climbers", sets: 3, reps: "30 sec", rest: "20s", tempo: "fast" },
          { name: "Box jumps / Step-ups", sets: 3, reps: "10 reps", rest: "30s", tempo: "explosive" },
          { name: "Sprint (treadmill / outdoor)", sets: 3, reps: "20 sec", rest: "40s", notes: "100% effort. Nothing held back." },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Core circuit",
        exercises: [
          { name: "Plank", sets: 3, reps: "30 sec hold", rest: "15s", notes: "Hips level. Core braced." },
          { name: "Bicycle crunches", sets: 2, reps: "20 reps", rest: "15s" },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Full body recovery · 5 mins",
        exercises: [
          { name: "Standing quad stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Hip flexor lunge stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Seated forward fold", sets: 1, reps: "45 sec", rest: "0s" },
        ],
      },
    ],
  },

  // ── HIIT IGNITE ───────────────────────────────────────────────────────────

  "hiit-ignite-d1": {
    weekTips: [
      "Prioritise form over speed. Build the foundation right from day one.",
      "Week 2 — increase reps by 2 on each exercise where possible.",
      "Reduce rest by 5 seconds. Push harder on every set.",
      "Final week. Maximum effort every round. Finish stronger than you started.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Prime shoulders · 5 mins",
        exercises: [
          { name: "Arm circles", sets: 1, reps: "30 sec", rest: "10s", notes: "Forward then backward." },
          { name: "Shoulder rolls", sets: 1, reps: "30 sec", rest: "10s" },
          { name: "Chest opener stretch", sets: 1, reps: "20 sec", rest: "0s" },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "Upper body HIIT · 3 rounds",
        exercises: [
          { name: "Push-up variations", sets: 3, reps: "15 reps", rest: "25s", tempo: "explosive", notes: "Wide, narrow, standard — rotate each round." },
          { name: "Tricep dips (chair)", sets: 3, reps: "12 reps", rest: "20s" },
          { name: "DB shoulder press", sets: 3, reps: "12 reps", rest: "30s", tempo: "controlled" },
          { name: "Renegade rows", sets: 3, reps: "10 each", rest: "30s" },
          { name: "Bicep curl to press", sets: 3, reps: "12 reps", rest: "25s" },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Chest burnout",
        exercises: [
          { name: "Push-up burnout", sets: 1, reps: "Max reps", rest: "0s", notes: "Go until complete failure." },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Release upper body · 4 mins",
        exercises: [
          { name: "Chest doorway stretch", sets: 1, reps: "30 sec", rest: "0s" },
          { name: "Tricep overhead stretch", sets: 1, reps: "30 sec each", rest: "0s" },
        ],
      },
    ],
  },

  "hiit-ignite-d2": {
    weekTips: [
      "Land softly on all jump movements. Protect your joints — power comes from control.",
      "Week 2 — add 2 reps to every jump movement.",
      "Add explosive power on landings — absorb and immediately jump again.",
      "Final lower body session. Every jump at 100%. Finish this program strong.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Activate lower body · 5 mins",
        exercises: [
          { name: "Bodyweight squats", sets: 2, reps: "10 reps", rest: "15s" },
          { name: "Leg swings", sets: 1, reps: "10 each", rest: "10s" },
          { name: "Hip circles", sets: 1, reps: "10 each direction", rest: "10s" },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "Lower body HIIT · 3 rounds",
        exercises: [
          { name: "Jump squats", sets: 3, reps: "15 reps", rest: "25s", tempo: "explosive" },
          { name: "Reverse lunges", sets: 3, reps: "12 each", rest: "30s", tempo: "controlled" },
          { name: "Sumo squat pulses", sets: 3, reps: "20 reps", rest: "20s" },
          { name: "Glute bridges", sets: 3, reps: "15 reps", rest: "20s", tempo: "2-2-1", notes: "Squeeze hard at the top." },
          { name: "Lateral bounds", sets: 3, reps: "10 each", rest: "25s", tempo: "explosive" },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Leg burnout",
        exercises: [
          { name: "Wall sit", sets: 3, reps: "30 sec hold", rest: "15s", notes: "Thighs parallel to floor." },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Release legs & hips · 4 mins",
        exercises: [
          { name: "Standing quad stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Hamstring forward fold", sets: 1, reps: "45 sec", rest: "0s" },
        ],
      },
    ],
  },

  "hiit-ignite-d3": {
    weekTips: [
      "Breathe out on the exertion phase. Engage your core on every single rep.",
      "Week 2 — increase plank hold by 10 seconds.",
      "Reduce rest by 5s. Increase duration of holds.",
      "Final core session. Maximum effort on every hold. Make it count.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Core activation · 5 mins",
        exercises: [
          { name: "Cat-cow", sets: 1, reps: "10 reps", rest: "10s", notes: "Slow and deliberate." },
          { name: "Dead bug", sets: 2, reps: "8 each", rest: "15s" },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "Core & cardio circuit · 3 rounds",
        exercises: [
          { name: "Plank hold", sets: 3, reps: "40 sec", rest: "20s", notes: "Hips level. Brace your core." },
          { name: "Russian twists", sets: 3, reps: "20 reps", rest: "20s" },
          { name: "Mountain climbers", sets: 3, reps: "30 sec", rest: "20s", tempo: "fast" },
          { name: "Bicycle crunches", sets: 3, reps: "20 reps", rest: "20s" },
          { name: "High knees", sets: 3, reps: "45 sec", rest: "15s", tempo: "fast" },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Abs to failure",
        exercises: [
          { name: "Plank to failure", sets: 1, reps: "Max hold", rest: "0s", notes: "Hold until form breaks. That's one rep." },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Decompress spine · 4 mins",
        exercises: [
          { name: "Child's pose", sets: 1, reps: "45 sec", rest: "0s" },
          { name: "Seated spinal twist", sets: 1, reps: "30 sec each", rest: "0s" },
        ],
      },
    ],
  },

  "hiit-ignite-d4": {
    weekTips: [
      "Pace yourself through the full circuit. Sustainable effort beats burning out at round 1.",
      "Week 2 — reduce rest between exercises by 5 seconds.",
      "Push harder. Every round should be uncomfortable.",
      "Final session of the program. 100% effort. This is your last chance to prove it.",
    ],
    sections: [
      {
        type: "warmup",
        label: "Warmup",
        subtitle: "Full body activation · 5 mins",
        exercises: [
          { name: "Jumping jacks", sets: 1, reps: "45 sec", rest: "15s" },
          { name: "Inchworm walk-outs", sets: 2, reps: "5 reps", rest: "10s" },
        ],
      },
      {
        type: "main",
        label: "Main",
        subtitle: "Total body HIIT · 3 rounds",
        exercises: [
          { name: "Burpees", sets: 3, reps: "10 reps", rest: "30s", tempo: "explosive", notes: "Full range. Jump at the top." },
          { name: "Push-up to knee tuck", sets: 3, reps: "10 reps", rest: "25s" },
          { name: "Jump squats", sets: 3, reps: "15 reps", rest: "25s", tempo: "explosive" },
          { name: "Sprint intervals", sets: 3, reps: "20 sec", rest: "40s", notes: "Max effort sprint. Nothing held back." },
          { name: "Plank jacks", sets: 3, reps: "30 sec", rest: "20s" },
        ],
      },
      {
        type: "finisher",
        label: "Finisher",
        subtitle: "Final burn",
        exercises: [
          { name: "100 jumping jacks challenge", sets: 1, reps: "100 reps", rest: "0s", notes: "Break into sets as needed. No quitting." },
        ],
      },
      {
        type: "cooldown",
        label: "Cooldown",
        subtitle: "Full body recovery · 5 mins",
        exercises: [
          { name: "Standing quad stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Hip flexor lunge stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          { name: "Chest opener stretch", sets: 1, reps: "30 sec", rest: "0s" },
        ],
      },
    ],
  },
}
