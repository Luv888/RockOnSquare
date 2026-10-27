import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig, PANEL_ROLES } from "@/lib/auth/auth.config";

// Edge auth: verifies the JWT signature, lifetime and inactivity, and refreshes
// the session cookie. Revocation (DB) is checked server-side by auth() in layouts,
// server actions and API routes.
const { auth } = NextAuth(authConfig);

const LOGIN_PAGES = ["/admin/login", "/superadmin/login"];

export default auth((req) => {
  const { pathname, searchParams } = req.nextUrl;
  const role = req.auth?.user?.role;
  const isSuperAdminRoute = pathname.startsWith("/superadmin");
  const allowed = isSuperAdminRoute
    ? role === "superadmin"
    : !!role && PANEL_ROLES.includes(role);

  if (LOGIN_PAGES.includes(pathname)) {
    // Signed in already → skip the form. Not when `reason` is set: that means the
    // DB guard rejected this JWT (e.g. revoked), and bouncing back would loop.
    if (allowed && !searchParams.has("reason")) {
      const dashboard = isSuperAdminRoute ? "/superadmin/dashboard" : "/admin/dashboard";
      return NextResponse.redirect(new URL(dashboard, req.url));
    }
    return NextResponse.next();
  }

  if (allowed) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: role ? 403 : 401 });
  }

  const loginUrl = new URL(isSuperAdminRoute ? "/superadmin/login" : "/admin/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  if (role) loginUrl.searchParams.set("reason", "unauthorized");
  // Cookie present but rejected → lifetime/inactivity limit hit
  else if (req.cookies.has(authConfig.cookies.sessionToken.name)) loginUrl.searchParams.set("reason", "expired");
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/admin/:path*", "/superadmin/:path*", "/api/admin/:path*"],
};
