import React from "react";
import { prisma } from "@/lib/db/prisma";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { FileText } from "lucide-react";

export const dynamic = 'force-dynamic'

async function getAuditLog() {
  try {
    return await prisma.auditLog.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AuditLogPage() {
  await requireSuperAdmin();
  const entries = await getAuditLog();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#c9a84c]" />
          Audit Log
        </h1>
        <p className="text-white/40 text-sm mt-1">
          All administrative actions — last 100 entries.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="p-12 text-center border border-white/5 rounded-sm">
          <FileText className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No audit entries yet.</p>
        </div>
      ) : (
        <div className="border border-white/5 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {["Timestamp", "Admin", "Action", "Entity", "Details"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-white/30 text-xs font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/2">
                  <td className="px-4 py-3 text-white/40 text-xs">
                    {new Date(e.createdAt).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-white/70 text-xs">
                    {e.user ? `${e.user.name}` : "System"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs bg-[rgba(201,168,76,0.1)] text-[#c9a84c] rounded-sm font-mono">
                      {e.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-xs">
                    {e.entityType}
                    {e.entityId ? ` #${e.entityId.slice(-8)}` : ""}
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs font-mono max-w-xs truncate">
                    {e.newValues ? JSON.stringify(e.newValues).slice(0, 80) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
