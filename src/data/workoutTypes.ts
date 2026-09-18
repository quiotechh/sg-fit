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
