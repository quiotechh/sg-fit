import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getPurchase } from "@/lib/data/purchases"
import { getSignedDownloadUrl } from "@/lib/r2"
import { logEvent } from "@/lib/auditLog"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  // Not request.url — behind ngrok (or any reverse proxy), the server sees the
  // request as plain http://localhost:3000 internally, not the public domain
  // the browser actually used. BETTER_AUTH_URL is the trusted public origin.
  const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"

  if (!session) {
    await logEvent({
      event: "download.unauthorized_attempt",
      success: false,
      metadata: {
        message: `Someone tried to open the download link for "${slug}" while logged out. They were redirected to login — not a purchase issue by itself, only worth investigating if it repeats a lot for the same slug.`,
        slug,
        reason: "no_session",
      },
    })
    const loginUrl = new URL("/login", siteUrl)
    loginUrl.searchParams.set("redirect", `/api/download/${slug}`)
    return NextResponse.redirect(loginUrl)
  }

  const program = await prisma.program.findUnique({ where: { slug } })
  if (!program || !program.fileKey) {
    return NextResponse.redirect(new URL("/not-found", siteUrl))
  }

  const purchase = await getPurchase(session.user.id, program.id)
  if (!purchase) {
    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "download.unauthorized_attempt",
      success: false,
      metadata: {
        message: `${session.user.email} is logged in and tried to download "${program.title}" but has NOT purchased it. Access was correctly blocked.`,
        slug,
        programTitle: program.title,
        reason: "not_purchased",
      },
    })
    return NextResponse.json({ error: "You have not purchased this item" }, { status: 403 })
  }

  try {
    const downloadFileName = `${program.slug}.pdf`
    const signedUrl = await getSignedDownloadUrl(program.fileKey, downloadFileName)

    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "download.pdf_accessed",
      success: true,
      metadata: {
        message: `${session.user.email} successfully generated a download link for "${program.title}" (verified purchase). This is proof they were able to access the file.`,
        slug,
        programTitle: program.title,
      },
    })

    return NextResponse.redirect(signedUrl)
  } catch (err) {
    await logEvent({
      userId: session.user.id,
      userEmail: session.user.email,
      event: "download.pdf_failed",
      success: false,
      metadata: {
        message: `${session.user.email} has a verified purchase of "${program.title}" but the download FAILED on our end (storage error, not a customer mistake) — needs investigation.`,
        slug,
        programTitle: program.title,
        error: String(err),
      },
    })
    return NextResponse.json({ error: "Download failed, please try again" }, { status: 500 })
  }
}
