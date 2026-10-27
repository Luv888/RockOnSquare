import { z } from 'zod'

// ============================================================
// ENQUIRY VALIDATION
// ============================================================

export const ENQUIRY_TYPES = [
  'GENERAL',
  'SITE_VISIT',
  'CALLBACK',
  'BROCHURE',
  'RETAIL',
  'OFFICE',
  'STUDIO',
  'OTHER',
] as const

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your full name')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),

  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Phone number is too long')
    .regex(
      /^[6-9]\d{9}$/,
      'Please enter a valid 10-digit Indian mobile number'
    ),

  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),

  countryCode: z.string().default('+91'),

  enquiryType: z.enum(ENQUIRY_TYPES, {
    errorMap: () => ({ message: 'Please select an enquiry type' }),
  }),

  offeringType: z.string().optional(),

  message: z
    .string()
    .max(1000, 'Message is too long')
    .optional()
    .or(z.literal('')),

  preferredDate: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),

  preferredTime: z.string().optional(),

  consentGiven: z.boolean().refine((v) => v === true, {
    message: 'You must agree to be contacted',
  }),

  // Honeypot — must be empty
  _hp: z.string().max(0, 'Bot detected').optional(),

  sourcePage: z.string().optional(),
  projectId: z.string().optional(),
  propertyId: z.string().optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

// ============================================================
// BANNER VALIDATION
// ============================================================

export const bannerSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().max(300).optional(),
  description: z.string().max(500).optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  mobileImageUrl: z.string().url().optional().or(z.literal('')),
  ctaLabel: z.string().max(50).optional(),
  ctaUrl: z.string().max(500).optional(),
  secondaryCtaLabel: z.string().max(50).optional(),
  secondaryCtaUrl: z.string().max(500).optional(),
  badge: z.string().max(50).optional(),
  sortOrder: z.number().int().default(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  projectId: z.string().optional(),
})

// ============================================================
// SITE SETTINGS VALIDATION
// ============================================================

export const siteSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().optional(),
  label: z.string().optional(),
  group: z.string().optional(),
  isPublic: z.boolean().default(false),
})

// ============================================================
// USER VALIDATION
// ============================================================

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  role: z.enum(['SUPER_ADMIN', 'CONTENT_MANAGER', 'SALES_MANAGER']),
})

// ============================================================
// FLOOR VALIDATION
// ============================================================

export const floorSchema = z.object({
  projectId: z.string(),
  floorNumber: z.number().int(),
  floorLabel: z.string().min(1).max(100),
  shortLabel: z.string().max(10).optional(),
  offeringType: z
    .enum(['RETAIL', 'ENTERTAINMENT', 'OFFICE', 'STUDIO_APARTMENT', 'HOTEL', 'DINING', 'OTHER'])
    .optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  sortOrder: z.number().int().default(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
})

// ============================================================
// AMENITY VALIDATION
// ============================================================

export const amenitySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  iconName: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
})

// ============================================================
// CONSTRUCTION UPDATE VALIDATION
// ============================================================

export const constructionUpdateSchema = z.object({
  projectId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  updateDate: z.string().transform((v) => new Date(v)),
  floorsCompleted: z.number().int().min(0).max(100).optional(),
  overallProgress: z.number().int().min(0).max(100).optional(),
  isMilestone: z.boolean().default(false),
  milestoneLabel: z.string().max(100).optional(),
  isPublished: z.boolean().default(false),
})

// ============================================================
// FAQ VALIDATION
// ============================================================

export const faqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1),
  projectId: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
})

// ============================================================
// GALLERY VALIDATION & DEDUPLICATION
// ============================================================

export const galleryItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150),
  category: z.enum(['ARCHITECTURE', 'ENTERTAINMENT', 'OFFICES', 'STUDIOS', 'RETAIL']),
  categoryLabel: z.string().min(1).max(50),
  imageUrl: z.string().min(1, 'Image path is required'),
  caption: z.string().max(300).optional().or(z.literal('')),
  details: z.string().max(1000).optional().or(z.literal('')),
})

export type GalleryItemInput = z.infer<typeof galleryItemSchema>
