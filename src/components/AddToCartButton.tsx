"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/store/cartStore"
import type { Program } from "@/generated/prisma/client"
import { authClient } from "@/lib/auth-client"


export default function AddToCartButton({ program }: { program: Program }) {
  const { addItem, items } = useCart()
  const { data: session } = authClient.useSession()

  const alreadyInCart = items.some((i) => i.slug === program.slug)

  function handleClick() {
    addItem({
      slug:     program.slug,
      category: program.category,
      title:    program.title,
      level:    program.level,
      duration: program.duration,
      price:    program.price,
      bgClass:  program.bgClass,
    })

    if (session) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: program.slug }),
      })
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full inline-flex items-center justify-center gap-3 bg-zinc-950 text-white text-sm font-black uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-zinc-800 active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)]"
    >
      <ShoppingCart className="size-4" />
      {alreadyInCart ? "View in Cart" : `Add to Cart — $${program.price}`}
    </button>
  )
}
