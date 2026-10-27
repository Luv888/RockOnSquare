'use client'

import React from 'react'
import { Phone, MessageCircle, FileText } from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'
import { SITE_CONFIG } from '@/lib/config/site'

export function MobileActionBar() {
  const phone = process.env.NEXT_PUBLIC_SALES_PHONE || SITE_CONFIG.contact.internationalNumber
  const waUrl = buildWhatsAppUrl(defaultWhatsAppMessage())

  const openEnquiry = () => {
    window.dispatchEvent(new CustomEvent('open-enquiry-modal'))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[rgba(201,168,76,0.2)] bg-[#0a0f1e]/95 backdrop-blur-md">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={phone ? `tel:${phone}` : '#contact'}
          className="flex flex-col items-center justify-center gap-1 py-3 text-white/60 hover:text-[#c9a84c] hover:bg-white/5 transition-colors"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Call</span>
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-white/60 hover:text-[#c9a84c] hover:bg-white/5 transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">WhatsApp</span>
        </a>
        <button
          onClick={openEnquiry}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-colors"
          aria-label="Enquire now"
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Enquire</span>
        </button>
      </div>
    </div>
  )
}
