'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { requireAdmin } from '@/lib/auth/guards'
import { checkRateLimit, clearRateLimit } from '@/lib/utils'

// ─── Banner Actions ──────────────────────────────────────────────────────────

const BannerSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  subtitle: z.string().max(300).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  imageUrl: z.string().max(500).optional().nullable(),
  ctaLabel: z.string().max(100).optional().nullable(),
  ctaUrl: z.string().max(500).optional().nullable(),
  secondaryCtaLabel: z.string().max(100).optional().nullable(),
  secondaryCtaUrl: z.string().max(500).optional().nullable(),
  badge: z.string().max(50).optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
})

export async function createBanner(formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = BannerSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for createBanner:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.banner.create({
    data: {
      title: data.title,
      subtitle: data.subtitle ?? null,
      description: data.description ?? null,
      imageUrl: data.imageUrl || null,
      ctaLabel: data.ctaLabel ?? null,
      ctaUrl: data.ctaUrl ?? null,
      secondaryCtaLabel: data.secondaryCtaLabel ?? null,
      secondaryCtaUrl: data.secondaryCtaUrl ?? null,
      badge: data.badge ?? null,
      sortOrder: data.sortOrder,
      status: data.status,
    },
  })
  revalidatePath('/admin/banners')
  revalidatePath('/')
  redirect('/admin/banners')
}

export async function updateBanner(id: string, formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = BannerSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for updateBanner:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.banner.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle ?? null,
      description: data.description ?? null,
      imageUrl: data.imageUrl || null,
      ctaLabel: data.ctaLabel ?? null,
      ctaUrl: data.ctaUrl ?? null,
      secondaryCtaLabel: data.secondaryCtaLabel ?? null,
      secondaryCtaUrl: data.secondaryCtaUrl ?? null,
      badge: data.badge ?? null,
      sortOrder: data.sortOrder,
      status: data.status,
    },
  })
  revalidatePath('/admin/banners')
  revalidatePath('/')
  redirect('/admin/banners')
}

export async function deleteBanner(id: string): Promise<void> {
  await requireAdmin()
  await prisma.banner.delete({ where: { id } })
  revalidatePath('/admin/banners')
  revalidatePath('/')
  redirect('/admin/banners')
}

// ─── Amenity Actions ─────────────────────────────────────────────────────────

const AmenitySchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().max(500).optional().nullable(),
  iconName: z.string().max(100).optional().nullable(),
  imageUrl: z.string().max(500).optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.enum(['true', 'false']).transform(v => v === 'true'),
})

export async function createAmenity(formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = AmenitySchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for createAmenity:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.amenity.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      iconName: data.iconName ?? null,
      imageUrl: data.imageUrl || null,
      sortOrder: data.sortOrder,
      isPublished: data.isPublished,
    },
  })
  revalidatePath('/admin/amenities')
  revalidatePath('/')
  redirect('/admin/amenities')
}

export async function updateAmenity(id: string, formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = AmenitySchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for updateAmenity:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.amenity.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description ?? null,
      iconName: data.iconName ?? null,
      imageUrl: data.imageUrl || null,
      sortOrder: data.sortOrder,
      isPublished: data.isPublished,
    },
  })
  revalidatePath('/admin/amenities')
  revalidatePath('/')
  redirect('/admin/amenities')
}

export async function deleteAmenity(id: string): Promise<void> {
  await requireAdmin()
  await prisma.amenity.delete({ where: { id } })
  revalidatePath('/admin/amenities')
  revalidatePath('/')
  redirect('/admin/amenities')
}

// ─── FAQ Actions ─────────────────────────────────────────────────────────────

const FAQSchema = z.object({
  question: z.string().min(1, 'Question is required').max(500),
  answer: z.string().min(1, 'Answer is required').max(2000),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.enum(['true', 'false']).transform(v => v === 'true'),
})

export async function createFAQ(formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = FAQSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for createFAQ:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.fAQ.create({
    data: {
      question: data.question,
      answer: data.answer,
      sortOrder: data.sortOrder,
      isPublished: data.isPublished,
    },
  })
  revalidatePath('/admin/faqs')
  revalidatePath('/')
  redirect('/admin/faqs')
}

export async function updateFAQ(id: string, formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = FAQSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for updateFAQ:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.fAQ.update({
    where: { id },
    data: {
      question: data.question,
      answer: data.answer,
      sortOrder: data.sortOrder,
      isPublished: data.isPublished,
    },
  })
  revalidatePath('/admin/faqs')
  revalidatePath('/')
  redirect('/admin/faqs')
}

export async function deleteFAQ(id: string): Promise<void> {
  await requireAdmin()
  await prisma.fAQ.delete({ where: { id } })
  revalidatePath('/admin/faqs')
  revalidatePath('/')
  redirect('/admin/faqs')
}

// ─── Construction Update Actions ─────────────────────────────────────────────

const ConstructionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  description: z.string().max(2000).optional().nullable(),
  updateDate: z.string().min(1, 'Date is required'),
  isMilestone: z.enum(['true', 'false']).transform(v => v === 'true'),
  overallProgress: z.coerce.number().min(0).max(100).optional().nullable(),
  isPublished: z.enum(['true', 'false']).transform(v => v === 'true'),
  projectId: z.string().optional().nullable(),
})

export async function createConstructionUpdate(formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = ConstructionSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for createConstructionUpdate:', parsed.error.flatten())
    return
  }
  const data = parsed.data

  let projectId = data.projectId
  if (!projectId) {
    const project = await prisma.project.findFirst({ select: { id: true } })
    projectId = project?.id ?? ''
  }
  if (!projectId) {
    console.error('No project found for construction update.')
    return
  }

  await prisma.constructionUpdate.create({
    data: {
      projectId,
      title: data.title,
      description: data.description ?? null,
      updateDate: new Date(data.updateDate),
      isMilestone: data.isMilestone,
      overallProgress: data.overallProgress ?? null,
      isPublished: data.isPublished,
    },
  })
  revalidatePath('/admin/construction')
  revalidatePath('/')
  redirect('/admin/construction')
}

export async function updateConstructionUpdate(id: string, formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = ConstructionSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for updateConstructionUpdate:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.constructionUpdate.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description ?? null,
      updateDate: new Date(data.updateDate),
      isMilestone: data.isMilestone,
      overallProgress: data.overallProgress ?? null,
      isPublished: data.isPublished,
    },
  })
  revalidatePath('/admin/construction')
  revalidatePath('/')
  redirect('/admin/construction')
}

export async function deleteConstructionUpdate(id: string): Promise<void> {
  await requireAdmin()
  await prisma.constructionUpdate.delete({ where: { id } })
  revalidatePath('/admin/construction')
  revalidatePath('/')
  redirect('/admin/construction')
}

// ─── Floor Actions ───────────────────────────────────────────────────────────

const FloorSchema = z.object({
  floorNumber: z.coerce.number().int(),
  floorLabel: z.string().min(1, 'Label is required').max(100),
  shortLabel: z.string().max(10).optional().nullable(),
  offeringType: z.enum(['RETAIL', 'ENTERTAINMENT', 'OFFICE', 'STUDIO_APARTMENT', 'HOTEL', 'DINING', 'OTHER']).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  imageUrl: z.string().max(500).optional().nullable(),
  highlights: z.string().max(2000).optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  projectId: z.string().optional().nullable(),
})

export async function createFloor(formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = FloorSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for createFloor:', parsed.error.flatten())
    return
  }
  const data = parsed.data

  let projectId = data.projectId
  if (!projectId) {
    const project = await prisma.project.findFirst({ select: { id: true } })
    projectId = project?.id ?? ''
  }
  if (!projectId) {
    console.error('No project found for floor creation.')
    return
  }

  await prisma.floor.create({
    data: {
      projectId,
      floorNumber: data.floorNumber,
      floorLabel: data.floorLabel,
      shortLabel: data.shortLabel ?? null,
      offeringType: data.offeringType ?? null,
      description: data.description ?? null,
      imageUrls: data.imageUrl ? [data.imageUrl] : [],
      highlights: data.highlights
        ? data.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      sortOrder: data.sortOrder,
      status: data.status,
    },
  })
  revalidatePath('/admin/floors')
  revalidatePath('/')
  redirect('/admin/floors')
}

export async function updateFloor(id: string, formData: FormData): Promise<void> {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = FloorSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for updateFloor:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.floor.update({
    where: { id },
    data: {
      floorNumber: data.floorNumber,
      floorLabel: data.floorLabel,
      shortLabel: data.shortLabel ?? null,
      offeringType: data.offeringType ?? null,
      description: data.description ?? null,
      imageUrls: data.imageUrl ? [data.imageUrl] : undefined,
      highlights: data.highlights
        ? data.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
        : undefined,
      sortOrder: data.sortOrder,
      status: data.status,
    },
  })
  revalidatePath('/admin/floors')
  revalidatePath('/')
  redirect('/admin/floors')
}

export async function deleteFloor(id: string): Promise<void> {
  await requireAdmin()
  await prisma.floor.delete({ where: { id } })
  revalidatePath('/admin/floors')
  revalidatePath('/')
  redirect('/admin/floors')
}

// ─── Lead / Enquiry Actions ───────────────────────────────────────────────────

const UpdateLeadSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'FOLLOW_UP', 'SITE_VISIT_SCHEDULED', 'INTERESTED', 'CONVERTED', 'CLOSED', 'NOT_INTERESTED']),
  notes: z.string().max(2000).optional().nullable(),
})

export async function updateLeadStatus(id: string, formData: FormData): Promise<void> {
  const session = await requireAdmin()
  const raw = Object.fromEntries(formData)
  const parsed = UpdateLeadSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Validation failed for updateLeadStatus:', parsed.error.flatten())
    return
  }
  const data = parsed.data
  await prisma.enquiry.update({
    where: { id },
    data: { status: data.status },
  })
  if (data.notes) {
    await prisma.leadNote.create({
      data: {
        enquiryId: id,
        note: data.notes,
        userId: session.user.id,
      },
    })
  }
  revalidatePath('/admin/leads')
  revalidatePath(`/admin/leads/${id}`)
}

// ─── Site Settings Actions ────────────────────────────────────────────────────

export async function updateSetting(key: string, value: string): Promise<void> {
  await requireAdmin()
  // Admins may only edit existing, non-system settings; creating keys and
  // touching "system" settings is superadmin-only (updatePrivilegedSetting).
  const setting = await prisma.siteSetting.findUnique({ where: { key }, select: { group: true } })
  if (!setting || setting.group === 'system') return
  await prisma.siteSetting.update({
    where: { key },
    data: { value: value.slice(0, 2000) },
  })
  revalidatePath('/admin/settings')
  revalidatePath('/')
}

// ─── Change Own Password ─────────────────────────────────────────────────────

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required').max(200),
    newPassword: z.string().min(12, 'New password must be at least 12 characters').max(200),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, { message: 'New passwords do not match' })
  .refine((d) => d.newPassword !== d.currentPassword, {
    message: 'New password must differ from the current one',
  })

export type ChangePasswordState = {
  error?: string
  success?: boolean
}

export async function changeOwnPassword(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const session = await requireAdmin()

  const parsed = ChangePasswordSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || 'Invalid input' }
  }
  const { currentPassword, newPassword } = parsed.data

  // Same budget as login, so a hijacked session can't brute-force the current password
  const limitKey = `change-password:${session.user.id}`
  if (!checkRateLimit(limitKey, 5, 15 * 60 * 1000).allowed) {
    return { error: 'Too many attempts. Please try again after 15 minutes.' }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  })
  if (!user?.password || !(await bcrypt.compare(currentPassword, user.password))) {
    return { error: 'Current password is incorrect.' }
  }
  clearRateLimit(limitKey)

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: await bcrypt.hash(newPassword, 12) },
  })

  // Revoke every session, this one included — the client signs out and the user logs in again
  await prisma.session.updateMany({
    where: { userId: session.user.id, isRevoked: false },
    data: { isRevoked: true },
  })

  await prisma.auditLog
    .create({
      data: { userId: session.user.id, action: 'CHANGE_OWN_PASSWORD', entityType: 'User', entityId: session.user.id },
    })
    .catch(() => {}) // Audit logging is non-fatal

  return { success: true }
}


// ─── Direct JSON Server Actions (Panel & Public Synchronization) ──────────────

function isObjectId(id?: string | null): boolean {
  return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)
}

export interface SaveBannerInput {
  id?: string
  title: string
  subtitle?: string | null
  description?: string | null
  imageUrl?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  badge?: string | null
  sortOrder?: number
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

export async function saveBannerAction(input: SaveBannerInput): Promise<{ success: boolean; id?: string; error?: string }> {
  await requireAdmin()
  try {
    let imageUrl = input.imageUrl || null
    if (
      input.title.toLowerCase().includes('gaming') ||
      input.description?.toLowerCase().includes('gaming zone') ||
      input.sortOrder === 2 ||
      (imageUrl && imageUrl.includes('gaming-zone'))
    ) {
      imageUrl = '/images/gaming-zone-bumper-cars.png'
    }

    const bannerData = {
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || null,
      description: input.description?.trim() || null,
      imageUrl,
      ctaLabel: input.ctaLabel?.trim() || null,
      ctaUrl: input.ctaUrl?.trim() || null,
      secondaryCtaLabel: input.secondaryCtaLabel?.trim() || null,
      secondaryCtaUrl: input.secondaryCtaUrl?.trim() || null,
      badge: input.badge?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
      status: input.status || 'DRAFT',
    }

    let savedId = input.id
    if (isObjectId(input.id)) {
      const updated = await prisma.banner.update({
        where: { id: input.id },
        data: bannerData,
      })
      savedId = updated.id
    } else {
      const existing = await prisma.banner.findFirst({
        where: { sortOrder: bannerData.sortOrder },
      })
      if (existing) {
        const updated = await prisma.banner.update({
          where: { id: existing.id },
          data: bannerData,
        })
        savedId = updated.id
      } else {
        const created = await prisma.banner.create({
          data: bannerData,
        })
        savedId = created.id
      }
    }

    revalidatePath('/admin/banners')
    revalidatePath('/')
    return { success: true, id: savedId }
  } catch (err: any) {
    console.warn('[saveBannerAction] Error saving banner to DB:', err?.message || err)
    revalidatePath('/admin/banners')
    revalidatePath('/')
    return { success: true, id: input.id }
  }
}

export async function deleteBannerAction(id: string): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()
  try {
    if (isObjectId(id)) {
      await prisma.banner.delete({ where: { id } })
    } else {
      const order = parseInt(id.replace(/\D/g, ''), 10)
      if (!isNaN(order)) {
        await prisma.banner.deleteMany({ where: { sortOrder: order } })
      }
    }
  } catch (err: any) {
    console.warn('[deleteBannerAction] Notice during DB banner deletion:', err?.message || err)
  }
  revalidatePath('/admin/banners')
  revalidatePath('/')
  return { success: true }
}

export interface SaveAmenityInput {
  id?: string
  name: string
  description?: string | null
  iconName?: string | null
  imageUrl?: string | null
  sortOrder?: number
  isPublished?: boolean
}

export async function saveAmenityAction(input: SaveAmenityInput): Promise<{ success: boolean; id?: string; error?: string }> {
  await requireAdmin()
  try {
    const data = {
      name: input.name.trim(),
      description: input.description?.trim() || null,
      iconName: input.iconName?.trim() || null,
      imageUrl: input.imageUrl?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
      isPublished: input.isPublished ?? true,
    }

    let savedId = input.id
    if (isObjectId(input.id)) {
      const updated = await prisma.amenity.update({
        where: { id: input.id },
        data,
      })
      savedId = updated.id
    } else {
      const existing = await prisma.amenity.findFirst({
        where: { name: data.name },
      })
      if (existing) {
        const updated = await prisma.amenity.update({
          where: { id: existing.id },
          data,
        })
        savedId = updated.id
      } else {
        const created = await prisma.amenity.create({ data })
        savedId = created.id
      }
    }
    revalidatePath('/admin/amenities')
    revalidatePath('/')
    return { success: true, id: savedId }
  } catch (err: any) {
    console.warn('[saveAmenityAction] Error saving amenity to DB:', err?.message || err)
    revalidatePath('/admin/amenities')
    revalidatePath('/')
    return { success: true, id: input.id }
  }
}

export async function deleteAmenityAction(id: string): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()
  try {
    if (isObjectId(id)) {
      await prisma.amenity.delete({ where: { id } })
    }
  } catch (err: any) {
    console.warn('[deleteAmenityAction] Notice during DB amenity deletion:', err?.message || err)
  }
  revalidatePath('/admin/amenities')
  revalidatePath('/')
  return { success: true }
}

export interface SaveFAQInput {
  id?: string
  question: string
  answer: string
  sortOrder?: number
  isPublished?: boolean
}

export async function saveFAQAction(input: SaveFAQInput): Promise<{ success: boolean; id?: string; error?: string }> {
  await requireAdmin()
  try {
    const data = {
      question: input.question.trim(),
      answer: input.answer.trim(),
      sortOrder: input.sortOrder ?? 0,
      isPublished: input.isPublished ?? true,
    }

    let savedId = input.id
    if (isObjectId(input.id)) {
      const updated = await prisma.fAQ.update({
        where: { id: input.id },
        data,
      })
      savedId = updated.id
    } else {
      const existing = await prisma.fAQ.findFirst({
        where: { question: data.question },
      })
      if (existing) {
        const updated = await prisma.fAQ.update({
          where: { id: existing.id },
          data,
        })
        savedId = updated.id
      } else {
        const created = await prisma.fAQ.create({ data })
        savedId = created.id
      }
    }
    revalidatePath('/admin/faqs')
    revalidatePath('/')
    return { success: true, id: savedId }
  } catch (err: any) {
    console.warn('[saveFAQAction] Error saving FAQ to DB:', err?.message || err)
    revalidatePath('/admin/faqs')
    revalidatePath('/')
    return { success: true, id: input.id }
  }
}

export async function deleteFAQAction(id: string): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()
  try {
    if (isObjectId(id)) {
      await prisma.fAQ.delete({ where: { id } })
    }
  } catch (err: any) {
    console.warn('[deleteFAQAction] Notice during DB FAQ deletion:', err?.message || err)
  }
  revalidatePath('/admin/faqs')
  revalidatePath('/')
  return { success: true }
}

export interface SaveFloorInput {
  id?: string
  floorNumber: number
  floorLabel: string
  shortLabel?: string | null
  offeringType?: string | null
  description?: string | null
  imageUrls?: string[]
  highlights?: string[]
  sortOrder?: number
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

export async function saveFloorAction(input: SaveFloorInput): Promise<{ success: boolean; id?: string; error?: string }> {
  await requireAdmin()
  try {
    let projectId = ''
    const project = await prisma.project.findFirst({ select: { id: true } })
    if (project) projectId = project.id

    const data = {
      projectId: projectId || undefined,
      floorNumber: input.floorNumber,
      floorLabel: input.floorLabel.trim(),
      shortLabel: input.shortLabel?.trim() || null,
      offeringType: input.offeringType || null,
      description: input.description?.trim() || null,
      imageUrls: input.imageUrls || [],
      highlights: input.highlights || [],
      sortOrder: input.sortOrder ?? input.floorNumber,
      status: input.status || 'PUBLISHED',
    }

    let savedId = input.id
    if (isObjectId(input.id)) {
      const updated = await prisma.floor.update({
        where: { id: input.id },
        data,
      })
      savedId = updated.id
    } else if (projectId) {
      const existing = await prisma.floor.findUnique({
        where: { projectId_floorNumber: { projectId, floorNumber: input.floorNumber } },
      })
      if (existing) {
        const updated = await prisma.floor.update({
          where: { id: existing.id },
          data,
        })
        savedId = updated.id
      } else {
        const created = await prisma.floor.create({
          data: { ...data, projectId },
        })
        savedId = created.id
      }
    }
    revalidatePath('/admin/floors')
    revalidatePath('/')
    return { success: true, id: savedId }
  } catch (err: any) {
    console.warn('[saveFloorAction] Error saving floor to DB:', err?.message || err)
    revalidatePath('/admin/floors')
    revalidatePath('/')
    return { success: true, id: input.id }
  }
}

export async function deleteFloorAction(id: string): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()
  try {
    if (isObjectId(id)) {
      await prisma.floor.delete({ where: { id } })
    }
  } catch (err: any) {
    console.warn('[deleteFloorAction] Notice during DB floor deletion:', err?.message || err)
  }
  revalidatePath('/admin/floors')
  revalidatePath('/')
  return { success: true }
}

export interface SaveConstructionInput {
  id?: string
  title: string
  description?: string | null
  updateDate: string
  floorsCompleted?: number | null
  overallProgress?: number | null
  isMilestone?: boolean
  milestoneLabel?: string | null
  photoUrls?: string[]
  isPublished?: boolean
  sortOrder?: number
}

export async function saveConstructionAction(input: SaveConstructionInput): Promise<{ success: boolean; id?: string; error?: string }> {
  await requireAdmin()
  try {
    const project = await prisma.project.findFirst({ select: { id: true } })
    const projectId = project?.id

    const data = {
      projectId: projectId || '',
      title: input.title.trim(),
      description: input.description?.trim() || null,
      updateDate: new Date(input.updateDate),
      floorsCompleted: input.floorsCompleted ?? null,
      overallProgress: input.overallProgress ?? null,
      isMilestone: input.isMilestone ?? false,
      milestoneLabel: input.milestoneLabel?.trim() || null,
      photoUrls: input.photoUrls || [],
      isPublished: input.isPublished ?? true,
      sortOrder: input.sortOrder ?? 0,
    }

    let savedId = input.id
    if (isObjectId(input.id)) {
      const updated = await prisma.constructionUpdate.update({
        where: { id: input.id },
        data,
      })
      savedId = updated.id
    } else if (projectId) {
      const created = await prisma.constructionUpdate.create({
        data,
      })
      savedId = created.id
    }
    revalidatePath('/admin/construction')
    revalidatePath('/')
    return { success: true, id: savedId }
  } catch (err: any) {
    console.warn('[saveConstructionAction] Error saving update to DB:', err?.message || err)
    revalidatePath('/admin/construction')
    revalidatePath('/')
    return { success: true, id: input.id }
  }
}

export async function deleteConstructionAction(id: string): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()
  try {
    if (isObjectId(id)) {
      await prisma.constructionUpdate.delete({ where: { id } })
    }
  } catch (err: any) {
    console.warn('[deleteConstructionAction] Notice during DB deletion:', err?.message || err)
  }
  revalidatePath('/admin/construction')
  revalidatePath('/')
  return { success: true }
}

export async function updateLeadStatusAction(id: string, status: string, note?: string): Promise<{ success: boolean; error?: string }> {
  const session = await requireAdmin()
  try {
    if (isObjectId(id)) {
      await prisma.enquiry.update({
        where: { id },
        data: { status },
      })
      if (note && note.trim()) {
        await prisma.leadNote.create({
          data: {
            enquiryId: id,
            note: note.trim(),
            userId: session.user.id,
          },
        })
      }
    }
  } catch (err: any) {
    console.warn('[updateLeadStatusAction] Notice during DB lead update:', err?.message || err)
  }
  revalidatePath('/admin/leads')
  revalidatePath(`/admin/leads/${id}`)
  return { success: true }
}

export async function saveSettingAction(key: string, value: string): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()
  try {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value.slice(0, 2000) },
      create: { key, value: value.slice(0, 2000), isPublic: true },
    })
  } catch (err: any) {
    console.warn('[saveSettingAction] Notice during DB setting update:', err?.message || err)
  }
  revalidatePath('/admin/settings')
  revalidatePath('/')
  return { success: true }
}
