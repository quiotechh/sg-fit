import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { initializeTransaction } from "@/lib/paystack"
import { calculateDiscount } from "@/lib/coupons"

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { couponCode } = await request.json()

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { program: true },
  })

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.program.price, 0)
  const discount = calculateDiscount(subtotal, couponCode)
  const total = Math.max(0, subtotal - discount)

  const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
  const programIds = cartItems.map((i) => i.programId)

  const result = await initializeTransaction({
    email: session.user.email,
    amount: Math.round(total * 100),
    callback_url: `${siteUrl}/checkout/success`,
    metadata: {
      userId: session.user.id,
      programIds,
      couponCode: couponCode ?? null,
    },
  })

  return NextResponse.json({ authorization_url: result.data.authorization_url })
}
