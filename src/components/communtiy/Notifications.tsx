"use client";

import { AppNotification } from "@/types/community";
import { Card } from "@/components/ui/card";
import CommunityAvatar from "@/components/communtiy/CommunityAvatar";
import RelativeTime from "@/components/communtiy/RelativeTime";

type Props = { notifications: AppNotification[] };

export default function NotificationsView({ notifications }: Props) {
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[22px] font-black uppercase tracking-tight text-[#0a0a0a] [font-family:var(--font-barlow)]">
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

/* purana comment block waisa hi rehne dena, upar hai already */

function NotifCard({ notif }: { notif: AppNotification }) {
  const isUnread = !notif.read;
  const actionText =
    notif.type === "LIKE" ? "liked your post" : "commented on your post";

  return (
    <Card
      className={`flex-row items-center gap-3.5 px-4.5 py-4 mb-2.5 rounded-[16px] border transition-all duration-200 cursor-pointer hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
        isUnread
          ? "bg-[rgba(201,149,58,0.03)] border-[rgba(201,149,58,0.2)]"
          : "bg-white border-transparent"
      }`}
    >
      <div className="relative shrink-0">
        <CommunityAvatar
          userId={notif.actor.id}
          name={notif.actor.name}
          image={notif.actor.image}
          className="size-11 text-[15px]"
        />
        <div
          className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] border-2 border-white"
          style={{ background: notif.type === "LIKE" ? "#e0574a" : "#4a90d9" }}
        >
          {notif.type === "LIKE" ? "❤" : "💬"}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#0a0a0a] leading-[1.45] [font-family:var(--font-barlow)]">
          <strong className="font-black">{notif.actor.name}</strong>{" "}
          {actionText}
        </p>
        <RelativeTime
          date={notif.createdAt}
          className="text-[11px] text-[#9e9a90] mt-0.5 font-medium [font-family:var(--font-barlow)] block"
        />
      </div>

      {isUnread && (
        <div className="w-2 h-2 rounded-full shrink-0 bg-[#C9953A]" />
      )}
    </Card>
  );
}
