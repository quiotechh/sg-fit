import { prisma } from "@/lib/prisma";
import { deleteObject } from "@/lib/r2";
import { logEvent } from "@/lib/auditLog";
import { disableSubscription } from "@/lib/paystack";

// Only ever called from src/app/api/cron/purge-deleted-accounts (a secret-protected
// route). Deliberately kept out of src/lib/actions/ — anything exported from a
// "use server" file becomes a client-invokable Server Action, and this function
// has no session check of its own (the cron route's secret is the auth).
export async function purgeUserData(userId: string) {
  const [bodyMetrics, posts] = await Promise.all([
    prisma.bodyMetric.findMany({ where: { userId, photoKey: { not: null } }, select: { photoKey: true } }),
    prisma.post.findMany({ where: { userId, imageKey: { not: null } }, select: { imageKey: true } }),
  ]);
  await Promise.all([
    ...bodyMetrics.map((m) =>
      deleteObject(m.photoKey!).catch((err) => console.error("R2 cleanup failed:", m.photoKey, err)),
    ),
    ...posts.map((p) =>
      deleteObject(p.imageKey!).catch((err) => console.error("R2 cleanup failed:", p.imageKey, err)),
    ),
  ]);

  const [ownComments, ownLikes] = await Promise.all([
    prisma.comment.findMany({ where: { userId }, select: { postId: true } }),
    prisma.like.findMany({ where: { userId }, select: { postId: true } }),
  ]);
  await Promise.all([
    ...ownComments.map((c) =>
      prisma.post
        .update({ where: { id: c.postId }, data: { commentCount: { decrement: 1 } } })
        .catch((err) => console.error("Failed to decrement commentCount:", c.postId, err)),
    ),
    ...ownLikes.map((l) =>
      prisma.post
        .update({ where: { id: l.postId }, data: { likeCount: { decrement: 1 } } })
        .catch((err) => console.error("Failed to decrement likeCount:", l.postId, err)),
    ),
  ]);

  // Safety net — requestAccountDeletion tries to cancel on Paystack too, but
  // skips it if the subscription.create webhook hadn't synced subscriptionCode/
  // emailToken yet (or if that attempt failed). By now, 30 days later, the webhook
  // has long since landed, so this is our last chance to cancel before the local
  // Subscription record (and the ability to look up subscriptionCode) disappears
  // for good — otherwise Paystack keeps billing a card tied to a deleted account.
  const activeSubs = await prisma.subscription.findMany({
    where: { userId, subscriptionCode: { not: null }, emailToken: { not: null } },
  });
  await Promise.all(
    activeSubs
      .filter((s) => s.currentPeriodEnd && s.currentPeriodEnd > new Date())
      .map((s) =>
        disableSubscription(s.subscriptionCode!, s.emailToken!).catch((err) =>
          console.error("Failed to cancel subscription during purge:", s.id, err),
        ),
      ),
  );

  await prisma.$transaction([
    prisma.post.deleteMany({ where: { userId } }),
    prisma.comment.deleteMany({ where: { userId } }),
    prisma.like.deleteMany({ where: { userId } }),
    prisma.bodyMetric.deleteMany({ where: { userId } }),
    prisma.notification.deleteMany({ where: { OR: [{ recipientId: userId }, { actorId: userId }] } }),
    prisma.cartItem.deleteMany({ where: { userId } }),
    prisma.subscription.deleteMany({ where: { userId } }),
    prisma.session.deleteMany({ where: { userId } }),
    // Login credentials removed for good only now — this is the point of no return.
    prisma.account.deleteMany({ where: { userId } }),
  ]);

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: "Deleted User",
      email: `deleted-${userId}@sgfit.deleted`,
      image: null,
      emailVerified: false,
      deletionRequestedAt: null,
    },
  });

  await logEvent({
    userId,
    event: "account.deletion_purged",
    success: true,
    metadata: { message: `Account ${userId} permanently purged after 30-day grace period.` },
  });
}
