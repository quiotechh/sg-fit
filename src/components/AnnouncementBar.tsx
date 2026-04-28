"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function AnnouncementBar() {
  const [visible] = useState(true)

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="relative bg-zinc-950 px-4 sm:px-8 xl:px-12 py-3 xl:py-4 flex items-center justify-center">
            <p className="text-center text-[11px] sm:text-sm xl:text-base font-bold tracking-[0.06em] uppercase text-white leading-snug xl:leading-none [font-family:var(--font-barlow)]">
              <span className="mr-2">⚡</span>
              This Week Only — 10% Off +{" "}
              <span className="text-white">$1,000 in Free Mobility Training</span>{" "}
              <Link
                href="/signup"
                className="underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors duration-150"
              >
                When You Subscribe
              </Link>
            </p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
