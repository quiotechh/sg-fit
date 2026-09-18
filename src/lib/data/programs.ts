import { prisma } from "@/lib/prisma";

// Bonus programs (e.g. the Chair Program) aren't independently browsable or
// purchasable — they're only ever reached via the free-grant on a real
// purchase, so every public listing excludes them.
export function getProgramsByCategory(category: string) {
  return prisma.program.findMany({ where: { category, isBonus: false } });
}

export function getProgramBySlug(category: string, slug: string) {
  return prisma.program.findFirst({ where: { category, slug } });
}

// The free companion program for a category (e.g. the Chair Program for
// "workouts"), if one exists — used to advertise it on other programs' pages.
export function getBonusProgram(category: string) {
  return prisma.program.findFirst({ where: { category, isBonus: true } });
}

export function getAllProgramSlugs() {
  return prisma.program.findMany({
    where: { isBonus: false },
    select: { category: true, slug: true },
  });
}
