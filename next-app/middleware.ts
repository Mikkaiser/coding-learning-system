import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";

function isPublicPath(pathname: string) {
  if (pathname === "/login") return true;
  if (pathname.startsWith("/api/auth")) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const user = token ? await verifyAuthToken(token) : null;

  // Already signed in: keep /login private.
  if (pathname === "/login" && user) {
    const url = req.nextUrl.clone();
    url.pathname = "/challenges";
    return NextResponse.redirect(url);
  }

  // Only /login and /api/auth/* are public.
  if (!user && !isPublicPath(pathname)) {
    // For API routes, return 401 JSON instead of redirect.
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Role gate: students cannot access /admin/*
  if (user && pathname.startsWith("/admin") && user.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/challenges";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|monaco/).*)"
  ]
};

