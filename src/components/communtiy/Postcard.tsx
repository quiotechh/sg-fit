"use client";

import { Post } from "@/types/community";

const goldGradient = "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)";

const avatarStyles: Record<string, string> = {
  "av-sg": goldGradient,
  "av-2": "linear-gradient(135deg, #6c8ebf, #a8c4e0)",
  "av-3": "linear-gradient(135deg, #7cb87c, #b8d8b8)",
  "av-4": "linear-gradient(135deg, #bf6c8e, #e0a8c4)",
  "av-5": "linear-gradient(135deg, #8e6cbf, #c4a8e0)",
  "av-1": goldGradient,
};

type Props = {
  post: Post;
  onLike: (id: string) => void;
  onComment: (post: Post) => void;
  animDelay?: number;
};

export default function PostCard({
  post,
  onLike,
  onComment,
  animDelay = 0,
}: Props) {
  return (
    <article
      className={`rounded-[20px] p-5.5 mb-4.5 border transition-all duration-200 ${
        post.isSharonPost
          ? "border-[rgba(201,149,58,0.25)] hover:border-[rgba(201,149,58,0.4)]"
          : "bg-white border-transparent hover:border-[#eeece8] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
      }`}
      style={{
        background: post.isSharonPost
          ? "linear-gradient(135deg, #0a0a0a 0%, #1a1510 100%)"
          : undefined,
        animation: `fadeUp 0.4s ease ${animDelay}s forwards`,
        opacity: 0,
      }}
    >
      {/* Sharon label */}
      {post.isSharonPost && (
        <div
          className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] mb-3.5 [font-family:var(--font-barlow)]"
          style={{
            background: goldGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ★ Sharon Gambu · Host
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-3.5">
        <div
          className="w-10.5 h-10.5 rounded-full flex items-center justify-center text-[15px] font-black shrink-0 [font-family:var(--font-barlow)]"
          style={{
            background: avatarStyles[post.avatarClass] || goldGradient,
            color: "#0a0a0a",
          }}
        >
          {post.initials}
        </div>
        <div className="flex-1">
          <div
            className="text-[14px] font-bold flex items-center gap-1.5 [font-family:var(--font-barlow)]"
            style={{
              color: post.isSharonPost ? "rgba(255,255,255,0.95)" : "#0a0a0a",
            }}
          >
            {post.author}
            {post.isSharonPost && (
              <span
                className="text-[9px] font-black uppercase tracking-[0.12em] [font-family:var(--font-barlow)]"
                style={{
                  background: goldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Founder
              </span>
            )}
          </div>
          <div
            className="text-[11px] font-medium mt-0.5 [font-family:var(--font-barlow)]"
            style={{
              color: post.isSharonPost ? "rgba(255,255,255,0.3)" : "#9e9a90",
            }}
          >
            {post.time}
          </div>
        </div>
      </div>

      {/* Body */}
      <p
        className="text-[14px] leading-[1.65] font-medium mb-3.5 [font-family:var(--font-barlow)]"
        style={{
          color: post.isSharonPost ? "rgba(255,255,255,0.8)" : "#2a2a2a",
        }}
      >
        {post.body}
      </p>

      {/* Image placeholder */}
      {post.hasImage && (
        <div
          className="w-full h-70 rounded-[14px] flex items-center justify-center mb-3.5 text-[#9e9a90] text-[16px] [font-family:var(--font-cormorant)] tracking-wider"
          style={{ background: "linear-gradient(135deg, #ede6d6, #d4d0c8)" }}
        >
          {post.imagePlaceholder}
        </div>
      )}

      {/* Actions */}
      <div
        className="flex items-center gap-1.5 pt-3 border-t [font-family:var(--font-barlow)]"
        style={{
          borderColor: post.isSharonPost ? "rgba(255,255,255,0.08)" : "#f5f0e8",
        }}
      >
        {/* Like */}
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border-none text-[12px] font-semibold transition-all duration-200 cursor-pointer [font-family:var(--font-barlow)]"
          style={{
            background: "transparent",
            color: post.liked
              ? "#e0574a"
              : post.isSharonPost
                ? "rgba(255,255,255,0.4)"
                : "#9e9a90",
          }}
          onMouseEnter={(e) => {
            if (!post.liked)
              (e.currentTarget as HTMLButtonElement).style.background =
                post.isSharonPost ? "rgba(255,255,255,0.07)" : "#f5f0e8";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={post.liked ? "#e0574a" : "none"}
            stroke={post.liked ? "#e0574a" : "currentColor"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {post.likes}
        </button>

        {/* Comment */}
        <button
          onClick={() => onComment(post)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border-none text-[12px] font-semibold transition-all duration-200 cursor-pointer [font-family:var(--font-barlow)]"
          style={{
            background: "transparent",
            color: post.isSharonPost ? "rgba(255,255,255,0.4)" : "#9e9a90",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              post.isSharonPost ? "rgba(255,255,255,0.07)" : "#f5f0e8";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {post.comments}
        </button>
      </div>
    </article>
  );
}
