import { describe, it, expect, vi, afterEach } from 'vitest'
import type { JWT } from 'next-auth/jwt'
import { checkRateLimit, clearRateLimit, clientIp, safeRedirectPath } from '@/lib/utils'
import { authConfig, INACTIVITY_TIMEOUT_SECONDS, SESSION_DURATIONS } from '@/lib/auth/auth.config'

const jwt = (args: { token: JWT; user?: Record<string, unknown> }) =>
  authConfig.callbacks.jwt(args as never)

describe('Admin Authentication Security', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('enforces rate limiting on repeated failed attempts and clears on success', () => {
    const testKey = `test-limit-${Date.now()}`
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(testKey, 5, 60000).allowed).toBe(true)
    }
    const blocked = checkRateLimit(testKey, 5, 60000)
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)

    clearRateLimit(testKey)
    expect(checkRateLimit(testKey, 5, 60000).allowed).toBe(true)
  })

  it('only allows same-origin relative callback URLs', () => {
    expect(safeRedirectPath('/admin/leads?status=NEW', '/x')).toBe('/admin/leads?status=NEW')
    expect(safeRedirectPath(null, '/x')).toBe('/x')
    expect(safeRedirectPath('https://evil.com', '/x')).toBe('/x')
    expect(safeRedirectPath('//evil.com/admin', '/x')).toBe('/x')
    expect(safeRedirectPath('/\\evil.com', '/x')).toBe('/x')
    expect(safeRedirectPath('javascript:alert(1)', '/x')).toBe('/x')
  })

  it('takes client IP from x-real-ip or the proxy-appended X-Forwarded-For entry', () => {
    expect(clientIp(new Headers({ 'x-real-ip': '1.1.1.1', 'x-forwarded-for': '6.6.6.6' }))).toBe('1.1.1.1')
    expect(clientIp(new Headers({ 'x-forwarded-for': '6.6.6.6, 2.2.2.2' }))).toBe('2.2.2.2')
    expect(clientIp(new Headers())).toBeNull()
  })

  it('issues a token with role-based lifetime and session id on sign-in', () => {
    vi.useFakeTimers({ now: 1_000_000_000 })
    const token = jwt({
      token: {},
      user: { id: 'u1', email: 'a@b.com', role: 'superadmin', sessionId: 's1' },
    })
    expect(token).toMatchObject({ id: 'u1', role: 'superadmin', sessionId: 's1', lastActive: 1_000_000 })
    expect(token?.maxLifetime).toBe(1_000_000 + SESSION_DURATIONS.superadmin)
  })

  it('rejects tokens past max lifetime, idle too long, or without a server session', () => {
    vi.useFakeTimers({ now: 1_000_000_000 })
    const now = 1_000_000
    const valid: JWT = { id: 'u1', role: 'admin', sessionId: 's1', lastActive: now - 60, maxLifetime: now + 60 }

    expect(jwt({ token: { ...valid } })?.lastActive).toBe(now)
    expect(jwt({ token: { ...valid, maxLifetime: now - 1 } })).toBeNull()
    expect(jwt({ token: { ...valid, lastActive: now - INACTIVITY_TIMEOUT_SECONDS - 1 } })).toBeNull()
    expect(jwt({ token: { ...valid, sessionId: undefined } })).toBeNull()
  })
})
