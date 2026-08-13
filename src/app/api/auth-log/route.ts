import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { logEvent } from "@/lib/auditLog"

const ALLOWED_EVENTS = ["auth.login_failed", "auth.signout"]

export async function POST(request: Request) {
  const { event, metadata } = await request.json()

  if (!ALLOWED_EVENTS.includes(event)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 })
  }

  const h = await headers()
  const ipAddress = h.get("x-forwarded-for") ?? undefined
  const userAgent = h.get("user-agent") ?? undefined

  if (event === "auth.signout") {
    // This request runs BEFORE authClient.signOut() actually destroys the
    // session, so the session is still valid and readable here.
    const session = await auth.api.getSession({ headers: h })
    await logEvent({
      userId: session?.user.id,
      userEmail: session?.user.email,
      event: "auth.signout",
      success: true,
      ipAddress,
      userAgent,
    })
    return NextResponse.json({ status: "ok" })
  }

  await logEvent({
    userEmail: metadata?.email,
    event: "auth.login_failed",
    success: false,
    ipAddress,
    userAgent,
    metadata,
  })

  return NextResponse.json({ status: "ok" })
}
