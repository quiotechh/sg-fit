"use client";

import { View } from "@/types/community";

const goldGradient = "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)";

type Props = {
  view: View;
  hasUnread: boolean;
  onViewChange: (v: View) => void;
  onCreateClick: () => void;
};

const navBtn =
  "flex items-center gap-3 px-3.5 py-3 rounded-[14px] transition-all duration-200 w-full cursor-pointer [font-family:var(--font-barlow)]";

export default function Sidebar({
  view,
  hasUnread,
  onViewChange,
  onCreateClick,
}: Props) {
  return (
    <div className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-white border-r border-[#eeece8] z-90">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#eeece8]">
        <div
          className="text-[20px] font-black uppercase tracking-[0.14em] [font-family:var(--font-barlow)]"
          style={{
            background: goldGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SG FIT
        </div>
        <p className="text-[10px] text-[#9e9a90] font-medium uppercase tracking-widest mt-0.5 [font-family:var(--font-barlow)]">
          Community
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <button
          onClick={() => onViewChange("home")}
          className={`${navBtn} ${
            view === "home"
              ? "bg-white text-[#0a0a0a] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              : "text-[#9e9a90] hover:bg-[#f5f5f5]"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[14px] font-semibold">Home</span>
        </button>

        <button
          onClick={onCreateClick}
          className={`${navBtn} text-[#9e9a90] hover:bg-[#f5f5f5]`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="text-[14px] font-semibold">Create</span>
        </button>

        <button
          onClick={() => onViewChange("notifications")}
          className={`${navBtn} ${
            view === "notifications"
              ? "bg-white text-[#0a0a0a] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              : "text-[#9e9a90] hover:bg-[#f5f5f5]"
          }`}
        >
          <div className="relative">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-white bg-[#C9953A]" />
            )}
          </div>
          <span className="text-[14px] font-semibold">Activity</span>
        </button>

        <button
          onClick={() => onViewChange("profile")}
          className={`${navBtn} ${
            view === "profile"
              ? "bg-white text-[#0a0a0a] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              : "text-[#9e9a90] hover:bg-[#f5f5f5]"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[14px] font-semibold">Profile</span>
        </button>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-[#eeece8]">
        <div className="flex items-center gap-3 px-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black text-[#0a0a0a] shrink-0 [font-family:var(--font-barlow)]"
            style={{ background: goldGradient }}
          >
            YO
          </div>
          <div>
            <div className="text-[13px] font-bold text-[#0a0a0a] [font-family:var(--font-barlow)]">
              Your Name
            </div>
            <div className="text-[11px] text-[#9e9a90] font-medium [font-family:var(--font-barlow)]">
              Member
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
