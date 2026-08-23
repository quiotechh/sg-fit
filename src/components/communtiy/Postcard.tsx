"use client";

import { Heart, MessageCircle } from "lucide-react";
import { FeedPost } from "@/types/community";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CommunityAvatar from "./CommunityAvatar";
import RelativeTime from "./RelativeTime";

type Props = {
  post: FeedPost;
  onLike: (id: string) => void;
  onComment: (postId: string) => void;
  animDelay?: number;
};

/* ── purana comment block waisa hi rakhna, upar hai already ── */

export default function PostCard({
  post,
  onLike,
  onComment,
  animDelay = 0,
}: Props) {
  const isFounder = post.user.role === "FOUNDER";

  return (
    <Card
      className={`mb-4.5 gap-3.5 rounded-[20px] ring-0 border transition-all duration-200 [--card-spacing:--spacing(5.5)] ${
        isFounder
          ? "border-[rgba(201,149,58,0.25)] hover:border-[rgba(201,149,58,0.4)] bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1510_100%)]"
          : "bg-white border-transparent hover:border-[#eeece8] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
      }`}
      style={{
        animation: `fadeUp 0.4s ease ${animDelay}s forwards`,
        opacity: 0,
      }}
    >
      <CardHeader className="gap-0">
        {isFounder && (
          <div className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] mb-3.5 [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)] bg-clip-text text-transparent">
            ★ {post.user.name} · Host
          </div>
        )}

        <div className="flex items-center gap-3">
          <CommunityAvatar
            userId={post.user.id}
            name={post.user.name}
            image={post.user.image}
            className="size-10.5 text-[15px]"
          />
          <div className="flex-1">
            <div
              className={`text-[14px] font-bold flex items-center gap-1.5 [font-family:var(--font-barlow)] ${
                isFounder ? "text-white/95" : "text-[#0a0a0a]"
              }`}
            >
              {post.user.name}
              {isFounder && (
                <span className="text-[9px] font-black uppercase tracking-[0.12em] [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)] bg-clip-text text-transparent">
                  Founder
                </span>
              )}
            </div>
            <RelativeTime
              date={post.createdAt}
              className={`text-[11px] font-medium mt-0.5 [font-family:var(--font-barlow)] ${isFounder ? "text-white/30" : "text-[#9e9a90]"}`}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p
          className={`text-[14px] leading-[1.65] font-medium [font-family:var(--font-barlow)] ${isFounder ? "text-white/80" : "text-[#2a2a2a]"}`}
        >
          {post.body}
        </p>

        {post.imageUrl && (
          <img // WILL CHANGE THIS WITH IMAGE TAG AND ALLOW R2 URL IN CONFIG
            src={post.imageUrl}
            alt=""
            className="w-full max-h-100 object-cover rounded-[14px] mt-3.5"
          />
        )}
      </CardContent>

      <CardFooter
        className={`bg-transparent gap-1.5 [font-family:var(--font-barlow)] ${isFounder ? "border-white/8" : "border-[#f5f0e8]"}`}
      >
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
            isFounder ? "hover:bg-white/7" : "hover:bg-[#f5f0e8]"
          }`}
          style={{
            color: post.likedByMe
              ? "#e0574a"
              : isFounder
                ? "rgba(255,255,255,0.4)"
                : "#9e9a90",
          }}
        >
          <Heart
            className="size-4.25"
            strokeWidth={2.2}
            fill={post.likedByMe ? "#e0574a" : "none"}
            stroke={post.likedByMe ? "#e0574a" : "currentColor"}
          />
          {post.likeCount}
        </button>

        <button
          onClick={() => onComment(post.id)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
            isFounder ? "hover:bg-white/7" : "hover:bg-[#f5f0e8]"
          }`}
          style={{ color: isFounder ? "rgba(255,255,255,0.4)" : "#9e9a90" }}
        >
          <MessageCircle className="size-4.25" strokeWidth={2.2} />
          {post.commentCount}
        </button>
      </CardFooter>
    </Card>
  );
}
