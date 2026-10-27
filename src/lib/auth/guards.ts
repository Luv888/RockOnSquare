import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { PANEL_ROLES } from "./auth.config";

// Deduped per render: layout + page share one DB session check.
// Call a guard in every page that reads data, not just the layout — layouts
// aren't re-rendered on client-side navigation.
export const getSession = cache(() => auth());

// Redirects always carry a `reason`: the edge middleware still trusts the JWT,
// and a reason-less login URL would bounce straight back here (redirect loop).
export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) redirect("/admin/login?reason=expired");
  if (!PANEL_ROLES.includes(session.user.role)) redirect("/admin/login?reason=unauthorized");
  return session;
}

export async function requireSuperAdmin() {
  const session = await getSession();
  if (!session?.user) redirect("/superadmin/login?reason=expired");
  if (session.user.role !== "superadmin") redirect("/superadmin/login?reason=unauthorized");
  return session;
}
