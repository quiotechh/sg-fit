import { prisma } from "@/lib/prisma";
import { getPurchasedProgram } from "@/lib/data/purchases";

export function getDayTemplate(
  programId: string,
  weekNumber: number,
  dayNumber: number,
) {
  return prisma.dayTemplate.findUnique({
    where: {
      programId_weekNumber_dayNumber: { programId, weekNumber, dayNumber },
    },
  });
}

export async function getPurchasedDayTemplate(
  userId: string,
  category: string,
  slug: string,
  weekNumber: number,
  dayNumber: number,
) {
  const program = await getPurchasedProgram(userId, category, slug);
  if (!program) return null;

  const dayTemplate = await getDayTemplate(program.id, weekNumber, dayNumber);
  if (!dayTemplate) return null;

  return { program, dayTemplate };
}

export function getWeekDays(programId: string, weekNumber: number) {
  return prisma.dayTemplate.findMany({
    where: { programId, weekNumber },
    orderBy: { dayNumber: "asc" },
  });
}

export async function getProgramWeeksGrouped(programId: string) {
  const templates = await prisma.dayTemplate.findMany({
    where: { programId },
    orderBy: [{ weekNumber: "asc" }, { dayNumber: "asc" }],
  });

  const weeksMap = new Map<number, typeof templates>();
  for (const t of templates) {
    if (!weeksMap.has(t.weekNumber)) weeksMap.set(t.weekNumber, []);
    weeksMap.get(t.weekNumber)!.push(t);
  }

  return Array.from(weeksMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([weekNumber, days]) => ({ weekNumber, days }));
}
