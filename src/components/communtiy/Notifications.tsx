"use client";

import { Notification } from "@/types/community";

const goldGradient = "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)";

const avatarStyles: Record<string, string> = {
  "av-sg": goldGradient,
  "av-2": "linear-gradient(135deg, #6c8ebf, #a8c4e0)",
  "av-3": "linear-gradient(135deg, #7cb87c, #b8d8b8)",
  "av-4": "linear-gradient(135deg, #bf6c8e, #e0a8c4)",
  "av-5": "linear-gradient(135deg, #8e6cbf, #c4a8e0)",
  "av-1": goldGradient,
};

type Props = { notifications: Notification[] };

export default function NotificationsView({ notifications }: Props) {
  const unread = notifications.filter((n) => n.unread);
  const read = notifications.filter((n) => !n.unread);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] font-bold text-[#0a0a0a] [font-family:var(--font-cormorant)]">
          Notifications
        </h2>
        <p className="text-[12px] text-[#9e9a90] font-medium mt-0.5 tracking-[0.03em] [font-family:var(--font-barlow)]">
          Stay updated on your community activity.
        </p>
      </div>

      {unread.length > 0 && (
        <>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4d0c8] mb-2.5 [font-family:var(--font-barlow)]">
            New
          </p>
          {unread.map((n) => (
            <NotifCard key={n.id} notif={n} />
          ))}
        </>
      )}

      {read.length > 0 && (
        <>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4d0c8] mb-2.5 mt-7 [font-family:var(--font-barlow)]">
            Earlier
          </p>
          {read.map((n) => (
            <NotifCard key={n.id} notif={n} />
          ))}
        </>
      )}
    </div>
  );
}

function NotifCard({ notif }: { notif: Notification }) {
  return (
    <div
      className="flex items-center gap-3.5 px-4.5 py-4 rounded-[16px] mb-2.5 border transition-all duration-200 cursor-pointer hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
      style={{
        background: notif.unread ? "rgba(201,149,58,0.03)" : "white",
        borderColor: notif.unread ? "rgba(201,149,58,0.2)" : "transparent",
      }}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-black text-[#0a0a0a] [font-family:var(--font-barlow)]"
          style={{
            background: avatarStyles[notif.avatarClass] || goldGradient,
          }}
        >
          {notif.actorInitials}
        </div>
        <div
          className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] border-2 border-white"
          style={{ background: notif.type === "like" ? "#e0574a" : "#4a90d9" }}
        >
          {notif.type === "like" ? "❤" : "💬"}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#0a0a0a] leading-[1.45] [font-family:var(--font-barlow)]">
          <strong className="font-black">{notif.actorName}</strong>{" "}
          {notif.text.replace(notif.actorName, "").trim()}
        </p>
        <p className="text-[11px] text-[#9e9a90] mt-0.5 font-medium [font-family:var(--font-barlow)]">
          {notif.time}
        </p>
      </div>

      {/* Unread dot */}
      {notif.unread && (
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: "#C9953A" }}
        />
      )}
    </div>
  );
}
