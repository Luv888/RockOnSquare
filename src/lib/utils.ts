import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique enquiry reference ID.
 * Format: ROS-YYYYMMDD-XXXXX (where X is alphanumeric)
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
 * Format area with unit
 */
export function formatArea(sqM?: number | null, sqFt?: number | null): string {
  if (sqFt) return `${formatIndianNumber(sqFt)} sq.ft`
  if (sqM) return `${formatIndianNumber(sqM)} sq.m`
  return 'Area on request'
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

/**
 * Simple in-memory rate limiter for API routes (use Redis/Upstash in production)
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
 * Known visual asset canonical mappings for Rock One Square to detect and prevent
 * duplicate image entries pointing to the same underlying photography.
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
 * Normalize an image URL for strict deduplication comparison:
 * - Strips protocol/host if pointing to local assets
 * - Strips query parameters and hashes
 * - Strips trailing slashes
 * - Resolves known image aliases/duplicates to canonical asset paths
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return ''
  let cleaned = url.trim().toLowerCase()
  // Remove protocol and host if present
  cleaned = cleaned.replace(/^https?:\/\/[^/]+/i, '')
  // Remove query strings and anchors
  cleaned = cleaned.split('?')[0].split('#')[0]
  // Normalize leading slash
  if (!cleaned.startsWith('/')) {
    cleaned = '/' + cleaned
  }
  // Check canonical alias map
  return ASSET_CANONICAL_MAP[cleaned] || cleaned
}

/**
 * Deduplicate gallery items by normalized image URL.
 * Preserves first encounter order.
 */
export function deduplicateGalleryItems<T extends { imageUrl: string }>(items: T[]): T[] {
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
