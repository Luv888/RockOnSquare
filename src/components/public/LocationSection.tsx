'use client'

import React, { useState } from 'react'
import { MapPin, Navigation, Compass, Train, Car, Building, ArrowUpRight, Landmark, Trophy, Plane } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config/site'

interface ConnectivityPoint {
  id: string
  name: string
  category: string
  icon: React.ElementType
  travelTime: string
  distance: string
  description: string
  highlight: string
}

const CONNECTIVITY_PILLARS: ConnectivityPoint[] = [
  {
    id: 'meerut-road',
    name: 'Direct Access to Meerut Road',
    category: 'Arterial Corridor',
    icon: Car,
    travelTime: 'Direct Ingress / Egress',
    distance: '30m Arterial Road Frontage',
    description:
      'Convenient connectivity to an important regional road corridor.',
    highlight: 'Direct access to an important regional road corridor',
  },
  {
    id: 'dme',
    name: 'Close to the Delhi–Meerut Expressway',
    category: 'Expressway Network',
    icon: Compass,
    travelTime: '8–10 Mins',
    distance: '~4.5 km',
    description:
      'Access to a key road network connecting Delhi and western Uttar Pradesh.',
    highlight: 'Key road network connecting Delhi & western UP',
  },
  {
    id: 'cricket-stadium',
    name: 'Near the Upcoming Cricket Stadium',
    category: 'Sports & Entertainment',
    icon: Trophy,
    travelTime: '5–7 Mins',
    distance: 'Immediate Vicinity',
    description:
      'Proximity to a major sports and entertainment destination.',
    highlight: 'Proximity to major sports & entertainment destination',
  },
  {
    id: 'aerocity',
    name: 'Connectivity to Aerocity',
    category: 'Emerging Hub',
    icon: Plane,
    travelTime: 'Direct Route Access',
    distance: 'NCR Connectivity Plan',
    description:
      "Access to the emerging destination referenced in the project's connectivity plan.",
    highlight: 'Access to emerging NCR destination hub',
  },
  {
    id: 'rrts',
    name: 'Connected Through Namo Bharat RRTS',
    category: 'High-Speed Regional Rail',
    icon: Train,
    travelTime: '5–7 Mins',
    distance: 'Guldhar / Duhai Station',
    description:
      'Regional connectivity linking key destinations across the Delhi–Ghaziabad–Meerut corridor.',
    highlight: 'Delhi–Ghaziabad–Meerut high-speed transit corridor',
  },
]

export function LocationSection() {
  const [activePillar, setActivePillar] = useState<number>(0)
  const current = CONNECTIVITY_PILLARS[activePillar]
  const CurrentIcon = current.icon

  const mapsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || SITE_CONFIG.location.mapsUrl

  return (
    <section id="location" className="relative py-24 sm:py-32 bg-[#080d18] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e4c870] text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            A LOCATION THAT MOVES YOU FORWARD
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            Connected to Progress.{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
              Positioned for Possibility.
            </span>
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            Raj Nagar Extension is part of the evolving Ghaziabad urban landscape. ROCK ONE SQUARE is positioned to serve businesses, visitors and residents seeking a mixed-use destination in this area.
          </p>
          <p className="mt-2 text-white/60 text-xs sm:text-sm leading-relaxed">
            Its location can be presented in terms of access to surrounding roads, regional infrastructure and nearby destinations, provided each connection is accurately represented.
          </p>
        </div>

        {/* 2-Column Grid: Interactive Connectivity Hub & Architectural Map */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 5 Connectivity Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#c9a84c]">
                A LOCATION THAT MOVES YOU FORWARD
              </span>
              <span className="text-xs font-mono text-white/40">Select to Inspect</span>
            </div>

            {CONNECTIVITY_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon
              const isActive = idx === activePillar
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0d1627] to-[#070b14] border-[#c9a84c] shadow-lg shadow-[#c9a84c]/10'
                      : 'bg-[#0a0f1e]/60 border-white/5 hover:border-white/20 hover:bg-[#0a0f1e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                          isActive
                            ? 'bg-[#c9a84c] text-[#060a14]'
                            : 'bg-white/5 text-white/60'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/80'}`}>
                            {pillar.name}
                          </h4>
                        </div>
                        <span className="text-[11px] font-mono text-[#c9a84c] block mt-0.5">
                          {pillar.travelTime} &bull; {pillar.distance}
                        </span>
                        {isActive && (
                          <p className="text-xs text-white/60 mt-2 leading-relaxed animate-fadeIn">
                            {pillar.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${
                        isActive ? 'text-[#c9a84c] translate-x-0.5 -translate-y-0.5' : 'text-white/20'
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Map & Location Card (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#0e1628] to-[#060a14] border border-[#c9a84c]/25 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
            {/* Map Frame / Site Location Card */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c9a84c]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white">
                    Site Location & Directions
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#e4c870]">28.6765° N, 77.4369° E</span>
              </div>

              {/* Site Visual & Map Link Box */}
              <div className="relative rounded-xl overflow-hidden border border-[#c9a84c]/30 shadow-inner aspect-[16/10] bg-black group">
                <img
                  src="/images/building-aerial.jpg"
                  alt="Rock One Square Site Location Perspective"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

                {/* Center marker card overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="p-3.5 rounded-lg bg-black/85 backdrop-blur-md border border-[#c9a84c]/50 text-white shadow-xl max-w-xs">
                    <p className="text-xs font-serif font-light text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] animate-ping" />
                      <span className="font-semibold text-[#e4c870] tracking-wide">ROCK ONE SQUARE</span>
                    </p>
                    <p className="text-[11px] text-white/80 mt-1 leading-snug">
                      Meerut Road, Raj Nagar Extension, Ghaziabad &bull; 30m Arterial Road Frontage
                    </p>
                  </div>
                </div>

                {/* Direct Action Link in image overlay */}
                <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-white/70">
                    <span>GPS: </span>
                    <span className="text-[#e4c870]">Direct Meerut Road Access</span>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-md bg-[#c9a84c] text-[#060a14] font-semibold text-xs transition-all hover:bg-[#e4c870] flex items-center gap-1.5 shadow-lg shadow-[#c9a84c]/30"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>View Map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address bar & Prominent Directions button */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-white">Project Site Address</p>
                <p className="text-white/60 text-xs mt-0.5">
                  Meerut Road, Raj Nagar Extension, Ghaziabad, UP &ndash; 201003
                </p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e4c870] hover:from-[#d8b75b] hover:to-[#f0d47f] text-[#060a14] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c9a84c]/20 transform active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Draft Tagline */}
        <div className="mt-12 text-center">
          <p className="font-serif italic text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
            ROCK ONE SQUARE &mdash; Well Connected to the Opportunities of Tomorrow.
          </p>
        </div>
      </div>
    </section>
  )
}
