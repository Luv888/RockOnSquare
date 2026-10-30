'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Store,
  Gamepad2,
  Briefcase,
  Home,
  Check,
  ArrowRight,
  MessageCircle,
  Layers,
  Sparkles,
} from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'

interface VerticalItem {
  id: string
  title: string
  tagline: string
  icon: React.ElementType
  levels: string
  levelBadge: string
  color: string
  accentBorder: string
  bgGlow: string
  imageUrl: string
  description: string
  highlights: string[]
  stackPosition: string
}

const VERTICALS: VerticalItem[] = [
  {
    id: 'retail',
    title: 'Retail',
    tagline: 'Visibility That Creates Opportunity.',
    icon: Store,
    levels: 'Ground & 1st Floor',
    levelBadge: 'LEVEL 0 – 1',
    color: '#c9a84c',
    accentBorder: 'border-[#c9a84c]/50',
    bgGlow: 'from-[#c9a84c]/20 to-transparent',
    imageUrl: '/images/retail-1.jpg',
    description:
      'Designed for brands that aspire to stand out, the retail spaces at ROCK ONE SQUARE combine a prominent commercial presence with the potential to attract attention and footfall. With a 30-metre-wide arterial road in front, retail takes centre stage in a destination designed around visibility and engagement.',
    highlights: [
      'Key Highlight: 30-metre-wide arterial road frontage.',
      'Prominent double-height atrium visibility',
      'High footfall pedestrian plaza',
      'Direct arterial road access with dedicated parking',
    ],
    stackPosition: 'Street & Galleria Base',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    tagline: 'Make Every Moment an Experience.',
    icon: Gamepad2,
    levels: '2nd & 3rd Floor',
    levelBadge: 'LEVEL 2 – 3',
    color: '#c084fc',
    accentBorder: 'border-purple-400/50',
    bgGlow: 'from-purple-500/20 to-transparent',
    imageUrl: '/images/lord-of-the-drinks.jpg',
    description:
      'Bringing people together through excitement, recreation and memorable moments, ROCK ONE SQUARE creates a vibrant entertainment destination for Ghaziabad. With Lord of the Drinks and the biggest gaming zone in Ghaziabad planned as key attractions, the destination is designed to make leisure more engaging.',
    highlights: [
      'Key Highlight: A dynamic entertainment destination.',
      'Lord of the Drinks & the biggest gaming zone in Ghaziabad',
      'Interactive gaming experiences and arcade attractions',
      'Curated dining and recreational leisure spaces',
    ],
    stackPosition: 'Recreational Anchor',
  },
  {
    id: 'modern-offices',
    title: 'Modern Offices',
    tagline: 'A Better Perspective on Work.',
    icon: Briefcase,
    levels: '4th Floor',
    levelBadge: 'LEVEL 4',
    color: '#60a5fa',
    accentBorder: 'border-blue-400/50',
    bgGlow: 'from-blue-500/20 to-transparent',
    imageUrl: '/images/office-1.jpg',
    description:
      'Work deserves a space that inspires ideas and supports ambition. The modern office spaces at ROCK ONE SQUARE are thoughtfully designed for today’s professionals, entrepreneurs and growing businesses. Contemporary layouts and efficient planning create an environment that brings functionality and design together.',
    highlights: [
      'Key Highlight: Smart, efficient and contemporary workspaces.',
      'Integrated climate comfort & HVAC systems',
      'High-speed digital connectivity infrastructure',
      'Direct access to on-site dining, retail and leisure amenities',
    ],
    stackPosition: 'Corporate Hub',
  },
  {
    id: 'studio-apartments',
    title: 'Studio Apartments',
    tagline: 'Compact Spaces. Elevated Living.',
    icon: Home,
    levels: '5th to 9th Floor',
    levelBadge: 'LEVEL 5 – 9',
    color: '#e4c870',
    accentBorder: 'border-[#e4c870]/50',
    bgGlow: 'from-[#e4c870]/20 to-transparent',
    imageUrl: '/images/studio-apartment-1.jpg',
    description:
      'Designed for the aspirations of modern urban professionals, the studio apartments at ROCK ONE SQUARE bring together intelligent layouts, contemporary aesthetics and modern amenities. A thoughtfully planned living experience for those who value convenience, functionality and a well-connected address.',
    highlights: [
      'Key Highlight: Contemporary urban living in thoughtfully designed spaces.',
      'Intelligent modular layouts with premium finishes',
      'Panoramic National Capital Region horizon views',
      'Seamless access to building retail, dining and services',
    ],
    stackPosition: 'Elevated Residences',
  },
]

export function CommercialOfferings() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const current = VERTICALS[activeTab]
  const Icon = current.icon

  const waUrl = buildWhatsAppUrl(
    `Hello Rock One Square team,\n\nI am interested in exploring ${current.title} (${current.levels}) at Rock One Square.\nPlease share availability, floor plans, and pricing details.`
  )

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="offerings" className="relative py-24 sm:py-32 bg-[#080d18] text-white overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e4c870] text-xs font-semibold uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            Commercial Ecosystem
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            FOUR VERTICALS.{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
              ONE ELEVATED EXPERIENCE.
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base leading-relaxed">
            Every square foot is engineered for purpose. Experience how retail, entertainment, modern workplaces,
            and executive studios harmonize within a single master-planned destination.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {VERTICALS.map((item, idx) => {
            const TabIcon = item.icon
            const isActive = idx === activeTab
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-b from-[#0f172a] to-[#070b14] border-[#c9a84c] shadow-lg shadow-[#c9a84c]/10'
                    : 'bg-[#0a0f1e]/60 border-white/10 hover:border-white/20 hover:bg-[#0a0f1e]'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#c9a84c] to-[#e4c870]" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#c9a84c] text-[#060a14]'
                        : 'bg-white/5 text-white/70 group-hover:bg-white/10'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">
                    {item.levelBadge}
                  </span>
                </div>
                <div className="font-medium text-sm text-white">{item.title}</div>
                <div className="text-[11px] text-white/50 truncate mt-0.5">{item.levels}</div>
              </button>
            )
          })}
        </div>

        {/* Selected Vertical Detail Card */}
        <div
          key={current.id}
          className="rounded-2xl border border-[#c9a84c]/30 bg-gradient-to-b from-[#0d1527] to-[#070b14] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top corner glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#c9a84c]/15 text-[#e4c870] border border-[#c9a84c]/30">
                  {current.levels}
                </span>
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  &bull; {current.stackPosition}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white mb-2">
                {current.title}
              </h3>
              <p className="text-lg font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#e4c870] mb-5">
                {current.tagline}
              </p>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#c9a84c] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Highlights
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {current.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 leading-snug">
                      <Check className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e4c870] hover:from-[#d8b75b] hover:to-[#f0d47f] text-[#060a14] font-semibold text-sm shadow-lg shadow-[#c9a84c]/20 transition-all flex items-center gap-2 transform active:scale-95"
                >
                  <span>Enquire for {current.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border border-white/15 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            {/* Right: Vertical Stacking Diagram & Visual Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Vertical Visual Showcase */}
              <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#c9a84c]/30 bg-black group shadow-xl">
                <Image
                  src={current.imageUrl}
                  alt={current.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-[#c9a84c]/40 text-[#e4c870] text-[11px] font-mono font-semibold">
                    {current.title} &bull; Interior Perspective
                  </span>
                </div>
                <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-xs">
                  <span className="text-white/80 font-medium">{current.tagline}</span>
                  <span className="text-[#c9a84c] font-mono text-[11px] font-bold">{current.levels}</span>
                </div>
              </div>

              {/* Stacking Plan */}
              <div className="bg-gradient-to-b from-[#0a0f1e] to-[#04070d] p-5 rounded-xl border border-[#c9a84c]/20 shadow-inner">
                <div className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4 flex items-center justify-between pb-3 border-b border-white/10">
                  <span>Building Stacking Plan</span>
                  <span className="text-white/40">11 Levels Total</span>
                </div>

              {/* Stack items */}
              <div className="space-y-2">
                {/* 10F Rooftop */}
                <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-between text-xs text-white/50">
                  <span className="font-mono text-[11px]">10F</span>
                  <span className="font-medium text-white/70">Rooftop Skydeck & Hospitality</span>
                  <span className="text-[10px] text-white/40">Exclusive</span>
                </div>

                {/* 5F-9F Studios */}
                <div
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                    current.id === 'studio-apartments'
                      ? 'border-[#e4c870] bg-[#e4c870]/15 shadow-md shadow-[#e4c870]/10 text-white font-medium'
                      : 'border-white/5 bg-white/[0.02] text-white/60'
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#e4c870]">5F &ndash; 9F</span>
                  <span>Studio Apartments (7F Complete Milestone)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    Living
                  </span>
                </div>

                {/* 4F Modern Offices */}
                <div
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                    current.id === 'modern-offices'
                      ? 'border-blue-400 bg-blue-500/15 shadow-md shadow-blue-500/10 text-white font-medium'
                      : 'border-white/5 bg-white/[0.02] text-white/60'
                  }`}
                >
                  <span className="font-mono text-[11px] text-blue-400">4F</span>
                  <span>Modern Offices & Suites</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                    Work
                  </span>
                </div>

                {/* 2F-3F Entertainment */}
                <div
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                    current.id === 'entertainment'
                      ? 'border-purple-400 bg-purple-500/15 shadow-md shadow-purple-500/10 text-white font-medium'
                      : 'border-white/5 bg-white/[0.02] text-white/60'
                  }`}
                >
                  <span className="font-mono text-[11px] text-purple-400">2F &ndash; 3F</span>
                  <span>Entertainment & Gaming Hub</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                    Leisure
                  </span>
                </div>

                {/* 0F-1F Retail */}
                <div
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                    current.id === 'retail'
                      ? 'border-[#c9a84c] bg-[#c9a84c]/20 shadow-md shadow-[#c9a84c]/10 text-white font-medium'
                      : 'border-white/5 bg-white/[0.02] text-white/60'
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#c9a84c]">GF &ndash; 1F</span>
                  <span>Flagship Retail & 30m Frontage</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    Retail
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <span>Construction: 7 Floors Complete</span>
                <span className="text-[#c9a84c]">Possession Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
