import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MessageCircle, MapPin, Building2, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'
import { SITE_CONFIG } from '@/lib/config/site'

const NAV_LINKS = [
  { label: 'Overview', href: '#about' },
  { label: 'Commercial Verticals', href: '#offerings' },
  { label: 'Building Explorer', href: '#explorer' },
  { label: 'Visual Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Connectivity', href: '#location' },
  { label: 'Construction Milestone', href: '#progress' },
  { label: 'Schedule Visit', href: '#contact' },
]

const VERTICAL_LINKS = [
  { label: 'Retail (Ground & 1st Floor)', href: '#offerings' },
  { label: 'Entertainment & Gaming (2nd–3rd Floor)', href: '#offerings' },
  { label: 'Modern Offices (4th Floor)', href: '#offerings' },
  { label: 'Studio Apartments (5th–9th Floor)', href: '#offerings' },
  { label: 'Rooftop Lounge (10th Floor)', href: '#explorer' },
]

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_SALES_PHONE || SITE_CONFIG.contact.displayNumber
  const email = process.env.NEXT_PUBLIC_SALES_EMAIL || SITE_CONFIG.contact.email
  const waUrl = buildWhatsAppUrl(defaultWhatsAppMessage())
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#04070d] text-white border-t border-[#c9a84c]/20 relative overflow-hidden">
      {/* Subtle top gold accent bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-80" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Sign-Off Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <div className="relative h-12 w-44 sm:h-14 sm:w-52 flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Rock One Square Official Logo"
                  fill
                  className="object-contain object-left"
                  sizes="208px"
                />
              </div>
            </Link>

            <div className="pt-2">
              <p className="font-serif italic text-base text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#e4c870] leading-snug">
                DESIGNED TO ELEVATE EVERY EXPERIENCE.
              </p>
              <p className="text-white/50 text-xs mt-1">One Landmark Address. A World of Possibilities.</p>
            </div>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Spread across one acre along Meerut Road in Raj Nagar Extension, ROCK ONE SQUARE brings together
              premium retail, Ghaziabad&apos;s premier entertainment hub, modern corporate offices, and executive studio apartments.
            </p>

            <div className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-xs text-[#e4c870]">
              <ShieldCheck className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
              <span>Official Milestone: 7 Floors Complete &bull; Possession Soon</span>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verticals (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
              Commercial Verticals
            </h3>
            <ul className="space-y-2.5">
              {VERTICAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-2">
              Developer & Inquiries
            </h3>

            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Senflore Hospitality LLP</span>
                  <span className="text-white/50">Project Developer & Promoter</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                <span>Meerut Road, Raj Nagar Extension, Ghaziabad, UP &ndash; 201003</span>
              </div>

              <a
                href={SITE_CONFIG.contact.telHref}
                className="flex items-center gap-2.5 hover:text-[#c9a84c] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                <span>{phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 hover:text-[#c9a84c] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                <span>{email}</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e4c870] hover:from-[#d8b75b] hover:to-[#f0d47f] text-[#060a14] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-[#c9a84c]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Sales Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="text-center md:text-left space-y-1">
            <p>
              &copy; {year} Rock One Square. All rights reserved. Developed by Senflore Hospitality LLP.
            </p>
            <p className="text-[11px] text-white/30">
              <strong className="text-white/50">RERA Notice:</strong> Project registration details are subject to
              applicable state regulatory guidelines. All artist renderings, dimensions, and specifications are
              indicative and subject to confirmation.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] flex-shrink-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
