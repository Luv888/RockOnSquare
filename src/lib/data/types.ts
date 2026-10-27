export type PublishStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export type OfferingType =
  | 'RETAIL'
  | 'ENTERTAINMENT'
  | 'OFFICE'
  | 'STUDIO_APARTMENT'
  | 'HOTEL'
  | 'DINING'
  | 'OTHER'

export type EnquiryType =
  | 'GENERAL'
  | 'SITE_VISIT'
  | 'CALLBACK'
  | 'BROCHURE'
  | 'RETAIL'
  | 'OFFICE'
  | 'STUDIO'
  | 'OTHER'

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'FOLLOW_UP'
  | 'SITE_VISIT_SCHEDULED'
  | 'INTERESTED'
  | 'CONVERTED'
  | 'CLOSED'
  | 'NOT_INTERESTED'

export type LeadSource =
  | 'WEBSITE'
  | 'WHATSAPP'
  | 'PHONE'
  | 'REFERRAL'
  | 'WALK_IN'
  | 'DIGITAL_AD'
  | 'OTHER'

export interface Project {
  id: string
  slug: string
  name: string
  tagline?: string | null
  description?: string | null
  developerName: string
  address?: string | null
  city?: string | null
  state?: string | null
  country: string
  pincode?: string | null
  latitude?: number | null
  longitude?: number | null
  siteAreaAcres?: number | null
  builtUpAreaSqm?: number | null
  roadFrontageMtr?: number | null
  totalFloors?: number | null
  completedFloors?: number | null
  constructionStatus?: string | null
  status: PublishStatus
  featuredImage?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
}

export interface Offering {
  id: string
  projectId?: string
  slug: string
  type: OfferingType
  title: string
  shortDesc?: string | null
  description?: string | null
  coverImage?: string | null
  galleryUrls?: string[]
  floorInfo?: string | null
  highlights: string[]
  sortOrder: number
  status: PublishStatus
}

export interface Floor {
  id: string
  projectId?: string
  floorNumber: number
  floorLabel: string
  shortLabel?: string | null
  offeringType?: OfferingType | null
  description?: string | null
  imageUrls?: string[]
  highlights: string[]
  sortOrder: number
  status: PublishStatus
}

export interface Amenity {
  id: string
  name: string
  description?: string | null
  iconName?: string | null
  imageUrl?: string | null
  sortOrder: number
  isPublished: boolean
}

export interface FAQ {
  id: string
  projectId?: string | null
  question: string
  answer: string
  sortOrder: number
  isPublished: boolean
}

export interface Banner {
  id: string
  projectId?: string | null
  title: string
  subtitle?: string | null
  description?: string | null
  imageUrl?: string | null
  mobileImageUrl?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  badge?: string | null
  sortOrder: number
  status: PublishStatus
}

export interface ConstructionUpdate {
  id: string
  projectId?: string
  title: string
  description?: string | null
  updateDate: string | Date
  floorsCompleted?: number | null
  overallProgress?: number | null
  isMilestone: boolean
  milestoneLabel?: string | null
  photoUrls?: string[]
  isPublished: boolean
  sortOrder?: number
}

export interface SiteSetting {
  id: string
  key: string
  value?: string | null
  label?: string | null
  group?: string | null
  isPublic: boolean
}

export interface LeadNote {
  id: string
  enquiryId: string
  userId?: string
  userName?: string
  note: string
  isInternal?: boolean
  createdAt: string | Date
}

export interface Enquiry {
  id: string
  referenceId: string
  fullName: string
  phone: string
  email?: string | null
  countryCode?: string
  enquiryType: EnquiryType | string
  offeringType?: string | null
  message?: string | null
  preferredDate?: string | Date | null
  preferredTime?: string | null
  source?: LeadSource | string
  sourcePage?: string | null
  status: LeadStatus | string
  consentGiven?: boolean
  createdAt: string | Date
  notes?: LeadNote[]
}
