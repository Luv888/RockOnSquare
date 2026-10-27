import type { NextAuthConfig } from "next-auth";

// Edge-safe auth config: no DB / Node-only imports. Shared by middleware and auth.ts.

export const PANEL_ROLES = ["admin", "superadmin", "content_manager"];

// Session durations (seconds)
export const SESSION_DURATIONS: Record<string, number> = {
  admin: 24 * 60 * 60,       // 24 hours
  superadmin: 7 * 24 * 60 * 60, // 7 days
  content_manager: 24 * 60 * 60,
};

// Inactivity timeout (applies to all roles)
export const INACTIVITY_TIMEOUT_SECONDS = 60 * 60; // 1 hour inactivity = re-login

export function sessionLifetime(role: string): number {
  return SESSION_DURATIONS[role] ?? SESSION_DURATIONS.admin;
}

const useSecureCookies = process.env.NODE_ENV === "production";
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const authConfig = {
  session: {
    strategy: "jwt",
    // maxAge is overridden per-role in jwt callback; set max possible here
    maxAge: SESSION_DURATIONS.superadmin,
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [],
  callbacks: {
    // Runs on every session read. In middleware the refreshed token is written
    // back to the cookie, which is what keeps `lastActive` current.
    jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      if (user) {
        // Initial sign-in: set role-based session lifetime
        const role = user.role || "admin";
        token.id = user.id;
        token.email = user.email ?? "";
        token.role = role;
        token.sessionId = user.sessionId;
        token.createdAt = now;
        token.lastActive = now;
        token.maxLifetime = now + sessionLifetime(role);
        return token;
      }

      // Tokens issued before server-side sessions existed are not revocable
      if (!token.id || !token.role || !token.sessionId) return null;

      // 1. Absolute maximum lifetime (role-based)
      if (!token.maxLifetime || now > token.maxLifetime) return null;

      // 2. Inactivity timeout
      if (!token.lastActive || now - token.lastActive > INACTIVITY_TIMEOUT_SECONDS) return null;

      token.lastActive = now;
      return token;
    },

    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.maxLifetime = token.maxLifetime;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
