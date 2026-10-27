'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Menu, X, Phone, MessageCircle, ChevronRight, Building, Sparkles } from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'
import { SITE_CONFIG } from '@/lib/config/site'

const NAV_LINKS = [
  { label: 'Overview', href: '#about' },
  { label: 'Four Verticals', href: '#offerings' },
  { label: 'Building Explorer', href: '#explorer', badge: 'Interactive' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Construction', href: '#progress' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
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
  }

  const phone = process.env.NEXT_PUBLIC_SALES_PHONE || SITE_CONFIG.contact.internationalNumber
  const waUrl = buildWhatsAppUrl(defaultWhatsAppMessage())

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060a14]/92 backdrop-blur-md border-b border-[rgba(201,168,76,0.22)] shadow-2xl shadow-black/60'
            : 'bg-gradient-to-b from-[#060a14]/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Brand Logo with Official Metallic Gold Artwork (Transparent) */}
            <button
              onClick={() => scrollTo('#hero')}
              className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded-sm group transition-transform duration-200 hover:scale-[1.02]"
              aria-label="Rock One Square Home"
            >
              <div className="relative h-10 w-36 sm:h-12 sm:w-44 md:h-14 md:w-52 flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Rock One Square Logo"
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="relative text-xs tracking-wider uppercase text-white/75 hover:text-[#e4c870] transition-colors duration-200 py-1 font-medium group focus:outline-none focus-visible:text-[#c9a84c] flex items-center gap-1.5"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-[rgba(201,168,76,0.18)] text-[#c9a84c] border border-[rgba(201,168,76,0.35)] tracking-normal font-semibold">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#c9a84c] to-[#e4c870] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Header Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="hidden 2xl:flex items-center gap-1.5 text-xs text-white/70 hover:text-[#c9a84c] transition-colors px-2 py-1.5"
                  aria-label="Call sales office"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>{phone}</span>
                </a>
              )}

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white/90 bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:text-white rounded-sm transition-all duration-200"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a84c] via-[#dfbe63] to-[#c9a84c] text-[#060a14] text-xs font-bold uppercase tracking-wider rounded-sm shadow-md shadow-[#c9a84c]/20 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
              >
                <Sparkles className="w-3 h-3" />
                <span>Book Site Visit</span>
              </button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden p-2 text-white/70 hover:text-[#c9a84c] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md xl:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="fixed top-20 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#0a0f1e] border-b border-[rgba(201,168,76,0.25)] shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center justify-between py-2.5 px-3 rounded text-left text-sm font-medium text-white/80 hover:text-[#c9a84c] hover:bg-white/5 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-[rgba(201,168,76,0.2)] text-[#c9a84c] border border-[rgba(201,168,76,0.35)]">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full py-3 bg-[#c9a84c] text-[#0a0f1e] text-xs font-bold uppercase tracking-wider rounded-sm text-center shadow-lg shadow-[#c9a84c]/20 hover:bg-[#e4c870] transition-colors"
              >
                Book a Site Visit
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 rounded-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Connect on WhatsApp
              </a>

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="w-full py-2 text-center text-xs text-white/60 hover:text-white flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Call {phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
