import { prisma } from "@/lib/prisma"

const COMMUNITY_PLAN_CODE = process.env.PAYSTACK_COMMUNITY_PLAN_CODE!

// Access is governed purely by currentPeriodEnd, not by `status` — status is
// informational (why access will end: cancelled, payment failed, etc.), but
// every row's currentPeriodEnd only ever comes from a real successful charge,
// so as long as that date hasn't passed, the member paid for this access.
export async function hasActiveCommunitySubscription(userId: string) {
  const sub = await prisma.subscription.findFirst({
    where: {
      userId,
      planCode: COMMUNITY_PLAN_CODE,
      currentPeriodEnd: { gte: new Date() },
    },
    select: { id: true },
  })
  return !!sub
}

export function getUserCommunitySubscription(userId: string) {
  return prisma.subscription.findUnique({
    where: { userId_planCode: { userId, planCode: COMMUNITY_PLAN_CODE } },
  })
}
