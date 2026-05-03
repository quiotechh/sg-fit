"use client"

import { useState } from "react"
import Sidebar from "@/components/communtiy/Sidebar"
import PostCard from "@/components/communtiy/Postcard"
import CommentsModal from "@/components/communtiy/CommentsModal"
import CreatePostModal from "@/components/communtiy/CreatePostModal"
import NotificationsView from "@/components/communtiy/Notifications"
import ProfileView from "@/components/communtiy/ProfileView"
import { Post, View } from "@/types/community"
import { INITIAL_NOTIFICATIONS, INITIAL_POSTS } from "@/data/community"

const goldGradient = "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)"

export default function CommunityDashboard() {
  const [view, setView] = useState<View>("home")
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [activePost, setActivePost] = useState<Post | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const hasUnread = notifications.some(n => n.unread)
  const userPosts = posts.filter(p => p.avatarClass === "av-1")

  const handleViewChange = (v: View) => {
    setView(v)
    if (v === "notifications") {
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
    }
  }

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ))
  }

  const submitPost = (text: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: "Your Name",
      initials: "YO",
      avatarClass: "av-1",
      time: "Just now",
      body: text,
      likes: 0,
      comments: 0,
    }
    setPosts(prev => [prev[0], newPost, ...prev.slice(1)])
  }

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <>
      <div className="flex min-h-screen bg-white">

        {/* ── SIDEBAR (desktop) ── */}
        <div className="hidden lg:block">
          <Sidebar
            view={view}
            hasUnread={hasUnread}
            onViewChange={handleViewChange}
            onCreateClick={() => setCreateOpen(true)}
          />
        </div>

        {/* ── MAIN ── */}
        <div className="flex-1 flex flex-col lg:ml-60">

          {/* Mobile Header */}
          <div
            className="lg:hidden sticky top-0 z-80 flex items-center justify-between px-4.5 py-3.5 border-b border-[#eeece8]"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            <div
              className="text-[18px] font-black uppercase tracking-[0.14em] [font-family:var(--font-barlow)]"
              style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              SG FIT
            </div>
            <button
              onClick={() => handleViewChange("notifications")}
              className="relative w-9.5 h-9.5 rounded-[12px] border border-[#eeece8] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[#C9953A]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6b63" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {hasUnread && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full border-[1.5px] border-white bg-[#C9953A]" />
              )}
            </button>
          </div>

          {/* Desktop Topbar */}
          <div
            className="hidden lg:flex sticky top-0 z-50 items-center justify-between px-10 h-17 border-b border-[#eeece8]"
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            <div>
              <h1 className="text-[28px] font-bold text-[#0a0a0a] [font-family:var(--font-cormorant)]">Community</h1>
              <p className="text-[12px] text-[#9e9a90] font-medium tracking-[0.03em] mt-px [font-family:var(--font-barlow)]">
                Connect, share progress, and support each other.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleViewChange("notifications")}
                className="relative w-10 h-10 rounded-[12px] border border-[#eeece8] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[#C9953A]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6b63" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {hasUnread && (
                  <span className="absolute top-2 right-2.25 w-1.75 h-1.75 rounded-full border-2 border-white bg-[#C9953A]" />
                )}
              </button>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-black text-[#0a0a0a] cursor-pointer border-2 border-transparent hover:border-[#C9953A] transition-all duration-200 [font-family:var(--font-barlow)]"
                style={{ background: goldGradient }}
              >
                YO
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="max-w-170 mx-auto px-4 sm:px-6 py-8 pb-28 lg:pb-12 w-full">

              {view === "home" && (
                <>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9e9a90] [font-family:var(--font-barlow)]">Latest Posts</span>
                  </div>
                  {posts.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={toggleLike}
                      onComment={setActivePost}
                      animDelay={i * 0.07}
                    />
                  ))}
                </>
              )}

              {view === "notifications" && (
                <NotificationsView notifications={notifications} />
              )}

              {view === "profile" && (
                <ProfileView posts={userPosts} onDelete={deletePost} />
              )}

            </div>
          </div>

          {/* ── MOBILE BOTTOM NAV ── */}
          <nav
            className="lg:hidden fixed bottom-0 left-0 right-0 z-100 border-t border-white/8"
            style={{
              background: "rgba(10,10,10,0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex items-center justify-around max-w-120 mx-auto py-2.5">

              <button
                onClick={() => handleViewChange("home")}
                className="flex flex-col items-center gap-1 px-4 py-1.5 border-none bg-transparent cursor-pointer rounded-[12px] transition-all duration-200"
                style={{ color: view === "home" ? "#C9953A" : "rgba(255,255,255,0.4)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-[0.06em] [font-family:var(--font-barlow)]">Home</span>
              </button>

              <button
                onClick={() => setCreateOpen(true)}
                className="flex flex-col items-center gap-1 px-4 py-1.5 border-none bg-transparent cursor-pointer rounded-[12px] transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-[0.06em] [font-family:var(--font-barlow)]">Create</span>
              </button>

              <button
                onClick={() => handleViewChange("notifications")}
                className="flex flex-col items-center gap-1 px-4 py-1.5 border-none bg-transparent cursor-pointer rounded-[12px] transition-all duration-200 relative"
                style={{ color: view === "notifications" ? "#C9953A" : "rgba(255,255,255,0.4)" }}
              >
                <div className="relative">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  {hasUnread && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-[#0a0a0a] bg-[#C9953A]" />
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.06em] [font-family:var(--font-barlow)]">Activity</span>
              </button>

              <button
                onClick={() => handleViewChange("profile")}
                className="flex flex-col items-center gap-1 px-4 py-1.5 border-none bg-transparent cursor-pointer rounded-[12px] transition-all duration-200"
                style={{ color: view === "profile" ? "#C9953A" : "rgba(255,255,255,0.4)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-[0.06em] [font-family:var(--font-barlow)]">Profile</span>
              </button>

            </div>
          </nav>

        </div>
      </div>

      <CommentsModal post={activePost} onClose={() => setActivePost(null)} />
      <CreatePostModal open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={submitPost} />
    </>
  )
}
