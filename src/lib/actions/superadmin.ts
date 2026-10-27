"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

async function writeAuditLog(
  userId: string,
  action: string,
  entityType: string,
  entityId?: string,
  newValues?: Record<string, unknown>,
  oldValues?: Record<string, unknown>
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId: entityId ?? null,
        newValues: newValues ? JSON.parse(JSON.stringify(newValues)) : null,
        oldValues: oldValues ? JSON.parse(JSON.stringify(oldValues)) : null,
      },
    });
  } catch {
    // Audit logging is non-fatal
  }
}

// ─── Create Admin User ────────────────────────────────────────────────────────

const CreateAdminSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().trim().toLowerCase().email("Valid email required"),
  password: z.string().min(12, "Password must be at least 12 characters").max(200),
  role: z.enum(["admin", "content_manager"]), // Superadmin cannot self-create superadmins via UI
});

export type CreateAdminState = {
  error?: string;
  success?: boolean;
};

export async function createAdminUser(
  _prev: CreateAdminState,
  formData: FormData
): Promise<CreateAdminState> {
  const session = await requireSuperAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = CreateAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }
  const data = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) {
    return { error: "A user with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      isActive: true,
    },
  });

  await writeAuditLog(session.user.id, "CREATE_USER", "User", newUser.id, {
    name: data.name,
    email: data.email,
    role: data.role,
  });

  revalidatePath("/superadmin/users");
  return { success: true };
}

// ─── Toggle User Active Status ────────────────────────────────────────────────

export async function toggleUserActive(userId: string, isActive: boolean): Promise<void> {
  const session = await requireSuperAdmin();

  // Prevent disabling yourself
  if (userId === session.user.id) {
    return; // Silently ignore
  }

  // Prevent disabling another superadmin
  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, email: true },
  });
  if (!targetUser) return;
  if (targetUser.role === "superadmin") return; // Cannot disable superadmins via UI

  await prisma.user.update({
    where: { id: userId },
    data: { isActive },
  });

  // Revoke all active sessions for this user
  if (!isActive) {
    await prisma.session.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
  }

  await writeAuditLog(
    session.user.id,
    isActive ? "ENABLE_USER" : "DISABLE_USER",
    "User",
    userId,
    { isActive },
    { isActive: !isActive }
  );

  revalidatePath("/superadmin/users");
}

// ─── Reset User Password ──────────────────────────────────────────────────────

const ResetPasswordSchema = z.object({
  userId: z.string().min(1),
  newPassword: z.string().min(12, "Password must be at least 12 characters").max(200),
});

export type ResetPasswordState = {
  error?: string;
  success?: boolean;
};

export async function resetUserPassword(
  _prev: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const session = await requireSuperAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = ResetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }
  const data = parsed.data;

  // Cannot reset own password via this action (use account settings)
  if (data.userId === session.user.id) {
    return { error: "Use account settings to change your own password." };
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: data.userId },
    select: { role: true },
  });
  if (!targetUser) return { error: "User not found." };
  if (targetUser.role === "superadmin") {
    return { error: "Cannot reset another superadmin password." };
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 12);
  await prisma.user.update({
    where: { id: data.userId },
    data: { password: hashedPassword },
  });

  // Revoke all sessions to force re-login
  await prisma.session.updateMany({
    where: { userId: data.userId, isRevoked: false },
    data: { isRevoked: true },
  });

  await writeAuditLog(session.user.id, "RESET_USER_PASSWORD", "User", data.userId);

  revalidatePath("/superadmin/users");
  return { success: true };
}

// ─── Update Site Setting (privileged) ────────────────────────────────────────

export async function updatePrivilegedSetting(key: string, value: string): Promise<void> {
  const session = await requireSuperAdmin();

  const old = await prisma.siteSetting.findUnique({ where: { key }, select: { value: true } });
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value, label: key, group: "system", isPublic: false },
  });

  await writeAuditLog(session.user.id, "UPDATE_SETTING", "SiteSetting", key, { value }, { value: old?.value });

  revalidatePath("/superadmin/settings");
  revalidatePath("/");
}
