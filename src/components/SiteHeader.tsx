"use client"

import { useEffect, useState } from "react"
import AnnouncementBar from "@/components/AnnouncementBar"
import Navbar from "@/components/Navbar"

export default function SiteHeader() {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    function onScroll() {
      setAtTop(window.scrollY < 5)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
      style={{ transform: atTop ? "translateY(0)" : "translateY(-110%)" }}
    >
      <AnnouncementBar />
      <Navbar />
    </div>
  )
}
