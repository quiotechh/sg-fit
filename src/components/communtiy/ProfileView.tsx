"use client";

import { useState } from "react";
import { Post } from "@/types/community";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type Props = {
  posts: Post[];
  onDelete: (id: string) => void;
};

export default function ProfileView({ posts, onDelete }: Props) {
  const [selected, setSelected] = useState<Post | null>(null);

  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);

  const handleDelete = () => {
    if (!selected) return;
    onDelete(selected.id);
    setSelected(null);
  };

  return (
    <div>
      {/* Profile header */}
      <div className="flex flex-col items-center pt-6 pb-8 border-b border-[#eeece8]">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-[26px] font-black text-[#0a0a0a] mb-4 [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]">
          YO
        </div>
        <h2 className="text-[20px] font-black text-[#0a0a0a] [font-family:var(--font-barlow)] mb-1">
          Your Name
        </h2>
        <p className="text-[12px] text-[#9e9a90] font-medium [font-family:var(--font-barlow)] mb-6">
          SGian · Member
        </p>

        {/* Stats */}
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[22px] font-black text-[#0a0a0a] [font-family:var(--font-barlow)]">
              {posts.length}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9e9a90] [font-family:var(--font-barlow)]">
              Posts
            </span>
          </div>
          <div className="w-px h-8 bg-[#eeece8]" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[22px] font-black text-[#0a0a0a] [font-family:var(--font-barlow)]">
              {totalLikes}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9e9a90] [font-family:var(--font-barlow)]">
              Likes
            </span>
          </div>
          <div className="w-px h-8 bg-[#eeece8]" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[22px] font-black text-[#0a0a0a] [font-family:var(--font-barlow)]">
              {totalComments}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9e9a90] [font-family:var(--font-barlow)]">
              Comments
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#f8f7f5] flex items-center justify-center mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d4d0c8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-[14px] font-bold text-[#9e9a90] [font-family:var(--font-barlow)]">
            No posts yet
          </p>
          <p className="text-[12px] text-[#d4d0c8] font-medium mt-1 [font-family:var(--font-barlow)]">
            Share your first post with the community
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6">
          {posts.map((post, i) => (
            <button
              key={post.id}
              onClick={() => setSelected(post)}
              className="group relative aspect-square rounded-[16px] overflow-hidden border border-[#eeece8] bg-white text-left transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              style={{
                animation: `fadeUp 0.4s ease ${i * 0.05}s forwards`,
                opacity: 0,
              }}
            >
              {post.hasImage ? (
                /* Image placeholder */
                <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#ede6d6,#d4d0c8)]">
                  <span className="text-[#9e9a90] text-[13px] [font-family:var(--font-cormorant)] tracking-wider px-3 text-center">
                    {post.imagePlaceholder}
                  </span>
                </div>
              ) : (
                /* Text post */
                <div className="absolute inset-0 flex flex-col p-3.5">
                  <p className="flex-1 text-[12px] leading-[1.55] font-medium text-[#2a2a2a] [font-family:var(--font-barlow)] line-clamp-5 overflow-hidden">
                    {post.body}
                  </p>
                </div>
              )}

              {/* Stats bar */}
              <div className="absolute bottom-0 inset-x-0 flex items-center gap-3 px-3.5 py-2.5 bg-white/90 border-t border-[#eeece8]">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill={post.liked ? "#e0574a" : "none"}
                    stroke={post.liked ? "#e0574a" : "#9e9a90"}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {post.likes}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9e9a90"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {post.comments}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/3 transition-all duration-200 pointer-events-none" />
            </button>
          ))}
        </div>
      )}

      {/* Post detail + delete dialog */}
      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-120 lg:max-w-135 rounded-[24px] p-0 bg-white border-0 shadow-[0_24px_64px_rgba(0,0,0,0.12)] gap-0 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eeece8]">
            <DialogTitle className="text-[15px] font-black uppercase tracking-[0.08em] text-[#0a0a0a] [font-family:var(--font-barlow)]">
              Your Post
            </DialogTitle>
            <DialogClose className="w-8 h-8 rounded-full border-0 bg-[#f8f7f5] flex items-center justify-center text-[#9e9a90] text-base cursor-pointer hover:bg-[#eeece8] hover:text-[#0a0a0a] transition-all duration-200">
              ✕
            </DialogClose>
          </div>

          {/* Post content */}
          {selected && (
            <div className="px-6 py-5">
              {/* Author row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-black text-[#0a0a0a] shrink-0 [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]">
                  YO
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0a0a0a] [font-family:var(--font-barlow)]">
                    Your Name
                  </p>
                  <p className="text-[11px] text-[#9e9a90] font-medium [font-family:var(--font-barlow)]">
                    {selected.time}
                  </p>
                </div>
              </div>

              {/* Body */}
              <p className="text-[14px] leading-[1.65] font-medium text-[#2a2a2a] [font-family:var(--font-barlow)] mb-4">
                {selected.body}
              </p>

              {/* Image placeholder */}
              {selected.hasImage && (
                <div className="w-full h-50 rounded-[14px] flex items-center justify-center mb-4 text-[#9e9a90] text-[15px] [font-family:var(--font-cormorant)] tracking-wider bg-[linear-gradient(135deg,#ede6d6,#d4d0c8)]">
                  {selected.imagePlaceholder}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 pt-3 border-t border-[#eeece8]">
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={selected.liked ? "#e0574a" : "none"}
                    stroke={selected.liked ? "#e0574a" : "#9e9a90"}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {selected.likes} likes
                </span>
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9e9a90"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {selected.comments} comments
                </span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-6 pb-6 pt-3 border-t border-[#eeece8]">
            <DialogClose className="px-5 py-2.5 rounded-[12px] border border-[#eeece8] bg-transparent text-[12px] font-bold text-[#9e9a90] uppercase tracking-[0.08em] cursor-pointer hover:border-[#d4d0c8] hover:text-[#6e6b63] transition-all duration-200 [font-family:var(--font-barlow)]">
              Close
            </DialogClose>
            <button
              onClick={handleDelete}
              className="px-5 py-2.5 rounded-[12px] border-none text-[12px] font-black text-white uppercase tracking-[0.08em] cursor-pointer transition-all duration-200 bg-[#e0574a] hover:bg-[#cc4a3e] hover:shadow-[0_4px_14px_rgba(224,87,74,0.35)] active:scale-[0.97] [font-family:var(--font-barlow)]"
            >
              Delete Post
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
