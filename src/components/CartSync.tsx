"use client"

import { useEffect, useRef } from "react"
import { authClient } from "@/lib/auth-client"
import { useCart } from "@/store/cartStore"

export default function CartSync() {
  const { data: session } = authClient.useSession()
  const items = useCart((s) => s.items)
  const hydrateFromServer = useCart((s) => s.hydrateFromServer)
  const syncedRef = useRef(false)

  useEffect(() => {
    if (!session) {
      syncedRef.current = false
      return
    }
    if (syncedRef.current) return
    syncedRef.current = true

    async function sync() {
      await Promise.all(
        items.map((item) =>
          fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: item.slug }),
          })
        )
      )
      const res = await fetch("/api/cart")
      const data = await res.json()
      hydrateFromServer(data.items)
    }
    sync()
  }, [session, items, hydrateFromServer])

  return null
}
