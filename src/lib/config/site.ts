/**
 * Centralized Site Configuration for ROCK ONE SQUARE
 * 
 * Single source of truth for official project information, contact details,
 * maps location, and core vertical specifications.
 */

export const SITE_CONFIG = {
  name: 'ROCK ONE SQUARE',
  shortName: 'Rock One Square',
  tagline: 'DESIGNED TO ELEVATE EVERY EXPERIENCE.',
  subTagline: 'One Landmark Address. A World of Possibilities.',
  developerName: 'Senflore Hospitality LLP',

  // Official Project Milestone
  milestone: '7 FLOORS COMPLETE | POSSESSION SOON',
  completedFloors: 7,
  totalFloors: 11,

  // Four Main Verticals
  verticals: [
    'Retail',
    'Entertainment',
    'Modern Offices',
    'Studio Apartments',
  ] as const,

  // Official Contact Details
  contact: {
    number: '9999092951',
    displayNumber: '+91 9999092951',
    internationalNumber: '+919999092951',
    telHref: 'tel:+919999092951',
    whatsappNumber: '919999092951',
    whatsappHref: 'https://wa.me/919999092951',
    email: 'sales@rockonesquare.com',
    hours: 'Monday – Sunday: 10:00 AM – 7:00 PM IST',
  },

  // Official Location & Directions
  location: {
    address: 'Meerut Road, Raj Nagar Extension',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    country: 'India',
    pincode: '201003',
    roadFrontage: '30 Metres Arterial Frontage',
    landParcel: '~1 Acre',
    mapsUrl: 'https://share.google/CG0Amb2c0gFphTZIf',
    coordinates: {
      latitude: 28.6765,
      longitude: 77.4369,
    },
  },

  // Official Branding Assets
  brand: {
    logo: '/images/logo.png',
    logoWidth: 1024,
    logoHeight: 342,
  },
} as const

export type SiteConfig = typeof SITE_CONFIG
