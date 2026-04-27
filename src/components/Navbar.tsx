"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

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

function DesktopDropdown({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string }[]
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-3 w-52 rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
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
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-base font-medium text-foreground"
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <ChevronDown className="size-4 text-muted-foreground" />
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
            <div className="pb-2 flex flex-col">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="py-2.5 pl-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo/sg-fit-logo-1.png"
              alt="SG FIT"
              width={48}
              height={48}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <DesktopDropdown label="Programs" items={programsItems} />
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/community"
              className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
            >
              Community
            </Link>
            <DesktopDropdown label="More" items={moreItems} />
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="size-5" />
              </Link>
            </Button>
          </div>

          {/* Mobile / Tablet Right Actions */}
          <div className="flex lg:hidden items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="size-5" />
              </Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={cn(
                  "flex flex-col p-0 w-[300px] sm:w-[340px]",
                )}
              >
                {/* Sheet Header */}
                <SheetTitle className="flex items-center px-5 py-4 border-b border-border">
                  <Image
                    src="/logo/sg-fit-logo-1.png"
                    alt="SG FIT"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                </SheetTitle>

                {/* Mobile Nav Links */}
                <nav className="flex-1 overflow-y-auto px-5 py-2">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border py-3.5 text-base font-medium text-foreground"
                  >
                    Home
                  </Link>
                  <MobileAccordion
                    label="Programs"
                    items={programsItems}
                    onNavigate={() => setMobileOpen(false)}
                  />
                  <Link
                    href="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border py-3.5 text-base font-medium text-foreground"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/community"
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border py-3.5 text-base font-medium text-foreground"
                  >
                    Community
                  </Link>
                  <MobileAccordion
                    label="More"
                    items={moreItems}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-2.5 px-5 py-5 border-t border-border">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}
