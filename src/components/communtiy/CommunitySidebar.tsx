"use client";

import Link from "next/link";
import { Home, PlusCircle, Bell, User, ArrowLeft, LogOut, ChevronsUpDown } from "lucide-react";
import { View } from "@/types/community";
import { communityGoldGradient } from "@/lib/community-ui";
import CommunityAvatar from "@/components/communtiy/CommunityAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  onSignOut: () => void;
};

export default function Sidebar({
  view,
  hasUnread,
  currentUser,
  onViewChange,
  onCreateClick,
  onSignOut,
}: Props) {
  return (
    <SidebarPrimitive
      collapsible="none"
      className="hidden lg:flex fixed left-0 top-0 h-screen w-60 border-r border-[#eeece8] bg-white z-90"
    >
      <SidebarHeader className="px-6 py-6 border-b border-[#eeece8]">
        <Link href="/dashboard" className="block group">
          <div
            className="text-[22px] font-black uppercase tracking-widest [font-family:var(--font-barlow)]"
            style={{
              background: goldGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SGIANS
          </div>
          <p className="text-[11px] text-[#9e9a90] font-medium uppercase tracking-widest mt-0.5 [font-family:var(--font-barlow)] group-hover:text-[#0a0a0a] transition-colors flex items-center gap-1">
            <ArrowLeft className="size-3" strokeWidth={2.5} />
            Back to SG Fit
          </p>
        </Link>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-2 py-1.5 rounded-[12px] hover:bg-[#f5f5f5] transition-colors">
              <CommunityAvatar
                userId={currentUser.id}
                name={currentUser.name}
                image={currentUser.image}
                className="size-9 text-[14px]"
              />
              <div className="flex-1 text-left">
                <div className="text-[14px] font-bold text-[#0a0a0a] [font-family:var(--font-barlow)]">
                  {currentUser.name}
                </div>
                <div className="text-[12px] text-[#9e9a90] font-medium [font-family:var(--font-barlow)]">
                  Member
                </div>
              </div>
              <ChevronsUpDown className="size-4 text-[#9e9a90] shrink-0" strokeWidth={2.2} />
            </button>
          </DropdownMenuTrigger>
          {/* z-100 — the sidebar panel itself is z-90, so the dropdown's
              default z-50 was rendering it invisibly behind the sidebar. */}
          <DropdownMenuContent align="start" side="top" className="z-100 w-52 rounded-[14px]">
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center gap-2.5 [font-family:var(--font-barlow)] text-[13px] font-semibold cursor-pointer">
                <ArrowLeft className="size-4" strokeWidth={2.2} />
                Back to SG Fit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onSignOut}
              className="flex items-center gap-2.5 [font-family:var(--font-barlow)] text-[13px] font-semibold text-red-500 hover:text-red-600 cursor-pointer"
            >
              <LogOut className="size-4" strokeWidth={2.2} />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
