'use client'

import React, { useState, useEffect } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { getStoredFAQs, subscribeToDataChanges } from '@/lib/data/local-storage'

interface FAQ {
  id: string
  question: string
  answer: string
}

const DEFAULT_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'Where is Rock One Square located?',
    answer: 'Rock One Square is located in Raj Nagar Extension, Ghaziabad, Uttar Pradesh — a rapidly growing commercial corridor with direct frontage on Meerut Road and strong connectivity to the Delhi-NCR region.',
  },
  {
    id: '2',
    question: 'What commercial spaces are available?',
    answer: 'Rock One Square offers four commercial verticals: Premium Retail (Ground Floor), Entertainment Zone with gaming and dining (2nd–3rd Floor), Modern Offices (4th Floor), and Service Apartments / Studio Units (5th–9th Floor). Contact our sales team for current availability.',
  },
  {
    id: '3',
    question: 'What amenities are included?',
    answer: 'The development features dual power supply with DG backup, integrated HVAC, advanced fire safety systems, 24×7 CCTV surveillance, 8 high-speed elevators, extensive basement parking with modern wayfinding, premium granite finishes, dedicated service areas, and a grand entrance.',
  },
  {
    id: '4',
    question: 'How can I book a site visit?',
    answer: 'Click the "Book a Site Visit" button on this page, fill out the enquiry form, call our sales team directly, or reach us on WhatsApp. Our team will confirm a convenient time for your visit.',
  },
  {
    id: '5',
    question: 'How can I get the project brochure?',
    answer: 'You can request the project brochure by submitting an enquiry form or contacting our sales team directly. We will send you the latest project documentation to your email or WhatsApp.',
  },
  {
    id: '6',
    question: 'How can I contact the sales team?',
    answer: 'Use the enquiry form at the bottom of this page, call us during business hours (Monday to Saturday, 10 AM–7 PM), or message us on WhatsApp for an immediate response.',
  },
  {
    id: '7',
    question: 'What is the current construction status?',
    answer: 'Rock One Square has officially achieved a major structural milestone with 7 FLOORS COMPLETE. RCC superstructure casting is executed up to the 7th floor level. Work is progressing steadily toward the upper suites and rooftop, with possession scheduled soon. Prospective buyers and tenants are welcome to schedule guided on-site inspections.',
  },
  {
    id: '8',
    question: 'What is the RERA status of Rock One Square?',
    answer: 'RERA registration details will be published on this website and the UP RERA portal upon regulatory approval. Please contact our sales team for the current registration status before making any financial commitments.',
  },
]

interface FAQSectionProps {
  faqs?: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [items, setItems] = useState<FAQ[]>(faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS)

  useEffect(() => {
    const stored = getStoredFAQs()
    if (stored && stored.length > 0) setItems(stored)
    return subscribeToDataChanges(() => {
      const updated = getStoredFAQs()
      if (updated && updated.length > 0) setItems(updated)
    })
  }, [])

  return (
    <section id="faq" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
            Frequently Asked Questions
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Everything You <span className="text-[#c9a84c]">Need to Know</span>
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-2">
          {items.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="border border-white/5 rounded-sm data-[state=open]:border-[rgba(201,168,76,0.25)] transition-colors overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-inset">
                  <span className="text-white text-sm font-medium pr-4 group-data-[state=open]:text-[#c9a84c] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#c9a84c]" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_150ms_ease-out] data-[state=closed]:animate-[accordion-up_150ms_ease-out]">
                <div className="px-5 pb-4 text-white/55 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
