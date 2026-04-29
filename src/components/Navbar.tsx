"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ShoppingCart, ChevronDown, User } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

const programsItems = [
  { label: "Workout Programs", href: "/programs/workouts" },
  { label: "Nutrition Guides", href: "/programs/nutrition" },
]

const moreItems = [
  { label: "Retreats", href: "/retreats" },
  { label: "Affiliates", href: "/affiliates" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
]

const linkCls =
  "text-lg font-bold uppercase tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors duration-200 [font-family:var(--font-barlow)]"

function DesktopDropdown({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string }[]
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 ${linkCls}`}
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-5 w-64 rounded-2xl bg-white border border-zinc-200 shadow-xl shadow-black/8 overflow-hidden z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-3.5 text-base font-bold uppercase tracking-wide text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors duration-150 [font-family:var(--font-barlow)]"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileAccordion({
  label,
  items,
  onNavigate,
}: {
  label: string
  items: { label: string; href: string }[]
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)

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
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full">

      {/* ── Desktop (xl+) ──────────────────────────────────────────── */}
      <div className="hidden xl:block pt-10">
        {/* Bar — full width, logo protrudes above & below */}
        <div className="relative h-11">

          {/* White bg: circular notch at bottom-center hugs the logo, drop-shadow follows the curve */}
          <div
            className="absolute inset-0 bg-white"
            style={{
              maskImage:
                "radial-gradient(circle 64px at 50% 150%, transparent 63px, black 65px)",
              WebkitMaskImage:
                "radial-gradient(circle 64px at 50% 150%, transparent 63px, black 65px)",
              filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.07))",
            }}
          />

          {/* Logo — absolutely centered, protruding */}
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

          {/* Left — Programs, Shop, Community, More */}
          <div className="absolute left-0 inset-y-0 flex items-center pl-6 xl:pl-8 gap-8">
            <DesktopDropdown label="Programs" items={programsItems} />
            <Link href="/shop" className={linkCls}>Shop</Link>
            <Link href="/community" className={linkCls}>Community</Link>
            <DesktopDropdown label="More" items={moreItems} />
          </div>

          {/* Right — icons, Get Started */}
          <div className="absolute right-0 inset-y-0 flex items-center pr-6 xl:pr-8 gap-5">

<Link href="/cart" aria-label="Cart" className="text-zinc-500 hover:text-zinc-950 transition-colors duration-200 p-1">
              <ShoppingCart className="size-6" />
            </Link>

            <Link href="/login" aria-label="Account" className="text-zinc-500 hover:text-zinc-950 transition-colors duration-200 p-1">
              <User className="size-6" />
            </Link>

            <Link
              href="/get-started"
              className="text-zinc-950 text-lg font-bold tracking-wide px-7 py-2.5 rounded-lg active:scale-95 transition-all duration-150 whitespace-nowrap [font-family:var(--font-barlow)]"
              style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet / iPad Pro (<xl) ──────────────────────── */}
      <div className="xl:hidden pt-5">
        <div className="relative h-14">

          {/* White bg: circular notch at bottom-center hugs the logo, drop-shadow follows the curve */}
          <div
            className="absolute inset-0 bg-white"
            style={{
              maskImage:
                "radial-gradient(circle 44px at 50% 150%, transparent 43px, black 45px)",
              WebkitMaskImage:
                "radial-gradient(circle 44px at 50% 150%, transparent 43px, black 45px)",
              filter: "drop-shadow(0 5px 12px rgba(0,0,0,0.07))",
            }}
          />

          {/* Logo — centered, protruding */}
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
          <div className="absolute left-4 sm:left-6 inset-y-0 flex items-center">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button aria-label="Open menu" className="text-zinc-800 hover:text-zinc-950 transition-colors p-1">
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="flex flex-col p-0 w-75 sm:w-85 bg-white">

                {/* Sheet header — spacer so the auto-rendered close button has its own row */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation links</SheetDescription>
                <div className="h-14 shrink-0 border-b border-zinc-100" aria-hidden="true" />

                {/* Nav links */}
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

                {/* Actions */}
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

              </SheetContent>
            </Sheet>
          </div>

          {/* Cart — right */}
          <div className="absolute right-4 sm:right-6 inset-y-0 flex items-center gap-3">
            <Link href="/login" aria-label="Account" className="text-zinc-700 hover:text-zinc-950 transition-colors p-1">
              <User className="size-6" />
            </Link>
            <Link href="/cart" aria-label="Cart" className="text-zinc-700 hover:text-zinc-950 transition-colors p-1">
              <ShoppingCart className="size-6" />
            </Link>
          </div>

        </div>
      </div>

    </header>
  )
}
