import {
  Project,
  Offering,
  Floor,
  Amenity,
  FAQ,
  Banner,
  ConstructionUpdate,
  SiteSetting,
  Enquiry,
} from './types'

export const INITIAL_PROJECT: Project = {
  id: 'proj-rock-one-square',
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
  status: 'PUBLISHED',
}

export const INITIAL_OFFERINGS: Offering[] = [
  {
    id: 'off-1',
    projectId: 'proj-rock-one-square',
    slug: 'retail',
    type: 'RETAIL',
    title: 'Retail',
    shortDesc: 'Visibility That Creates Opportunity.',
    description:
      'Designed for brands that aspire to stand out, the retail spaces at ROCK ONE SQUARE combine a prominent commercial presence with the potential to attract attention and footfall. With a 30-metre-wide arterial road in front, retail takes centre stage in a destination designed around visibility and engagement.',
    floorInfo: 'Ground & 1st Floor',
    highlights: [
      '30-metre-wide arterial road frontage',
      'Prominent double-height atrium visibility',
      'High footfall pedestrian plaza',
      'Direct arterial road access with dedicated parking',
    ],
    sortOrder: 0,
    status: 'PUBLISHED',
  },
  {
    id: 'off-2',
    projectId: 'proj-rock-one-square',
    slug: 'entertainment',
    type: 'ENTERTAINMENT',
    title: 'Entertainment',
    shortDesc: 'Make Every Moment an Experience.',
    description:
      'Bringing people together through excitement, recreation and memorable moments, ROCK ONE SQUARE creates a vibrant entertainment destination for Ghaziabad. With expansive gaming zones, interactive arcade attractions, and curated dining experiences, the destination is designed to make leisure more engaging.',
    floorInfo: '2nd & 3rd Floor',
    highlights: [
      'A dynamic family entertainment destination',
      'Interactive gaming experiences and arcade attractions',
      'The biggest gaming zone in Ghaziabad',
      'Curated dining and recreational leisure spaces',
    ],
    sortOrder: 1,
    status: 'PUBLISHED',
  },
  {
    id: 'off-3',
    projectId: 'proj-rock-one-square',
    slug: 'modern-offices',
    type: 'OFFICE',
    title: 'Modern Offices',
    shortDesc: 'A Better Perspective on Work.',
    description:
      'Work deserves a space that inspires ideas and supports ambition. The modern office spaces at ROCK ONE SQUARE are thoughtfully designed for today\'s professionals, entrepreneurs and growing businesses. Contemporary layouts and efficient planning create an environment that brings functionality and design together.',
    floorInfo: '4th Floor',
    highlights: [
      'Smart, efficient and contemporary workspaces',
      'Climate comfort & HVAC systems',
      'High-speed digital connectivity infrastructure',
      'Direct access to on-site dining, retail and leisure amenities',
    ],
    sortOrder: 2,
    status: 'PUBLISHED',
  },
  {
    id: 'off-4',
    projectId: 'proj-rock-one-square',
    slug: 'studio-apartments',
    type: 'STUDIO_APARTMENT',
    title: 'Studio Apartments',
    shortDesc: 'Compact Spaces. Elevated Living.',
    description:
      'Designed for the aspirations of modern urban professionals, the studio apartments at ROCK ONE SQUARE bring together intelligent layouts, contemporary aesthetics and modern amenities. A thoughtfully planned living experience for those who value convenience, functionality and a well-connected address.',
    floorInfo: '5th to 9th Floor',
    highlights: [
      'Contemporary urban living in thoughtfully designed spaces',
      'Intelligent modular layouts with premium finishes',
      'Panoramic National Capital Region horizon views',
      'Seamless access to building retail, dining and services',
    ],
    sortOrder: 3,
    status: 'PUBLISHED',
  },
]

export const INITIAL_FLOORS: Floor[] = [
  {
    id: 'floor-0',
    projectId: 'proj-rock-one-square',
    floorNumber: 0,
    floorLabel: 'Ground Floor',
    shortLabel: 'GF',
    offeringType: 'RETAIL',
    description:
      'High-visibility flagship retail with direct access to Meerut Road. Features a 30m arterial road frontage, premium granite and glass finishes, and maximum footfall positioning.',
    highlights: [
      '30-metre-wide arterial road frontage',
      'Flagship double-height retail facades',
      'Direct vehicular drop-off & pedestrian plaza',
      'Granite and tile luxury finishes',
    ],
    imageUrls: ['/images/retail-1.jpg'],
    sortOrder: 0,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-1',
    projectId: 'proj-rock-one-square',
    floorNumber: 1,
    floorLabel: 'First Floor',
    shortLabel: '1F',
    offeringType: 'RETAIL',
    description:
      'Anchor retail stores, lifestyle outlets, and escalator connectivity from the central atrium. Seamless vertical transit and dedicated shopping corridors.',
    highlights: [
      'Atrium-facing anchor retail stores',
      'Escalator connectivity & 8 elevators',
      'Wide lifestyle shopping corridors',
      'HVAC climate comfort',
    ],
    imageUrls: ['/images/retail-1.jpg'],
    sortOrder: 1,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-2',
    projectId: 'proj-rock-one-square',
    floorNumber: 2,
    floorLabel: 'Second Floor',
    shortLabel: '2F',
    offeringType: 'DINING',
    description:
      'Curated culinary destination featuring fine dining, quick-service eateries, and spacious indoor social dining zones.',
    highlights: [
      'Curated gourmet restaurant cluster',
      'Contemporary indoor restaurant and café spaces',
      'Dedicated exhaust & kitchen infrastructure',
      'Expansive seating with atrium views',
    ],
    imageUrls: ['/images/fine-dining-1.jpg'],
    sortOrder: 2,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-3',
    projectId: 'proj-rock-one-square',
    floorNumber: 3,
    floorLabel: 'Third Floor',
    shortLabel: '3F',
    offeringType: 'ENTERTAINMENT',
    description:
      'A dynamic family recreation and entertainment hub featuring expansive gaming zones, interactive arcade attractions, and dedicated leisure spaces.',
    highlights: [
      'Indoor recreational activities and arcade-style attractions',
      'Interactive gaming experiences and virtual reality zones',
      'The biggest gaming zone in Ghaziabad',
      'High-capacity central escalator and elevator access',
    ],
    imageUrls: ['/images/gaming-zone-hero.jpg', '/images/gaming-entertainment.jpg'],
    sortOrder: 3,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-4',
    projectId: 'proj-rock-one-square',
    floorNumber: 4,
    floorLabel: 'Fourth Floor',
    shortLabel: '4F',
    offeringType: 'OFFICE',
    description:
      'Smart corporate suites and contemporary workspaces with HVAC climate control, acoustic treatment, and professional executive reception.',
    highlights: [
      'Contemporary corporate office layouts',
      'HVAC climate control',
      'High-speed optic fiber connectivity',
      'Flexible commercial office space allocations',
    ],
    imageUrls: ['/images/office-1.jpg', '/images/office-2.jpg'],
    sortOrder: 4,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-5',
    projectId: 'proj-rock-one-square',
    floorNumber: 5,
    floorLabel: 'Fifth Floor',
    shortLabel: '5F',
    offeringType: 'STUDIO_APARTMENT',
    description:
      'Modern studio suites offering intelligent space planning, panoramic views over Raj Nagar Extension, and dedicated resident lift lobbies.',
    highlights: [
      'Modern modular studio apartments',
      'Dedicated residential access control',
      'Panoramic green views',
      '24×7 power backup & water supply',
    ],
    imageUrls: ['/images/studio-apartment-1.jpg'],
    sortOrder: 5,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-6',
    projectId: 'proj-rock-one-square',
    floorNumber: 6,
    floorLabel: 'Sixth Floor',
    shortLabel: '6F',
    offeringType: 'STUDIO_APARTMENT',
    description:
      'Contemporary urban studio apartments crafted for professionals and corporate travelers seeking convenience, security, and address prestige.',
    highlights: [
      'Contemporary urban interior design',
      'Smart home infrastructure readiness',
      '24×7 CCTV & security personnel',
      'Housekeeping and concierge options',
    ],
    imageUrls: ['/images/studio-apartment-2.jpg'],
    sortOrder: 6,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-7',
    projectId: 'proj-rock-one-square',
    floorNumber: 7,
    floorLabel: 'Seventh Floor',
    shortLabel: '7F',
    offeringType: 'STUDIO_APARTMENT',
    description:
      '7 Floors Complete milestone level. Premium studio apartments with unobstructed western horizon views and high-spec architectural finishes.',
    highlights: [
      '7 Floors Complete — structure executed',
      'Premium specifications & wide balconies',
      'Acoustic double-glazed windows',
      'Elevator service banks',
    ],
    imageUrls: ['/images/studio-apartment-3.jpg'],
    sortOrder: 7,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-8',
    projectId: 'proj-rock-one-square',
    floorNumber: 8,
    floorLabel: 'Eighth Floor',
    shortLabel: '8F',
    offeringType: 'STUDIO_APARTMENT',
    description:
      'Upper-level executive studio apartments overlooking Meerut Road expressway corridor. Elevated serenity, ventilation, and natural daylight.',
    highlights: [
      'Upper-tier executive suites',
      'Elevated cross-ventilation & sunlight',
      'Luxury bathroom fittings & joinery',
      'Direct elevator access to all lower amenities',
    ],
    imageUrls: ['/images/studio-apartment-4.jpg'],
    sortOrder: 8,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-9',
    projectId: 'proj-rock-one-square',
    floorNumber: 9,
    floorLabel: 'Ninth Floor',
    shortLabel: '9F',
    offeringType: 'STUDIO_APARTMENT',
    description:
      'Penthouse-level studio apartments with sweeping panoramic vistas across Ghaziabad and the National Capital Region.',
    highlights: [
      'Penthouse level panoramic views',
      'Highest residential elevation in project',
      'Maximum privacy and noise insulation',
      'Premium architectural specifications',
    ],
    imageUrls: ['/images/studio-apartment-4.jpg'],
    sortOrder: 9,
    status: 'PUBLISHED',
  },
  {
    id: 'floor-10',
    projectId: 'proj-rock-one-square',
    floorNumber: 10,
    floorLabel: 'Tenth Floor & Rooftop',
    shortLabel: '10F',
    offeringType: 'HOTEL',
    description:
      'Rooftop hospitality lounge and executive management facilities with landscaped open-air terrace decks.',
    highlights: [
      'Landscaped rooftop terrace lounge',
      'Executive hospitality management suites',
      'Unmatched 360-degree skyline views',
      'Private event & recreation space',
    ],
    imageUrls: ['/images/fine-dining-1.jpg', '/images/building-aerial.jpg'],
    sortOrder: 10,
    status: 'PUBLISHED',
  },
]

export const INITIAL_AMENITIES: Amenity[] = [
  {
    id: 'amenity-1',
    name: 'Premium Finishes',
    description: 'Granite and premium tile finishes throughout designated common areas, lobbies, and corridors.',
    iconName: 'Gem',
    sortOrder: 0,
    isPublished: true,
  },
  {
    id: 'amenity-2',
    name: 'Dual Power Supply',
    description: 'Reliable power support with dual power supply and automatic DG backup for uninterrupted operations.',
    iconName: 'Zap',
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: 'amenity-3',
    name: 'HVAC',
    description: 'Centralised climate comfort with HVAC systems engineered for commercial zones.',
    iconName: 'Wind',
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: 'amenity-4',
    name: 'Advanced Fire Safety',
    description: 'Safety by design: advanced multi-tier firefighting systems, sprinklers, and emergency egress.',
    iconName: 'Shield',
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: 'amenity-5',
    name: '24×7 CCTV',
    description: 'Round-the-clock monitoring and surveillance across all levels, access gates, and parking areas.',
    iconName: 'Camera',
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: 'amenity-6',
    name: '8 Elevators',
    description: "Eight elevators designed to provide convenient vertical access between the building's different levels.",
    iconName: 'ArrowUpDown',
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: 'amenity-8',
    name: 'Service Areas',
    description: 'Efficient back-of-house operations with a discreet dedicated service area positioned at the rear.',
    iconName: 'Package',
    sortOrder: 6,
    isPublished: true,
  },
  {
    id: 'amenity-9',
    name: 'Grand Entrance',
    description: 'Architecturally striking entrance statement with expansive pedestrian plaza and double-height lobby.',
    iconName: 'DoorOpen',
    sortOrder: 7,
    isPublished: true,
  },
  {
    id: 'amenity-10',
    name: 'Valet & Mechanical Parking',
    description: 'Convenient parking arrangements designed to support visitors, shoppers, tenants, and commercial operations.',
    iconName: 'Car',
    sortOrder: 8,
    isPublished: true,
  },
]

export function normalizeFaqRecord<T extends { id: string; question: string; answer: string; sortOrder?: number; isPublished?: boolean }>(f: T): T {
  let { question, answer } = f

  // 1. Commercial Verticals FAQ
  if (
    question.toLowerCase().includes('what commercial spaces are available') ||
    question.toLowerCase().includes('commercial spaces are available') ||
    question.toLowerCase().includes('what are the four verticals')
  ) {
    question = 'What are the four verticals available at Rock One Square?'
    answer =
      'Rock One Square brings together four key verticals: Premium Retail, Food & Beverage, Entertainment, and Studio Apartments. Contact our sales team for details about available spaces.'
  }

  // 2. Sales Contact FAQ business hours
  if (
    question.toLowerCase().includes('contact the sales team') ||
    answer.toLowerCase().includes('business hours')
  ) {
    question = 'How can I contact the sales team?'
    answer =
      'Use the enquiry form at the bottom of this page, call us during business hours (Monday to Sunday, 10 AM–9 PM), or message us on WhatsApp.'
  }

  // 3. Amenities FAQ
  if (question.toLowerCase().includes('what amenities are included')) {
    question = 'What amenities are included?'
    answer =
      'The development features dual power supply with DG backup, HVAC, advanced fire safety systems, 24×7 CCTV surveillance, eight elevators, premium granite finishes, dedicated service areas, and a grand entrance.'
  }

  // 4. RERA FAQ
  if (question.toLowerCase().includes('rera status')) {
    question = 'What is the RERA status?'
    answer =
      "You can check the project's RERA registration information using ReraTracker. For official confirmation of registration status, please verify the project's registration details on the Uttar Pradesh RERA portal."
  }

  // Universal cleanup for any leftover outdated terms in active content
  answer = answer
    .replace(/(Monday\s*(to|-|–)\s*Saturday,?\s*10(?::00)?\s*AM\s*(-|–)\s*7(?::00)?\s*PM)/gi, 'Monday to Sunday, 10 AM–9 PM')
    .replace(/Integrated HVAC/gi, 'HVAC')
    .replace(/integrated HVAC/gi, 'HVAC')
    .replace(/8 High-Speed Elevators/gi, '8 Elevators')
    .replace(/8 high-speed elevators/gi, 'eight elevators')
    .replace(/high-speed elevators/gi, 'elevators')
    .replace(/extensive basement parking,?/gi, '')

  return { ...f, question, answer }
}

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Where is Rock One Square located?',
    answer: 'Rock One Square is strategically located in Raj Nagar Extension, Ghaziabad, Uttar Pradesh — with direct frontage on a 30-metre-wide arterial road connected to Meerut Road and the Delhi–Meerut Expressway corridor.',
    sortOrder: 0,
    isPublished: true,
  },
  {
    id: 'faq-2',
    question: 'What are the four verticals available at Rock One Square?',
    answer: 'Rock One Square brings together four key verticals: Premium Retail, Food & Beverage, Entertainment, and Studio Apartments. Contact our sales team for details about available spaces.',
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: 'faq-3',
    question: 'What amenities are included?',
    answer: 'The development features dual power supply with DG backup, HVAC, advanced fire safety systems, 24×7 CCTV surveillance, eight elevators, premium granite finishes, dedicated service areas, and a grand entrance.',
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: 'faq-4',
    question: 'How can I book a site visit?',
    answer: 'Click the "Book a Site Visit" button on this page, fill out the enquiry form, call our sales team directly, or reach us on WhatsApp. Our team will confirm a convenient time for your visit.',
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: 'faq-5',
    question: 'How can I get the project brochure?',
    answer: 'You can request the project brochure by submitting an enquiry form or contacting our sales team directly. We will send you the latest project documentation to your email or WhatsApp.',
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: 'faq-6',
    question: 'How can I contact the sales team?',
    answer: 'Use the enquiry form at the bottom of this page, call us during business hours (Monday to Sunday, 10 AM–9 PM), or message us on WhatsApp.',
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: 'faq-7',
    question: 'What is the current construction status?',
    answer: 'Rock One Square has officially achieved a major structural milestone with 7 FLOORS COMPLETE. RCC superstructure casting is executed up to the 7th floor level. Work is progressing steadily toward the upper suites and rooftop, with possession scheduled soon. Prospective buyers and tenants are welcome to schedule guided on-site inspections.',
    sortOrder: 6,
    isPublished: true,
  },
  {
    id: 'faq-8',
    question: 'What is the RERA status?',
    answer: "You can check the project's RERA registration information using ReraTracker. For official confirmation of registration status, please verify the project's registration details on the Uttar Pradesh RERA portal.",
    sortOrder: 7,
    isPublished: true,
  },
]

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-1',
    projectId: 'proj-rock-one-square',
    title: 'ROCK ONE SQUARE',
    subtitle: 'DESIGNED TO ELEVATE EVERY EXPERIENCE.',
    description: 'Retail. Entertainment. Modern Offices. Studio Apartments. One landmark address redefining commercial architecture in Raj Nagar Extension.',
    badge: '7 FLOORS COMPLETE | POSSESSION SOON',
    imageUrl: '/images/building-front.jpg',
    ctaLabel: 'Explore Building Explorer',
    ctaUrl: '#explorer',
    secondaryCtaLabel: 'Book a Site Visit',
    secondaryCtaUrl: '#contact',
    sortOrder: 0,
    status: 'PUBLISHED',
  },
  {
    id: 'banner-2',
    projectId: 'proj-rock-one-square',
    title: 'ENTERTAINMENT & DINING',
    subtitle: 'CURATED CULINARY & SOCIAL DESTINATIONS.',
    description: 'A vibrant commercial destination bringing together curated fine dining, artisanal casual eateries, and immersive social experiences across the lower entertainment tiers.',
    badge: 'CURATED SOCIAL & DINING DESTINATION',
    imageUrl: '/images/lord-of-the-drinks.jpg',
    ctaLabel: 'Discover Entertainment',
    ctaUrl: '#offerings',
    secondaryCtaLabel: 'Enquire for Dining Space',
    secondaryCtaUrl: '#contact',
    sortOrder: 1,
    status: 'PUBLISHED',
  },
  {
    id: 'banner-3',
    projectId: 'proj-rock-one-square',
    title: 'GAMING ZONE',
    subtitle: 'ENTERTAINMENT. ENERGY. UNFORGETTABLE MOMENTS.',
    description: 'The biggest gaming zone in Ghaziabad. Immersive virtual reality, dynamic arcade arenas, and family recreation spanning the expansive 3rd floor.',
    badge: "GHAZIABAD'S LARGEST GAMING HUB",
    imageUrl: '/images/gaming-zone-hero.jpg',
    ctaLabel: 'Explore Verticals',
    ctaUrl: '#offerings',
    secondaryCtaLabel: 'Plan Your Visit',
    secondaryCtaUrl: '#contact',
    sortOrder: 2,
    status: 'PUBLISHED',
  },
]

export const INITIAL_CONSTRUCTION_UPDATES: ConstructionUpdate[] = [
  {
    id: 'cu-1',
    projectId: 'proj-rock-one-square',
    title: 'The Vision Is Taking Shape — 7 Floors Complete',
    description:
      'The vision of ROCK ONE SQUARE is steadily becoming reality, with construction progressing ahead of schedule. Every completed floor brings this landmark destination closer to welcoming a new generation of businesses, experiences and modern urban lifestyles.',
    updateDate: '2025-02-15T00:00:00.000Z',
    floorsCompleted: 7,
    overallProgress: 64,
    isMilestone: true,
    milestoneLabel: '7 Floors Complete',
    photoUrls: [],
    isPublished: true,
    sortOrder: 0,
  },
]

export const INITIAL_SITE_SETTINGS: SiteSetting[] = [
  { id: 'setting-1', key: 'business.name', label: 'Business Name', value: 'Rock One Square', group: 'Business', isPublic: true },
  { id: 'setting-2', key: 'business.developer', label: 'Developer Name', value: 'Senflore Hospitality LLP', group: 'Business', isPublic: true },
  { id: 'setting-3', key: 'business.tagline', label: 'Tagline', value: 'DESIGNED TO ELEVATE EVERY EXPERIENCE.', group: 'Business', isPublic: true },
  { id: 'setting-4', key: 'contact.address', label: 'Address', value: 'Meerut Road, Raj Nagar Extension, Ghaziabad, Uttar Pradesh — 201003', group: 'Contact', isPublic: true },
  { id: 'setting-5', key: 'contact.phone', label: 'Sales Phone', value: '+919999092951', group: 'Contact', isPublic: true },
  { id: 'setting-6', key: 'contact.whatsapp', label: 'WhatsApp Number', value: '919999092951', group: 'Contact', isPublic: false },
  { id: 'setting-7', key: 'location.mapsUrl', label: 'Google Maps Link', value: 'https://share.google/CG0Amb2c0gFphTZIf', group: 'Location', isPublic: true },
  { id: 'setting-8', key: 'contact.hours', label: 'Business Hours', value: 'Monday to Sunday, 10 AM–9 PM', group: 'Contact', isPublic: true },
]

export const INITIAL_ENQUIRIES: Enquiry[] = []
