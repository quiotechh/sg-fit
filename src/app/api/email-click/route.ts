import { NextResponse } from "next/server"
import { logEvent } from "@/lib/auditLog"

const FALLBACK_DEST = "/my-programs/nutrition"

// Only ever redirect to a same-site relative path — never to an external URL.
// "//evil.com" and "/\evil.com" are both browser-treated as protocol-relative,
// so both must be rejected, not just a bare "http(s)://" prefix.
function isSafeDest(dest: string | null): dest is string {
  if (!dest) return false
  if (!dest.startsWith("/")) return false
  if (dest.startsWith("//") || dest.startsWith("/\\")) return false
  return true
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const rawDest = url.searchParams.get("dest")
  const reference = url.searchParams.get("ref")
  const dest = isSafeDest(rawDest) ? rawDest : FALLBACK_DEST

  await logEvent({
    event: "email.pdf_link_clicked",
    success: true,
    reference,
    metadata: {
      message: `Customer clicked the PDF-delivery email link for purchase reference ${reference ?? "(unknown)"} and was sent to ${dest}. This confirms the email was received and opened.`,
      dest,
    },
  })

  // Not request.url — behind ngrok (or any reverse proxy), the server sees the
  // request as plain http://localhost:3000 internally, not the public domain
  // the browser actually used. BETTER_AUTH_URL is the trusted public origin.
  const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
  return NextResponse.redirect(new URL(dest, siteUrl))
}
