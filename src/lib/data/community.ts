import { prisma } from "@/lib/prisma";

const AUTHOR_SELECT = {
  id: true,
  name: true,
  image: true,
} as const;

export async function getFeed({
  userId,
  cursor,
  take = 10,
}: {
  userId: string;
  cursor?: string;
  take?: number;
}) {
  const posts = await prisma.post.findMany({
    take: take + 1,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { createdAt: "desc" },
    include: { user: { select: AUTHOR_SELECT } },
  });

  const hasMore = posts.length > take;
  const page = hasMore ? posts.slice(0, take) : posts;

  const myLikes = await prisma.like.findMany({
    where: { userId, postId: { in: page.map((p) => p.id) } },
    select: { postId: true },
  });
  const likedPostIds = new Set(myLikes.map((l) => l.postId));

  return {
    posts: page.map((post) => ({
      ...post,
      likedByMe: likedPostIds.has(post.id),
    })),
    nextCursor: hasMore ? page[page.length - 1].id : null,
  };
}

export function getUserPosts(userId: string) {
  return prisma.post.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { user: { select: AUTHOR_SELECT } },
  });
}

export async function getComments({
  postId,
  cursor,
  take = 20,
}: {
  postId: string;
  cursor?: string;
  take?: number;
}) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    take: take + 1,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { createdAt: "asc" },
    include: { user: { select: AUTHOR_SELECT } },
  });

  const hasMore = comments.length > take;
  const page = hasMore ? comments.slice(0, take) : comments;

  return {
    comments: page,
    nextCursor: hasMore ? page[page.length - 1].id : null,
  };
}

const NOTIFICATION_RETENTION_DAYS = 60;

function notificationRetentionCutoff() {
  return new Date(
    Date.now() - NOTIFICATION_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  );
}

export async function getNotifications({
  userId,
  cursor,
  take = 20,
}: {
  userId: string;
  cursor?: string;
  take?: number;
}) {
  const cutoff = notificationRetentionCutoff();

  // Lazy cleanup — piggybacks on the one moment a user actually opens their
  // notifications, instead of running a separate cron job we don't have infra for yet.
  await prisma.notification.deleteMany({
    where: { recipientId: userId, createdAt: { lt: cutoff } },
  });

  const notifications = await prisma.notification.findMany({
    where: { recipientId: userId },
    take: take + 1,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { createdAt: "desc" },
    include: { actor: { select: AUTHOR_SELECT } },
  });

  const hasMore = notifications.length > take;
  const page = hasMore ? notifications.slice(0, take) : notifications;

  return {
    notifications: page,
    nextCursor: hasMore ? page[page.length - 1].id : null,
  };
}

export function getUnreadNotificationCount(userId: string) {
  return prisma.notification.count({
    where: {
      recipientId: userId,
      read: false,
      createdAt: { gte: notificationRetentionCutoff() },
    },
  });
}
