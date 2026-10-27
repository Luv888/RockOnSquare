import fs from 'fs'
import path from 'path'
import { describe, it, expect } from 'vitest'
import {
  generateReferenceId,
  formatIndianNumber,
  checkRateLimit,
  cn,
  normalizeImageUrl,
  deduplicateGalleryItems,
} from '@/lib/utils'
import { UNIQUE_GALLERY_ITEMS } from '@/components/public/ProjectGallery'

describe('Utils', () => {
  describe('cn (classNames merger)', () => {
    it('merges multiple class strings correctly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
    })

    it('resolves tailwind conflicts', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8')
    })
  })

  describe('generateReferenceId', () => {
    it('generates an ID starting with ROS-', () => {
      const id = generateReferenceId()
      expect(id).toMatch(/^ROS-\d{8}-[A-Z0-9]{5}$/)
    })

    it('generates unique IDs across consecutive calls', () => {
      const id1 = generateReferenceId()
      const id2 = generateReferenceId()
      expect(id1).not.toBe(id2)
    })
  })

  describe('formatIndianNumber', () => {
    it('formats Indian numbering system correctly', () => {
      expect(formatIndianNumber(100000)).toBe('1,00,000')
      expect(formatIndianNumber(10000000)).toBe('1,00,00,000')
      expect(formatIndianNumber(500)).toBe('500')
    })
  })

  describe('checkRateLimit', () => {
    it('allows requests within the limit', () => {
      const ip = 'test-ip-' + Math.random()
      const res = checkRateLimit(ip, 5, 60000)
      expect(res.allowed).toBe(true)
      expect(res.remaining).toBe(4)
    })

    it('blocks requests exceeding the limit', () => {
      const ip = 'blocked-ip-' + Math.random()
      for (let i = 0; i < 3; i++) {
        checkRateLimit(ip, 3, 60000)
      }
      const overLimit = checkRateLimit(ip, 3, 60000)
      expect(overLimit.allowed).toBe(false)
      expect(overLimit.remaining).toBe(0)
    })
  })

  describe('normalizeImageUrl', () => {
    it('normalizes local image paths with query parameters and casing', () => {
      expect(normalizeImageUrl('/images/building-front.jpg?v=1#preview')).toBe('/images/building-front.jpg')
      expect(normalizeImageUrl('images/building-front.jpg')).toBe('/images/building-front.jpg')
      expect(normalizeImageUrl('HTTPS://EXAMPLE.COM/images/building-front.jpg')).toBe('/images/building-front.jpg')
    })

    it('maps known duplicate asset aliases to canonical paths', () => {
      expect(normalizeImageUrl('/images/dining-rooftop.jpg')).toBe('/images/fine-dining-1.jpg')
      expect(normalizeImageUrl('/images/modern-offices.jpg')).toBe('/images/office-1.jpg')
      expect(normalizeImageUrl('/images/retail.jpg')).toBe('/images/retail-1.jpg')
      expect(normalizeImageUrl('/images/building-elevation.jpg')).toBe('/images/building-front.jpg')
      expect(normalizeImageUrl('/images/studio-suite.jpg')).toBe('/images/office-2.jpg')
    })
  })

  describe('deduplicateGalleryItems', () => {
    it('removes duplicate items based on exact or alias image paths', () => {
      const items = [
        { id: '1', title: 'Front Elevation', imageUrl: '/images/building-front.jpg' },
        { id: '2', title: 'Elevation Alias', imageUrl: '/images/building-elevation.jpg' }, // Duplicate of 1
        { id: '3', title: 'Aerial View', imageUrl: '/images/building-aerial.jpg' },
        { id: '4', title: 'Fine Dining', imageUrl: '/images/fine-dining-1.jpg' },
        { id: '5', title: 'Rooftop Dining', imageUrl: '/images/dining-rooftop.jpg' }, // Duplicate of 4
      ]

      const deduplicated = deduplicateGalleryItems(items)
      expect(deduplicated).toHaveLength(3)
      expect(deduplicated.map((i) => i.id)).toEqual(['1', '3', '4'])
    })

    it('preserves genuinely distinct items', () => {
      const items = [
        { id: 's1', imageUrl: '/images/studio-apartment-1.jpg' },
        { id: 's2', imageUrl: '/images/studio-apartment-2.jpg' },
        { id: 's3', imageUrl: '/images/studio-apartment-3.jpg' },
        { id: 's4', imageUrl: '/images/studio-apartment-4.jpg' },
      ]

      const deduplicated = deduplicateGalleryItems(items)
      expect(deduplicated).toHaveLength(4)
    })
  })

  describe('ProjectGallery Integrity', () => {
    it('contains strictly unique image items across all categories', () => {
      const normalizedUrls = UNIQUE_GALLERY_ITEMS.map((item) => normalizeImageUrl(item.imageUrl))
      const uniqueUrls = new Set(normalizedUrls)
      expect(uniqueUrls.size).toBe(UNIQUE_GALLERY_ITEMS.length)
    })

    it('preserves all approved commercial categories with correct perspective counts', () => {
      const arch = UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'ARCHITECTURE')
      const studios = UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'STUDIOS')
      const ent = UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'ENTERTAINMENT')
      const offices = UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'OFFICES')
      const retail = UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'RETAIL')

      expect(arch).toHaveLength(2)
      expect(studios).toHaveLength(4)
      expect(ent).toHaveLength(4)
      expect(offices).toHaveLength(2)
      expect(retail).toHaveLength(1)
      expect(UNIQUE_GALLERY_ITEMS).toHaveLength(13)
    })

    it('verifies that every referenced image file physically exists in public/', () => {
      for (const item of UNIQUE_GALLERY_ITEMS) {
        const filePath = path.join(process.cwd(), 'public', item.imageUrl.replace(/^\//, ''))
        expect(fs.existsSync(filePath), `Image file missing: ${filePath}`).toBe(true)
      }
    })
  })
})
