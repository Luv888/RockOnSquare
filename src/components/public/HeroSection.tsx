'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  Compass,
  Sparkles,
  Gamepad2,
  Building2,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'

export interface HeroSlide {
  id: string
  navNumber: string
  navLabel: string
  badge: string
  title: string
  subtitle: string
  description: string
  imageUrl: string
  imagePosition: string
  showLogo?: boolean
  primaryCtaLabel: string
  primaryCtaUrl: string
  secondaryCtaLabel?: string
  secondaryCtaUrl?: string
  primaryIcon: React.ElementType
  overlayGradient: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'banner-1',
    navNumber: '01',
    navLabel: 'Rock One Square',
    badge: '7 FLOORS COMPLETE | POSSESSION SOON',
    title: 'ROCK ONE SQUARE',
    subtitle: 'DESIGNED TO ELEVATE EVERY EXPERIENCE.',
    description:
      'Retail. Entertainment. Modern Offices. Studio Apartments. One landmark address redefining commercial architecture along Meerut Road in Raj Nagar Extension.',
    imageUrl: '/images/building-front.jpg',
    imagePosition: 'object-center lg:object-[center_35%]',
    showLogo: true,
    primaryCtaLabel: 'EXPLORE BUILDING',
    primaryCtaUrl: '#explorer',
    secondaryCtaLabel: 'BOOK A SITE VISIT',
    secondaryCtaUrl: '#contact',
    primaryIcon: Compass,
    overlayGradient: 'from-[#060a14]/94 via-[#060a14]/65 to-transparent',
  },
  {
    id: 'banner-2',
    navNumber: '02',
    navLabel: 'Entertainment & Dining',
    badge: 'CURATED SOCIAL & DINING DESTINATION',
    title: 'ENTERTAINMENT & DINING',
    subtitle: 'CURATED CULINARY & SOCIAL DESTINATIONS.',
    description:
      'A vibrant commercial destination bringing together curated fine dining, artisanal casual eateries, and immersive social experiences across the lower entertainment tiers.',
    imageUrl: '/images/lord-of-the-drinks.jpg',
    imagePosition: 'object-center lg:object-[center_45%]',
    showLogo: false,
    primaryCtaLabel: 'EXPLORE EXPERIENCE',
    primaryCtaUrl: '#offerings',
    secondaryCtaLabel: 'BOOK A SITE VISIT',
    secondaryCtaUrl: '#contact',
    primaryIcon: Sparkles,
    overlayGradient: 'from-[#060a14]/92 via-[#060a14]/65 to-[#060a14]/20',
  },
  {
    id: 'banner-3',
    navNumber: '03',
    navLabel: 'Gaming Zone',
    badge: 'THE BIGGEST GAMING ZONE IN GHAZIABAD',
    title: 'GAMING ZONE',
    subtitle: 'TAKE ENTERTAINMENT TO THE NEXT LEVEL.',
    description:
      'The biggest gaming zone in Ghaziabad. Immersive virtual reality, dynamic arcade arenas, and family recreation spanning the expansive 3rd floor entertainment level.',
    imageUrl: '/images/gaming-zone-hero.jpg',
    imagePosition: 'object-center lg:object-[center_45%]',
    showLogo: false,
    primaryCtaLabel: 'DISCOVER MORE',
    primaryCtaUrl: '#offerings',
    secondaryCtaLabel: 'PLAN YOUR VISIT',
    secondaryCtaUrl: '#contact',
    primaryIcon: Gamepad2,
    overlayGradient: 'from-[#060a14]/92 via-[#060a14]/60 to-transparent',
  },
]

interface HeroSectionProps {
  banners?: any[]
}

export function HeroSection({ banners }: HeroSectionProps) {
  const [current, setCurrent] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)
  const touchStartXRef = useRef<number | null>(null)
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides: HeroSlide[] = React.useMemo(() => {
    if (!banners || banners.length < 3) return HERO_SLIDES
    return banners.slice(0, 3).map((b, idx) => {
      const fallback = HERO_SLIDES[idx] || HERO_SLIDES[0]
      return {
        id: b.id || fallback.id,
        navNumber: String(idx + 1).padStart(2, '0'),
        navLabel: b.title || fallback.navLabel,
        badge: b.badge || fallback.badge,
        title: b.title || fallback.title,
        subtitle: b.subtitle || fallback.subtitle,
        description: b.description || fallback.description,
        imageUrl: b.imageUrl || fallback.imageUrl,
        imagePosition: fallback.imagePosition,
        showLogo: idx === 0,
        primaryCtaLabel: b.ctaLabel || fallback.primaryCtaLabel,
        primaryCtaUrl: b.ctaUrl || fallback.primaryCtaUrl,
        secondaryCtaLabel: b.secondaryCtaLabel || fallback.secondaryCtaLabel,
        secondaryCtaUrl: b.secondaryCtaUrl || fallback.secondaryCtaUrl,
        primaryIcon: fallback.primaryIcon,
        overlayGradient: fallback.overlayGradient,
      }
    })
  }, [banners])

  const totalSlides = slides.length

  const goToSlide = useCallback((index: number) => {
    setCurrent((index + totalSlides) % totalSlides)
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Reduced motion preference detection
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // 6-second auto-advance timer
  useEffect(() => {
    if (paused || reducedMotion) return
    autoPlayTimerRef.current = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [paused, reducedMotion, nextSlide])

  // Keyboard navigation when user presses ArrowLeft or ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true)
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setPaused(false)
    if (touchStartXRef.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartXRef.current - touchEndX
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    touchStartXRef.current = null
  }

  const scrollTo = (href: string) => {
    if (!href?.startsWith('#')) return
    const el = document.getElementById(href.slice(1))
    if (el) {
      const navOffset = 80
      const elPosition = el.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elPosition - navOffset,
        behavior: 'smooth',
      })
    }
  }

  const activeSlide = slides[current]
  const PrimaryIcon = activeSlide.primaryIcon

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#060a14]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Rock One Square Homepage Slideshow"
      role="region"
    >
      {/* Background Slides with Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((s, idx) => {
          const isActive = idx === current
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={s.imageUrl}
                alt={`${s.title} visual background`}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover ${s.imagePosition} filter brightness-[0.80] contrast-[1.08]`}
              />

              {/* Individualized Dark Vignette Overlay preserving subject visibility */}
              <div className={`absolute inset-0 bg-gradient-to-r ${s.overlayGradient}`} />
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#060a14] via-[#060a14]/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#060a14] via-[#060a14]/75 to-transparent" />
            </div>
          )
        })}

        {/* Architectural Subtle Grid Background Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, #c9a84c 1px, transparent 1px), linear-gradient(to bottom, #c9a84c 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_70%)] pointer-events-none filter blur-2xl z-20" />
      </div>

      {/* Main Slide Content Block */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 lg:py-14">
        <div key={activeSlide.id} className="max-w-3xl lg:max-w-4xl animate-hero-fade">
          {/* Transparent Logo (featured in Banner 1) */}
          {activeSlide.showLogo && (
            <div className="relative h-10 w-44 sm:h-12 sm:w-52 mb-4">
              <Image
                src="/images/logo.png"
                alt="Rock One Square Official Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          )}

          {/* Badge */}
          {activeSlide.badge && (
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-5 border border-[rgba(201,168,76,0.4)] bg-[#0a0f1e]/85 backdrop-blur-md rounded-full shadow-lg shadow-black/50">
              <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase">
                {activeSlide.badge}
              </span>
            </div>
          )}

          {/* Luxury Serif Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight mb-4">
            {activeSlide.title}
          </h1>

          {/* Subtitle with Metallic Champagne Gold Gradient */}
          {activeSlide.subtitle && (
            <p className="font-serif text-lg sm:text-2xl md:text-3xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c] mb-5 leading-snug">
              {activeSlide.subtitle}
            </p>
          )}

          {/* Descriptive Copy */}
          {activeSlide.description && (
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8 font-light">
              {activeSlide.description}
            </p>
          )}

          {/* Calls to Action */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo(activeSlide.primaryCtaUrl)}
              className="px-7 py-3.5 bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c] text-[#060a14] font-bold text-xs uppercase tracking-widest rounded-lg shadow-xl shadow-[#c9a84c]/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <PrimaryIcon className="w-4 h-4 text-[#060a14]" />
              <span>{activeSlide.primaryCtaLabel}</span>
            </button>

            {activeSlide.secondaryCtaLabel && (
              <button
                type="button"
                onClick={() => scrollTo(activeSlide.secondaryCtaUrl || '#contact')}
                className="px-6 py-3.5 border border-white/25 bg-black/40 hover:bg-white/10 hover:border-[#c9a84c] text-white text-xs font-semibold uppercase tracking-wider rounded-lg backdrop-blur-md transition-all duration-200 flex items-center gap-2"
              >
                <span>{activeSlide.secondaryCtaLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Slideshow Navigation Controls & Architectural Statistics */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Slide Indicators & Chevron Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6">
          {/* Three Slide Indicators */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1 scrollbar-none" role="tablist" aria-label="Slideshow Indicators">
            {slides.map((s, index) => {
              const isActive = index === current
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${s.title}`}
                  className={`group relative text-left py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 border ${
                    isActive
                      ? 'border-[#c9a84c] bg-[#c9a84c]/15 text-white shadow-lg shadow-[#c9a84c]/10'
                      : 'border-white/10 bg-black/40 text-white/50 hover:text-white hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isActive ? 'text-[#c9a84c]' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {s.navNumber}
                    </span>
                    <span className="text-xs font-medium tracking-wide whitespace-nowrap">
                      {s.navLabel}
                    </span>
                  </div>

                  {/* Active Slide Progress Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#e4c870] rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Prev / Next Chevrons and Auto-play State */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-[11px] font-mono text-white/40 tracking-wider">
              {current + 1} / {totalSlides}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                className="w-9 h-9 rounded-lg border border-white/15 bg-black/50 hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 text-white/70 hover:text-[#e4c870] flex items-center justify-center transition-all shadow-md active:scale-95"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-9 h-9 rounded-lg border border-white/15 bg-black/50 hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 text-white/70 hover:text-[#e4c870] flex items-center justify-center transition-all shadow-md active:scale-95"
                aria-label="Next banner"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Architectural Bottom Statistics Bar */}
        <div className="pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <p className="text-white font-medium text-xs sm:text-sm">~1 Acre</p>
              <p className="text-white/45 text-[11px]">Mixed-Use Campus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] flex items-center justify-center flex-shrink-0">
              <Layers className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <p className="text-white font-medium text-xs sm:text-sm">30 Metres</p>
              <p className="text-white/45 text-[11px]">Arterial Frontage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <p className="text-white font-medium text-xs sm:text-sm">7 Floors Complete</p>
              <p className="text-white/45 text-[11px]">Possession Soon</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <p className="text-white font-medium text-xs sm:text-sm">4 Verticals</p>
              <p className="text-white/45 text-[11px]">Retail • Dining • Offices • Suites</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
