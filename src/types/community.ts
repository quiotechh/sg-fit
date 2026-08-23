import type {
  getFeed,
  getUserPosts,
  getComments,
  getNotifications,
} from "@/lib/data/community";

export type FeedPost = Awaited<ReturnType<typeof getFeed>>["posts"][number];
export type ProfilePost = Awaited<ReturnType<typeof getUserPosts>>[number];
export type PostComment = Awaited<
  ReturnType<typeof getComments>
>["comments"][number];
export type AppNotification = Awaited<
  ReturnType<typeof getNotifications>
>["notifications"][number];

export type View = "home" | "notifications" | "profile";
