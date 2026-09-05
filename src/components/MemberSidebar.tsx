"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Ruler,
  Store,
  Users,
  ChevronDown,
  Video,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

const myProgramItems = [
  { label: "Workout Programs", href: "/my-programs/workouts" },
  { label: "Nutrition Guides", href: "/my-programs/nutrition" },
];

const browseProgramItems = [
  { label: "Workout Programs", href: "/programs/workouts" },
  { label: "Nutrition Guides", href: "/programs/nutrition" },
];

const moreItems = [
  { label: "Home", href: "/" },
  {
    label: "Retreats",
    href: "https://retreat.sgfitwellness.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnyA-ePNCFew33_hiPIioPy_-eC8vkpJZ7SjEztRFKhGvGIf-wNKXs-ekQkiw_aem_crL-J5YoZxVVLmt6TI2wpQ",
  },
  { label: "Affiliates", href: "/affiliates" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Help", href: "/help" },
];

const menuBtnCls =
  "h-auto px-4 py-3 rounded-lg border-l-2 border-transparent text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 data-[active=true]:border-[#C9953A] data-[active=true]:bg-zinc-50 data-[active=true]:text-zinc-950 transition-colors duration-200";
const labelCls = "text-[13px] font-bold uppercase tracking-wide [font-family:var(--font-barlow)]";

export default function MemberSidebar() {
  const pathname = usePathname();
  const [myProgramsOpen, setMyProgramsOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [hasMembership, setHasMembership] = useState(false);

  useEffect(() => {
    fetch("/api/community/membership-status")
      .then((res) => res.json())
      .then((data) => setHasMembership(data.hasMembership))
      .catch(() => setHasMembership(false));
  }, []);

  const communityHref = hasMembership ? "/community-dashboard" : "/community/checkout";

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-zinc-100">
      <SidebarHeader className="px-6 py-6 border-b border-zinc-100">
        <Link
          href="/dashboard"
          className="text-lg font-black uppercase tracking-tight [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)] bg-clip-text text-transparent"
        >
          SG FIT
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5">
        <SidebarMenu className="gap-1">

          {/* Dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"} className={menuBtnCls}>
              <Link href="/dashboard" className="flex items-center gap-3">
                <LayoutDashboard className="size-4.5" strokeWidth={2} />
                <span className={labelCls}>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* My Programs (dropdown) */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setMyProgramsOpen((v) => !v)}
              isActive={pathname.startsWith("/my-programs")}
              className={menuBtnCls}
            >
              <Dumbbell className="size-4.5" strokeWidth={2} />
              <span className={labelCls}>My Programs</span>
              <ChevronDown className={`ml-auto size-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${myProgramsOpen ? "rotate-180" : ""}`} />
            </SidebarMenuButton>
            {myProgramsOpen && (
              <SidebarMenuSub className="gap-1.5 py-1.5">
                {myProgramItems.map((item) => (
                  <SidebarMenuSubItem key={item.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === item.href}
                      className="h-auto py-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-transparent data-[active=true]:text-zinc-950 data-[active=true]:bg-transparent"
                    >
                      <Link href={item.href} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-normal [font-family:var(--font-barlow)]">
                        <span className="text-[#C9953A]">—</span>
                        {item.label}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          {/* Workout Library */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/workout-library"} className={menuBtnCls}>
              <Link href="/workout-library" className="flex items-center gap-3">
                <Video className="size-4.5" strokeWidth={2} />
                <span className={labelCls}>Workout Library</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Measurements */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/measurements"} className={menuBtnCls}>
              <Link href="/measurements" className="flex items-center gap-3">
                <Ruler className="size-4.5" strokeWidth={2} />
                <span className={labelCls}>Measurements</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Browse Programs (dropdown) */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setBrowseOpen((v) => !v)}
              isActive={pathname.startsWith("/programs")}
              className={menuBtnCls}
            >
              <Store className="size-4.5" strokeWidth={2} />
              <span className={labelCls}>Browse Programs</span>
              <ChevronDown className={`ml-auto size-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${browseOpen ? "rotate-180" : ""}`} />
            </SidebarMenuButton>
            {browseOpen && (
              <SidebarMenuSub className="gap-1.5 py-1.5">
                {browseProgramItems.map((item) => (
                  <SidebarMenuSubItem key={item.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === item.href}
                      className="h-auto py-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-transparent data-[active=true]:text-zinc-950 data-[active=true]:bg-transparent"
                    >
                      <Link href={item.href} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-normal [font-family:var(--font-barlow)]">
                        <span className="text-[#C9953A]">—</span>
                        {item.label}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          {/* Shop */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/shop"} className={menuBtnCls}>
              <Link href="/shop" className="flex items-center gap-3">
                <Store className="size-4.5" strokeWidth={2} />
                <span className={labelCls}>Shop</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Community */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/community")} className={menuBtnCls}>
              <Link href={communityHref} className="flex items-center gap-3">
                <Users className="size-4.5" strokeWidth={2} />
                <span className={labelCls}>Community</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* More (dropdown) */}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setMoreOpen((v) => !v)} className={menuBtnCls}>
              <span className={labelCls}>More</span>
              <ChevronDown className={`ml-auto size-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
            </SidebarMenuButton>
            {moreOpen && (
              <SidebarMenuSub>
                {moreItems.map((item) => (
                  <SidebarMenuSubItem key={item.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === item.href}
                      className="h-auto py-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-transparent data-[active=true]:text-zinc-950 data-[active=true]:bg-transparent"
                    >
                      <Link href={item.href} className="text-[10px] font-semibold uppercase tracking-normal [font-family:var(--font-barlow)]">
                        {item.label}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
