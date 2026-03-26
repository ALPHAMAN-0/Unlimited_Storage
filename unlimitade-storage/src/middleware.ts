import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/login", "/api/auth/telegram"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = request.cookies.get("unlimitade-session");
  if (!session && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.ico$).*)"],
};
