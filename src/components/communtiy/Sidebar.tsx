"use client";

import { Home, PlusCircle, Bell, User } from "lucide-react";
import { View } from "@/types/community";
import { communityGoldGradient } from "@/lib/community-ui";
import CommunityAvatar from "@/components/communtiy/CommunityAvatar";
import {
  Sidebar as SidebarPrimitive,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const goldGradient = communityGoldGradient;

type Props = {
  view: View;
  hasUnread: boolean;
  currentUser: { id: string; name: string; image: string | null };
  onViewChange: (v: View) => void;
  onCreateClick: () => void;
};

export default function Sidebar({
  view,
  hasUnread,
  currentUser,
  onViewChange,
  onCreateClick,
}: Props) {
  return (
    <SidebarPrimitive
      collapsible="none"
      className="hidden lg:flex fixed left-0 top-0 h-screen w-60 border-r border-[#eeece8] bg-white z-90"
    >
      <SidebarHeader className="px-6 py-6 border-b border-[#eeece8]">
        <div
          className="text-[22px] font-black uppercase tracking-[0.1em] [font-family:var(--font-barlow)]"
          style={{
            background: goldGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SGIANS
        </div>
        <p className="text-[11px] text-[#9e9a90] font-medium uppercase tracking-widest mt-0.5 [font-family:var(--font-barlow)]">
          Community
        </p>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={view === "home"}
              onClick={() => onViewChange("home")}
              className="h-auto px-3.5 py-3 rounded-[14px] [font-family:var(--font-barlow)] text-[15px] font-semibold text-[#9e9a90] data-[active=true]:bg-white data-[active=true]:text-[#0a0a0a] data-[active=true]:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-[#f5f5f5]"
            >
              <Home className="size-5.5" strokeWidth={2.2} />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onCreateClick}
              className="h-auto px-3.5 py-3 rounded-[14px] [font-family:var(--font-barlow)] text-[15px] font-semibold text-[#9e9a90] hover:bg-[#f5f5f5]"
            >
              <PlusCircle className="size-5.5" strokeWidth={2.2} />
              <span>Create</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={view === "notifications"}
              onClick={() => onViewChange("notifications")}
              className="h-auto px-3.5 py-3 rounded-[14px] [font-family:var(--font-barlow)] text-[15px] font-semibold text-[#9e9a90] data-[active=true]:bg-white data-[active=true]:text-[#0a0a0a] data-[active=true]:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-[#f5f5f5]"
            >
              <div className="relative">
                <Bell className="size-5.5" strokeWidth={2.2} />
                {hasUnread && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-white bg-[#C9953A]" />
                )}
              </div>
              <span>Activity</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={view === "profile"}
              onClick={() => onViewChange("profile")}
              className="h-auto px-3.5 py-3 rounded-[14px] [font-family:var(--font-barlow)] text-[15px] font-semibold text-[#9e9a90] data-[active=true]:bg-white data-[active=true]:text-[#0a0a0a] data-[active=true]:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-[#f5f5f5]"
            >
              <User className="size-5.5" strokeWidth={2.2} />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-[#eeece8]">
        <div className="flex items-center gap-3 px-2">
          <CommunityAvatar
            userId={currentUser.id}
            name={currentUser.name}
            image={currentUser.image}
            className="size-9 text-[14px]"
          />
          <div>
            <div className="text-[14px] font-bold text-[#0a0a0a] [font-family:var(--font-barlow)]">
              {currentUser.name}
            </div>
            <div className="text-[12px] text-[#9e9a90] font-medium [font-family:var(--font-barlow)]">
              Member
            </div>
          </div>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
