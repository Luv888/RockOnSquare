import React from "react";
import Link from "next/link";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";
import {
  Users,
  ShieldAlert,
  Layout,
  TrendingUp,
  FileText,
  Settings,
  Clock,
} from "lucide-react";

export const dynamic = 'force-dynamic';

async function getSuperAdminStats() {
  try {
    const [totalUsers, adminUsers, totalEnquiries, newEnquiries, totalBanners] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: "admin" } }),
        prisma.enquiry.count(),
        prisma.enquiry.count({ where: { status: "NEW" } }),
        prisma.banner.count({ where: { status: "PUBLISHED" } }),
      ]);
    const recentAudit = await prisma.auditLog.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });
    return { totalUsers, adminUsers, totalEnquiries, newEnquiries, totalBanners, recentAudit };
  } catch {
    return {
      totalUsers: 0,
      adminUsers: 0,
      totalEnquiries: 0,
      newEnquiries: 0,
      totalBanners: 0,
      recentAudit: [],
    };
  }
}

export default async function SuperAdminDashboard() {
  const session = await requireSuperAdmin();
  const stats = await getSuperAdminStats();

  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      href: "/superadmin/users",
      color: "text-[#c9a84c]",
    },
    {
      label: "Admin Accounts",
      value: stats.adminUsers,
      icon: ShieldAlert,
      href: "/superadmin/users",
      color: "text-purple-400",
    },
    {
      label: "Total Enquiries",
      value: stats.totalEnquiries,
      icon: TrendingUp,
      href: "/admin/leads",
      color: "text-blue-400",
    },
    {
      label: "New Leads",
      value: stats.newEnquiries,
      icon: Clock,
      href: "/admin/leads?status=NEW",
      color: "text-orange-400",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] rounded-sm">
          <ShieldAlert className="w-3.5 h-3.5 text-[#c9a84c]" />
          <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-widest">
            Super Administrator
          </span>
        </div>
        <h1 className="text-white text-2xl font-semibold">Super Admin Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">
          Welcome back, {session?.user?.name || "Super Admin"} · Full system access
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="p-5 border border-white/5 rounded-sm bg-white/2 hover:border-[rgba(201,168,76,0.2)] transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-3xl font-light ${color}`}>{value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: "Manage Admin Users", href: "/superadmin/users", icon: Users },
          { label: "View Audit Log", href: "/superadmin/audit", icon: FileText },
          { label: "System Settings", href: "/superadmin/settings", icon: Settings },
          { label: "Manage Banners", href: "/admin/banners", icon: Layout },
          { label: "View All Leads", href: "/admin/leads", icon: TrendingUp },
          { label: "Admin Dashboard", href: "/admin/dashboard", icon: ShieldAlert },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 px-4 py-3 border border-white/5 rounded-sm text-sm text-white/60 hover:text-white hover:border-[rgba(201,168,76,0.2)] transition-colors"
          >
            <Icon className="w-4 h-4 text-[#c9a84c]" />
            {label}
          </Link>
        ))}
      </div>

      {/* Recent Audit Log */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-medium">Recent Activity</h2>
          <Link href="/superadmin/audit" className="text-[#c9a84c] text-xs hover:underline">
            View all →
          </Link>
        </div>
        {stats.recentAudit.length === 0 ? (
          <div className="p-8 text-center border border-white/5 rounded-sm">
            <p className="text-white/30 text-sm">No audit entries yet. Actions by admins will appear here.</p>
          </div>
        ) : (
          <div className="border border-white/5 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  {["Time", "User", "Action", "Entity"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-white/30 text-xs font-medium uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentAudit.map((entry) => (
                  <tr key={entry.id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="px-4 py-3 text-white/40 text-xs">
                      {new Date(entry.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-white/70 text-xs">
                      {entry.user?.name || "System"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-xs bg-[rgba(201,168,76,0.1)] text-[#c9a84c] rounded-sm font-mono">
                        {entry.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-xs">
                      {entry.entityType}
                      {entry.entityId ? ` #${entry.entityId.slice(-6)}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
