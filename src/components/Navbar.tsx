"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  User,
  Lock,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";

// ── Toggle these to preview different UI states ──────────────────────
const isLoggedIn = true;
const hasMembership = true;
// ─────────────────────────────────────────────────────────────────────
 
const programsItems = [
  { label: "Workout Programs", href: "/programs/workouts" },
  { label: "Nutrition Guides", href: "/programs/nutrition" },
];

const myProgramItems = [
  { label: "Workout Programs", href: "/my-programs/workouts" },
  { label: "Nutrition Guides", href: "/my-programs/nutrition" },
];

const moreItems = [
  {
    label: "Retreats",
    href: "https://retreat.sgfitwellness.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnyA-ePNCFew33_hiPIioPy_-eC8vkpJZ7SjEztRFKhGvGIf-wNKXs-ekQkiw_aem_crL-J5YoZxVVLmt6TI2wpQ",
  },
  { label: "Affiliates", href: "/affiliates" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const linkCls =
  "text-lg font-bold uppercase tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors duration-200 [font-family:var(--font-barlow)]";

function DesktopDropdown({
  label,
  items,
  transparent,
}: {
  label: string;
  items: { label: string; href: string }[];
  transparent: boolean;
}) {
  const triggerCls = transparent
    ? "text-lg font-bold uppercase tracking-wide text-white/90 hover:text-white transition-colors duration-200 [font-family:var(--font-barlow)]"
    : linkCls;

  return (
    <div className="group relative">
      <button className={`flex items-center gap-1 ${triggerCls}`}>
        {label}
        <ChevronDown className="size-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="absolute top-full left-0 z-50 pt-3 pointer-events-none opacity-0 scale-95 origin-top transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100">
        <div className="w-64 rounded-2xl bg-white border border-zinc-200 shadow-xl shadow-black/8 overflow-hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-6 py-3.5 text-base font-bold uppercase tracking-wide text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors duration-150 [font-family:var(--font-barlow)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-base font-bold uppercase tracking-wide text-zinc-800 [font-family:var(--font-barlow)]"
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <ChevronDown className="size-4 text-zinc-500" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3 flex flex-col gap-0.5">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="py-2.5 pl-5 text-sm font-semibold uppercase tracking-wide text-zinc-500 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const itemCls =
  "rounded-none px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider [font-family:var(--font-barlow)] cursor-pointer flex items-center justify-between text-zinc-950 hover:bg-zinc-50 focus:bg-zinc-50 hover:text-[#C9953A] focus:text-[#C9953A]";

function ProfileDropdown({ iconCls }: { iconCls: string }) {
  const router = useRouter();
  const [myProgramsOpen, setMyProgramsOpen] = useState(false);
  const communityHref = hasMembership ? "/community-dashboard" : "/membership";

  return (
    <DropdownMenu onOpenChange={() => setMyProgramsOpen(false)}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="My profile"
          className={`${iconCls} focus:outline-none`}
        >
          <User className="size-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-65 p-0 rounded-2xl border border-zinc-100 shadow-[0_16px_48px_rgba(0,0,0,0.10)] overflow-hidden"
      >
        {/* My Programs — inline accordion */}
        <DropdownMenuItem
          onSelect={(e) => { e.preventDefault(); setMyProgramsOpen((v) => !v); }}
          className={`${itemCls} pt-4`}
        >
          My Programs
          <ChevronDown className={`size-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${myProgramsOpen ? "rotate-180" : ""}`} />
        </DropdownMenuItem>

        <AnimatePresence initial={false}>
          {myProgramsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="overflow-hidden bg-zinc-50"
            >
              {myProgramItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  onSelect={() => router.push(item.href)}
                  className="px-8 py-2.5 text-[12px] font-bold uppercase tracking-wider [font-family:var(--font-barlow)] cursor-pointer text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 focus:bg-zinc-100 flex items-center justify-between"
                >
                  {item.label}
                  <ChevronRight className="size-3 text-zinc-300 shrink-0" />
                </DropdownMenuItem>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mx-6 h-px bg-zinc-100 my-2" />

        <DropdownMenuItem
          onSelect={() => router.push(communityHref)}
          className={`${itemCls} ${!hasMembership ? "text-zinc-400" : "text-zinc-700"}`}
        >
          SGians (Community)
          {!hasMembership ? (
            <Lock className="size-3.5 text-zinc-300 shrink-0" />
          ) : (
            <ChevronRight className="size-3.5 text-zinc-300 shrink-0" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => router.push("/help")}
          className={`${itemCls} text-zinc-700 mb-1`}
        >
          Help
          <ChevronRight className="size-3.5 text-zinc-300 shrink-0" />
        </DropdownMenuItem>

        <div className="mx-6 h-px bg-zinc-100" />

        <DropdownMenuItem
          className={`${itemCls} text-zinc-700 hover:text-red-500 focus:text-red-500 py-4`}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const transparent = pathname === "/about" || pathname === "/contact";

  const navLinkCls = transparent
    ? "text-lg font-bold uppercase tracking-wide text-white/90 hover:text-white transition-colors duration-200 [font-family:var(--font-barlow)]"
    : linkCls;
  const iconCls = transparent
    ? "text-white/80 hover:text-white transition-colors duration-200 p-1"
    : "text-zinc-500 hover:text-zinc-950 transition-colors duration-200 p-1";
  const mobileIconCls = transparent
    ? "text-white/80 hover:text-white transition-colors p-1"
    : "text-zinc-700 hover:text-zinc-950 transition-colors p-1";

  return (
    <header className={`w-full ${transparent ? "bg-transparent" : "bg-white"}`}>

      {/* ── Desktop (xl+) ──────────────────────────────────────────── */}
      <div className="hidden xl:block pt-10">
        <div className="relative h-11">
          <div className={`absolute inset-0 ${transparent ? "bg-transparent" : "bg-white"}`} />

          <div
            className="absolute rounded-full bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: "90px", height: "110px", zIndex: 1 }}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Link href="/">
              <Image
                src="/logo/sg-fit-logo-1.png"
                alt="SG FIT"
                width={128}
                height={128}
                className="h-32 w-auto drop-shadow-xl"
                priority
              />
            </Link>
          </div>

          {/* Left nav links */}
          <div className="absolute left-0 inset-y-0 flex items-center pl-6 xl:pl-8 gap-8 z-20">
            <DesktopDropdown label="Programs" items={programsItems} transparent={transparent} />
            <Link href="/shop" className={navLinkCls}>Shop</Link>
            {isLoggedIn && (
              <Link href="/community" className={navLinkCls}>Community</Link>
            )}
            <DesktopDropdown label="More" items={moreItems} transparent={transparent} />
          </div>

          {/* Right — Cart, Auth */}
          <div className="absolute right-0 inset-y-0 flex items-center pr-6 xl:pr-8 gap-5 z-20">
            <button onClick={openCart} aria-label="Open cart" className={`relative ${iconCls}`}>
              <ShoppingCart className="size-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zinc-950 text-white text-[9px] font-black flex items-center justify-center [font-family:var(--font-barlow)]">
                  {totalItems}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <ProfileDropdown iconCls={iconCls} />
            ) : (
              <>
                <Link href="/login" aria-label="Account" className={iconCls}>
                  <User className="size-6" />
                </Link>
                <Link
                  href="/get-started"
                  className="text-zinc-950 text-lg font-bold tracking-wide px-7 py-2.5 rounded-lg active:scale-95 transition-all duration-150 whitespace-nowrap [font-family:var(--font-barlow)]"
                  style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
                >
                  GET STARTED
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet / iPad Pro (<xl) ──────────────────────── */}
      <div className="xl:hidden pt-5">
        <div className="relative h-14">
          <div className={`absolute inset-0 ${transparent ? "bg-transparent" : "bg-white"}`} />

          <div
            className="absolute rounded-full bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: "76px", height: "66px", zIndex: 1 }}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Link href="/">
              <Image
                src="/logo/sg-fit-logo-1.png"
                alt="SG FIT"
                width={88}
                height={88}
                className="h-22 w-auto drop-shadow-lg"
                priority
              />
            </Link>
          </div>

          {/* Hamburger — left */}
          <div className="absolute left-4 sm:left-6 inset-y-0 flex items-center z-20">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className={`${transparent ? "text-white/90 hover:text-white" : "text-zinc-800 hover:text-zinc-950"} transition-colors p-1`}
                >
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="flex flex-col p-0 w-75 sm:w-85 bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation links</SheetDescription>
                <div className="h-14 shrink-0 border-b border-zinc-100" aria-hidden="true" />

                <nav className="flex-1 overflow-y-auto px-6 py-2">
                  <MobileAccordion
                    label="Programs"
                    items={programsItems}
                    onNavigate={() => setMobileOpen(false)}
                  />
                  <Link
                    href="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-zinc-100 py-4 text-base font-bold uppercase tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/community"
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-zinc-100 py-4 text-base font-bold uppercase tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
                  >
                    Community
                  </Link>
                  <MobileAccordion
                    label="More"
                    items={moreItems}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </nav>

                {/* Sheet footer — changes based on auth state */}
                {isLoggedIn ? (
                  <div className="px-6 pt-1 pb-5 border-t border-zinc-100">
                    <p className="py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 [font-family:var(--font-barlow)]">
                      My Account
                    </p>
                    <MobileAccordion
                      label="My Programs"
                      items={myProgramItems}
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <Link
                      href={hasMembership ? "/community-dashboard" : "/membership"}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between border-b border-zinc-100 py-4 text-base font-bold uppercase tracking-wide transition-colors [font-family:var(--font-barlow)] ${
                        !hasMembership
                          ? "text-zinc-400"
                          : "text-zinc-800 hover:text-zinc-950"
                      }`}
                    >
                      <span className={!hasMembership ? "opacity-60" : ""}>
                        SGians (Community)
                      </span>
                      {!hasMembership && <Lock className="size-4 text-zinc-400" />}
                    </Link>
                    <Link
                      href="/help"
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-zinc-100 py-4 text-base font-bold uppercase tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors [font-family:var(--font-barlow)]"
                    >
                      Help
                    </Link>
                    <button className="w-full text-left py-4 text-base font-bold uppercase tracking-wide text-red-500 hover:text-red-700 transition-colors [font-family:var(--font-barlow)]">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="px-6 py-6 border-t border-zinc-100">
                    <Link
                      href="/get-started"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-zinc-950 text-base font-bold uppercase tracking-wide py-3.5 rounded-lg active:scale-95 transition-all text-center [font-family:var(--font-barlow)]"
                      style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>

          {/* Icons — right */}
          <div className="absolute right-4 sm:right-6 inset-y-0 flex items-center gap-3 z-20">
            {isLoggedIn ? (
              <ProfileDropdown iconCls={mobileIconCls} />
            ) : (
              <Link href="/login" aria-label="Account" className={mobileIconCls}>
                <User className="size-6" />
              </Link>
            )}
            <button onClick={openCart} aria-label="Open cart" className={`relative ${mobileIconCls}`}>
              <ShoppingCart className="size-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zinc-950 text-white text-[9px] font-black flex items-center justify-center [font-family:var(--font-barlow)]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
