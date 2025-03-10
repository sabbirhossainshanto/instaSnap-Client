import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// import { getCurrentUser } from "./services/AuthService";

const roleBasedRoutes = {
  USER: [/^\//],
  ADMIN: [/^\/admin/],
};
type TRole = keyof typeof roleBasedRoutes;

async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow unauthenticated access to public routes like login or register
  const publicRoutes = ["/login", "/register"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the user is logged in
  const user: any = null;

  // Redirect to login if the user is not logged in
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow logged-in users to access all unrestricted routes
  const restrictedRoutes = roleBasedRoutes[user.role as TRole] || [];

  // If the current route matches a restricted route for this role, allow access
  if (restrictedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // If the route is restricted and doesn't match the user's role, deny access
  if (
    Object.values(roleBasedRoutes).some((routes) =>
      routes.some((route) => pathname.match(route))
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow logged-in users to access other routes (e.g., /, /blog)
  return NextResponse.next();
}

// Configure the paths that the middleware should match
export const config = {
  matcher: ["/admin", "/login", "/register", "/:path"],
};

export default middleware;
