"use client";

import React, { useState, useEffect, useTransition, useActionState } from "react";
import {
  Users,
  Plus,
  Eye,
  EyeOff,
  Loader2,
  ShieldAlert,
  CheckCircle,
  XCircle,
  UserX,
  UserCheck,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import {
  createAdminUser,
  toggleUserActive,
  resetUserPassword,
  type CreateAdminState,
  type ResetPasswordState,
} from "@/lib/actions/superadmin";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  superadmin: { label: "Super Admin", color: "bg-[rgba(201,168,76,0.15)] text-[#c9a84c]" },
  admin: { label: "Admin", color: "bg-blue-500/15 text-blue-400" },
  content_manager: { label: "Content Manager", color: "bg-purple-500/15 text-purple-400" },
};

export default function SuperAdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [toggling, startToggle] = useTransition();
  const [activeResetId, setActiveResetId] = useState<string | null>(null);

  const [createState, createAction, createPending] = useActionState<CreateAdminState, FormData>(
    createAdminUser,
    {}
  );
  const [resetState, resetAction, resetPending] = useActionState<ResetPasswordState, FormData>(
    resetUserPassword,
    {}
  );

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [createState.success, resetState.success]);

  const handleToggle = (userId: string, currentActive: boolean) => {
    startToggle(async () => {
      await toggleUserActive(userId, !currentActive);
      fetchUsers();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold">User Management</h1>
          <p className="text-white/40 text-sm mt-1">
            Create and manage administrator accounts
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Admin
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="mb-8 p-6 border border-[rgba(201,168,76,0.2)] rounded-sm bg-[rgba(201,168,76,0.04)]">
          <h2 className="text-white font-medium mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#c9a84c]" />
            Create New Admin Account
          </h2>

          {createState.error && (
            <div className="flex items-center gap-2 p-3 mb-4 border border-red-500/30 rounded-sm bg-red-500/10 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {createState.error}
            </div>
          )}
          {createState.success && (
            <div className="flex items-center gap-2 p-3 mb-4 border border-green-500/30 rounded-sm bg-green-500/10 text-green-400 text-xs">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Admin account created successfully.
            </div>
          )}

          <form action={createAction} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs mb-1.5">Full Name</label>
              <input
                name="name"
                required
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1.5">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                placeholder="admin@rockonesquare.com"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  minLength={12}
                  className="w-full px-3 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="Min 12 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1.5">Role</label>
              <select
                name="role"
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
              >
                <option value="admin">Admin (24h session)</option>
                <option value="content_manager">Content Manager (24h session)</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={createPending}
                className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors disabled:opacity-50"
              >
                {createPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-white/10 text-white/60 text-sm rounded-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-6 h-6 text-[#c9a84c] animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="p-12 text-center border border-white/5 rounded-sm">
          <Users className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No admin users found. Create one above.</p>
        </div>
      ) : (
        <div className="border border-white/5 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {["Name", "Email", "Role", "Status", "Last Login", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-white/30 text-xs font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const roleInfo = ROLE_LABELS[user.role] || { label: user.role, color: "bg-white/10 text-white/40" };
                const isSuperAdmin = user.role === "superadmin";
                return (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {isSuperAdmin && <ShieldAlert className="w-3.5 h-3.5 text-[#c9a84c] flex-shrink-0" />}
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60 text-xs">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-sm text-xs ${roleInfo.color}`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.isActive ? (
                        <span className="flex items-center gap-1.5 text-xs text-green-400">
                          <CheckCircle className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-red-400">
                          <XCircle className="w-3.5 h-3.5" /> Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Never"}
                    </td>
                    <td className="px-4 py-3">
                      {!isSuperAdmin && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggle(user.id, user.isActive)}
                            disabled={toggling}
                            title={user.isActive ? "Disable account" : "Enable account"}
                            className={`p-1.5 rounded-sm transition-colors ${
                              user.isActive
                                ? "text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
                                : "text-green-400/60 hover:text-green-400 hover:bg-green-500/10"
                            }`}
                          >
                            {user.isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => setActiveResetId(user.id === activeResetId ? null : user.id)}
                            title="Reset password"
                            className="p-1.5 rounded-sm text-amber-400/60 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Reset Password Inline Form */}
      {activeResetId && (
        <div className="mt-6 p-5 border border-amber-500/20 rounded-sm bg-amber-500/5">
          <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            Reset Password for: {users.find((u) => u.id === activeResetId)?.name}
          </h3>
          {resetState.error && (
            <p className="text-red-400 text-xs mb-3">{resetState.error}</p>
          )}
          {resetState.success && (
            <p className="text-green-400 text-xs mb-3">Password reset. User will need to log in again.</p>
          )}
          <form action={resetAction} className="flex gap-3 items-end">
            <input type="hidden" name="userId" value={activeResetId} />
            <div className="flex-1">
              <label className="block text-white/60 text-xs mb-1.5">New Password (min 12 chars)</label>
              <input
                name="newPassword"
                type="password"
                required
                minLength={12}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={resetPending}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm rounded-sm hover:bg-amber-500/30 transition-colors"
            >
              {resetPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset"}
            </button>
            <button
              type="button"
              onClick={() => setActiveResetId(null)}
              className="px-4 py-2.5 border border-white/10 text-white/40 text-sm rounded-sm hover:text-white transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
