import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if accessing admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionToken = request.cookies.get("session_token")?.value

    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Basic token validation (check expiry)
    try {
      const decoded = Buffer.from(sessionToken, "base64").toString("utf-8")
      const [, expires] = decoded.split(":")

      if (new Date(expires) < new Date()) {
        const loginUrl = new URL("/admin/login", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete("session_token")
        return response
      }
    } catch {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
