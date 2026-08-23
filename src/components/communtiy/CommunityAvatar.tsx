"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { getAvatarGradient } from "@/lib/community-ui";

type Props = {
  userId: string;
  name: string;
  image?: string | null;
  className?: string;
};

export default function CommunityAvatar({ userId, name, image, className }: Props) {
  return (
    <Avatar className={className}>
      {image && <AvatarImage src={image} alt={name} />}
      <AvatarFallback
        className="text-[#0a0a0a] font-black [font-family:var(--font-barlow)]"
        style={{ background: getAvatarGradient(userId) }}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
