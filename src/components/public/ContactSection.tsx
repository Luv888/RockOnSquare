'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Loader2,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import {
  buildWhatsAppUrl,
  defaultWhatsAppMessage,
  buildEnquiryWhatsAppUrl,
  OFFERING_TYPE_LABELS,
} from '@/lib/notifications/whatsapp'
import { saveLead } from '@/lib/data/local-storage'
import { SITE_CONFIG } from '@/lib/config/site'

const formSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  offeringType: z.string().optional(),
  enquiryType: z.enum([
    'GENERAL',
    'SITE_VISIT',
    'CALLBACK',
    'BROCHURE',
    'RETAIL',
    'OFFICE',
    'STUDIO',
    'OTHER',
  ]),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(500, 'Message cannot exceed 500 characters').optional(),
  consentGiven: z.boolean().refine((v) => v, 'You must agree to be contacted'),
  _hp: z.string().max(0).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null)
  const [statusNotice, setStatusNotice] = useState<string | null>(null)

  const salesPhone = process.env.NEXT_PUBLIC_SALES_PHONE || SITE_CONFIG.contact.internationalNumber
  const salesEmail = process.env.NEXT_PUBLIC_SALES_EMAIL || SITE_CONFIG.contact.email
  const generalWaUrl = buildWhatsAppUrl(defaultWhatsAppMessage())

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enquiryType: 'GENERAL',
      offeringType: '',
      consentGiven: false,
    },
  })

  const currentEnquiryType = watch('enquiryType')

  // Listen for open-enquiry-modal event from MobileActionBar
  useEffect(() => {
    const handler = () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.addEventListener('open-enquiry-modal', handler)
    return () => window.removeEventListener('open-enquiry-modal', handler)
  }, [])

  const onSubmit = async (data: FormValues) => {
    if (data._hp) return // honeypot caught a bot
    if (isSubmitting) return // prevent duplicate submissions

    setIsSubmitting(true)
    setErrorMsg('')
    setStatusNotice(null)

    // 1. Build the WhatsApp URL first
    const { url: waUrl, error: configError } = buildEnquiryWhatsAppUrl({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      offeringType: data.offeringType || null,
      enquiryType: data.enquiryType,
      preferredDate: data.preferredDate || null,
      preferredTime: data.preferredTime || null,
      message: data.message || null,
    })

    if (configError || !waUrl) {
      setErrorMsg(
        configError ||
          'WhatsApp contact number is not configured. Please contact our sales team directly.'
      )
      setIsSubmitting(false)
      // Form values are preserved
      return
    }

    // 2. Safe demo record persistence — MUST NOT block WhatsApp opening
    try {
      const referenceId = `ROS-${Date.now().toString(36).toUpperCase()}`
      saveLead({
        id: `enq-${Date.now()}`,
        referenceId,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        countryCode: '+91',
        enquiryType: data.enquiryType,
        offeringType: data.offeringType || null,
        preferredDate: data.preferredDate || null,
        preferredTime: data.preferredTime || null,
        message: data.message || null,
        source: 'WEBSITE',
        sourcePage: typeof window !== 'undefined' ? window.location.href : null,
        status: 'NEW',
        consentGiven: data.consentGiven,
        createdAt: new Date().toISOString(),
      })

      // Fire-and-forget API notification
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sourcePage: typeof window !== 'undefined' ? window.location.href : '',
        }),
      }).catch(() => {})
    } catch (err) {
      console.warn('[ContactSection] Local demo record could not be saved to localStorage:', err)
    }

    // 3. Automatically open WhatsApp
    setLastWhatsAppUrl(waUrl)

    try {
      const openedWindow = window.open(waUrl, '_blank', 'noopener,noreferrer')
      if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
        // Fallback for browsers that block popup windows
        window.location.href = waUrl
      }
    } catch {
      window.location.href = waUrl
    }

    setStatusNotice(
      'WhatsApp has been opened with your pre-filled enquiry. Please tap Send in WhatsApp to complete your message.'
    )
    setIsSubmitting(false)
  }

  const handleReset = () => {
    reset({
      fullName: '',
      phone: '',
      email: '',
      offeringType: '',
      enquiryType: 'GENERAL',
      preferredDate: '',
      preferredTime: '',
      message: '',
      consentGiven: false,
    })
    setStatusNotice(null)
    setLastWhatsAppUrl(null)
    setErrorMsg('')
  }

  return (
    <section id="contact" className="py-24 bg-[#080d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
            Contact Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Let&apos;s Start a <span className="text-[#c9a84c]">Conversation</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <div className="p-6 border border-white/5 rounded-sm bg-white/2 space-y-5">
              <h3 className="text-white font-medium text-lg mb-4">Get in Touch</h3>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Rock One Square</p>
                  <p className="text-white/50 mt-0.5">
                    Raj Nagar Extension, Ghaziabad, Uttar Pradesh — 201003
                  </p>
                </div>
              </div>

              {salesPhone ? (
                <a
                  href={`tel:${salesPhone}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-[#c9a84c] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                  {salesPhone}
                </a>
              ) : (
                <div className="flex items-center gap-3 text-sm text-white/25 italic">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  Phone — configure NEXT_PUBLIC_SALES_PHONE
                </div>
              )}

              <a
                href={`mailto:${salesEmail}`}
                className="flex items-center gap-3 text-sm text-white/70 hover:text-[#c9a84c] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                {salesEmail}
              </a>

              <div className="flex items-center gap-3 text-sm text-white/50">
                <Clock className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                Monday to Sunday, 10 AM–9 PM
              </div>

              <a
                href={generalWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 border border-[rgba(201,168,76,0.3)] rounded-sm text-[#c9a84c] text-sm hover:bg-[rgba(201,168,76,0.1)] transition-colors w-full justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us Directly
              </a>

              <div className="pt-2 border-t border-white/5">
                <p className="text-white/30 text-xs">Developer: Senflore Hospitality LLP</p>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="p-6 border border-white/5 rounded-sm bg-white/2">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h3 className="text-white font-medium text-lg mb-2">Send an Enquiry</h3>
              <p className="text-white/40 text-xs mb-5">
                Submitting opens WhatsApp with your pre-filled enquiry ready to send.
              </p>

              {/* Status Notice after submission */}
              {statusNotice && (
                <div className="mb-5 p-3.5 border border-[#c9a84c]/30 rounded-sm bg-[#c9a84c]/10 text-xs">
                  <div className="flex items-center gap-2 text-[#c9a84c] font-medium mb-1">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Opened
                  </div>
                  <p className="text-white/80 leading-relaxed">{statusNotice}</p>
                  <p className="text-white/45 text-[11px] mt-1.5 italic">
                    Note: You must explicitly press Send in WhatsApp. Opening WhatsApp does not
                    automatically transmit the enquiry.
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    {lastWhatsAppUrl && (
                      <a
                        href={lastWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c9a84c] text-black font-semibold rounded-xs hover:bg-[#e4c870] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Re-open WhatsApp
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 text-white/50 hover:text-white underline text-[11px]"
                    >
                      <RotateCcw className="w-3 h-3" /> Clear Form
                    </button>
                  </div>
                </div>
              )}

              {/* Error Notice */}
              {errorMsg && (
                <div className="mb-5 flex items-start gap-2.5 p-3 border border-red-500/30 rounded-sm bg-red-500/10">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 text-xs">{errorMsg}</p>
                    {salesPhone && (
                      <a
                        href={`tel:${salesPhone}`}
                        className="text-[#c9a84c] text-xs mt-1 block hover:underline"
                      >
                        Call us directly: {salesPhone}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Honeypot — hidden from real users */}
              <input
                {...register('_hp')}
                type="text"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-white/60 text-xs mb-1.5" htmlFor="fullName">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    {...register('fullName')}
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm placeholder-white/25 focus:outline-none focus-visible:border-[#c9a84c] focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-white/60 text-xs mb-1.5" htmlFor="phone">
                    Mobile Number * (+91)
                  </label>
                  <input
                    id="phone"
                    {...register('phone')}
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm placeholder-white/25 focus:outline-none focus-visible:border-[#c9a84c] focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-white/60 text-xs mb-1.5" htmlFor="email">
                    Email Address (optional)
                  </label>
                  <input
                    id="email"
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm placeholder-white/25 focus:outline-none focus-visible:border-[#c9a84c] focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Interested Property or Unit Type */}
                <div>
                  <label className="block text-white/60 text-xs mb-1.5" htmlFor="offeringType">
                    Interested Property or Unit Type
                  </label>
                  <select
                    id="offeringType"
                    {...register('offeringType')}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus-visible:border-[#c9a84c]"
                  >
                    <option value="" className="bg-[#0a0f1e] text-white">
                      Select Property or Unit Type (Optional)
                    </option>
                    {Object.entries(OFFERING_TYPE_LABELS).map(([val, label]) => (
                      <option key={val} value={val} className="bg-[#0a0f1e] text-white">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="block text-white/60 text-xs mb-1.5" htmlFor="enquiryType">
                    Enquiry Type *
                  </label>
                  <select
                    id="enquiryType"
                    {...register('enquiryType')}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus-visible:border-[#c9a84c]"
                  >
                    <option value="GENERAL" className="bg-[#0a0f1e] text-white">
                      General Enquiry
                    </option>
                    <option value="SITE_VISIT" className="bg-[#0a0f1e] text-white">
                      Book a Site Visit
                    </option>
                    <option value="CALLBACK" className="bg-[#0a0f1e] text-white">
                      Request a Callback
                    </option>
                    <option value="BROCHURE" className="bg-[#0a0f1e] text-white">
                      Request Brochure
                    </option>
                    <option value="RETAIL" className="bg-[#0a0f1e] text-white">
                      Retail Space Enquiry
                    </option>
                    <option value="OFFICE" className="bg-[#0a0f1e] text-white">
                      Office Space Enquiry
                    </option>
                    <option value="STUDIO" className="bg-[#0a0f1e] text-white">
                      Studio / Service Apartment Enquiry
                    </option>
                    <option value="OTHER" className="bg-[#0a0f1e] text-white">
                      Other
                    </option>
                  </select>
                </div>

                {/* Preferred Site Visit Date & Time (visible for site visit or general scheduling) */}
                {currentEnquiryType === 'SITE_VISIT' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white/[0.02] border border-white/10 rounded-sm">
                    <div>
                      <label
                        className="block text-white/60 text-xs mb-1.5"
                        htmlFor="preferredDate"
                      >
                        Preferred Visit Date
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        {...register('preferredDate')}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus-visible:border-[#c9a84c]"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-white/60 text-xs mb-1.5"
                        htmlFor="preferredTime"
                      >
                        Preferred Time Slot
                      </label>
                      <select
                        id="preferredTime"
                        {...register('preferredTime')}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus-visible:border-[#c9a84c]"
                      >
                        <option value="" className="bg-[#0a0f1e] text-white">
                          Select time slot
                        </option>
                        <option
                          value="Morning (10:00 AM – 1:00 PM)"
                          className="bg-[#0a0f1e] text-white"
                        >
                          Morning (10:00 AM – 1:00 PM)
                        </option>
                        <option
                          value="Afternoon (1:00 PM – 4:00 PM)"
                          className="bg-[#0a0f1e] text-white"
                        >
                          Afternoon (1:00 PM – 4:00 PM)
                        </option>
                        <option
                          value="Evening (4:00 PM – 7:00 PM)"
                          className="bg-[#0a0f1e] text-white"
                        >
                          Evening (4:00 PM – 7:00 PM)
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-white/60 text-xs mb-1.5" htmlFor="message">
                    Message / Requirements (optional)
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={3}
                    placeholder="Tell us about your requirements or questions..."
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm placeholder-white/25 focus:outline-none focus-visible:border-[#c9a84c] focus-visible:ring-1 focus-visible:ring-[#c9a84c] resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    id="consent"
                    {...register('consentGiven')}
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 accent-[#c9a84c]"
                  />
                  <label
                    htmlFor="consent"
                    className="text-white/50 text-xs leading-relaxed cursor-pointer"
                  >
                    I agree to be contacted by the Rock One Square team regarding my enquiry. *
                  </label>
                </div>
                {errors.consentGiven && (
                  <p className="text-red-400 text-xs">{errors.consentGiven.message}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#c9a84c] text-[#0a0f1e] font-semibold text-sm rounded-sm hover:bg-[#e4c870] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Opening WhatsApp…
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      Submit & Open WhatsApp
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-white/25 text-xs">
                Your information is used only to process your enquiry. You will be redirected to
                WhatsApp where you can review your message before pressing Send.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
