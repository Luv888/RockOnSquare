/**
 * Rock One Square — Database Seed Script
 *
 * Seeds initial project data, site settings, FAQs, amenities, banners,
 * and floor data from the supplied project documentation.
 *
 * Safe to re-run: uses upsert/createIfNotExists patterns.
 * Does NOT insert fabricated customer enquiries or fake inventory.
 *
 * Run: pnpm db:seed
 */

import { PrismaClient } from '@prisma/client'

const PublishStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const

const OfferingType = {
  RETAIL: 'RETAIL',
  ENTERTAINMENT: 'ENTERTAINMENT',
  OFFICE: 'OFFICE',
  STUDIO_APARTMENT: 'STUDIO_APARTMENT',
  HOTEL: 'HOTEL',
  DINING: 'DINING',
  OTHER: 'OTHER',
} as const

const MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  BROCHURE: 'BROCHURE',
} as const

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Rock One Square database...\n')

  // ============================================================
  // PROJECT
  // ============================================================
  const project = await prisma.project.upsert({
    where: { slug: 'rock-one-square' },
    update: {},
    create: {
      slug: 'rock-one-square',
      name: 'Rock One Square',
      tagline: 'A Rock Solid Plan to Grow',
      description:
        'Rock One Square is a landmark mixed-use commercial destination spread across approximately one acre in Raj Nagar Extension, Ghaziabad. The development combines premium retail, world-class entertainment, modern offices, and premium studio apartments.',
      developerName: 'Senflore Hospitality LLP',
      address: 'Raj Nagar Extension',
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      country: 'India',
      pincode: '201003',
      latitude: 28.6765,
      longitude: 77.4369,
      siteAreaAcres: 1.0,
      builtUpAreaSqm: 16929,
      roadFrontageMtr: 30,
      totalFloors: 11,
      completedFloors: 7,
      constructionStatus: '7 floors complete — progressing ahead of schedule',
      status: PublishStatus.PUBLISHED,
    },
  })
  console.log(`✅ Project: ${project.name}`)

  // ============================================================
  // OFFERINGS
  // ============================================================
  const offeringsData = [
    {
      slug: 'premium-retail',
      type: OfferingType.RETAIL,
      title: 'Premium Retail',
      shortDesc: 'High-visibility commercial spaces on the ground floor',
      description: 'Prime retail locations with 30-metre road frontage on Meerut Road, premium granite finishes, and maximum footfall positioning.',
      floorInfo: 'Ground Floor',
      highlights: ['30m road frontage', 'Maximum footfall', 'Premium finishes', 'Direct road access'],
      sortOrder: 0,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: 'entertainment',
      type: OfferingType.ENTERTAINMENT,
      title: 'Entertainment Zone',
      shortDesc: "Ghaziabad's biggest gaming zone and dining destination",
      description: 'Flagship entertainment with the biggest gaming zone in Ghaziabad, premium dining, and the exclusive "Lord of the Drinks" bar concept — for the first time in the region.',
      floorInfo: '2nd – 3rd Floor',
      highlights: ["Largest gaming zone in Ghaziabad", '"Lord of the Drinks" concept', 'Restaurant cluster', 'Social spaces'],
      sortOrder: 1,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: 'modern-offices',
      type: OfferingType.OFFICE,
      title: 'Modern Offices',
      shortDesc: 'Contemporary office spaces with HVAC',
      description: 'Professional office environment with climate control, high-speed connectivity, and access to the full Rock One Square ecosystem.',
      floorInfo: '4th Floor',
      highlights: ['HVAC', 'High-speed connectivity', 'Professional setting'],
      sortOrder: 2,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: 'studio-apartments',
      type: OfferingType.STUDIO_APARTMENT,
      title: 'Studio Apartments',
      shortDesc: 'Premium service apartments on the upper floors',
      description: 'Premium service apartments and studio units offering panoramic views and full amenity access within the Rock One Square complex.',
      floorInfo: '5th – 9th Floor',
      highlights: ['Panoramic views', 'Service apartment facilities', 'Modern studio layouts'],
      sortOrder: 3,
      status: PublishStatus.PUBLISHED,
    },
  ]

  for (const o of offeringsData) {
    await prisma.offering.upsert({
      where: { projectId_slug: { projectId: project.id, slug: o.slug } },
      update: {},
      create: { projectId: project.id, ...o },
    })
  }
  console.log(`✅ Offerings: ${offeringsData.length}`)

  // ============================================================
  // FLOORS
  // ============================================================
  const floorsData = [
    { floorNumber: 0, floorLabel: 'Ground Floor', shortLabel: 'GF', offeringType: OfferingType.RETAIL, description: 'Premium retail spaces with direct access to Meerut Road. Maximum footfall, 30m frontage.', highlights: ['Maximum footfall', '30m road frontage', 'Premium finishes'], sortOrder: 0, status: PublishStatus.PUBLISHED },
    { floorNumber: 1, floorLabel: 'First Floor', shortLabel: '1F', offeringType: OfferingType.RETAIL, description: 'Retail spaces, hotel lobby access, and dining entry points.', highlights: ['Hotel lobby access', 'Retail spaces'], sortOrder: 1, status: PublishStatus.PUBLISHED },
    { floorNumber: 2, floorLabel: 'Second Floor', shortLabel: '2F', offeringType: OfferingType.DINING, description: 'Retail continuity, hotel amenities, and curated dining zone.', highlights: ['Dining zone', 'Hotel amenities'], sortOrder: 2, status: PublishStatus.PUBLISHED },
    { floorNumber: 3, floorLabel: 'Third Floor', shortLabel: '3F', offeringType: OfferingType.ENTERTAINMENT, description: "Entertainment hub — Ghaziabad's biggest gaming zone, gymnasium, and restaurant cluster.", highlights: ["Biggest gaming zone", 'Restaurant cluster', 'Gymnasium'], sortOrder: 3, status: PublishStatus.PUBLISHED },
    { floorNumber: 4, floorLabel: 'Fourth Floor', shortLabel: '4F', offeringType: OfferingType.OFFICE, description: 'Modern offices with HVAC and high-speed connectivity.', highlights: ['Modern offices', 'HVAC'], sortOrder: 4, status: PublishStatus.PUBLISHED },
    { floorNumber: 5, floorLabel: 'Fifth Floor', shortLabel: '5F', offeringType: OfferingType.STUDIO_APARTMENT, description: 'Service apartments and studio units with panoramic views.', highlights: ['Service apartments', 'Studio units'], sortOrder: 5, status: PublishStatus.PUBLISHED },
    { floorNumber: 6, floorLabel: 'Sixth Floor', shortLabel: '6F', offeringType: OfferingType.STUDIO_APARTMENT, description: 'Premium studio apartments with full service facilities.', highlights: ['Premium studios', 'Full services'], sortOrder: 6, status: PublishStatus.PUBLISHED },
    { floorNumber: 7, floorLabel: 'Seventh Floor', shortLabel: '7F', offeringType: OfferingType.STUDIO_APARTMENT, description: 'Studio apartments — construction completed.', highlights: ['Construction complete', 'Studio apartments'], sortOrder: 7, status: PublishStatus.PUBLISHED },
    { floorNumber: 8, floorLabel: 'Eighth Floor', shortLabel: '8F', offeringType: OfferingType.STUDIO_APARTMENT, description: 'Service apartments and studio units on upper level.', highlights: ['Service apartments', 'Upper floor views'], sortOrder: 8, status: PublishStatus.PUBLISHED },
    { floorNumber: 9, floorLabel: 'Ninth Floor', shortLabel: '9F', offeringType: OfferingType.STUDIO_APARTMENT, description: 'Premium service apartments with panoramic city views.', highlights: ['Panoramic views', 'Premium apartments'], sortOrder: 9, status: PublishStatus.PUBLISHED },
    { floorNumber: 10, floorLabel: 'Tenth Floor', shortLabel: '10F', offeringType: OfferingType.HOTEL, description: 'Hotel administration and premium management facilities.', highlights: ['Hotel admin', 'Management facilities'], sortOrder: 10, status: PublishStatus.PUBLISHED },
  ]

  for (const f of floorsData) {
    await prisma.floor.upsert({
      where: { projectId_floorNumber: { projectId: project.id, floorNumber: f.floorNumber } },
      update: {},
      create: { projectId: project.id, ...f },
    })
  }
  console.log(`✅ Floors: ${floorsData.length}`)

  // ============================================================
  // AMENITIES
  // ============================================================
  const amenitiesData = [
    { name: 'Premium Finishes', description: 'Granite and premium tile throughout all common areas', iconName: 'Gem', sortOrder: 0 },
    { name: 'Dual Power Supply', description: 'Uninterrupted power with DG backup for critical systems', iconName: 'Zap', sortOrder: 1 },
    { name: 'HVAC', description: 'Centralised climate control across commercial zones', iconName: 'Wind', sortOrder: 2 },
    { name: 'Advanced Fire Safety', description: 'Multi-zone fire detection and suppression systems', iconName: 'Shield', sortOrder: 3 },
    { name: '24×7 CCTV', description: 'Comprehensive surveillance across all levels and access points', iconName: 'Camera', sortOrder: 4 },
    { name: '8 Elevators', description: "Eight elevators designed to provide convenient vertical access between the building's different levels.", iconName: 'ArrowUpDown', sortOrder: 5 },
    { name: 'Service Areas', description: 'Dedicated back-of-house operations and service entry points', iconName: 'Package', sortOrder: 6 },
    { name: 'Grand Entrance', description: 'Architecturally impressive entrance statement and lobby', iconName: 'DoorOpen', sortOrder: 7 },
    { name: 'Valet & Mechanical Parking', description: 'Convenient parking arrangements designed to support visitors, shoppers, tenants, and commercial operations.', iconName: 'Car', sortOrder: 8 },
  ]

  for (const a of amenitiesData) {
    const existing = await prisma.amenity.findFirst({ where: { name: a.name } })
    if (!existing) {
      const amenity = await prisma.amenity.create({ data: { ...a, isPublished: true } })
      await prisma.projectAmenity.create({ data: { projectId: project.id, amenityId: amenity.id, sortOrder: a.sortOrder } })
    }
  }
  console.log(`✅ Amenities: ${amenitiesData.length}`)

  // ============================================================
  // FAQS
  // ============================================================
  const faqsData = [
    { question: 'Where is Rock One Square located?', answer: 'Rock One Square is located in Raj Nagar Extension, Ghaziabad, Uttar Pradesh — a rapidly growing commercial corridor with direct frontage on Meerut Road and strong connectivity to the Delhi-NCR region.', sortOrder: 0 },
    { question: 'What are the four verticals available at Rock One Square?', answer: 'Rock One Square brings together four key verticals: Premium Retail, Food & Beverage, Entertainment, and Studio Apartments. Contact our sales team for details about available spaces.', sortOrder: 1 },
    { question: 'What amenities are included?', answer: 'The development features dual power supply with DG backup, HVAC, advanced fire safety systems, 24×7 CCTV surveillance, eight elevators, premium granite finishes, dedicated service areas, and a grand entrance.', sortOrder: 2 },
    { question: 'How can I book a site visit?', answer: 'Click the "Book a Site Visit" button on this page, fill out the enquiry form, call our sales team directly, or reach us on WhatsApp. Our team will confirm a convenient time for your visit.', sortOrder: 3 },
    { question: 'How can I get the project brochure?', answer: 'You can request the project brochure by submitting an enquiry or contacting our sales team directly. We will send you the latest project documentation to your email or WhatsApp.', sortOrder: 4 },
    { question: 'How can I contact the sales team?', answer: 'Use the enquiry form at the bottom of this page, call us during business hours (Monday to Sunday, 10 AM–9 PM), or message us on WhatsApp.', sortOrder: 5 },
    { question: 'What is the RERA status?', answer: "You can check the project's RERA registration information using ReraTracker. For official confirmation of registration status, please verify the project's registration details on the Uttar Pradesh RERA portal.", sortOrder: 6 },
  ]

  // Remove legacy outdated questions from the database
  try {
    await prisma.fAQ.deleteMany({
      where: {
        question: {
          in: [
            'What commercial spaces are available?',
            'What is the RERA status of Rock One Square?',
          ],
        },
      },
    })
  } catch {}

  for (const faq of faqsData) {
    const existing = await prisma.fAQ.findFirst({ where: { question: faq.question } })
    if (!existing) {
      await prisma.fAQ.create({ data: { ...faq, projectId: project.id, isPublished: true } })
    } else {
      await prisma.fAQ.update({
        where: { id: existing.id },
        data: { answer: faq.answer, sortOrder: faq.sortOrder, isPublished: true },
      })
    }
  }
  console.log(`✅ FAQs: ${faqsData.length}`)

  // ============================================================
  // BANNERS
  // ============================================================
  const bannersData = [
    {
      title: 'A Rock Solid Plan to Grow',
      subtitle: 'Retail. Entertainment. Modern Offices. Studio Apartments.',
      description: 'Rock One Square — The premium commercial destination at Raj Nagar Extension, Ghaziabad.',
      ctaLabel: 'Explore the Project',
      ctaUrl: '#offerings',
      secondaryCtaLabel: 'Book a Site Visit',
      secondaryCtaUrl: '#contact',
      badge: 'New Launch',
      sortOrder: 0,
      status: PublishStatus.PUBLISHED,
    },
    {
      title: 'Lord of the Drinks',
      subtitle: 'For the First Time in Ghaziabad',
      description: 'A curated dining and entertainment ecosystem unlike anything in the region. Anchored by an exclusive premium bar and dining concept.',
      ctaLabel: 'Discover More',
      ctaUrl: '#offerings',
      sortOrder: 1,
      status: PublishStatus.PUBLISHED,
    },
    {
      title: 'The Biggest Gaming Zone',
      subtitle: 'In Ghaziabad',
      description: 'Entertainment at its finest. Rock One Square brings an unparalleled gaming and leisure experience to Raj Nagar Extension.',
      ctaLabel: 'View Offerings',
      ctaUrl: '#offerings',
      sortOrder: 2,
      status: PublishStatus.PUBLISHED,
    },
  ]

  for (const banner of bannersData) {
    const existing = await prisma.banner.findFirst({ where: { title: banner.title } })
    if (!existing) {
      await prisma.banner.create({ data: { ...banner, projectId: project.id } })
    }
  }
  console.log(`✅ Banners: ${bannersData.length}`)

  // ============================================================
  // SITE SETTINGS
  // ============================================================
  const settingsData = [
    { key: 'business.name', label: 'Business Name', value: 'Rock One Square', group: 'Business', isPublic: true },
    { key: 'business.developer', label: 'Developer Name', value: 'Senflore Hospitality LLP', group: 'Business', isPublic: true },
    { key: 'contact.address', label: 'Address', value: 'Raj Nagar Extension, Ghaziabad, Uttar Pradesh — 201003', group: 'Contact', isPublic: true },
    { key: 'contact.phone', label: 'Sales Phone', value: '', group: 'Contact', isPublic: true },
    { key: 'contact.whatsapp', label: 'WhatsApp Number', value: '', group: 'Contact', isPublic: false },
    { key: 'contact.email', label: 'Sales Email', value: 'sales@rockonesquare.com', group: 'Contact', isPublic: true },
    { key: 'contact.hours', label: 'Business Hours', value: 'Monday to Sunday, 10 AM–9 PM', group: 'Contact', isPublic: true },
    { key: 'legal.rera', label: 'RERA Number', value: '', group: 'Legal', isPublic: true },
    { key: 'legal.rera_url', label: 'RERA Portal URL', value: 'https://up-rera.in', group: 'Legal', isPublic: true },
    { key: 'seo.title', label: 'Default SEO Title', value: 'Rock One Square | Premium Commercial Real Estate, Raj Nagar Extension', group: 'SEO', isPublic: false },
    { key: 'seo.description', label: 'Default SEO Description', value: 'Premium commercial destination in Raj Nagar Extension, Ghaziabad — Retail, Entertainment, Offices, Studios.', group: 'SEO', isPublic: false },
  ]

  for (const s of settingsData) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }
  console.log(`✅ Site Settings: ${settingsData.length}`)

  // ============================================================
  // CONSTRUCTION UPDATE (initial)
  // ============================================================
  const existing = await prisma.constructionUpdate.findFirst({ where: { projectId: project.id } })
  if (!existing) {
    await prisma.constructionUpdate.create({
      data: {
        projectId: project.id,
        title: '7 Floors Complete — Construction Progressing',
        description:
          'Construction at Rock One Square is progressing ahead of schedule with 7 floors now complete. The structural work continues on the remaining floors.',
        updateDate: new Date(),
        floorsCompleted: 7,
        isMilestone: true,
        milestoneLabel: 'Major Milestone',
        isPublished: true,
        sortOrder: 0,
      },
    })
    console.log('✅ Construction Update: Initial milestone')
  }

  console.log('\n✨ Seed complete. Run pnpm db:seed:admin to create the first administrator account.')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
