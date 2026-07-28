import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

const authPages = ["/login", "/signup"]

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAuthPage = authPages.includes(request.nextUrl.pathname)

  if (!session && !isAuthPage) {
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.headers.set("Cache-Control", "no-store")
    return response
  }

  if (session && isAuthPage) {
    const response = NextResponse.redirect(new URL("/my-programs", request.url))
    response.headers.set("Cache-Control", "no-store")
    return response
  }

  const response = NextResponse.next()
  response.headers.set("Cache-Control", "no-store")
  return response
}

export const config = {
  matcher: [
    "/my-programs/:path*",
    "/community-dashboard/:path*",
    "/help",
    "/login",
    "/signup",
  ],
}
