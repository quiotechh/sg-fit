import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const items = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { program: true },
    orderBy: { addedAt: "asc" },
  })

  const cartItems = items.map((i) => ({
    slug: i.program.slug,
    category: i.program.category,
    title: i.program.title,
    level: i.program.level,
    duration: i.program.duration,
    price: i.program.price,
    bgClass: i.program.bgClass,
  }))

  return NextResponse.json({ items: cartItems })
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { slug } = await request.json()
  const program = await prisma.program.findUnique({ where: { slug } })
  if (!program) return NextResponse.json({ error: "Program not found" }, { status: 404 })

  await prisma.cartItem.upsert({
    where: { userId_programId: { userId: session.user.id, programId: program.id } },
    update: {},
    create: { userId: session.user.id, programId: program.id },
  })

  return NextResponse.json({ status: "ok" })
}
