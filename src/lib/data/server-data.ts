/**
 * server-data.ts
 * Reads data from MongoDB via Prisma.
 * Falls back to initial-data.ts when DB is unavailable (dev mode without DB).
 */
import {
  INITIAL_PROJECT,
  INITIAL_OFFERINGS,
  INITIAL_FLOORS,
  INITIAL_AMENITIES,
  INITIAL_FAQS,
  INITIAL_BANNERS,
  INITIAL_CONSTRUCTION_UPDATES,
  INITIAL_SITE_SETTINGS,
  INITIAL_ENQUIRIES,
  normalizeFaqRecord,
} from "./initial-data";
import type {
  Banner,
  Amenity,
  FAQ,
  Floor,
  ConstructionUpdate,
  SiteSetting,
  Enquiry,
  Project,
  Offering,
} from "./types";

let prismaClient: typeof import("@/lib/db/prisma").prisma | null = null;

async function getDb() {
  if (prismaClient) return prismaClient;
  try {
    const mod = await import("@/lib/db/prisma");
    prismaClient = mod.prisma;
    return prismaClient;
  } catch {
    return null;
  }
}

function isDbConfigured(): boolean {
  const uri = process.env.MONGODB_URI || "";
  return (
    uri.length > 0 &&
    !uri.includes("username:password") &&
    !uri.includes("<username>")
  );
}

// ─── Project ─────────────────────────────────────────────────────────────────

export async function getServerProject(): Promise<Project> {
  if (!isDbConfigured()) return { ...INITIAL_PROJECT };
  try {
    const db = await getDb();
    const row = await db?.project.findFirst({
      where: { status: "PUBLISHED" },
    });
    if (!row) return { ...INITIAL_PROJECT };
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      tagline: row.tagline ?? undefined,
      description: row.description ?? undefined,
      developerName: row.developerName,
      address: row.address ?? undefined,
      city: row.city ?? undefined,
      state: row.state ?? undefined,
      country: row.country,
      pincode: row.pincode ?? undefined,
      latitude: row.latitude ?? undefined,
      longitude: row.longitude ?? undefined,
      siteAreaAcres: row.siteAreaAcres ?? undefined,
      builtUpAreaSqm: row.builtUpAreaSqm ?? undefined,
      roadFrontageMtr: row.roadFrontageMtr ?? undefined,
      totalFloors: row.totalFloors ?? undefined,
      completedFloors: row.completedFloors ?? undefined,
      constructionStatus: row.constructionStatus ?? undefined,
      status: row.status as Project["status"],
    };
  } catch {
    return { ...INITIAL_PROJECT };
  }
}

// ─── Offerings ────────────────────────────────────────────────────────────────

export async function getServerOfferings(): Promise<Offering[]> {
  if (!isDbConfigured()) return [...INITIAL_OFFERINGS].sort((a, b) => a.sortOrder - b.sortOrder);
  try {
    const db = await getDb();
    const rows = await db?.offering.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
    });
    if (!rows || rows.length === 0) return [...INITIAL_OFFERINGS].sort((a, b) => a.sortOrder - b.sortOrder);
    return rows.map((r) => ({
      id: r.id,
      projectId: r.projectId,
      slug: r.slug,
      type: r.type as Offering["type"],
      title: r.title,
      shortDesc: r.shortDesc ?? undefined,
      description: r.description ?? undefined,
      iconName: r.iconName ?? undefined,
      coverImage: r.coverImage ?? undefined,
      galleryUrls: r.galleryUrls,
      floorInfo: r.floorInfo ?? undefined,
      highlights: r.highlights,
      sortOrder: r.sortOrder,
      status: r.status as Offering["status"],
    }));
  } catch {
    return [...INITIAL_OFFERINGS].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

// ─── Banners ─────────────────────────────────────────────────────────────────

export function normalizeBannerRecord(b: Banner): Banner {
  let imageUrl = b.imageUrl
  if (
    b.title.toLowerCase().includes('gaming') ||
    b.description?.toLowerCase().includes('gaming zone') ||
    b.sortOrder === 2 ||
    (imageUrl && imageUrl.includes('gaming-zone'))
  ) {
    imageUrl = '/images/gaming-zone-bumper-cars.png'
  }
  return { ...b, imageUrl }
}

export async function getServerBanners(onlyPublished = true): Promise<Banner[]> {
  if (!isDbConfigured()) {
    return INITIAL_BANNERS.filter((b) => !onlyPublished || b.status === "PUBLISHED")
      .map(normalizeBannerRecord)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }
  try {
    const db = await getDb();
    const rows = await db?.banner.findMany({
      where: onlyPublished ? { status: "PUBLISHED" } : {},
      orderBy: { sortOrder: "asc" },
    });
    if (!rows || rows.length === 0) {
      return INITIAL_BANNERS.filter((b) => !onlyPublished || b.status === "PUBLISHED")
        .map(normalizeBannerRecord)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
    const normalized = rows.map((r) =>
      normalizeBannerRecord({
        id: r.id,
        title: r.title,
        subtitle: r.subtitle,
        description: r.description,
        imageUrl: r.imageUrl,
        ctaLabel: r.ctaLabel,
        ctaUrl: r.ctaUrl,
        secondaryCtaLabel: r.secondaryCtaLabel,
        secondaryCtaUrl: r.secondaryCtaUrl,
        badge: r.badge,
        sortOrder: r.sortOrder,
        status: r.status as Banner["status"],
      })
    );

    if (db) {
      for (const original of rows) {
        const norm = normalizeBannerRecord({
          id: original.id,
          title: original.title,
          subtitle: original.subtitle,
          description: original.description,
          imageUrl: original.imageUrl,
          ctaLabel: original.ctaLabel,
          ctaUrl: original.ctaUrl,
          secondaryCtaLabel: original.secondaryCtaLabel,
          secondaryCtaUrl: original.secondaryCtaUrl,
          badge: original.badge,
          sortOrder: original.sortOrder,
          status: original.status as Banner["status"],
        });
        if (norm.imageUrl !== original.imageUrl) {
          db.banner
            .update({
              where: { id: original.id },
              data: { imageUrl: norm.imageUrl },
            })
            .catch(() => {});
        }
      }
    }

    return normalized;
  } catch {
    return INITIAL_BANNERS.filter((b) => !onlyPublished || b.status === "PUBLISHED")
      .map(normalizeBannerRecord)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

// ─── Amenities ───────────────────────────────────────────────────────────────

export async function getServerAmenities(onlyPublished = true): Promise<Amenity[]> {
  if (!isDbConfigured()) {
    return INITIAL_AMENITIES.filter((a) => !onlyPublished || a.isPublished).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }
  try {
    const db = await getDb();
    const rows = await db?.amenity.findMany({
      where: onlyPublished ? { isPublished: true } : {},
      orderBy: { sortOrder: "asc" },
    });
    if (!rows || rows.length === 0) {
      return INITIAL_AMENITIES.filter((a) => !onlyPublished || a.isPublished).sort(
        (a, b) => a.sortOrder - b.sortOrder
      );
    }
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description ?? undefined,
      iconName: r.iconName ?? undefined,
      imageUrl: r.imageUrl ?? undefined,
      sortOrder: r.sortOrder,
      isPublished: r.isPublished,
    }));
  } catch {
    return INITIAL_AMENITIES.filter((a) => !onlyPublished || a.isPublished).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }
}

// ─── FAQs ────────────────────────────────────────────────────────────────────

export { normalizeFaqRecord }

export async function getServerFAQs(onlyPublished = true): Promise<FAQ[]> {
  if (!isDbConfigured()) {
    return INITIAL_FAQS.filter((f) => !onlyPublished || f.isPublished)
      .map(normalizeFaqRecord)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  }
  try {
    const db = await getDb()
    const rows = await db?.fAQ.findMany({
      where: onlyPublished ? { isPublished: true } : {},
      orderBy: { sortOrder: 'asc' },
    })
    if (!rows || rows.length === 0) {
      return INITIAL_FAQS.filter((f) => !onlyPublished || f.isPublished)
        .map(normalizeFaqRecord)
        .sort((a, b) => a.sortOrder - b.sortOrder)
    }

    const normalized = rows.map((r) =>
      normalizeFaqRecord({
        id: r.id,
        question: r.question,
        answer: r.answer,
        sortOrder: r.sortOrder,
        isPublished: r.isPublished,
      })
    )

    // Self-healing database update:
    // If any DB row was outdated, asynchronously update it in MongoDB so database records stay updated
    if (db) {
      for (const original of rows) {
        const norm = normalizeFaqRecord({
          id: original.id,
          question: original.question,
          answer: original.answer,
          sortOrder: original.sortOrder,
          isPublished: original.isPublished,
        })
        if (norm.question !== original.question || norm.answer !== original.answer) {
          db.fAQ
            .update({
              where: { id: original.id },
              data: { question: norm.question, answer: norm.answer },
            })
            .catch(() => {})
        }
      }
    }

    return normalized
  } catch {
    return INITIAL_FAQS.filter((f) => !onlyPublished || f.isPublished)
      .map(normalizeFaqRecord)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  }
}

// ─── Construction Updates ─────────────────────────────────────────────────────

export async function getServerConstructionUpdates(onlyPublished = true): Promise<ConstructionUpdate[]> {
  if (!isDbConfigured()) {
    return INITIAL_CONSTRUCTION_UPDATES.filter((u) => !onlyPublished || u.isPublished).sort(
      (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    );
  }
  try {
    const db = await getDb();
    const rows = await db?.constructionUpdate.findMany({
      where: onlyPublished ? { isPublished: true } : {},
      orderBy: { updateDate: "desc" },
    });
    if (!rows || rows.length === 0) {
      return INITIAL_CONSTRUCTION_UPDATES.filter((u) => !onlyPublished || u.isPublished).sort(
        (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
      );
    }
    return rows.map((r) => ({
      id: r.id,
      projectId: r.projectId,
      title: r.title,
      description: r.description ?? undefined,
      updateDate: r.updateDate.toISOString(),
      floorsCompleted: r.floorsCompleted ?? undefined,
      overallProgress: r.overallProgress ?? undefined,
      isMilestone: r.isMilestone,
      milestoneLabel: r.milestoneLabel ?? undefined,
      photoUrls: r.photoUrls,
      isPublished: r.isPublished,
      sortOrder: r.sortOrder,
    }));
  } catch {
    return INITIAL_CONSTRUCTION_UPDATES.filter((u) => !onlyPublished || u.isPublished).sort(
      (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    );
  }
}

// ─── Floors ──────────────────────────────────────────────────────────────────

export async function getServerFloors(): Promise<Floor[]> {
  if (!isDbConfigured()) return [...INITIAL_FLOORS].sort((a, b) => a.floorNumber - b.floorNumber);
  try {
    const db = await getDb();
    const rows = await db?.floor.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { floorNumber: "asc" },
    });
    if (!rows || rows.length === 0) return [...INITIAL_FLOORS].sort((a, b) => a.floorNumber - b.floorNumber);
    return rows.map((r) => ({
      id: r.id,
      projectId: r.projectId,
      floorNumber: r.floorNumber,
      floorLabel: r.floorLabel,
      shortLabel: r.shortLabel ?? undefined,
      offeringType: r.offeringType as Floor["offeringType"],
      description: r.description ?? undefined,
      imageUrls: r.imageUrls,
      highlights: r.highlights,
      sortOrder: r.sortOrder,
      status: r.status as Floor["status"],
    }));
  } catch {
    return [...INITIAL_FLOORS].sort((a, b) => a.floorNumber - b.floorNumber);
  }
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getServerSiteSettings(): Promise<SiteSetting[]> {
  if (!isDbConfigured()) return [...INITIAL_SITE_SETTINGS];
  try {
    const db = await getDb();
    const rows = await db?.siteSetting.findMany({});
    if (!rows || rows.length === 0) return [...INITIAL_SITE_SETTINGS];
    return rows.map((r) => ({
      id: r.id,
      key: r.key,
      value: r.value ?? undefined,
      label: r.label ?? undefined,
      group: r.group ?? undefined,
      isPublic: r.isPublic,
    }));
  } catch {
    return [...INITIAL_SITE_SETTINGS];
  }
}

// ─── Enquiries / Leads ────────────────────────────────────────────────────────

export async function getServerLeads(): Promise<Enquiry[]> {
  if (!isDbConfigured()) return [...INITIAL_ENQUIRIES];
  try {
    const db = await getDb();
    const rows = await db?.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: { notes: true },
    });
    if (!rows || rows.length === 0) return [...INITIAL_ENQUIRIES];
    return rows.map((r) => ({
      id: r.id,
      referenceId: r.referenceId,
      projectId: r.projectId ?? undefined,
      fullName: r.fullName,
      phone: r.phone,
      email: r.email ?? undefined,
      countryCode: r.countryCode,
      enquiryType: r.enquiryType as Enquiry["enquiryType"],
      message: r.message ?? undefined,
      preferredDate: r.preferredDate?.toISOString(),
      preferredTime: r.preferredTime ?? undefined,
      source: r.source as Enquiry["source"],
      sourcePage: r.sourcePage ?? undefined,
      status: r.status as Enquiry["status"],
      consentGiven: r.consentGiven,
      consentTimestamp: r.consentTimestamp?.toISOString(),
      ipAddress: r.ipAddress ?? undefined,
      userAgent: r.userAgent ?? undefined,
      followUpDate: r.followUpDate?.toISOString(),
      isArchived: r.isArchived,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      notes: r.notes.map((n) => ({
        id: n.id,
        enquiryId: n.enquiryId,
        userId: n.userId,
        userName: "Administrator",
        note: n.note,
        createdAt: n.createdAt.toISOString(),
      })),
    }));
  } catch {
    return [...INITIAL_ENQUIRIES];
  }
}
