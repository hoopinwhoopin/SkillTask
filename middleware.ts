import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of paths that require authentication
const protectedPaths = ["/dashboard", "/my-roadmaps", "/discussions", "/profile", "/roadmap", "/admin"]

// List of paths that should redirect to dashboard if user is already authenticated
const authPaths = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes("favicon.ico") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next()
  }

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isAuthPath = authPaths.some((path) => pathname === path)

  // For client-side auth, we'll use a different approach
  // Instead of redirecting in middleware, we'll handle auth in the components
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
