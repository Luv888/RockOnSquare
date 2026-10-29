'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  X,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react'

interface Milestone {
  id: string
  stage: string
  title: string
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING'
  dateLabel: string
  description: string
  floorsIndicator: string
}

const MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    stage: 'PHASE 1',
    title: 'Site Acquisition & Heavy Raft Foundation',
    status: 'COMPLETED',
    dateLabel: 'Completed',
    description:
      'Execution of deep soil piling, multi-tier basement excavation, and heavy RCC raft foundation engineering to support high-load commercial and entertainment spans.',
    floorsIndicator: 'Basements & Foundation',
  },
  {
    id: 'm-2',
    stage: 'PHASE 2',
    title: 'Double-Height Retail & Atrium Framing',
    status: 'COMPLETED',
    dateLabel: 'Completed',
    description:
      'Ground Floor 30m frontage retail structure and 1st Floor anchor galleria cast. Central atrium spatial voids and escalator service banks framed.',
    floorsIndicator: 'Ground & 1st Floor',
  },
  {
    id: 'm-3',
    stage: 'PHASE 3',
    title: 'Entertainment Hub & Corporate Offices',
    status: 'COMPLETED',
    dateLabel: 'Completed',
    description:
      '2nd & 3rd level high-load entertainment floors cast (Family Entertainment & Gaming Zone layout), followed by 4th Floor modern office suites slab.',
    floorsIndicator: '2nd, 3rd & 4th Floors',
  },
  {
    id: 'm-4',
    stage: 'CURRENT MILESTONE',
    title: '7 FLOORS COMPLETE — Structure Milestone',
    status: 'COMPLETED',
    dateLabel: 'Officially Executed',
    description:
      'Major structural milestone reached: 7 full floors completely cast and structurally cured. RCC superstructure established through the first residential studio apartment tiers.',
    floorsIndicator: '5th, 6th & 7th Floors Complete',
  },
  {
    id: 'm-5',
    stage: 'PHASE 5',
    title: 'Upper Studio Penthouses & Rooftop Skydeck',
    status: 'IN_PROGRESS',
    dateLabel: 'Active Work',
    description:
      'Casting of 8th, 9th executive studio apartments and 10th Floor rooftop hospitality skydeck. MEP service risers advancing simultaneously.',
    floorsIndicator: '8F, 9F & 10F Rooftop',
  },
  {
    id: 'm-6',
    stage: 'FINAL PHASE',
    title: 'Architectural Glazing, HVAC & Possession',
    status: 'UPCOMING',
    dateLabel: 'Possession Soon',
    description:
      'Curtain wall double glazing, central HVAC installation, interior lobby finishes, and handover to commercial occupants and residents.',
    floorsIndicator: 'Handover & Possession',
  },
]

const GALLERY_IMAGES = [
  {
    url: '/images/building-front.jpg',
    title: 'Front Elevation Dusk Render',
    caption: 'Direct 30-metre Meerut Road frontage with double-height retail and multi-level illuminated facade.',
    badge: 'Perspective 1 • Front Elevation',
  },
  {
    url: '/images/building-aerial.jpg',
    title: 'Masterplan Aerial View',
    caption: 'Comprehensive aerial visualization of the 1-acre footprint, vertical zoning, and surrounding NCR corridor.',
    badge: 'Perspective 2 • Masterplan Aerial',
  },
]

export interface ConstructionProgressProps {
  updates?: Array<{
    id: string
    title: string
    description?: string | null
    updateDate: Date | string
    floorsCompleted?: number | null
    overallProgress?: number | null
    isMilestone?: boolean
    milestoneLabel?: string | null
    photoUrls?: string[]
  }>
}

export function ConstructionProgress({ updates }: ConstructionProgressProps = {}) {
  const [activePhoto, setActivePhoto] = useState<{ url: string; title: string; caption: string } | null>(null)

  return (
    <section id="progress" className="relative py-24 sm:py-32 bg-[#060a14] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e4c870] text-xs font-semibold uppercase tracking-widest mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Execution Track Record
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            The Vision Is Taking Shape.{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
              7 FLOORS COMPLETE.
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base leading-relaxed">
            Constructed with uncompromising structural precision. Follow the milestone roadmap and verify our
            on-ground progress in Raj Nagar Extension.
          </p>
        </div>

        {/* Highlight Milestone Metric Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#09101d] to-[#070b14] border border-[#c9a84c]/30 shadow-2xl">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Progress Ring / Bar (7 cols) */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c]">
                  Structural Progress Indicator
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-3">
                7 of 11 Floors Structurally Executed
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
                RCC framing and concrete slabs through the 7th floor are fully complete. Construction is progressing
                steadily toward the upper executive suites and rooftop crown.
              </p>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/80">Structure Completion (7 / 11 Floors)</span>
                  <span className="text-[#e4c870] font-bold">64% Executed</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-[#c9a84c]/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e4c870] transition-all duration-1000 shadow-lg shadow-[#c9a84c]/50"
                    style={{ width: '64%' }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-white/40 mt-2 font-mono">
                  <span>Ground Floor Plaza</span>
                  <span className="text-[#c9a84c]">7F Milestone Level</span>
                  <span>10F Rooftop Lounge</span>
                </div>
              </div>
            </div>

            {/* Right: Verified Badge & Site Visit CTA (5 cols) */}
            <div className="md:col-span-5 md:border-l md:border-white/10 md:pl-8 flex flex-col justify-between h-full">
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs text-white/80">
                  <ShieldCheck className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <span>Earthquake-resistant RCC framed structural design.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-white/80">
                  <ShieldCheck className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <span>On-ground construction active with scheduled site tours.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-white/80">
                  <ShieldCheck className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <span>Direct developer project by Senflore Hospitality LLP.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full py-3 px-4 rounded-lg bg-[#c9a84c] hover:bg-[#e4c870] text-[#060a14] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c9a84c]/20"
              >
                <span>Book Site Visit to Inspect Progress</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Timeline Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between pb-3 mb-8 border-b border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#c9a84c]">
              Development Timeline & Milestone Roadmap
            </h3>
            <span className="text-xs font-mono text-white/40">Chronological Phasing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MILESTONES.map((m) => {
              const isDone = m.status === 'COMPLETED'
              const isCurrent = m.stage.includes('CURRENT')
              return (
                <div
                  key={m.id}
                  className={`p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isCurrent
                      ? 'bg-gradient-to-b from-[#131d33] to-[#080d18] border-[#c9a84c] shadow-lg shadow-[#c9a84c]/20'
                      : isDone
                      ? 'bg-[#0a0f1e]/80 border-white/10 hover:border-white/20'
                      : 'bg-white/[0.02] border-white/5 opacity-75'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-[#c9a84c] to-[#e4c870] text-[#060a14] text-[10px] font-mono font-bold tracking-wider uppercase rounded-bl-lg">
                      CURRENT STATUS
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#c9a84c]">
                        {m.stage}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono">
                        {isDone ? (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {m.dateLabel}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[#e4c870]">
                            <Clock className="w-3.5 h-3.5" />
                            {m.dateLabel}
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-white font-medium text-base mb-2 leading-snug">
                      {m.title}
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed mb-4">
                      {m.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>Scope:</span>
                    <span className="text-[#e4c870]">{m.floorsIndicator}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Visual Inspection Gallery with Lightbox */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#c9a84c]">
                Architectural Elevation Gallery
              </h3>
              <p className="text-xs text-white/50 mt-0.5">Click any perspective to inspect full resolution</p>
            </div>
            <span className="text-xs font-mono text-white/40">2 Perspectives Available</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhoto(img)}
                className="group relative rounded-xl overflow-hidden border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 aspect-[16/10] bg-black cursor-pointer shadow-xl transition-all duration-300"
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-[#c9a84c]/40 text-[#e4c870] text-[11px] font-semibold">
                    {img.badge}
                  </span>
                </div>

                {/* Hover inspect icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="p-3 rounded-full bg-[#c9a84c] text-[#060a14] shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-3 inset-x-3 z-10">
                  <h4 className="text-white text-sm font-medium">{img.title}</h4>
                  <p className="text-white/60 text-xs truncate mt-0.5">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Construction Photography Verification Notice */}
          <div className="mt-8 p-5 rounded-xl border border-white/10 bg-gradient-to-r from-[#0d1627] to-[#070b14] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Official Construction Milestone: 7 Floors Complete</h4>
                <p className="text-xs text-white/50 mt-0.5">
                  Superstructure execution is fully verified on site in Raj Nagar Extension. High-resolution photographic site updates will be released following current scheduled audit.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e4c870] text-xs font-mono whitespace-nowrap self-start sm:self-center">
              <Calendar className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Possession Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0a0f1e] border border-[#c9a84c]/40 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white transition-all border border-white/20"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image Frame */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <Image
                src={activePhoto.url}
                alt={activePhoto.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption bar */}
            <div className="p-5 bg-gradient-to-b from-[#0e1628] to-[#070b14] border-t border-white/10">
              <h3 className="font-serif text-lg text-white font-light">{activePhoto.title}</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-1">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
