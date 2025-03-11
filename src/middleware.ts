import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ["/login", "/register"];

  // Allow public routes without authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get authentication token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // Redirect to login if no token is found (user is not authenticated)
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated, allow access to all pages
  return NextResponse.next();
}

// Apply the middleware to all routes except static files (_next, api, etc.)
export const config = {
  matcher: ["/((?!_next|api/.*|favicon.ico).*)"],
};

export default middleware;
