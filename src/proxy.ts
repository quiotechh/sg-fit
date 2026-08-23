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
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    const response = NextResponse.redirect(loginUrl)
    response.headers.set("Cache-Control", "no-store")
    return response
  }

  if (session && isAuthPage) {
    const response = NextResponse.redirect(new URL("/dashboard", request.url))
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
    "/checkout/:path*",
    "/community/checkout/:path*",
    "/community/manage/:path*"
  ],
}
