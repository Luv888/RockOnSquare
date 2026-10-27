import React from "react";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { SuperAdminSidebar } from "@/components/superadmin/SuperAdminSidebar";

export default async function SuperAdminPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth guard — middleware can't check session revocation
  await requireSuperAdmin();

  return (
    <div className="flex min-h-screen bg-[#080d18]">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
