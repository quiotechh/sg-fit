"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  addCommentSchema,
  createPostSchema,
  deleteCommentSchema,
  toggleLikeSchema,
} from "../validation/community";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { publishNotification } from "@/lib/NotificationBus";
import { hasActiveCommunitySubscription } from "@/lib/data/subscriptions";
import {
  getComments as getCommentsData,
  getNotifications,
  getUnreadNotificationCount,
} from "@/lib/data/community";

export async function createPost(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  if (!(await hasActiveCommunitySubscription(session.user.id))) redirect("/community/checkout");

  const parsed = createPostSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { path, ...post } = parsed.data;
  await prisma.post.create({ data: { userId: session.user.id, ...post } });
  revalidatePath(path);
}

export async function deletePost(postId: string, path: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  if (!(await hasActiveCommunitySubscription(session.user.id))) redirect("/community/checkout");

  // deleteMany, not delete — scoped to userId so you can only delete your own post,
  // no separate ownership check query needed
  await prisma.post.deleteMany({
    where: { id: postId, userId: session.user.id },
  });
  revalidatePath(path);
}

export async function toggleLike(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  if (!(await hasActiveCommunitySubscription(session.user.id))) redirect("/community/checkout");

  const parsed = toggleLikeSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { postId, path } = parsed.data;
  const userId = session.user.id;

  const existing = await prisma.like.findUnique({
    where: { postId_userId: { postId, userId } },
  });
  if (existing) {
    await prisma.$transaction([
      prisma.like.delete({ where: { id: existing.id } }),
      prisma.post.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } },
      }),
    ]);
  } else {
    const post = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
    const shouldNotify = post.userId !== userId;

    const results = await prisma.$transaction([
      prisma.like.create({ data: { postId, userId } }),
      prisma.post.update({
        where: { id: postId },
        data: { likeCount: { increment: 1 } },
      }),
      ...(shouldNotify // use spread operator to decide whether this prisma transcation run or not. Because transactions have no skip mechanism, if we run without spread op then it can give error
        ? [
            prisma.notification.create({
              data: {
                recipientId: post.userId,
                actorId: userId,
                type: "LIKE",
                postId,
              },
            }),
          ]
        : []),
    ]); // results will return array

    if (shouldNotify) {
      const notification = results[2];
      publishNotification(post.userId, {
        id: notification.id,
        type: "LIKE",
        actorId: userId,
        postId,
        createdAt: notification.createdAt,
      });
    }
  }

  revalidatePath(path);
}

export async function addComment(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  if (!(await hasActiveCommunitySubscription(session.user.id))) redirect("/community/checkout");

  const parsed = addCommentSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { postId, body, path } = parsed.data;
  const userId = session.user.id;

  const post = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
  const shouldNotify = post.userId !== userId;

  const results = await prisma.$transaction([
    prisma.comment.create({ data: { postId, userId, body } }),
    prisma.post.update({
      where: { id: postId },
      data: { commentCount: { increment: 1 } },
    }),
    ...(shouldNotify
      ? [
          prisma.notification.create({
            data: {
              recipientId: post.userId,
              actorId: userId,
              type: "COMMENT",
              postId,
            },
          }),
        ]
      : []),
  ]);

  if (shouldNotify) {
    const notification = results[2];
    publishNotification(post.userId, {
      id: notification.id,
      type: "COMMENT",
      actorId: userId,
      postId,
      createdAt: notification.createdAt,
    });
  }

  revalidatePath(path);
}

export async function deleteComment(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  if (!(await hasActiveCommunitySubscription(session.user.id))) redirect("/community/checkout");

  const parsed = deleteCommentSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { commentId, postId, path } = parsed.data;
  const userId = session.user.id;

  await prisma.$transaction(async (tx) => {
    const { count } = await tx.comment.deleteMany({
      where: { id: commentId, userId },
    });

    if (count > 0) {
      await tx.post.update({
        where: { id: postId },
        data: { commentCount: { decrement: 1 } },
      });
    }
  });

  revalidatePath(path);
}

export async function markNotificationsRead(path: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  await prisma.notification.updateMany({
    where: { recipientId: session.user.id, read: false },
    data: { read: true },
  });
  revalidatePath(path);
}

// Read-only — called from the client on each SSE push so only notification
// state refetches, instead of router.refresh() re-running the whole page
// (feed + profile posts included) for a change that's notifications-only.
export async function getNotificationsData() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const [notifications, unreadCount] = await Promise.all([
    getNotifications({ userId: session.user.id }),
    getUnreadNotificationCount(session.user.id),
  ]);

  return { notifications, unreadCount };
}

// Read-only bridge — CommentsModal is a Client Component and can't call the
// plain (non "use server") getComments from data/community.ts directly.
export async function getComments(postId: string, cursor?: string) {
  return getCommentsData({ postId, cursor });
}
