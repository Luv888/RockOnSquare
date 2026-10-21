import React from "react";
import { prisma } from "@/lib/db/prisma";
import { updatePrivilegedSetting } from "@/lib/actions/superadmin";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { Settings, Shield } from "lucide-react";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

async function getSettings() {
  try {
    return await prisma.siteSetting.findMany({ orderBy: { group: "asc" } });
  } catch {
    return [];
  }
}

export default async function SuperAdminSettingsPage() {
  await requireSuperAdmin();
  const settings = await getSettings();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#c9a84c]" />
          Privileged Settings
        </h1>
        <p className="text-white/40 text-sm mt-1">
          System-wide configuration — superadmin only.
        </p>
      </div>

      <div className="p-6 border border-white/5 rounded-sm bg-white/2">
        <h2 className="text-white font-medium mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#c9a84c]" />
          Site Settings ({settings.length} entries)
        </h2>

        {settings.length === 0 ? (
          <p className="text-white/30 text-sm">
            No settings in database yet. Run{" "}
            <code className="text-[#c9a84c] text-xs">pnpm db:seed</code> to populate initial settings.
          </p>
        ) : (
          <div className="space-y-3">
            {settings.map((s) => (
              <form
                key={s.id}
                action={async (formData: FormData) => {
                  "use server";
                  const value = formData.get("value") as string;
                  await updatePrivilegedSetting(s.key, value);
                }}
                className="flex gap-3 items-end"
              >
                <div className="flex-1">
                  <label className="block text-white/60 text-xs mb-1.5 font-mono">
                    {s.key}
                    {s.label && s.label !== s.key && (
                      <span className="text-white/30 ml-2 font-sans">({s.label})</span>
                    )}
                  </label>
                  <input
                    name="value"
                    defaultValue={s.value || ""}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 text-xs bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#c9a84c] rounded-sm hover:bg-[rgba(201,168,76,0.2)] transition-colors"
                >
                  Save
                </button>
              </form>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <ChangePasswordForm loginPath="/superadmin/login" />
      </div>
    </div>
  );
}
