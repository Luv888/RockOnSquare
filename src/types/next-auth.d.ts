import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string            // "admin" | "superadmin" | "content_manager"
      maxLifetime?: number    // Unix timestamp: absolute session expiry
    } & DefaultSession['user']
  }

  interface User {
    role?: string
    sessionId?: string        // Server-side Session document ID for revocation
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: string
    sessionId?: string   // Server-side Session document ID for revocation
    createdAt?: number   // Unix timestamp of initial sign-in
    lastActive?: number  // Unix timestamp of last activity
    maxLifetime?: number // Unix timestamp: absolute session expiry (role-based)
  }
}
