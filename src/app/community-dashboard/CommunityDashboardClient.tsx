"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, PlusCircle, Bell, User, ArrowLeft } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/communtiy/CommunitySidebar";
import PostCard from "@/components/communtiy/Postcard";
import CommunityAvatar from "@/components/communtiy/CommunityAvatar";
import CommentsModal from "@/components/communtiy/CommentsModal";
import CreatePostModal from "@/components/communtiy/CreatePostModal";
import NotificationsView from "@/components/communtiy/Notifications";
import ProfileView from "@/components/communtiy/ProfileView";
import {
  FeedPost,
  ProfilePost,
  AppNotification,
  View,
} from "@/types/community";
import {
  createPost,
  deletePost,
  toggleLike as toggleLikeAction,
  markNotificationsRead,
  getNotificationsData,
} from "@/lib/actions/community";

const PATH = "/community-dashboard";

type CurrentUser = { id: string; name: string; image: string | null };

type Props = {
  currentUser: CurrentUser;
  initialFeed: { posts: FeedPost[]; nextCursor: string | null };
  initialNotifications: {
    notifications: AppNotification[];
    nextCursor: string | null;
  };
  initialUnreadCount: number;
  initialUserPosts: ProfilePost[];
};

const navItemCls =
  "flex flex-col items-center gap-1 px-4 py-1.5 rounded-[12px] transition-all duration-200 [font-family:var(--font-barlow)]";

export default function CommunityDashboardClient({
  currentUser,
  initialFeed,
  initialNotifications,
  initialUnreadCount,
  initialUserPosts,
}: Props) {
  const router = useRouter();
  const [view, setView] = useState<View>("home");
  const [posts, setPosts] = useState<FeedPost[]>(initialFeed.posts);
  const [notifications, setNotifications] = useState<AppNotification[]>(
    initialNotifications.notifications,
  );
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [userPosts, setUserPosts] = useState<ProfilePost[]>(initialUserPosts);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  // page.tsx re-fetches all four together (one Promise.all) on every
  // router.refresh() — resync local state during render (not in an effect,
  // which would cause an extra visible render pass) when a fresh payload arrives.
  const [syncedFeed, setSyncedFeed] = useState(initialFeed);
  if (initialFeed !== syncedFeed) {
    setSyncedFeed(initialFeed);
    setPosts(initialFeed.posts);
    setNotifications(initialNotifications.notifications);
    setUnreadCount(initialUnreadCount);
    setUserPosts(initialUserPosts);
  }

  const hasUnread = unreadCount > 0;
  const activePost = posts.find((p) => p.id === activePostId) ?? null;

  const handleViewChange = (v: View) => {
    setView(v);
    if (v === "notifications" && unreadCount > 0) {
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      markNotificationsRead(PATH);
    }
  };

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likedByMe: !p.likedByMe,
              likeCount: p.likedByMe ? p.likeCount - 1 : p.likeCount + 1,
            }
          : p,
      ),
    );
    toggleLikeAction({ postId, path: PATH });
  };

  const handleCreatePost = async (body: string, imageKey?: string) => {
    await createPost({ body, imageKey, path: PATH });
    router.refresh();
  };

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId, PATH);
    router.refresh();
  };

  // Live notifications via SSE — the pushed payload only carries ids, so we
  // fetch just the notification data on each ping, not router.refresh()
  // (which would re-run the whole page: feed + profile posts too).
  useEffect(() => {
    const source = new EventSource("/api/community/notifications/stream");
    source.onmessage = async () => {
      const fresh = await getNotificationsData();
      setNotifications(fresh.notifications.notifications);
      setUnreadCount(fresh.unreadCount);
    };
    return () => source.close();
  }, []);

  const handleCommentCountChange = (postId: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentCount: p.commentCount + delta } : p,
      ),
    );
  };

  return (
    <>
      <SidebarProvider className="contents">
        <div className="flex min-h-screen bg-white">
          <Sidebar
            view={view}
            hasUnread={hasUnread}
            currentUser={currentUser}
            onViewChange={handleViewChange}
            onCreateClick={() => setCreateOpen(true)}
          />

          <div className="flex-1 flex flex-col lg:ml-60">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-80 flex items-center justify-between px-4.5 py-3.5 border-b border-[#eeece8] bg-white/95 backdrop-blur-lg">
              <div className="text-[18px] font-black uppercase tracking-[0.14em] [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)] bg-clip-text text-transparent">
                SG FIT
              </div>
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  title="Back to Dashboard"
                  className="size-9.5 rounded-[12px] border-[#eeece8] hover:border-[#C9953A]"
                >
                  <Link href="/dashboard">
                    <ArrowLeft className="size-4.5 text-[#6e6b63]" strokeWidth={2.2} />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleViewChange("notifications")}
                  className="relative size-9.5 rounded-[12px] border-[#eeece8] hover:border-[#C9953A]"
                >
                  <Bell className="size-4.5 text-[#6e6b63]" strokeWidth={2.2} />
                  {hasUnread && (
                    <span className="absolute top-1.5 right-1.5 w-2.25 h-2.25 rounded-full border-2 border-white bg-[#C9953A]" />
                  )}
                </Button>
              </div>
            </div>

            {/* Desktop Topbar */}
            <div className="hidden lg:flex sticky top-0 z-50 items-center justify-between px-10 h-17 border-b border-[#eeece8] bg-white/92 backdrop-blur-lg">
              <div>
                <h1 className="text-[22px] font-black uppercase tracking-tight text-[#0a0a0a] [font-family:var(--font-barlow)]">
                  Community
                </h1>
                <p className="text-[12px] text-[#9e9a90] font-medium tracking-[0.03em] mt-px [font-family:var(--font-barlow)]">
                  Connect, share progress, and support each other.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  title="Back to Dashboard"
                  className="size-10 rounded-[12px] border-[#eeece8] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[#C9953A]"
                >
                  <Link href="/dashboard">
                    <ArrowLeft className="size-4.5 text-[#6e6b63]" strokeWidth={2.2} />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleViewChange("notifications")}
                  className="relative size-10 rounded-[12px] border-[#eeece8] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[#C9953A]"
                >
                  <Bell className="size-4.5 text-[#6e6b63]" strokeWidth={2.2} />
                  {hasUnread && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-[#C9953A]" />
                  )}
                </Button>
                {/* Not clickable — just a "you're logged in as" indicator. */}
                <CommunityAvatar
                  userId={currentUser.id}
                  name={currentUser.name}
                  image={currentUser.image}
                  className="size-10"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="max-w-170 mx-auto px-4 sm:px-6 py-8 pb-28 lg:pb-12 w-full">
                {view === "home" && (
                  <>
                    <div className="flex items-center justify-between mb-4.5">
                      <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9e9a90] [font-family:var(--font-barlow)]">
                        Latest Posts
                      </span>
                    </div>
                    {posts.map((post, i) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onLike={handleToggleLike}
                        onComment={() => setActivePostId(post.id)}
                        animDelay={i * 0.07}
                      />
                    ))}
                  </>
                )}

                {view === "notifications" && (
                  <NotificationsView notifications={notifications} />
                )}

                {view === "profile" && (
                  <ProfileView
                    posts={userPosts}
                    currentUser={currentUser}
                    onDelete={handleDeletePost}
                  />
                )}
              </div>
            </div>

            {/* ── MOBILE BOTTOM NAV ── */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-100 border-t border-white/8 bg-black/96 backdrop-blur-xl pb-[calc(10px+env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-around max-w-120 mx-auto py-2.5">
                <button
                  onClick={() => handleViewChange("home")}
                  className={`${navItemCls} ${view === "home" ? "text-[#C9953A]" : "text-white/40"}`}
                >
                  <Home className="size-5.5" strokeWidth={2.2} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em]">
                    Home
                  </span>
                </button>

                <button
                  onClick={() => setCreateOpen(true)}
                  className={`${navItemCls} text-white/40`}
                >
                  <PlusCircle className="size-5.5" strokeWidth={2.2} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em]">
                    Create
                  </span>
                </button>

                <button
                  onClick={() => handleViewChange("notifications")}
                  className={`${navItemCls} relative ${view === "notifications" ? "text-[#C9953A]" : "text-white/40"}`}
                >
                  <div className="relative">
                    <Bell className="size-5.5" strokeWidth={2.2} />
                    {hasUnread && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-[#0a0a0a] bg-[#C9953A]" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em]">
                    Activity
                  </span>
                </button>

                <button
                  onClick={() => handleViewChange("profile")}
                  className={`${navItemCls} ${view === "profile" ? "text-[#C9953A]" : "text-white/40"}`}
                >
                  <User className="size-5.5" strokeWidth={2.2} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em]">
                    Profile
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </SidebarProvider>

      <CommentsModal
        post={activePost}
        currentUserId={currentUser.id}
        onClose={() => setActivePostId(null)}
        onCommentCountChange={handleCommentCountChange}
      />
      <CreatePostModal
        currentUser={currentUser}
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
}
