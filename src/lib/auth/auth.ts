import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { checkRateLimit, clearRateLimit, clientIp } from "@/lib/utils";
import { prisma } from "@/lib/db/prisma";
import { authConfig, PANEL_ROLES, sessionLifetime } from "./auth.config";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(200),
  panel: z.enum(["admin", "superadmin"]).default("admin"),
});

// Compared against when the user doesn't exist, so response time doesn't reveal valid emails
const DUMMY_HASH = "$2a$12$2xr8.prfvpOlsoiwNgYM6u4oLJ6ONIAtuQVid4Ao02z0.doQmm9gW";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

class RateLimitedError extends CredentialsSignin {
  code = "rate_limited";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        panel: { label: "Panel", type: "text" }, // "admin" | "superadmin"
      },
      async authorize(credentials, request) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password, panel } = parsed.data;

        // Rate limiting: 5 attempts per email and 20 per IP per 15 minutes
        // (IP limit skipped when unknown, so all such requests don't share one bucket)
        // ponytail: in-memory per instance; move to a shared store (Redis) if running many instances
        const emailKey = `admin-login:${email}`;
        const ip = clientIp(request.headers);
        if (
          !checkRateLimit(emailKey, 5, RATE_LIMIT_WINDOW_MS).allowed ||
          (ip && !checkRateLimit(`admin-login-ip:${ip}`, 20, RATE_LIMIT_WINDOW_MS).allowed)
        ) {
          throw new RateLimitedError();
        }

        const user = await prisma.user.findUnique({ where: { email } });
        const isValid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
        if (!user || !isValid || !user.isActive) return null;

        // Enforce role access by panel
        const allowedRoles = panel === "superadmin" ? ["superadmin"] : PANEL_ROLES;
        if (!allowedRoles.includes(user.role)) return null;

        clearRateLimit(emailKey);

        // Server-side session record — lets logout, disable and password reset revoke the JWT
        const now = new Date();
        const session = await prisma.session.create({
          data: {
            userId: user.id,
            tokenFamily: crypto.randomUUID(),
            expiresAt: new Date(now.getTime() + sessionLifetime(user.role) * 1000),
          },
        });
        // Housekeeping — non-fatal
        await Promise.all([
          prisma.session.deleteMany({ where: { userId: user.id, expiresAt: { lt: now } } }),
          prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: now } }),
        ]).catch((err) => console.error("[Auth] Post-login update failed:", err));

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          sessionId: session.id,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt(params) {
      const token = authConfig.callbacks.jwt(params);
      if (!token || params.user) return token;

      // Verify the server-side session and account on every read, so revocation is immediate
      try {
        const session = await prisma.session.findUnique({
          where: { id: token.sessionId },
          select: {
            userId: true,
            isRevoked: true,
            expiresAt: true,
            user: { select: { isActive: true, role: true } },
          },
        });
        if (
          !session ||
          session.isRevoked ||
          session.expiresAt < new Date() ||
          session.userId !== token.id ||
          !session.user.isActive ||
          !PANEL_ROLES.includes(session.user.role)
        ) {
          return null;
        }
        token.role = session.user.role; // Role may have changed
        return token;
      } catch (err) {
        console.error("[Auth] Session verification failed:", err);
        return null; // Fail closed
      }
    },
  },
  events: {
    async signOut(message) {
      const sessionId = "token" in message ? message.token?.sessionId : undefined;
      if (!sessionId) return;
      await prisma.session
        .updateMany({ where: { id: sessionId }, data: { isRevoked: true } })
        .catch((err) => console.error("[Auth] Failed to revoke session:", err));
    },
  },
});
