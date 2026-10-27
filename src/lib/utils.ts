import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique enquiry reference ID.
 * Format: ROS-YYYYMMDD-XXXXX
 */
export function generateReferenceId(): string {
  const date = new Date()
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, '')
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `ROS-${datePart}-${randomPart}`
}

/**
 * Format a number with Indian comma notation.
 */
export function formatIndianNumber(n: number): string {
  return n.toLocaleString('en-IN')
}

/**
 * Format area with unit.
 */
export function formatArea(sqM?: number | null, sqFt?: number | null): string {
  if (sqFt) return `${formatIndianNumber(sqFt)} sq.ft`
  if (sqM) return `${formatIndianNumber(sqM)} sq.m`
  return 'Area on request'
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

/**
 * Simple in-memory rate limiter for API routes.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}

export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key)
}

/**
 * Canonical mappings for known duplicate image assets.
 */
export const ASSET_CANONICAL_MAP: Record<string, string> = {
  '/images/modern-offices.jpg': '/images/office-1.jpg',
  '/images/retail.jpg': '/images/retail-1.jpg',
  '/images/dining-rooftop.jpg': '/images/fine-dining-1.jpg',
  '/images/building-elevation.jpg': '/images/building-front.jpg',
  '/images/studio-suite.jpg': '/images/office-2.jpg',
  '/images/gaming-zone.jpg': '/images/gaming-entertainment.jpg',
}

/**
 * Normalize image URLs for duplicate detection.
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return ''

  let cleaned = url.trim().toLowerCase()
  cleaned = cleaned.replace(/^https?:\/\/[^/]+/i, '')
  cleaned = cleaned.split('?')[0].split('#')[0]

  if (!cleaned.startsWith('/')) {
    cleaned = '/' + cleaned
  }

  return ASSET_CANONICAL_MAP[cleaned] || cleaned
}

/**
 * Deduplicate gallery items by normalized image URL.
 * Preserves the first occurrence.
 */
export function deduplicateGalleryItems<T extends { imageUrl: string }>(
  items: T[]
): T[] {
  const seen = new Set<string>()
  const result: T[] = []

  for (const item of items) {
    const key = normalizeImageUrl(item.imageUrl)

    if (!key || seen.has(key)) {
      continue
    }

    seen.add(key)
    result.push(item)
  }

  return result
}

/**
 * Prevent open redirects by allowing only same-origin relative paths.
 */
export function safeRedirectPath(
  target: string | null | undefined,
  fallback: string
): string {
  if (!target || !target.startsWith('/')) return fallback

  try {
    const base = 'http://internal.invalid'
    const url = new URL(target, base)

    return url.origin === base
      ? url.pathname + url.search + url.hash
      : fallback
  } catch {
    return fallback
  }
}

/**
 * Identify the client IP for rate limiting.
 */
export function clientIp(headers: Headers): string | null {
  const realIp = headers.get('x-real-ip')?.trim()

  if (realIp) return realIp

  const forwarded = headers
    .get('x-forwarded-for')
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  return forwarded?.at(-1) || null
}