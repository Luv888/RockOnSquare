'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Gem,
  Zap,
  Wind,
  Shield,
  Camera,
  ArrowUpDown,
  Car,
  Package,
  DoorOpen,
  ParkingCircle,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Phone,
} from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'

interface AmenityDetail {
  id: string
  name: string
  shortDesc: string
  iconName: string
  effectType: 'finishes' | 'power' | 'hvac' | 'fire' | 'cctv' | 'elevators' | 'parking' | 'service' | 'entrance' | 'multilevel'
  badge: string
  imageUrl: string
  fullDescription: string
  specifications: string[]
}

const VERIFIED_AMENITIES: AmenityDetail[] = [
  {
    id: 'amenity-1',
    name: 'Premium Finishes',
    shortDesc: 'Granite and premium tile throughout all common areas',
    iconName: 'Gem',
    effectType: 'finishes',
    badge: 'LUXURY FINISH',
    imageUrl: '/images/retail-1.jpg',
    fullDescription:
      'Impeccably detailed public spaces featuring high-grade polished granite, Italian-style vitrified slabs, and brushed metallic gold accents. Designed to withstand high footfall while retaining a refined, prestigious look.',
    specifications: [
      'Polished granite & large-format vitrified flooring',
      'Architectural false ceiling with recessed LED illumination',
      'Brushed metallic gold trim portals and handrails',
      'Hard-wearing, slip-resistant exterior plaza paving',
    ],
  },
  {
    id: 'amenity-2',
    name: 'Dual Power Supply',
    shortDesc: 'Uninterrupted power with 100% DG backup for critical systems',
    iconName: 'Zap',
    effectType: 'power',
    badge: '24×7 CONTINUITY',
    imageUrl: '/images/building-aerial.jpg',
    fullDescription:
      'Engineered with dual independent grid feeder sources and an automatic diesel generator backup system, guaranteeing 24×7 uninterrupted operations for retail, offices, elevators, and essential building services.',
    specifications: [
      'Automatic transfer switchgear (ATS) with zero changeover disruption',
      '100% DG capacity for common areas, elevators & commercial loads',
      'Energy-efficient step-down transformers & surge suppression',
      'Individual metered sub-panels for all commercial units',
    ],
  },
  {
    id: 'amenity-3',
    name: 'HVAC',
    shortDesc: 'Centralised climate control across commercial zones',
    iconName: 'Wind',
    effectType: 'hvac',
    badge: 'CLIMATE CONTROL',
    imageUrl: '/images/office-1.jpg',
    fullDescription:
      'High-efficiency central air-conditioning and ventilation systems engineered to maintain optimal temperature, continuous air renewal, and acoustic quiet throughout all commercial zones and retail gallerias.',
    specifications: [
      'Variable Refrigerant Flow (VRF/VAV) energy-saving chillers',
      'Clean air filtration removing particulate matter & allergens',
      'Acoustically lined ductwork to eliminate operational noise',
      'Independent smart thermostat controls per floor zone',
    ],
  },
  {
    id: 'amenity-4',
    name: 'Advanced Fire Safety',
    shortDesc: 'Multi-zone fire detection and suppression systems',
    iconName: 'Shield',
    effectType: 'fire',
    badge: 'LIFE SAFETY SPEC',
    imageUrl: '/images/building-front.jpg',
    fullDescription:
      'Fully compliant with National Building Code (NBC) life safety standards, featuring automatic sprinkler grids, addressable smoke sensors, pressurized fire escape stairwells, and emergency fire hydrants.',
    specifications: [
      'Multi-zone microprocessor-based fire alarm control panel',
      'Automatic ceiling sprinkler coverage on all 11 levels & basements',
      'Pressurized smoke-evacuation stairways and fire doors',
      'Dedicated underground and overhead fire-fighting water reserves',
    ],
  },
  {
    id: 'amenity-5',
    name: '24×7 CCTV & Security',
    shortDesc: 'Comprehensive surveillance across all levels and access points',
    iconName: 'Camera',
    effectType: 'cctv',
    badge: 'MULTI-TIER SECURITY',
    imageUrl: '/images/retail-1.jpg',
    fullDescription:
      'A comprehensive security network including high-resolution IP dome cameras, perimeter infrared beams, 24-hour centralized security monitoring room, and trained security personnel at all access portals.',
    specifications: [
      'Full coverage HD IP cameras with night-vision capabilities',
      'Digital video recording with 30+ days continuous archiving',
      '24×7 manned security control desk and quick-response protocols',
      'Boom-barrier automated license plate recognition at parking gates',
    ],
  },
  {
    id: 'amenity-6',
    name: '8 Elevators',
    shortDesc: "Eight elevators designed to provide convenient vertical access between the building's different levels",
    iconName: 'ArrowUpDown',
    effectType: 'elevators',
    badge: 'VERTICAL MOBILITY',
    imageUrl: '/images/building-front.jpg',
    fullDescription:
      "Eight elevators designed to provide convenient vertical access between the building's different levels.",
    specifications: [
      'Eight elevators planned for convenient vertical access',
      'Seamless circulation between different building levels',
      'Automatic rescue devices (ARD) in the event of grid fluctuations',
      'Direct access connecting parking, retail, and upper levels',
    ],
  },
  {
    id: 'amenity-8',
    name: 'Service Areas',
    shortDesc: 'Dedicated back-of-house operations and service entry points',
    iconName: 'Package',
    effectType: 'service',
    badge: 'LOGISTICS INFRASTRUCTURE',
    imageUrl: '/images/office-1.jpg',
    fullDescription:
      'Thoughtfully separated back-of-house circulation corridors, freight delivery docks, and commercial kitchen service infrastructure, keeping goods movement completely separate from visitor shopping zones.',
    specifications: [
      'Dedicated delivery loading dock with direct service elevator access',
      'Specialized commercial garbage collection & organic waste disposal',
      'Separated maintenance passages and service riser ducts',
      'Heavy-duty floor loading capacity in all back-of-house corridors',
    ],
  },
  {
    id: 'amenity-9',
    name: 'Grand Entrance',
    shortDesc: 'Architecturally impressive entrance statement and lobby',
    iconName: 'DoorOpen',
    effectType: 'entrance',
    badge: 'ARRIVALS STATEMENT',
    imageUrl: '/images/building-front.jpg',
    fullDescription:
      'An imposing double-height covered vehicular drop-off portico and wide landscaped pedestrian plaza along Meerut Road, establishing an unmistakable signature address for brands and visitors alike.',
    specifications: [
      'Grand covered drop-off porch shielding visitors from weather',
      'Architectural water features and manicured perimeter landscaping',
      'Illuminated signage totems with maximum Meerut Road visibility',
      'Direct barrier-free access ramps for strollers and wheelchairs',
    ],
  },
  {
    id: 'amenity-10',
    name: 'Valet & Mechanical Parking',
    shortDesc: 'Convenient parking arrangements supporting visitors, shoppers, and tenants',
    iconName: 'Car',
    effectType: 'parking',
    badge: 'PARKING AMENITY',
    imageUrl: '/images/building-aerial.jpg',
    fullDescription:
      'Convenient parking arrangements designed to support visitors, shoppers, tenants, and commercial operations.',
    specifications: [
      'Organized vehicular flow and convenient parking access',
      'Integrated carbon monoxide sensor-triggered air exhausts',
      'Dedicated secure pedestrian walkways leading to elevator lobbies',
      'Direct connectivity to retail and office levels',
    ],
  },
]

const ICON_MAP: Record<string, React.ElementType> = {
  Gem,
  Zap,
  Wind,
  Shield,
  Camera,
  ArrowUpDown,
  Car,
  Package,
  DoorOpen,
  ParkingCircle,
}

function AmenitySubjectEffect({ type }: { type: string }) {
  switch (type) {
    case 'finishes':
      return (
        <div className="absolute top-0 inset-x-0 h-1 overflow-hidden pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#e4c870] to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      )
    case 'power':
      return (
        <div className="absolute top-0 inset-x-0 h-1 flex gap-1 pointer-events-none">
          <div className="h-full flex-1 bg-amber-400/80 animate-pulse" />
          <div className="h-full flex-1 bg-[#c9a84c]/80 animate-pulse delay-75" />
        </div>
      )
    case 'hvac':
      return (
        <div className="absolute top-0 inset-x-0 h-1 flex items-center justify-around pointer-events-none opacity-80">
          <div className="w-8 h-0.5 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-8 h-0.5 bg-blue-300 rounded-full animate-pulse delay-100" />
        </div>
      )
    case 'fire':
      return (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500/50 via-amber-400 to-red-500/50 pointer-events-none" />
      )
    case 'cctv':
      return (
        <div className="absolute top-0 inset-x-0 h-1 bg-emerald-400/60 pointer-events-none">
          <div className="w-3 h-full bg-white animate-ping" />
        </div>
      )
    case 'elevators':
      return (
        <div className="absolute top-0 right-2 w-1 h-full bg-gradient-to-b from-[#c9a84c] to-transparent opacity-60 pointer-events-none" />
      )
    case 'parking':
      return (
        <div className="absolute bottom-0 inset-x-0 h-1 border-b border-dashed border-[#c9a84c]/50 pointer-events-none" />
      )
    case 'service':
      return (
        <div className="absolute inset-0 border border-white/5 pointer-events-none" />
      )
    case 'entrance':
      return (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#c9a84c] via-[#fff2c2] to-[#c9a84c] pointer-events-none" />
      )
    case 'multilevel':
      return (
        <div className="absolute top-0 inset-x-0 h-1.5 flex gap-1 px-4 pointer-events-none">
          <div className="h-1 flex-1 bg-[#c9a84c]/80 rounded" />
          <div className="h-1 flex-1 bg-[#e4c870]/80 rounded" />
          <div className="h-1 flex-1 bg-[#fff2c2]/80 rounded" />
        </div>
      )
    default:
      return null
  }
}

export interface AmenitiesSectionProps {
  amenities?: Array<{
    id: string
    name: string
    description?: string | null
    iconName?: string | null
    sortOrder?: number
  }>
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps = {}) {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityDetail | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    setSelectedAmenity(VERIFIED_AMENITIES[index])
  }

  const closeModal = () => {
    setSelectedAmenity(null)
  }

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % VERIFIED_AMENITIES.length
    setSelectedIndex(nextIdx)
    setSelectedAmenity(VERIFIED_AMENITIES[nextIdx])
  }

  const handlePrev = () => {
    const prevIdx = (selectedIndex - 1 + VERIFIED_AMENITIES.length) % VERIFIED_AMENITIES.length
    setSelectedIndex(prevIdx)
    setSelectedAmenity(VERIFIED_AMENITIES[prevIdx])
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAmenity) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedAmenity, selectedIndex])

  const waUrl = buildWhatsAppUrl(
    selectedAmenity
      ? `Hello Rock One Square team,\n\nI would like to know more about the "${selectedAmenity.name}" infrastructure and commercial specifications.`
      : defaultWhatsAppMessage()
  )

  return (
    <section id="amenities" className="relative py-24 sm:py-32 bg-[#090f1d] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a84c]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e4c870] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Infrastructure & Quality
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            Built for{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
              Comfort and Prestige
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base leading-relaxed">
            10 verified infrastructure pillars designed for high-capacity commercial performance, seamless daily operations,
            and enduring asset value. Click any amenity to view detailed engineering specifications.
          </p>
        </div>

        {/* 10 Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {VERIFIED_AMENITIES.map((amenity, idx) => {
            const Icon = ICON_MAP[amenity.iconName] || Gem
            return (
              <div
                key={amenity.id}
                onClick={() => openModal(idx)}
                className="group p-5 rounded-xl border border-white/10 hover:border-[#c9a84c]/60 bg-gradient-to-b from-[#101826] to-[#070b14] hover:bg-[#141f33] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                {/* Specific Visual Effect Cue */}
                <AmenitySubjectEffect type={amenity.effectType} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#060a14] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-white/40 group-hover:text-[#c9a84c] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-white text-sm font-medium mb-1.5 group-hover:text-[#e4c870] transition-colors">
                    {amenity.name}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-3">
                    {amenity.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#c9a84c] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Explore Amenity</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AMENITY DETAIL MODAL */}
      {selectedAmenity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#0e1729] to-[#070b14] border border-[#c9a84c]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="amenity-title"
          >
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header controls: Close & Prev/Next */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#c9a84c]/20 text-[#e4c870] border border-[#c9a84c]/40 text-[10px] font-mono font-bold tracking-wider uppercase">
                  {selectedAmenity.badge}
                </span>
                <span className="text-xs font-mono text-white/40">
                  {selectedIndex + 1} OF {VERIFIED_AMENITIES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                  aria-label="Previous amenity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                  aria-label="Next amenity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div>
              {/* Amenity Image Banner */}
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-[#c9a84c]/30 mb-5 bg-black shadow-lg">
                <Image
                  src={selectedAmenity.imageUrl}
                  alt={selectedAmenity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 650px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1729] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2.5 z-10">
                  {(() => {
                    const Icon = ICON_MAP[selectedAmenity.iconName] || Gem
                    return (
                      <div className="w-10 h-10 rounded-lg bg-[#c9a84c] text-[#060a14] flex items-center justify-center shadow-lg font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                    )
                  })()}
                  <div>
                    <h3 id="amenity-title" className="font-serif text-2xl font-light text-white leading-tight">
                      {selectedAmenity.name}
                    </h3>
                    <p className="text-xs text-white/70 font-mono">Rock One Square Infrastructure Standard</p>
                  </div>
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-5">
                {selectedAmenity.fullDescription}
              </p>

              {/* Specifications Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#c9a84c] mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Engineering Specifications
                </h4>
                <ul className="space-y-2">
                  {selectedAmenity.specifications.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-1.5 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
                <p className="text-[11px] text-white/40 italic">
                  Press &larr; / &rarr; keys to browse or Esc to close.
                </p>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#c9a84c] hover:bg-[#e4c870] text-[#060a14] text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#c9a84c]/20"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      closeModal()
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-medium transition-all text-center"
                  >
                    Book Site Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
