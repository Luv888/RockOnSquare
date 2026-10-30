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
    'Spread across one acre, ROCK ONE SQUARE is a mixed-use destination bringing together four distinct verticals — Retail, Entertainment, Modern Offices and Studio Apartments — under one landmark address. From retail spaces and entertainment to contemporary workspaces and modern urban living, the development is planned to bring different experiences together in one destination.',
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
      'Designed for businesses seeking a prominent commercial presence, the retail spaces at ROCK ONE SQUARE bring shopping and commercial activity into a mixed-use destination. With road-facing visibility and access to the surrounding area, the retail offering is planned to support business exposure and customer engagement.',
    floorInfo: 'Ground & 1st Floor',
    highlights: [
      'Commercial retail spaces.',
      'Road-facing visibility & commercial exposure',
      'Prominent double-height atrium visibility',
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
      'ROCK ONE SQUARE brings entertainment into its mixed-use development, creating a destination where visitors can explore leisure and recreational experiences. Lord of the Drinks and the proposed gaming zone are intended to be key attractions, subject to their confirmed project status and opening plans.',
    floorInfo: '2nd & 3rd Floor',
    highlights: [
      'Entertainment within a mixed-use destination.',
      'Lord of the Drinks & the proposed gaming zone attractions',
      'Interactive gaming experiences and arcade spaces',
      'Curated dining and recreational leisure zones',
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
      'The modern office spaces at ROCK ONE SQUARE are intended for professionals, entrepreneurs and businesses seeking a contemporary commercial address. The office offering brings workplace requirements into a development that also includes retail, entertainment and residential-style studio apartments.',
    floorInfo: '4th Floor',
    highlights: [
      'Modern commercial office spaces.',
      'Contemporary corporate layouts & workplace requirements',
      'Integrated climate comfort & HVAC systems',
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
      "The studio apartments at ROCK ONE SQUARE are planned for people seeking compact urban living within a mixed-use development. Their positioning complements the project's commercial and entertainment offerings, bringing multiple everyday needs together at one address.",
    floorInfo: '5th to 9th Floor',
    highlights: [
      'Studio apartments within a mixed-use development.',
      'Compact urban living with intelligent modular layouts',
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
    imageUrls: ['/images/gaming-zone-bumper-cars.png', '/images/gaming-entertainment.jpg'],
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
    description: 'Granite and tile finishes across designated areas.',
    iconName: 'Gem',
    sortOrder: 0,
    isPublished: true,
  },
  {
    id: 'amenity-2',
    name: 'Reliable Power Support',
    description: 'Dual power supply with DG backup.',
    iconName: 'Zap',
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: 'amenity-3',
    name: 'Integrated Climate Comfort',
    description: 'Integrated HVAC system.',
    iconName: 'Wind',
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: 'amenity-4',
    name: 'Safety by Design',
    description: 'Advanced firefighting systems.',
    iconName: 'Shield',
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: 'amenity-5',
    name: 'Round-the-Clock Monitoring',
    description: '24×7 CCTV surveillance.',
    iconName: 'Camera',
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: 'amenity-6',
    name: 'Seamless Vertical Movement',
    description: '8 high-speed elevators.',
    iconName: 'ArrowUpDown',
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: 'amenity-7',
    name: 'Convenient Parking',
    description: 'Extensive basement parking with modern wayfinding.',
    iconName: 'Car',
    sortOrder: 6,
    isPublished: true,
  },
  {
    id: 'amenity-8',
    name: 'Efficient Service Access',
    description: 'Discreet service area at the rear.',
    iconName: 'Package',
    sortOrder: 7,
    isPublished: true,
  },
]

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
      'The development features dual power supply with DG backup, integrated HVAC system, advanced firefighting systems, 24×7 CCTV surveillance, 8 high-speed elevators, premium finishes, extensive basement parking with modern wayfinding, and efficient service access.'
  }

  // 4. RERA FAQ
  if (question.toLowerCase().includes('rera status')) {
    question = 'What is the RERA status?'
    answer =
      "You can check the project's RERA registration information using ReraTracker. For official confirmation of registration status, please verify the project's registration details on the Uttar Pradesh RERA portal."
  }

  // Universal cleanup for business hours
  answer = answer
    .replace(/(Monday\s*(to|-|–)\s*Saturday,?\s*10(?::00)?\s*AM\s*(-|–)\s*7(?::00)?\s*PM)/gi, 'Monday to Sunday, 10 AM–9 PM')

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
    answer: 'The development features dual power supply with DG backup, integrated HVAC system, advanced firefighting systems, 24×7 CCTV surveillance, 8 high-speed elevators, premium finishes, extensive basement parking with modern wayfinding, and efficient service access.',
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
    description: 'Retail. Entertainment. Modern Offices. Studio Apartments.',
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
    title: 'LORD OF THE DRINKS',
    subtitle: 'AN ICONIC EXPERIENCE. A NEW ADDRESS.',
    description: 'An iconic dining experience arrives in Raj Nagar Extension with Lord of the Drinks. A vibrant commercial destination bringing together curated fine dining and memorable social moments.',
    badge: 'FOR THE FIRST TIME IN GHAZIABAD',
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
    title: 'THE BIGGEST GAMING ZONE IN GHAZIABAD',
    subtitle: 'TAKE ENTERTAINMENT TO THE NEXT LEVEL.',
    description: 'The biggest gaming zone in Ghaziabad. Immersive virtual reality, dynamic arcade arenas, and family recreation spanning the expansive 3rd floor entertainment level.',
    badge: 'TAKE ENTERTAINMENT TO THE NEXT LEVEL.',
    imageUrl: '/images/gaming-zone-bumper-cars.png',
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
    title: 'The Vision Is Taking Shape',
    description:
      'ROCK ONE SQUARE is taking shape as construction progresses. RCC framing and concrete slabs through the 7th floor are fully executed, bringing this landmark destination closer to welcoming a new generation of businesses, experiences and modern urban lifestyles.',
    updateDate: '2025-02-15T00:00:00.000Z',
    floorsCompleted: 7,
    overallProgress: 64,
    isMilestone: true,
    milestoneLabel: '7 FLOORS COMPLETE.',
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
