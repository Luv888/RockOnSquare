'use client'

import React, { useState, useEffect } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { getStoredFAQs, subscribeToDataChanges } from '@/lib/data/local-storage'
import { normalizeFaqRecord } from '@/lib/data/initial-data'

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
    question: 'What are the four verticals available at Rock One Square?',
    answer: 'Rock One Square brings together four key verticals: Premium Retail, Food & Beverage, Entertainment, and Studio Apartments. Contact our sales team for details about available spaces.',
  },
  {
    id: '3',
    question: 'What amenities are included?',
    answer: 'The development features dual power supply with DG backup, HVAC, advanced fire safety systems, 24×7 CCTV surveillance, eight elevators, premium granite finishes, dedicated service areas, and a grand entrance.',
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
    answer: 'Use the enquiry form at the bottom of this page, call us during business hours (Monday to Sunday, 10 AM–9 PM), or message us on WhatsApp.',
  },
  {
    id: '7',
    question: 'What is the current construction status?',
    answer: 'Rock One Square has officially achieved a major structural milestone with 7 FLOORS COMPLETE. RCC superstructure casting is executed up to the 7th floor level. Work is progressing steadily toward the upper suites and rooftop, with possession scheduled soon. Prospective buyers and tenants are welcome to schedule guided on-site inspections.',
  },
  {
    id: '8',
    question: 'What is the RERA status?',
    answer: "You can check the project's RERA registration information using ReraTracker. For official confirmation of registration status, please verify the project's registration details on the Uttar Pradesh RERA portal.",
  },
]

interface FAQSectionProps {
  faqs?: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [items, setItems] = useState<FAQ[]>(() => {
    const initial = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS
    return initial.map(normalizeFaqRecord)
  })

  useEffect(() => {
    if (faqs && faqs.length > 0) {
      setItems(faqs.map(normalizeFaqRecord))
    } else {
      const stored = getStoredFAQs()
      if (stored && stored.length > 0) setItems(stored.map(normalizeFaqRecord))
    }

    return subscribeToDataChanges(() => {
      const updated = getStoredFAQs()
      if (updated && updated.length > 0) setItems(updated.map(normalizeFaqRecord))
    })
  }, [faqs])

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
                <div className="px-5 pb-4 text-white/55 text-sm leading-relaxed space-y-3">
                  <p>{faq.answer}</p>
                  {(faq.question.toLowerCase().includes('rera') || faq.answer.includes('ReraTracker')) && (
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-3">
                      <a
                        href="https://reratracker.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#c9a84c] hover:text-[#e4c870] transition-colors bg-[#c9a84c]/10 border border-[#c9a84c]/20 hover:border-[#c9a84c]/40 px-3 py-1.5 rounded"
                      >
                        <span>Check RERA Details on ReraTracker</span>
                        <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                      </a>
                      <a
                        href="https://up-rera.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors"
                      >
                        <span>Uttar Pradesh RERA Portal</span>
                        <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
