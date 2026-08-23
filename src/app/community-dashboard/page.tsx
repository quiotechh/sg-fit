import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import CommunityDashboardClient from "./CommunityDashboardClient";
import {
  getFeed,
  getNotifications,
  getUnreadNotificationCount,
  getUserPosts,
} from "@/lib/data/community";

export default async function CommunityDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const userId = session.user.id;

  const [feed, notifications, unreadCount, userPosts] = await Promise.all([
    getFeed({ userId }),
    getNotifications({ userId }),
    getUnreadNotificationCount(userId),
    getUserPosts(userId),
  ]);

  return (
    <CommunityDashboardClient
      currentUser={{
        id: session.user.id,
        name: session.user.name,
        image: session.user.image ?? null,
      }}
      initialFeed={feed}
      initialNotifications={notifications}
      initialUnreadCount={unreadCount}
      initialUserPosts={userPosts}
    />
  );
}
