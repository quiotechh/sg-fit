import { prisma } from "@/lib/prisma";

export function getProgramsByCategory(category: string) {
  return prisma.program.findMany({ where: { category } });
}

export function getProgramBySlug(category: string, slug: string) {
  return prisma.program.findFirst({ where: { category, slug } });
}

export function getAllProgramSlugs() {
  return prisma.program.findMany({ select: { category: true, slug: true } });
}
