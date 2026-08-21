import { prisma } from "@/lib/prisma";
import { getProgramBySlug } from "@/lib/data/programs";

// Also used by dashboard
export async function getUserPurchasePrograms(
  userId: string,
  category: string,
) {
  const purchases = await prisma.purchase.findMany({
    where: { userId, program: { category } },
    include: { program: true },
    orderBy: { purchasedAt: "desc" },
  });
  return purchases.map((p) => p.program);
}

export function getPurchase(userId: string, programId: string) {
  return prisma.purchase.findUnique({
    where: { userId_programId: { userId, programId } },
    select: { id: true },
  });
}

export async function getPurchasedProgram(
  userId: string,
  category: string,
  slug: string,
) {
  const program = await getProgramBySlug(category, slug);
  if (!program) return null;

  const purchase = await getPurchase(userId, program.id);
  if (!purchase) return null;

  return { ...program, purchaseId: purchase.id };
}
