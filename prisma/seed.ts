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
      tagline: 'DESIGNED TO ELEVATE EVERY EXPERIENCE.',
      description:
        'Spread across one acre, ROCK ONE SQUARE is a thoughtfully planned mixed-use destination that brings together four distinct verticals — Retail, Entertainment, Modern Offices and Studio Apartments — under one landmark address. From vibrant retail spaces and immersive entertainment to contemporary workspaces and modern urban living, every level is designed to create a more enriching experience.',
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
      slug: 'retail',
      type: OfferingType.RETAIL,
      title: 'Retail',
      shortDesc: 'Visibility That Creates Opportunity.',
      description: 'Designed for businesses seeking a prominent commercial presence, the retail spaces at ROCK ONE SQUARE bring shopping and commercial activity into a mixed-use destination. With road-facing visibility and access to the surrounding area, the retail offering is planned to support business exposure and customer engagement.',
      floorInfo: 'Ground & 1st Floor',
      highlights: ['Commercial retail spaces.', 'Road-facing visibility & commercial exposure', 'Prominent double-height atrium visibility', 'Direct arterial road access with dedicated parking'],
      sortOrder: 0,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: 'entertainment',
      type: OfferingType.ENTERTAINMENT,
      title: 'Entertainment',
      shortDesc: 'Make Every Moment an Experience.',
      description: 'ROCK ONE SQUARE brings entertainment into its mixed-use development, creating a destination where visitors can explore leisure and recreational experiences. Lord of the Drinks and the proposed gaming zone are intended to be key attractions, subject to their confirmed project status and opening plans.',
      floorInfo: '2nd & 3rd Floor',
      highlights: ['Entertainment within a mixed-use destination.', 'Lord of the Drinks & the proposed gaming zone attractions', 'Interactive gaming experiences and arcade spaces', 'Curated dining and recreational leisure zones'],
      sortOrder: 1,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: 'modern-offices',
      type: OfferingType.OFFICE,
      title: 'Modern Offices',
      shortDesc: 'A Better Perspective on Work.',
      description: 'The modern office spaces at ROCK ONE SQUARE are intended for professionals, entrepreneurs and businesses seeking a contemporary commercial address. The office offering brings workplace requirements into a development that also includes retail, entertainment and residential-style studio apartments.',
      floorInfo: '4th Floor',
      highlights: ['Modern commercial office spaces.', 'Contemporary corporate layouts & workplace requirements', 'Integrated climate comfort & HVAC systems', 'Direct access to on-site dining, retail and leisure amenities'],
      sortOrder: 2,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: 'studio-apartments',
      type: OfferingType.STUDIO_APARTMENT,
      title: 'Studio Apartments',
      shortDesc: 'Compact Spaces. Elevated Living.',
      description: "The studio apartments at ROCK ONE SQUARE are planned for people seeking compact urban living within a mixed-use development. Their positioning complements the project's commercial and entertainment offerings, bringing multiple everyday needs together at one address.",
      floorInfo: '5th – 9th Floor',
      highlights: ['Studio apartments within a mixed-use development.', 'Compact urban living with intelligent modular layouts', 'Panoramic National Capital Region horizon views', 'Seamless access to building retail, dining and services'],
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
    { name: 'Premium Finishes', description: 'Granite and tile finishes across designated areas.', iconName: 'Gem', sortOrder: 0 },
    { name: 'Reliable Power Support', description: 'Dual power supply with DG backup.', iconName: 'Zap', sortOrder: 1 },
    { name: 'Integrated Climate Comfort', description: 'Integrated HVAC system.', iconName: 'Wind', sortOrder: 2 },
    { name: 'Safety by Design', description: 'Advanced firefighting systems.', iconName: 'Shield', sortOrder: 3 },
    { name: 'Round-the-Clock Monitoring', description: '24×7 CCTV surveillance.', iconName: 'Camera', sortOrder: 4 },
    { name: 'Seamless Vertical Movement', description: '8 high-speed elevators.', iconName: 'ArrowUpDown', sortOrder: 5 },
    { name: 'Convenient Parking', description: 'Extensive basement parking with modern wayfinding.', iconName: 'Car', sortOrder: 6 },
    { name: 'Efficient Service Access', description: 'Discreet service area at the rear.', iconName: 'Package', sortOrder: 7 },
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
    { question: 'Where is Rock One Square located?', answer: 'Rock One Square is located in Raj Nagar Extension, Ghaziabad, Uttar Pradesh — with direct frontage on a 30-metre-wide arterial road connected to Meerut Road and the Delhi–Meerut Expressway corridor.', sortOrder: 0 },
    { question: 'What are the four verticals available at Rock One Square?', answer: 'Rock One Square brings together four key verticals: Premium Retail, Food & Beverage, Entertainment, and Studio Apartments. Contact our sales team for details about available spaces.', sortOrder: 1 },
    { question: 'What amenities are included?', answer: 'The development features dual power supply with DG backup, integrated HVAC system, advanced firefighting systems, 24×7 CCTV surveillance, 8 high-speed elevators, premium finishes, extensive basement parking with modern wayfinding, and efficient service access.', sortOrder: 2 },
    { question: 'How can I book a site visit?', answer: 'Click the "Book a Site Visit" button on this page, fill out the enquiry form, call our sales team directly, or reach us on WhatsApp. Our team will confirm a convenient time for your visit.', sortOrder: 3 },
    { question: 'How can I get the project brochure?', answer: 'You can request the project brochure by submitting an enquiry or contacting our sales team directly. We will send you the latest project documentation to your email or WhatsApp.', sortOrder: 4 },
    { question: 'How can I contact the sales team?', answer: 'Use the enquiry form at the bottom of this page, call us during business hours (Monday to Sunday, 10 AM–9 PM), or message us on WhatsApp.', sortOrder: 5 },
    { question: 'What is the current construction status?', answer: 'Rock One Square has officially achieved a major structural milestone with 7 FLOORS COMPLETE. RCC superstructure casting is executed up to the 7th floor level. Work is progressing steadily toward the upper suites and rooftop, with possession scheduled soon. Prospective buyers and tenants are welcome to schedule guided on-site inspections.', sortOrder: 6 },
    { question: 'What is the RERA status?', answer: "You can check the project's RERA registration information using ReraTracker. For official confirmation of registration status, please verify the project's registration details on the Uttar Pradesh RERA portal.", sortOrder: 7 },
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
      title: 'ROCK ONE SQUARE',
      subtitle: 'DESIGNED TO ELEVATE EVERY EXPERIENCE.',
      description: 'Retail. Entertainment. Modern Offices. Studio Apartments.',
      imageUrl: '/images/building-front.jpg',
      ctaLabel: 'Explore Building Explorer',
      ctaUrl: '#explorer',
      secondaryCtaLabel: 'Book a Site Visit',
      secondaryCtaUrl: '#contact',
      badge: '7 FLOORS COMPLETE | POSSESSION SOON',
      sortOrder: 0,
      status: PublishStatus.PUBLISHED,
    },
    {
      title: 'LORD OF THE DRINKS',
      subtitle: 'AN ICONIC EXPERIENCE. A NEW ADDRESS.',
      description: 'An iconic dining experience arrives in Raj Nagar Extension with Lord of the Drinks. A vibrant commercial destination bringing together curated fine dining and memorable social moments.',
      imageUrl: '/images/lord-of-the-drinks.jpg',
      badge: 'FOR THE FIRST TIME IN GHAZIABAD',
      ctaLabel: 'Discover Entertainment',
      ctaUrl: '#offerings',
      secondaryCtaLabel: 'Enquire for Dining Space',
      secondaryCtaUrl: '#contact',
      sortOrder: 1,
      status: PublishStatus.PUBLISHED,
    },
    {
      title: 'THE BIGGEST GAMING ZONE IN GHAZIABAD',
      subtitle: 'TAKE ENTERTAINMENT TO THE NEXT LEVEL.',
      description: 'The biggest gaming zone in Ghaziabad. Immersive virtual reality, dynamic arcade arenas, and family recreation spanning the expansive 3rd floor entertainment level.',
      imageUrl: '/images/gaming-zone-bumper-cars.png',
      badge: 'TAKE ENTERTAINMENT TO THE NEXT LEVEL.',
      ctaLabel: 'Explore Verticals',
      ctaUrl: '#offerings',
      secondaryCtaLabel: 'Plan Your Visit',
      secondaryCtaUrl: '#contact',
      sortOrder: 2,
      status: PublishStatus.PUBLISHED,
    },
  ]

  for (const banner of bannersData) {
    const existing = await prisma.banner.findFirst({ where: { sortOrder: banner.sortOrder } })
    if (!existing) {
      await prisma.banner.create({ data: { ...banner, projectId: project.id } })
    } else {
      await prisma.banner.update({
        where: { id: existing.id },
        data: {
          title: banner.title,
          subtitle: banner.subtitle,
          description: banner.description,
          imageUrl: banner.imageUrl,
          badge: banner.badge,
        },
      })
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
