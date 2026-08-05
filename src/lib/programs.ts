import { prisma } from "@/lib/prisma"

export function getProgramsByCategory(category: string) {
  return prisma.program.findMany({ where: { category } })
}

export function getProgramBySlug(category: string, slug: string) {
  return prisma.program.findFirst({ where: { category, slug } })
}

export function getAllProgramSlugs() {
  return prisma.program.findMany({ select: { category: true, slug: true } })
}

export function getDayTemplate(programId: string, weekNumber: number, dayNumber: number) {
  return prisma.dayTemplate.findUnique({
    where: { programId_weekNumber_dayNumber: { programId, weekNumber, dayNumber } },
  })
}

export function getWeekDays(programId: string, weekNumber: number) {
  return prisma.dayTemplate.findMany({
    where: { programId, weekNumber },
    orderBy: { dayNumber: "asc" },
  })
}

export async function getProgramWeeksGrouped(programId: string) {
  const templates = await prisma.dayTemplate.findMany({
    where: { programId },
    orderBy: [{ weekNumber: "asc" }, { dayNumber: "asc" }],
  })

  const weeksMap = new Map<number, typeof templates>()
  for (const t of templates) {
    if (!weeksMap.has(t.weekNumber)) weeksMap.set(t.weekNumber, [])
    weeksMap.get(t.weekNumber)!.push(t)
  }

  return Array.from(weeksMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([weekNumber, days]) => ({ weekNumber, days }))
}
