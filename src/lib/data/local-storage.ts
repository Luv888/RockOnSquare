import {
  INITIAL_BANNERS,
  INITIAL_AMENITIES,
  INITIAL_FAQS,
  INITIAL_FLOORS,
  INITIAL_CONSTRUCTION_UPDATES,
  INITIAL_SITE_SETTINGS,
  INITIAL_ENQUIRIES,
  normalizeFaqRecord,
  normalizeBannerRecord,
} from './initial-data'
import type {
  Banner,
  Amenity,
  FAQ,
  Floor,
  ConstructionUpdate,
  SiteSetting,
  Enquiry,
} from './types'

const STORAGE_KEYS = {
  BANNERS: 'ros_demo_banners_v3',
  AMENITIES: 'ros_demo_amenities_v3',
  FAQS: 'ros_demo_faqs_v3',
  FLOORS: 'ros_demo_floors_v3',
  CONSTRUCTION: 'ros_demo_construction_v3',
  LEADS: 'ros_demo_leads',
  SETTINGS: 'ros_demo_settings_v3',
} as const

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function getItem<T>(key: string, fallback: T[]): T[] {
  if (!isBrowser()) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      // First time initialization
      window.localStorage.setItem(key, JSON.stringify(fallback))
      return fallback
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch (err) {
    console.warn(`[LocalStorage] Failed to load key "${key}", falling back to initial data:`, err)
    return fallback
  }
}

function setItem<T>(key: string, data: T[]): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(data))
    window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key } }))
  } catch (err) {
    console.error(`[LocalStorage] Failed to save key "${key}":`, err)
  }
}

// ─── BANNERS ─────────────────────────────────────────────────────────────

export function getStoredBanners(): Banner[] {
  return getItem<Banner>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS)
    .map(normalizeBannerRecord)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function saveBanner(banner: Banner): void {
  const all = getStoredBanners()
  const index = all.findIndex((b) => b.id === banner.id)
  if (index >= 0) {
    all[index] = banner
  } else {
    all.push(banner)
  }
  setItem(STORAGE_KEYS.BANNERS, all)
}

export function deleteBanner(id: string): void {
  const all = getStoredBanners().filter((b) => b.id !== id)
  setItem(STORAGE_KEYS.BANNERS, all)
}

// ─── AMENITIES ───────────────────────────────────────────────────────────

export function getStoredAmenities(): Amenity[] {
  return getItem<Amenity>(STORAGE_KEYS.AMENITIES, INITIAL_AMENITIES).sort(
    (a, b) => a.sortOrder - b.sortOrder
  )
}

export function saveAmenity(amenity: Amenity): void {
  const all = getStoredAmenities()
  const index = all.findIndex((a) => a.id === amenity.id)
  if (index >= 0) {
    all[index] = amenity
  } else {
    all.push(amenity)
  }
  setItem(STORAGE_KEYS.AMENITIES, all)
}

export function deleteAmenity(id: string): void {
  const all = getStoredAmenities().filter((a) => a.id !== id)
  setItem(STORAGE_KEYS.AMENITIES, all)
}

// ─── FAQS ────────────────────────────────────────────────────────────────

export function getStoredFAQs(): FAQ[] {
  return getItem<FAQ>(STORAGE_KEYS.FAQS, INITIAL_FAQS)
    .map(normalizeFaqRecord)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function saveFAQ(faq: FAQ): void {
  const all = getStoredFAQs()
  const index = all.findIndex((f) => f.id === faq.id)
  if (index >= 0) {
    all[index] = faq
  } else {
    all.push(faq)
  }
  setItem(STORAGE_KEYS.FAQS, all)
}

export function deleteFAQ(id: string): void {
  const all = getStoredFAQs().filter((f) => f.id !== id)
  setItem(STORAGE_KEYS.FAQS, all)
}

// ─── FLOORS ──────────────────────────────────────────────────────────────

export function getStoredFloors(): Floor[] {
  return getItem<Floor>(STORAGE_KEYS.FLOORS, INITIAL_FLOORS).sort(
    (a, b) => a.floorNumber - b.floorNumber
  )
}

export function saveFloor(floor: Floor): void {
  const all = getStoredFloors()
  const index = all.findIndex((f) => f.id === floor.id)
  if (index >= 0) {
    all[index] = floor
  } else {
    all.push(floor)
  }
  setItem(STORAGE_KEYS.FLOORS, all)
}

export function deleteFloor(id: string): void {
  const all = getStoredFloors().filter((f) => f.id !== id)
  setItem(STORAGE_KEYS.FLOORS, all)
}

// ─── CONSTRUCTION UPDATES ────────────────────────────────────────────────

export function getStoredConstructionUpdates(): ConstructionUpdate[] {
  return getItem<ConstructionUpdate>(STORAGE_KEYS.CONSTRUCTION, INITIAL_CONSTRUCTION_UPDATES).sort(
    (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
  )
}

export function saveConstructionUpdate(update: ConstructionUpdate): void {
  const all = getStoredConstructionUpdates()
  const index = all.findIndex((u) => u.id === update.id)
  if (index >= 0) {
    all[index] = update
  } else {
    all.push(update)
  }
  setItem(STORAGE_KEYS.CONSTRUCTION, all)
}

export function deleteConstructionUpdate(id: string): void {
  const all = getStoredConstructionUpdates().filter((u) => u.id !== id)
  setItem(STORAGE_KEYS.CONSTRUCTION, all)
}

// ─── LEADS / ENQUIRIES ───────────────────────────────────────────────────

export function getStoredLeads(): Enquiry[] {
  return getItem<Enquiry>(STORAGE_KEYS.LEADS, INITIAL_ENQUIRIES).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function saveLead(lead: Enquiry): void {
  const all = getStoredLeads()
  const index = all.findIndex((l) => l.id === lead.id)
  if (index >= 0) {
    all[index] = lead
  } else {
    all.unshift(lead) // Add to top
  }
  setItem(STORAGE_KEYS.LEADS, all)
}

export function updateLeadStatus(id: string, status: string, note?: string): void {
  const all = getStoredLeads()
  const lead = all.find((l) => l.id === id)
  if (!lead) return

  lead.status = status
  if (note && note.trim()) {
    lead.notes = lead.notes || []
    lead.notes.unshift({
      id: `note-${Date.now()}`,
      enquiryId: id,
      userName: 'Administrator',
      note: note.trim(),
      createdAt: new Date().toISOString(),
    })
  }
  setItem(STORAGE_KEYS.LEADS, all)
}

// ─── SETTINGS ────────────────────────────────────────────────────────────

export function getStoredSettings(): SiteSetting[] {
  return getItem<SiteSetting>(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS)
}

export function saveSetting(key: string, value: string): void {
  const all = getStoredSettings()
  const index = all.findIndex((s) => s.key === key)
  if (index >= 0) {
    all[index].value = value
  } else {
    all.push({
      id: `setting-${Date.now()}`,
      key,
      value,
      label: key,
      group: 'General',
      isPublic: true,
    })
  }
  setItem(STORAGE_KEYS.SETTINGS, all)
}

// ─── SERVER DATA SYNCHRONIZATION ──────────────────────────────────────────

export function syncStoredBanners(serverBanners: Banner[]): void {
  if (!isBrowser() || !serverBanners?.length) return
  const normalized = serverBanners.map(normalizeBannerRecord)
  window.localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(normalized))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: STORAGE_KEYS.BANNERS } }))
}

export function syncStoredAmenities(serverAmenities: Amenity[]): void {
  if (!isBrowser() || !serverAmenities?.length) return
  window.localStorage.setItem(STORAGE_KEYS.AMENITIES, JSON.stringify(serverAmenities))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: STORAGE_KEYS.AMENITIES } }))
}

export function syncStoredFAQs(serverFaqs: FAQ[]): void {
  if (!isBrowser() || !serverFaqs?.length) return
  const normalized = serverFaqs.map(normalizeFaqRecord)
  window.localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(normalized))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: STORAGE_KEYS.FAQS } }))
}

export function syncStoredFloors(serverFloors: Floor[]): void {
  if (!isBrowser() || !serverFloors?.length) return
  window.localStorage.setItem(STORAGE_KEYS.FLOORS, JSON.stringify(serverFloors))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: STORAGE_KEYS.FLOORS } }))
}

export function syncStoredConstructionUpdates(serverUpdates: ConstructionUpdate[]): void {
  if (!isBrowser() || !serverUpdates?.length) return
  window.localStorage.setItem(STORAGE_KEYS.CONSTRUCTION, JSON.stringify(serverUpdates))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: STORAGE_KEYS.CONSTRUCTION } }))
}

export function syncStoredLeads(serverLeads: Enquiry[]): void {
  if (!isBrowser() || !serverLeads) return
  window.localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(serverLeads))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: STORAGE_KEYS.LEADS } }))
}

export function syncStoredSettings(serverSettings: SiteSetting[]): void {
  if (!isBrowser() || !serverSettings?.length) return
  window.localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(serverSettings))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: STORAGE_KEYS.SETTINGS } }))
}

// ─── UTILS ───────────────────────────────────────────────────────────────

export function resetToDemoDefaults(): void {
  if (!isBrowser()) return
  window.localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(INITIAL_BANNERS))
  window.localStorage.setItem(STORAGE_KEYS.AMENITIES, JSON.stringify(INITIAL_AMENITIES))
  window.localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(INITIAL_FAQS))
  window.localStorage.setItem(STORAGE_KEYS.FLOORS, JSON.stringify(INITIAL_FLOORS))
  window.localStorage.setItem(STORAGE_KEYS.CONSTRUCTION, JSON.stringify(INITIAL_CONSTRUCTION_UPDATES))
  window.localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_ENQUIRIES))
  window.localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SITE_SETTINGS))
  window.dispatchEvent(new CustomEvent('ros_data_updated', { detail: { key: 'all' } }))
}

export function subscribeToDataChanges(callback: () => void): () => void {
  if (!isBrowser()) return () => {}
  const handler = () => callback()
  window.addEventListener('ros_data_updated', handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('ros_data_updated', handler)
    window.removeEventListener('storage', handler)
  }
}
