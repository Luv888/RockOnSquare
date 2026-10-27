'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  ChevronUp,
  ChevronDown,
  Check,
  Building2,
  Sparkles,
  X,
  Phone,
  ArrowRight,
  Layers,
  ShieldCheck,
  Compass,
} from 'lucide-react'
import { buildEnquiryWhatsAppUrl } from '@/lib/notifications/whatsapp'
import { SITE_CONFIG } from '@/lib/config/site'

export interface FloorInfo {
  floorNumber: number
  label: string
  shortLabel: string
  offeringType: 'RETAIL' | 'DINING' | 'ENTERTAINMENT' | 'OFFICE' | 'STUDIO_APARTMENT' | 'HOTEL'
  categoryName: string
  accentColor: string
  bgTint: string
  description: string
  highlights: string[]
  specs: {
    height: string
    access: string
    footfall: string
  }
  isComplete: boolean
  imageUrl: string
}

export const FLOOR_DIRECTORY: FloorInfo[] = [
  {
    floorNumber: 10,
    label: 'Tenth Floor & Rooftop',
    shortLabel: '10F',
    offeringType: 'HOTEL',
    categoryName: 'Hospitality & Rooftop Lounge',
    accentColor: '#c9a84c',
    bgTint: 'rgba(201,168,76,0.12)',
    imageUrl: '/images/fine-dining-1.jpg',
    description:
      'The crown of Rock One Square. Open-air landscaped terrace lounge, executive hospitality management headquarters, and panoramic 360-degree vistas of the NCR skyline.',
    highlights: [
      'Landscaped open-air terrace lounge & skydeck',
      'Executive hospitality management suites',
      'Panoramic 360-degree skyline views across Ghaziabad & Meerut Expressway',
      'Private VIP reception & exclusive elevator access',
    ],
    specs: {
      height: '3.6m Clear Ceiling',
      access: 'Express Passenger Elevators',
      footfall: 'Exclusive Hospitality & Private Lounge',
    },
    isComplete: false,
  },
  {
    floorNumber: 9,
    label: 'Ninth Floor',
    shortLabel: '9F',
    offeringType: 'STUDIO_APARTMENT',
    categoryName: 'Penthouse Studio Apartments',
    accentColor: '#e4c870',
    bgTint: 'rgba(228,200,112,0.12)',
    imageUrl: '/images/studio-apartment-4.jpg',
    description:
      'Penthouse-tier studio residences offering serene, elevated urban living with generous natural daylight, premium finishes, and maximum privacy.',
    highlights: [
      'Highest residential elevation within the development',
      'Sweeping horizon views over Raj Nagar Extension',
      'Acoustic insulation & double-glazed architectural glass',
      'Dedicated residential access control & concierge readiness',
    ],
    specs: {
      height: '3.3m Floor-to-Ceiling',
      access: 'Card-Key Access Elevators',
      footfall: 'Low Density / High Privacy Residential',
    },
    isComplete: false,
  },
  {
    floorNumber: 8,
    label: 'Eighth Floor',
    shortLabel: '8F',
    offeringType: 'STUDIO_APARTMENT',
    categoryName: 'Executive Studio Apartments',
    accentColor: '#e4c870',
    bgTint: 'rgba(228,200,112,0.12)',
    imageUrl: '/images/studio-apartment-4.jpg',
    description:
      'Upper-tier executive studio suites overlooking Meerut Road expressway corridor. Elevated serenity, natural cross-ventilation, and modern interior architecture.',
    highlights: [
      'Upper-tier executive suites crafted for professionals',
      'Optimized natural daylight & continuous cross-ventilation',
      'Designer bathroom fittings & modular joinery provisions',
      'Direct elevator connectivity to lower dining and retail levels',
    ],
    specs: {
      height: '3.3m Floor-to-Ceiling',
      access: 'Dedicated Residential Elevators',
      footfall: 'Executive Residential',
    },
    isComplete: false,
  },
  {
    floorNumber: 7,
    label: 'Seventh Floor',
    shortLabel: '7F',
    offeringType: 'STUDIO_APARTMENT',
    categoryName: '7 Floors Complete Milestone Level',
    accentColor: '#e4c870',
    bgTint: 'rgba(228,200,112,0.14)',
    imageUrl: '/images/studio-apartment-3.jpg',
    description:
      'Marking the official construction milestone — 7 FLOORS COMPLETE. Premium studio apartments with unobstructed western horizon views and high-spec structural execution.',
    highlights: [
      'Structural milestone achieved: 7 Floors Fully Cast & Complete',
      'Expansive private balconies with open panoramic outlooks',
      'High-grade RCC framed earthquake-resistant structure',
      'High-speed elevator service banks & emergency stairwells',
    ],
    specs: {
      height: '3.3m Floor-to-Ceiling',
      access: '8 High-Speed Elevators',
      footfall: 'Residential Milestone Level',
    },
    isComplete: true,
  },
  {
    floorNumber: 6,
    label: 'Sixth Floor',
    shortLabel: '6F',
    offeringType: 'STUDIO_APARTMENT',
    categoryName: 'Contemporary Studio Apartments',
    accentColor: '#e4c870',
    bgTint: 'rgba(228,200,112,0.10)',
    imageUrl: '/images/studio-apartment-2.jpg',
    description:
      'Thoughtfully planned studio residences built for urban professionals, business travelers, and rental investors desiring high operational convenience.',
    highlights: [
      'Contemporary space-efficient interior architecture',
      'Smart home infrastructure readiness & digital lock doors',
      '24×7 multi-tier security and CCTV surveillance',
      'Integrated housekeeping & concierge services support',
    ],
    specs: {
      height: '3.3m Floor-to-Ceiling',
      access: 'Dedicated Resident Elevator Banks',
      footfall: 'Private Residential',
    },
    isComplete: true,
  },
  {
    floorNumber: 5,
    label: 'Fifth Floor',
    shortLabel: '5F',
    offeringType: 'STUDIO_APARTMENT',
    categoryName: 'Modular Studio Apartments',
    accentColor: '#e4c870',
    bgTint: 'rgba(228,200,112,0.10)',
    imageUrl: '/images/studio-apartment-1.jpg',
    description:
      'First tier of the residential vertical. Contemporary modular studio apartments enjoying serene tree-lined perspectives and immediate elevator access to work and play.',
    highlights: [
      'Seamless transition from commercial hub to private residential',
      'Intelligent modular layouts maximizing living and storage space',
      'Dedicated residential lobby on ground level with secured access',
      'Continuous 100% DG power backup & 24×7 pressurized water supply',
    ],
    specs: {
      height: '3.3m Floor-to-Ceiling',
      access: 'Secure Access Elevators',
      footfall: 'Private Residential Zone',
    },
    isComplete: true,
  },
  {
    floorNumber: 4,
    label: 'Fourth Floor',
    shortLabel: '4F',
    offeringType: 'OFFICE',
    categoryName: 'Modern Corporate Offices',
    accentColor: '#60a5fa',
    bgTint: 'rgba(96,165,250,0.12)',
    imageUrl: '/images/office-1.jpg',
    description:
      'Smart corporate workspaces designed for professionals, consultants, tech enterprises, and expanding businesses. Flexible floorplates with integrated climate comfort.',
    highlights: [
      'Contemporary corporate layouts with column-efficient planning',
      'Integrated energy-efficient HVAC climate control systems',
      'Dual optical-fiber backbone for ultra-high-speed data connectivity',
      'Executive conference facilities & professional business reception',
    ],
    specs: {
      height: '3.6m Clear Ceiling Height',
      access: 'Dedicated Office Elevator Banks',
      footfall: 'Professional / Corporate Footfall',
    },
    isComplete: true,
  },
  {
    floorNumber: 3,
    label: 'Third Floor',
    shortLabel: '3F',
    offeringType: 'ENTERTAINMENT',
    categoryName: 'Entertainment & Gaming Hub',
    accentColor: '#c084fc',
    bgTint: 'rgba(192,132,252,0.14)',
    imageUrl: '/images/gaming-zone-hero.jpg',
    description:
      'The premier recreational anchor of Ghaziabad: featuring Lord of the Drinks (first time in Ghaziabad) and the largest gaming zone in the entire district.',
    highlights: [
      'Lord of the Drinks — premier flagship venue for Ghaziabad',
      'The biggest gaming zone in Ghaziabad with VR, arcade & bowling',
      'High-energy culinary lounges & weekend entertainment events',
      'Modern health club, wellness studio & recreation spaces',
    ],
    specs: {
      height: '4.2m High Entertainment Clearance',
      access: 'Central Atrium Escalators + 8 Elevators',
      footfall: 'Peak Evening & Weekend Leisure Traffic',
    },
    isComplete: true,
  },
  {
    floorNumber: 2,
    label: 'Second Floor',
    shortLabel: '2F',
    offeringType: 'DINING',
    categoryName: 'Curated Dining & Cafés',
    accentColor: '#fb923c',
    bgTint: 'rgba(251,146,60,0.12)',
    imageUrl: '/images/fine-dining-1.jpg',
    description:
      'A culinary destination combining gourmet specialty dining, vibrant casual cafés, open-air terrace seating, and dedicated food service infrastructure.',
    highlights: [
      'Curated cluster of fine dining and artisanal casual restaurants',
      'Al-fresco outdoor terrace seating overlooking Meerut Road',
      'Specialized commercial kitchen exhaust and gas-bank infrastructure',
      'Direct escalator transit linking seamlessly from the retail floors',
    ],
    specs: {
      height: '3.8m Commercial Clearance',
      access: 'Central Atrium Escalators & Elevators',
      footfall: 'High Lunch, Dinner & Social Footfall',
    },
    isComplete: true,
  },
  {
    floorNumber: 1,
    label: 'First Floor',
    shortLabel: '1F',
    offeringType: 'RETAIL',
    categoryName: 'Anchor Retail & Lifestyle',
    accentColor: '#c9a84c',
    bgTint: 'rgba(201,168,76,0.12)',
    imageUrl: '/images/retail-1.jpg',
    description:
      'High-traffic retail galleria featuring anchor brand showrooms, fashion boutiques, and lifestyle stores encircling the illuminated central atrium.',
    highlights: [
      'Atrium-facing anchor showrooms with unobstructed visual frontage',
      'Continuous central escalator connectivity from Ground Floor plaza',
      'Wide marble/granite shopping walkways designed for effortless movement',
      'Centralized climate comfort & architecturally illuminated shopfronts',
    ],
    specs: {
      height: '4.0m Clear Commercial Height',
      access: 'Central Escalators + 8 Elevators',
      footfall: 'High Shopping Footfall',
    },
    isComplete: true,
  },
  {
    floorNumber: 0,
    label: 'Ground Floor',
    shortLabel: 'GF',
    offeringType: 'RETAIL',
    categoryName: 'Flagship Retail Plaza',
    accentColor: '#c9a84c',
    bgTint: 'rgba(201,168,76,0.16)',
    imageUrl: '/images/retail-1.jpg',
    description:
      'Prime street-level flagship retail boasting a 30-metre-wide arterial road frontage on Meerut Road. Maximum footfall exposure, double-height facades, and direct vehicular plaza access.',
    highlights: [
      '30-metre-wide arterial road frontage on high-density Meerut Road',
      'Double-height architectural shopfronts for global flagship brands',
      'Dedicated vehicular drop-off porch and wide landscaped pedestrian plaza',
      'Premium granite paving, architectural lighting & grand entrance portals',
    ],
    specs: {
      height: '4.8m Double-Height Commercial',
      access: 'Direct Ground Level & Arterial Road Access',
      footfall: 'Maximum Footfall & Street Visibility',
    },
    isComplete: true,
  },
]

export function FloorExplorer() {
  const [selectedFloorNum, setSelectedFloorNum] = useState<number>(3) // Default to 3F (Entertainment hub)
  const [viewMode, setViewMode] = useState<'front' | 'aerial'>('front')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false)
  const [formStatus, setFormStatus] = useState<{ ok: boolean; message: string } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  })

  const currentFloor = FLOOR_DIRECTORY.find((f) => f.floorNumber === selectedFloorNum) || FLOOR_DIRECTORY[7]

  // Elevator directional controls
  const handleNextFloor = () => {
    const currentIndex = FLOOR_DIRECTORY.findIndex((f) => f.floorNumber === selectedFloorNum)
    if (currentIndex > 0) {
      setSelectedFloorNum(FLOOR_DIRECTORY[currentIndex - 1].floorNumber)
    }
  }

  const handlePrevFloor = () => {
    const currentIndex = FLOOR_DIRECTORY.findIndex((f) => f.floorNumber === selectedFloorNum)
    if (currentIndex < FLOOR_DIRECTORY.length - 1) {
      setSelectedFloorNum(FLOOR_DIRECTORY[currentIndex + 1].floorNumber)
    }
  }

  // Handle modal submit
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    setFormStatus(null)

    // Validate phone number (10 digits starting with 6-9)
    const phoneClean = formData.phone.trim().replace(/\D/g, '')
    if (!/^[6-9]\d{9}$/.test(phoneClean)) {
      setFormStatus({
        ok: false,
        message: 'Please enter a valid 10-digit Indian mobile number (e.g., 9812345678).',
      })
      setFormSubmitting(false)
      return
    }

    if (formData.fullName.trim().length < 2) {
      setFormStatus({
        ok: false,
        message: 'Please enter your full name.',
      })
      setFormSubmitting(false)
      return
    }

    try {
      // 1. Post to lead capture API
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: phoneClean,
          email: formData.email.trim() || undefined,
          enquiryType: 'GENERAL',
          offeringType: currentFloor.offeringType,
          message: formData.message.trim() || `Interested in ${currentFloor.label} (${currentFloor.categoryName}).`,
          source: 'floor-explorer',
        }),
      }).catch((err) => {
        console.warn('API lead capture error (proceeding to WhatsApp):', err)
      })

      // 2. Build WhatsApp Click-to-chat URL
      const { url } = buildEnquiryWhatsAppUrl({
        fullName: formData.fullName.trim(),
        phone: phoneClean,
        email: formData.email.trim() || null,
        enquiryType: 'GENERAL',
        offeringType: currentFloor.offeringType,
        message: formData.message.trim() || `Inquiring about ${currentFloor.label} (${currentFloor.categoryName}).`,
      })

      setFormStatus({
        ok: true,
        message: 'Connecting to Rock One Square sales on WhatsApp...',
      })

      // 3. Open WhatsApp in new tab / app
      setTimeout(() => {
        if (url && url !== '#whatsapp-not-configured') {
          window.open(url, '_blank', 'noopener,noreferrer')
        }
        setIsModalOpen(false)
        setFormSubmitting(false)
      }, 700)
    } catch (err) {
      console.error('Submission error:', err)
      setFormStatus({
        ok: false,
        message: `Could not connect to WhatsApp. Please contact ${SITE_CONFIG.contact.displayNumber} directly.`,
      })
      setFormSubmitting(false)
    }
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  return (
    <section
      id="explorer"
      className="relative py-24 bg-[#060a14] text-white border-t border-b border-[#c9a84c]/15 overflow-hidden"
    >
      {/* Anchor alias for legacy links */}
      <div id="floors" className="sr-only" aria-hidden="true" />

      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c9a84c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e4c870] text-xs font-semibold uppercase tracking-widest mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Signature Building Explorer
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            11 Levels of Purpose.{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
              Engineered for Excellence.
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base leading-relaxed">
            Step into the interactive elevator console to inspect each floor of Rock One Square. From high-visibility
            flagship retail to Ghaziabad&apos;s premier entertainment hub and executive studio residences.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c]/90 bg-[#0a0f1e]/80 px-4 py-1.5 rounded-full border border-[#c9a84c]/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>Official Milestone: 7 FLOORS COMPLETE &bull; POSSESSION SOON</span>
          </div>
        </div>

        {/* Main Explorer Console: 3-column architectural dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMN 1: Elevator Control Panel (3 cols) */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#0e1628] to-[#070b14] border border-[#c9a84c]/25 rounded-xl p-5 shadow-2xl relative">
            {/* Subtle metallic top screws */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#c9a84c]/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest text-[#c9a84c] uppercase">
                  Elevator Panel &bull; Bank A
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/40">OTIS-SPEC</span>
            </div>

            {/* Digital Indicator Display Screen */}
            <div className="bg-[#03060c] border border-[#c9a84c]/40 rounded-lg p-4 mb-5 text-center shadow-inner relative overflow-hidden">
              <div className="text-[10px] font-mono tracking-widest text-[#c9a84c]/70 uppercase mb-1 flex items-center justify-center gap-2">
                <span>DOORS READY</span>
                <span>&bull;</span>
                <span className="text-white/60">LEVEL {currentFloor.floorNumber}/10</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fff2c2] to-[#c9a84c]">
                  {currentFloor.shortLabel}
                </span>
              </div>
              <div className="text-[11px] text-white/80 font-medium truncate mt-1">
                {currentFloor.categoryName}
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50 font-mono">
                <span>TRANSIT: 8 LIFTS</span>
                <span className={currentFloor.isComplete ? 'text-emerald-400 font-semibold' : 'text-[#e4c870]'}>
                  {currentFloor.isComplete ? 'STRUCTURE DONE' : 'UNDER CONSTR.'}
                </span>
              </div>
            </div>

            {/* Up / Down Navigation Controls */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={handleNextFloor}
                disabled={selectedFloorNum === 10}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-[#c9a84c]/20 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 hover:border-[#c9a84c]/40 text-xs font-medium text-white transition-all"
                aria-label="Go to upper floor"
              >
                <ChevronUp className="w-4 h-4 text-[#c9a84c]" />
                <span>Ascend</span>
              </button>
              <button
                type="button"
                onClick={handlePrevFloor}
                disabled={selectedFloorNum === 0}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-[#c9a84c]/20 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 hover:border-[#c9a84c]/40 text-xs font-medium text-white transition-all"
                aria-label="Go to lower floor"
              >
                <ChevronDown className="w-4 h-4 text-[#c9a84c]" />
                <span>Descend</span>
              </button>
            </div>

            {/* Vertical Floor Buttons (10F down to GF) */}
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-[#c9a84c]/30">
              {FLOOR_DIRECTORY.map((floor) => {
                const isActive = floor.floorNumber === selectedFloorNum
                return (
                  <button
                    key={floor.floorNumber}
                    type="button"
                    onClick={() => setSelectedFloorNum(floor.floorNumber)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 border ${
                      isActive
                        ? 'bg-gradient-to-r from-[#c9a84c]/25 to-[#c9a84c]/10 border-[#c9a84c] text-white shadow-md shadow-[#c9a84c]/10'
                        : 'bg-white/[0.02] border-white/5 hover:border-[#c9a84c]/30 hover:bg-white/[0.04] text-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Floor button ring */}
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#c9a84c] text-[#060a14] shadow-lg shadow-[#c9a84c]/40'
                            : 'bg-white/10 text-white/80 group-hover:bg-[#c9a84c]/20'
                        }`}
                      >
                        {floor.shortLabel}
                      </span>
                      <div className="flex flex-col">
                        <span className={`text-xs font-medium leading-tight ${isActive ? 'text-white' : 'text-white/80'}`}>
                          {floor.label}
                        </span>
                        <span className="text-[10px] text-white/40 leading-none mt-0.5 truncate max-w-[120px]">
                          {floor.offeringType.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    {floor.floorNumber === 7 && (
                      <span className="text-[9px] uppercase tracking-tighter px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                        7F Done
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Ground Floor Quick Button */}
            <div className="mt-4 pt-3 border-t border-[#c9a84c]/20">
              <button
                type="button"
                onClick={() => setSelectedFloorNum(0)}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                  selectedFloorNum === 0
                    ? 'bg-[#c9a84c] text-[#060a14] border-[#c9a84c]'
                    : 'bg-[#c9a84c]/10 text-[#e4c870] border-[#c9a84c]/30 hover:bg-[#c9a84c]/20'
                }`}
              >
                <span>[ G ] Direct Ground Floor Access</span>
              </button>
            </div>
          </div>

          {/* COLUMN 2: Architectural Elevation Render with Interactive Floor Locator (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0a0f1e] to-[#060a14] border border-[#c9a84c]/20 rounded-xl p-4 sm:p-5 shadow-2xl relative flex flex-col">
            {/* Elevation View Toggle Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-xs uppercase font-medium tracking-wider text-white/80">
                  Elevation Cross-Section
                </span>
              </div>
              <div className="inline-flex rounded-lg bg-black/40 p-1 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('front')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    viewMode === 'front'
                      ? 'bg-[#c9a84c] text-[#060a14] font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Front Dusk
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('aerial')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    viewMode === 'aerial'
                      ? 'bg-[#c9a84c] text-[#060a14] font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Aerial View
                </button>
              </div>
            </div>

            {/* Building Render Frame with Floor Hotspots */}
            <div className="relative rounded-lg overflow-hidden border border-[#c9a84c]/30 shadow-inner group aspect-[4/5] sm:aspect-[3/4] bg-black">
              {/* Image asset */}
              <Image
                src={viewMode === 'front' ? '/images/building-front.jpg' : '/images/building-aerial.jpg'}
                alt="Rock One Square Architectural Elevation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />

              {/* Dark architectural vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* 7 Floors Complete milestone banner overlay */}
              <div className="absolute top-3 left-3 z-20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#c9a84c]/50 text-[#e4c870] text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>7 FLOORS COMPLETE</span>
                </div>
              </div>

              {/* Active Floor Locator Guideline & Tag */}
              {/* Stacked floor bands overlayed over elevation */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-auto">
                {/* 11 horizontal slices from 10 down to 0 */}
                {FLOOR_DIRECTORY.map((floor) => {
                  const isActive = floor.floorNumber === selectedFloorNum
                  return (
                    <div
                      key={floor.floorNumber}
                      onClick={() => setSelectedFloorNum(floor.floorNumber)}
                      className={`relative flex-1 cursor-pointer transition-all duration-300 border-t ${
                        isActive
                          ? 'bg-[#c9a84c]/30 border-[#e4c870] shadow-[0_0_20px_rgba(201,168,76,0.6)]'
                          : 'border-white/5 hover:bg-white/10'
                      }`}
                      title={`${floor.shortLabel} — ${floor.categoryName}`}
                    >
                      {isActive && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-black/80 text-[#e4c870] font-mono text-[10px] font-bold border border-[#c9a84c] shadow-lg animate-pulse">
                            ACTIVE &bull; {floor.shortLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Bottom floor label bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 z-20 pointer-events-none">
                <p className="text-xs font-mono text-[#c9a84c]">
                  POINTING TO: {currentFloor.shortLabel} &bull; {currentFloor.label.toUpperCase()}
                </p>
                <p className="text-white text-sm font-serif font-light">{currentFloor.categoryName}</p>
              </div>
            </div>

            <p className="text-[11px] text-white/40 mt-3 text-center italic">
              * Click any horizontal level on the building render or use the elevator panel to inspect details.
            </p>
          </div>

          {/* COLUMN 3: Dynamic Floor Specification Console (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#0e1628] to-[#070b14] border border-[#c9a84c]/25 rounded-xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Badge & Level Tag */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded text-xs font-bold tracking-wider uppercase"
                  style={{
                    backgroundColor: currentFloor.bgTint,
                    color: currentFloor.accentColor,
                    border: `1px solid ${currentFloor.accentColor}50`,
                  }}
                >
                  {currentFloor.categoryName}
                </span>
                <span className="font-mono text-xs text-white/50">LEVEL {currentFloor.floorNumber} OF 10</span>
              </div>

              {/* Floor Heading */}
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-2">
                {currentFloor.label}
              </h3>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentFloor.isComplete ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span className="text-xs font-medium text-white/70">
                  {currentFloor.isComplete
                    ? 'Structure Complete — 7 Floors Milestone achieved'
                    : 'Upper Level — In Active Development (Possession Soon)'}
                </span>
              </div>

              {/* Floor Visual Render */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#c9a84c]/30 mb-4 bg-black group shadow-lg">
                <Image
                  src={currentFloor.imageUrl}
                  alt={currentFloor.categoryName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs">
                  <span className="font-mono text-[#e4c870] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                    {currentFloor.shortLabel} &bull; Space Visual
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] text-white/70">
                    {currentFloor.offeringType.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-6 pb-4 border-b border-white/10">
                {currentFloor.description}
              </p>

              {/* Architectural Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Verified Specifications
                </h4>
                <ul className="space-y-2.5">
                  {currentFloor.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80 leading-snug">
                      <Check className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Spec Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-lg bg-black/40 border border-white/5 text-[11px]">
                <div>
                  <span className="text-white/40 block">Clearance</span>
                  <span className="text-white font-medium">{currentFloor.specs.height}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Transit Link</span>
                  <span className="text-white font-medium">{currentFloor.specs.access}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-white/5">
                  <span className="text-white/40 block">Zoning Purpose</span>
                  <span className="text-white font-medium">{currentFloor.specs.footfall}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e4c870] hover:from-[#d8b75b] hover:to-[#f0d47f] text-[#060a14] font-semibold text-sm shadow-lg shadow-[#c9a84c]/20 transition-all transform active:scale-[0.98]"
              >
                <span>Enquire About {currentFloor.shortLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium border border-white/10 transition-all text-center"
              >
                Schedule Guided Site Inspection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FLOOR SPECIFIC ENQUIRY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-lg bg-[#0a0f1e] border border-[#c9a84c]/40 rounded-xl p-6 sm:p-8 shadow-2xl text-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#c9a84c] block mb-1">
                Direct Developer Enquiry &bull; {currentFloor.shortLabel}
              </span>
              <h3 id="modal-title" className="font-serif text-2xl font-light text-white">
                Enquire About {currentFloor.label}
              </h3>
              <p className="text-white/60 text-xs mt-1">
                {currentFloor.categoryName} &bull; Connect directly with the Rock One Square sales desk.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleModalSubmit} className="space-y-4">
              {formStatus && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium ${
                    formStatus.ok
                      ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                      : 'bg-red-950/80 border border-red-500/50 text-red-300'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Full Name <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#c9a84c] focus:outline-none text-sm text-white placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Mobile Number (WhatsApp) <span className="text-[#c9a84c]">*</span>
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 py-2.5 rounded-lg bg-black/50 border border-white/15 text-sm font-mono text-white/70">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#c9a84c] focus:outline-none text-sm text-white placeholder-white/30"
                  />
                </div>
                <p className="text-[10px] text-white/40 mt-1">
                  We will open WhatsApp with your pre-filled inquiry details.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Email Address <span className="text-white/40">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#c9a84c] focus:outline-none text-sm text-white placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Specific Requirements or Preferred Units
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={`Interested in ${currentFloor.label} (${currentFloor.categoryName}) space.`}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#c9a84c] focus:outline-none text-sm text-white placeholder-white/30 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e4c870] hover:from-[#d8b75b] hover:to-[#f0d47f] text-[#060a14] font-semibold text-sm shadow-lg shadow-[#c9a84c]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Phone className="w-4 h-4" />
                  <span>{formSubmitting ? 'Processing...' : 'Send Enquiry via WhatsApp'}</span>
                </button>
              </div>

              <p className="text-[10px] text-white/40 text-center">
                Instant response &bull; No obligation &bull; Direct builder sales team
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
