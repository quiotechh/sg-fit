import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { slug } = await params
  const program = await prisma.program.findUnique({ where: { slug } })
  if (!program) return NextResponse.json({ error: "Program not found" }, { status: 404 })

  await prisma.cartItem.deleteMany({
    where: { userId: session.user.id, programId: program.id },
  })

  return NextResponse.json({ status: "ok" })
}
