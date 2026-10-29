'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { deduplicateGalleryItems } from '@/lib/utils'

export interface GalleryItem {
  id: string
  title: string
  category: 'ARCHITECTURE' | 'ENTERTAINMENT' | 'OFFICES' | 'STUDIOS' | 'RETAIL'
  categoryLabel: string
  imageUrl: string
  aspect: 'landscape' | 'portrait' | 'wide'
  caption: string
  details: string
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Architecture (2 Genuine Perspectives)
  {
    id: 'gal-arch-1',
    title: 'Front Dusk Architectural Elevation',
    category: 'ARCHITECTURE',
    categoryLabel: 'Architecture',
    imageUrl: '/images/building-front.jpg',
    aspect: 'wide',
    caption: 'Direct 30-metre Meerut Road frontage with double-height retail and multi-level illuminated facade.',
    details: 'Master elevation rendering showing the ground-level plaza, central atrium glazing, and 11-level mixed-use superstructure.',
  },
  {
    id: 'gal-arch-2',
    title: 'Masterplan Aerial Architectural Perspective',
    category: 'ARCHITECTURE',
    categoryLabel: 'Architecture',
    imageUrl: '/images/building-aerial.jpg',
    aspect: 'wide',
    caption: 'Full 1-acre masterplan visualization highlighting vertical zoning, parking access, and Meerut Road connectivity.',
    details: 'Comprehensive aerial perspective illustrating the complete integration of retail, entertainment, offices, and studio residences.',
  },

  // 2. Entertainment & Dining (4 Unique Destinations)
  {
    id: 'gal-ent-1',
    title: 'Flagship Social & Dining Lounge',
    category: 'ENTERTAINMENT',
    categoryLabel: 'Entertainment & Dining',
    imageUrl: '/images/lord-of-the-drinks.jpg',
    aspect: 'landscape',
    caption: 'Premier social and dining destination designed with signature ambiance for Ghaziabad.',
    details: 'Anchoring the 2nd and 3rd entertainment floors, bringing an iconic social and dining landmark to western UP.',
  },
  {
    id: 'gal-ent-2',
    title: 'Arcade Gaming Zone & VR Arena',
    category: 'ENTERTAINMENT',
    categoryLabel: 'Entertainment & Dining',
    imageUrl: '/images/gaming-zone-hero.jpg',
    aspect: 'wide',
    caption: 'Ghaziabad’s biggest gaming zone — immersive virtual reality and high-energy arcade gaming.',
    details: 'Designed as a family recreation and youth gaming destination spanning expansive floorplates on the 3rd level.',
  },
  {
    id: 'gal-ent-3',
    title: 'Curated Fine Dining & Restaurant Spaces',
    category: 'ENTERTAINMENT',
    categoryLabel: 'Entertainment & Dining',
    imageUrl: '/images/fine-dining-1.jpg',
    aspect: 'landscape',
    caption: 'Gourmet dining ambiance with dedicated kitchen exhaust infrastructure and curated indoor seating.',
    details: 'Curated destination for family dinners, celebratory evenings, and high-energy social gatherings overlooking NCR.',
  },
  {
    id: 'gal-ent-4',
    title: 'Entertainment & Interactive Recreation Arena',
    category: 'ENTERTAINMENT',
    categoryLabel: 'Entertainment & Dining',
    imageUrl: '/images/gaming-entertainment.jpg',
    aspect: 'portrait',
    caption: 'Multi-level gaming and entertainment experience with high-tech arcades and family recreational arenas.',
    details: 'Anchoring western UP’s largest commercial entertainment center.',
  },

  // 3. Studio Apartments (4 Distinct Suites)
  {
    id: 'gal-stu-1',
    title: 'Studio Apartment — Master Living Concept',
    category: 'STUDIOS',
    categoryLabel: 'Studio Apartments',
    imageUrl: '/images/studio-apartment-1.jpg',
    aspect: 'landscape',
    caption: 'Intelligently planned studio residence with modular joinery, dining nook, and generous natural daylight.',
    details: 'Part of the 5th to 9th floor residential tier, crafted for modern professionals seeking convenience and elegance.',
  },
  {
    id: 'gal-stu-2',
    title: 'Studio Apartment — Bedroom Suite & Balcony',
    category: 'STUDIOS',
    categoryLabel: 'Studio Apartments',
    imageUrl: '/images/studio-apartment-2.jpg',
    aspect: 'landscape',
    caption: 'Warm wooden flooring and floor-to-ceiling glass doors opening onto private western horizon views.',
    details: 'Acoustically insulated double glazing ensuring complete serenity above the bustling commercial hub.',
  },
  {
    id: 'gal-stu-3',
    title: 'Studio Apartment — Contemporary Lounge',
    category: 'STUDIOS',
    categoryLabel: 'Studio Apartments',
    imageUrl: '/images/studio-apartment-3.jpg',
    aspect: 'landscape',
    caption: 'Modern open-plan living environment uniting workspace, relaxation, and bespoke architectural fixtures.',
    details: 'Dedicated residential elevators, concierge desk readiness, and 24×7 multi-tier access security.',
  },
  {
    id: 'gal-stu-4',
    title: 'Studio Apartment — Panoramic Horizon Suite',
    category: 'STUDIOS',
    categoryLabel: 'Studio Apartments',
    imageUrl: '/images/studio-apartment-4.jpg',
    aspect: 'wide',
    caption: 'Wide-angle perspective of executive studio suite capturing open skyline vistas along Meerut Road.',
    details: 'Ideal for corporate leases and executive second homes positioned in Raj Nagar Extension’s growth corridor.',
  },

  // 4. Modern Offices (2 Distinct Workspaces)
  {
    id: 'gal-off-1',
    title: 'Modern Offices — Executive Workspaces',
    category: 'OFFICES',
    categoryLabel: 'Modern Offices',
    imageUrl: '/images/office-1.jpg',
    aspect: 'landscape',
    caption: '4th floor smart corporate workspaces engineered with HVAC climate control and ergonomic planning.',
    details: 'Contemporary layouts designed for tech companies, corporate branches, and professionals seeking prestige and connectivity.',
  },
  {
    id: 'gal-off-2',
    title: 'Commercial Office Spaces',
    category: 'OFFICES',
    categoryLabel: 'Modern Offices',
    imageUrl: '/images/office-2.jpg',
    aspect: 'landscape',
    caption: 'Modern open-plan workstations and flexible executive desks featuring high-speed optical fiber infrastructure.',
    details: 'Full business ecosystem with direct access to lower dining, fitness, and lifestyle amenities.',
  },

  // 5. Retail (1 High Street Galleria Showcase)
  {
    id: 'gal-ret-1',
    title: 'Flagship Retail — High Street Frontage & Atrium Galleria',
    category: 'RETAIL',
    categoryLabel: 'Retail',
    imageUrl: '/images/retail-1.jpg',
    aspect: 'landscape',
    caption: 'Prime 30-metre Meerut Road frontage with double-height retail facades and maximum commercial footfall.',
    details: 'Ground and 1st floor retail galleria with continuous escalators, wide pedestrian plazas, and granite paving.',
  },
]

// Deduplicate items automatically as defense-in-depth against duplicate image references
export const UNIQUE_GALLERY_ITEMS: GalleryItem[] = deduplicateGalleryItems(GALLERY_ITEMS)

const CATEGORIES = [
  { id: 'ALL', label: 'All Visuals', count: UNIQUE_GALLERY_ITEMS.length },
  { id: 'ARCHITECTURE', label: 'Architecture', count: UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'ARCHITECTURE').length },
  { id: 'STUDIOS', label: 'Studio Apartments', count: UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'STUDIOS').length },
  { id: 'ENTERTAINMENT', label: 'Entertainment & Dining', count: UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'ENTERTAINMENT').length },
  { id: 'OFFICES', label: 'Modern Offices', count: UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'OFFICES').length },
  { id: 'RETAIL', label: 'Retail', count: UNIQUE_GALLERY_ITEMS.filter((i) => i.category === 'RETAIL').length },
]

export function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems =
    activeFilter === 'ALL'
      ? UNIQUE_GALLERY_ITEMS
      : UNIQUE_GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
    }
  }

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredItems])

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#060a14] text-white overflow-hidden border-t border-b border-[#c9a84c]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c9a84c]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e4c870] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
            Architectural Visual Showcase
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            Visualizing <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">Every Dimension</span>
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base leading-relaxed">
            Explore authentic project renders, promotional entertainment concepts, and curated interior photography
            across the four distinct commercial verticals of Rock One Square.
          </p>
        </div>

        {/* Filter Category Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveFilter(cat.id)
                  setLightboxIndex(null)
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#c9a84c] text-[#060a14] border-[#c9a84c] shadow-lg shadow-[#c9a84c]/20 font-semibold'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-[#c9a84c]/40 hover:bg-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-black/20 text-[#060a14]' : 'bg-white/10 text-[#e4c870]'}`}>
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Editorial Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-[#c9a84c]/60 bg-[#0a0f1e] cursor-pointer shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-[#c9a84c]/40 text-[#e4c870] text-[10px] font-mono font-semibold uppercase tracking-wider">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="p-3 rounded-full bg-[#c9a84c] text-[#060a14] shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-4 bg-gradient-to-b from-[#0a0f1e] to-[#04070d] border-t border-white/5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-lg font-light text-white group-hover:text-[#e4c870] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs mt-1 leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#c9a84c] opacity-80 group-hover:opacity-100">
                    <span>Click to Expand</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div
            className="relative w-full max-w-5xl bg-[#0a0f1e] border border-[#c9a84c]/40 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#c9a84c]/40 text-[#e4c870] text-xs font-mono font-semibold pointer-events-auto">
                {activeItem.categoryLabel} &bull; {lightboxIndex + 1} OF {filteredItems.length}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 transition-all"
                  aria-label="Previous visual"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 transition-all"
                  aria-label="Next visual"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 transition-all ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High-res Image Preview Frame */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Bottom Caption & Details Console */}
            <div className="p-6 bg-gradient-to-b from-[#0e1728] to-[#060a14] border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 id="lightbox-title" className="font-serif text-xl sm:text-2xl font-light text-white">
                    {activeItem.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                    {activeItem.details}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(null)
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#c9a84c] hover:bg-[#e4c870] text-[#060a14] font-semibold text-xs transition-all flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
