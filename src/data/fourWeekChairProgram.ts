import { WorkoutSection } from "./workoutTypes"

// Real client content — SG.FIT 4-Week Chair Program (PDF supplied by client).
// Bonus program — never purchased directly, auto-granted alongside any real
// workout-category purchase (see handleChargeSuccess in the Paystack webhook).
// Note: the client's own PDF repeats Week 1's Day 6-10 pattern verbatim across
// Weeks 2-4 (same exercises/sets/reps each week) — transcribed faithfully as given.

export interface FourWeekChairProgramDay {
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
  subtitle: "Prepare the body",
  exercises: [
    { name: "General warm-up", sets: 1, reps: "5 min", rest: "—", tempo: "Easy", notes: "Prepare the body." },
  ],
})

const cooldown = (): WorkoutSection => ({
  type: "cooldown",
  label: "Cool-down",
  subtitle: "5 mins",
  exercises: [
    { name: "Gentle stretching & breathing", sets: 1, reps: "5 min", rest: "—", notes: "Bring the heart rate down gradually." },
  ],
})

const week1Day1: FourWeekChairProgramDay = {
  weekNumber: 1,
  dayNumber: 1,
  name: "Chair Lower Body Foundation",
  focus: "Lower Body",
  duration: "30–35 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Lower Body · progressive overload",
      exercises: [
        { name: "Chair Step-Ups", sets: 3, reps: "10/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Chair Front-Steps", sets: 3, reps: "30 sec", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Step-Ups – Arms Raised", sets: 3, reps: "10/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Leg Split", sets: 3, reps: "10/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Step-Ups", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
}

const week1Day2: FourWeekChairProgramDay = {
  weekNumber: 1,
  dayNumber: 2,
  name: "Chair Core & Cardio",
  focus: "Core & Conditioning",
  duration: "25–30 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Core & Conditioning · progressive overload",
      exercises: [
        { name: "Seated Knee Crunches", sets: 3, reps: "15", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Elbow Crunches", sets: 3, reps: "12/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Chair Mountain Climbers", sets: 3, reps: "30 sec", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Chair Front-Steps", sets: 3, reps: "30 sec", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Mountain Climbers", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
}

const week1Day3: FourWeekChairProgramDay = {
  weekNumber: 1,
  dayNumber: 3,
  name: "Chair Lower Body Sculpt",
  focus: "Glutes & Legs",
  duration: "30–35 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Glutes & Legs · progressive overload",
      exercises: [
        { name: "Chair Step-Ups", sets: 3, reps: "12/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Step-Ups – Arms Sideways", sets: 3, reps: "10/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Step-Ups – Arms to Knees", sets: 3, reps: "10/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Leg Split", sets: 3, reps: "12/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Front-Steps", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
}

const week1Day4: FourWeekChairProgramDay = {
  weekNumber: 1,
  dayNumber: 4,
  name: "Chair Upper Body & Core",
  focus: "Upper Body & Core",
  duration: "25–30 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Upper Body & Core · progressive overload",
      exercises: [
        { name: "Inclined Push-ups", sets: 3, reps: "10", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Dips", sets: 3, reps: "10", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Straight-Leg Toe Touches", sets: 3, reps: "10/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Elbow Crunches", sets: 3, reps: "12/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Mountain Side-Climbers", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
}

const week1Day5: FourWeekChairProgramDay = {
  weekNumber: 1,
  dayNumber: 5,
  name: "Chair Full Body",
  focus: "Full Body",
  duration: "30–35 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Full Body · progressive overload",
      exercises: [
        { name: "Chair Step-Ups", sets: 3, reps: "10/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Inclined Push-ups", sets: 3, reps: "10", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Knee Crunches", sets: 3, reps: "15", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Chair Mountain Climbers", sets: 3, reps: "30 sec", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Front-Steps", sets: 2, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
}

// Weeks 2, 3 and 4 repeat this exact 5-day pattern verbatim in the client's
// own PDF — same exercises/sets/reps each week, only the day/week numbers differ.
const repeatingDay1 = (): Omit<FourWeekChairProgramDay, "weekNumber" | "dayNumber"> => ({
  name: "Chair Lower Body Strength",
  focus: "Lower Body",
  duration: "35 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Lower Body · progressive overload",
      exercises: [
        { name: "Chair Step-Ups", sets: 4, reps: "12/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Step-Ups – Arms Raised", sets: 3, reps: "12/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Step-Ups – Arms to Knees", sets: 3, reps: "12/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Leg Split", sets: 3, reps: "15/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Front-Steps", sets: 2, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
})

const repeatingDay2 = (): Omit<FourWeekChairProgramDay, "weekNumber" | "dayNumber"> => ({
  name: "Chair Upper Body & Core",
  focus: "Upper Body & Core",
  duration: "30–35 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Upper Body & Core · progressive overload",
      exercises: [
        { name: "Inclined Push-ups", sets: 4, reps: "10", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Dips", sets: 3, reps: "12", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Knee Crunches", sets: 3, reps: "20", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Straight-Leg Toe Touches", sets: 3, reps: "12/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
})

const repeatingDay3 = (): Omit<FourWeekChairProgramDay, "weekNumber" | "dayNumber"> => ({
  name: "Chair Lower Body Burn",
  focus: "Lower Body",
  duration: "35–40 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Lower Body · progressive overload",
      exercises: [
        { name: "Chair Step-Ups", sets: 4, reps: "15/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Step-Ups – Arms Sideways", sets: 3, reps: "12/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Step-Ups – Arms Raised", sets: 3, reps: "12/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Leg Split", sets: 3, reps: "15/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Front-Steps", sets: 3, reps: "40 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
})

const repeatingDay4 = (): Omit<FourWeekChairProgramDay, "weekNumber" | "dayNumber"> => ({
  name: "Chair Core & Conditioning",
  focus: "Core & Conditioning",
  duration: "30 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Core & Conditioning · progressive overload",
      exercises: [
        { name: "Seated Elbow Crunches", sets: 3, reps: "15/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Knee Crunches", sets: 3, reps: "20", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Chair Mountain Side-Climbers", sets: 4, reps: "30 sec", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Chair Mountain Climbers", sets: 4, reps: "30 sec", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Straight-Leg Toe Touches", sets: 3, reps: "12/side", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Mountain Side-Climbers", sets: 2, reps: "30 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
})

const repeatingDay5 = (): Omit<FourWeekChairProgramDay, "weekNumber" | "dayNumber"> => ({
  name: "Chair Full Body Challenge",
  focus: "Full Body",
  duration: "35–40 min",
  sections: [
    warmup(),
    {
      type: "main",
      label: "Main",
      subtitle: "Full Body · progressive overload",
      exercises: [
        { name: "Chair Step-Ups", sets: 4, reps: "15/leg", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Inclined Push-ups", sets: 4, reps: "12", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Dips", sets: 3, reps: "12", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Seated Knee Crunches", sets: 3, reps: "20", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
        { name: "Chair Mountain Climbers", sets: 4, reps: "40 sec", rest: "30–60 sec", tempo: "Controlled", notes: "Focus on form." },
      ],
    },
    {
      type: "finisher",
      label: "Finisher",
      subtitle: "Finisher burnout",
      exercises: [
        { name: "Chair Front-Steps", sets: 3, reps: "45 sec", rest: "30 sec", tempo: "Continuous", notes: "Finish at a sustainable pace." },
      ],
    },
    cooldown(),
  ],
})

export const fourWeekChairProgramDays: FourWeekChairProgramDay[] = [
  week1Day1,
  week1Day2,
  week1Day3,
  week1Day4,
  week1Day5,
  ...[2, 3, 4].flatMap((weekNumber) => [
    { weekNumber, dayNumber: 1, ...repeatingDay1() },
    { weekNumber, dayNumber: 2, ...repeatingDay2() },
    { weekNumber, dayNumber: 3, ...repeatingDay3() },
    { weekNumber, dayNumber: 4, ...repeatingDay4() },
    { weekNumber, dayNumber: 5, ...repeatingDay5() },
  ]),
]
