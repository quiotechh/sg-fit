"use client";

import { useEffect, useRef, useState } from "react";
import { Post, Comment } from "@/types/community";
import { MOCK_COMMENTS } from "@/data/community";

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
  post: Post | null;
  onClose: () => void;
};

export default function CommentsModal({ post, onClose }: Props) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  const sendComment = () => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: "You",
      initials: "YO",
      avatarClass: "av-1",
      text: text.trim(),
      time: "Just now",
    };
    setComments((prev) => [...prev, newComment]);
    setText("");
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-end justify-center"
      style={{
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "overlayIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px_24px_0_0] w-full max-w-170 flex flex-col overflow-hidden"
        style={{
          maxHeight: "80vh",
          animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-xs bg-[#eeece8] mx-auto mt-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5.5 py-4 border-b border-[#f5f0e8] shrink-0">
          <span className="text-[15px] font-black uppercase tracking-[0.08em] text-[#0a0a0a] [font-family:var(--font-barlow)]">
            Comments
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-none bg-[#f8f7f5] flex items-center justify-center text-[#9e9a90] text-[16px] cursor-pointer hover:bg-[#eeece8] hover:text-[#0a0a0a] transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Comments list */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-5.5 py-4 flex flex-col gap-4"
        >
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex gap-3"
              style={{ animation: "fadeUp 0.3s ease forwards" }}
            >
              <div
                className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-[12px] font-black shrink-0 text-[#0a0a0a] [font-family:var(--font-barlow)]"
                style={{
                  background: avatarStyles[c.avatarClass] || goldGradient,
                }}
              >
                {c.initials}
              </div>
              <div className="flex-1 bg-[#f8f7f5] rounded-[14px] px-3.5 py-2.5">
                <div className="text-[12px] font-black text-[#0a0a0a] mb-0.5 [font-family:var(--font-barlow)]">
                  {c.author}
                </div>
                <div className="text-[13px] text-[#3a3a3a] leading-normal font-medium [font-family:var(--font-barlow)]">
                  {c.text}
                </div>
                <div className="text-[10px] text-[#9e9a90] mt-1.5 font-medium [font-family:var(--font-barlow)]">
                  {c.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2.5 items-center px-5.5 pb-5.5 pt-3.5 border-t border-[#f5f0e8] shrink-0">
          <div
            className="w-9.5 h-9.5 rounded-full flex items-center justify-center text-[13px] font-black shrink-0 text-[#0a0a0a] [font-family:var(--font-barlow)]"
            style={{ background: goldGradient }}
          >
            YO
          </div>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendComment()}
            placeholder="Add a comment..."
            className="flex-1 border border-[#d4d0c8] rounded-[14px] px-4 py-2.75 text-[13px] text-[#0a0a0a] font-medium bg-[#f8f7f5] outline-none transition-all duration-200 [font-family:var(--font-barlow)] placeholder:text-[#9e9a90] focus:border-[#C9953A] focus:bg-white"
          />
          <button
            onClick={sendComment}
            className="w-10.5 h-10.5 rounded-[12px] border-none flex items-center justify-center cursor-pointer shrink-0 transition-all duration-200 hover:scale-[1.06] hover:shadow-[0_4px_14px_rgba(201,149,58,0.35)]"
            style={{ background: goldGradient }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
