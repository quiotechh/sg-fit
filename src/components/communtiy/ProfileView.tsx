"use client";

import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { ProfilePost } from "@/types/community";
import CommunityAvatar from "@/components/communtiy/CommunityAvatar";
import RelativeTime from "@/components/communtiy/RelativeTime";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type CurrentUser = { id: string; name: string; image: string | null };

type Props = {
  posts: ProfilePost[];
  currentUser: CurrentUser;
  onDelete: (id: string) => void;
};

export default function ProfileView({ posts, currentUser, onDelete }: Props) {
  const [selected, setSelected] = useState<ProfilePost | null>(null);

  const totalLikes = posts.reduce((sum, p) => sum + p.likeCount, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.commentCount, 0);

  const handleDelete = () => {
    if (!selected) return;
    onDelete(selected.id);
    setSelected(null);
  };

  return (
    <div>
      {/* Profile header */}
      <div className="flex flex-col items-center pt-6 pb-8 border-b border-[#eeece8]">
        <CommunityAvatar
          userId={currentUser.id}
          name={currentUser.name}
          image={currentUser.image}
          className="size-20 text-[26px] mb-4"
        />
        <h2 className="text-[20px] font-black text-[#0a0a0a] [font-family:var(--font-barlow)] mb-1">
          {currentUser.name}
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
            <MessageCircle
              className="size-7 text-[#d4d0c8]"
              strokeWidth={1.8}
            />
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
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col p-3.5">
                  <p className="flex-1 text-[12px] leading-[1.55] font-medium text-[#2a2a2a] [font-family:var(--font-barlow)] line-clamp-5 overflow-hidden">
                    {post.body}
                  </p>
                </div>
              )}

              <div className="absolute bottom-0 inset-x-0 flex items-center gap-3 px-3.5 py-2.5 bg-white/90 border-t border-[#eeece8]">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <Heart className="size-3" strokeWidth={2.2} />
                  {post.likeCount}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <MessageCircle className="size-3" strokeWidth={2.2} />
                  {post.commentCount}
                </span>
              </div>

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
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eeece8]">
            <DialogTitle className="text-[15px] font-black uppercase tracking-[0.08em] text-[#0a0a0a] [font-family:var(--font-barlow)]">
              Your Post
            </DialogTitle>
            <DialogClose className="w-8 h-8 rounded-full border-0 bg-[#f8f7f5] flex items-center justify-center text-[#9e9a90] text-base cursor-pointer hover:bg-[#eeece8] hover:text-[#0a0a0a] transition-all duration-200">
              ✕
            </DialogClose>
          </div>

          {selected && (
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 mb-4">
                <CommunityAvatar
                  userId={currentUser.id}
                  name={currentUser.name}
                  image={currentUser.image}
                  className="size-10 text-[14px]"
                />
                <div>
                  <p className="text-[14px] font-bold text-[#0a0a0a] [font-family:var(--font-barlow)]">
                    {currentUser.name}
                  </p>
                  <RelativeTime
                    date={selected.createdAt}
                    className="text-[11px] text-[#9e9a90] font-medium [font-family:var(--font-barlow)] block"
                  />
                </div>
              </div>

              <p className="text-[14px] leading-[1.65] font-medium text-[#2a2a2a] [font-family:var(--font-barlow)] mb-4">
                {selected.body}
              </p>

              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt=""
                  className="w-full max-h-50 object-cover rounded-[14px] mb-4"
                />
              )}

              <div className="flex items-center gap-4 pt-3 border-t border-[#eeece8]">
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <Heart className="size-3.5" strokeWidth={2.2} />
                  {selected.likeCount} likes
                </span>
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#9e9a90] [font-family:var(--font-barlow)]">
                  <MessageCircle className="size-3.5" strokeWidth={2.2} />
                  {selected.commentCount} comments
                </span>
              </div>
            </div>
          )}

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
