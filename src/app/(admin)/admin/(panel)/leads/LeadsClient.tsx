'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { MessageCircle, Phone, ChevronLeft } from 'lucide-react'
import {
  getStoredLeads,
  updateLeadStatus,
  syncStoredLeads,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import { updateLeadStatusAction } from '@/lib/actions/admin'
import type { Enquiry } from '@/lib/data/types'

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  CONTACTED: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
  FOLLOW_UP: 'bg-orange-500/20 text-orange-400 border-orange-500/20',
  SITE_VISIT_SCHEDULED: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
  INTERESTED: 'bg-green-500/20 text-green-400 border-green-500/20',
  CONVERTED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
  CLOSED: 'bg-white/10 text-white/40 border-white/10',
  NOT_INTERESTED: 'bg-red-500/20 text-red-400 border-red-500/20',
}

const TYPE_LABELS: Record<string, string> = {
  GENERAL: 'General',
  SITE_VISIT: 'Site Visit',
  CALLBACK: 'Callback',
  BROCHURE: 'Brochure',
  RETAIL: 'Retail',
  OFFICE: 'Office',
  STUDIO: 'Studio',
  OTHER: 'Other',
}

const STATUS_OPTIONS = [
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'FOLLOW_UP', label: 'Follow Up' },
  { value: 'SITE_VISIT_SCHEDULED', label: 'Site Visit Scheduled' },
  { value: 'INTERESTED', label: 'Interested' },
  { value: 'CONVERTED', label: 'Converted' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'NOT_INTERESTED', label: 'Not Interested' },
]

const STATUSES = [
  '',
  'NEW',
  'CONTACTED',
  'FOLLOW_UP',
  'SITE_VISIT_SCHEDULED',
  'INTERESTED',
  'CONVERTED',
  'CLOSED',
  'NOT_INTERESTED',
]

// ─── Leads List Client ──────────────────────────────────────────

export function LeadsListClient({ initialLeads }: { initialLeads?: Enquiry[] }) {
  const searchParams = useSearchParams()
  const statusParam = searchParams.get('status') || ''
  const pageParam = parseInt(searchParams.get('page') || '1') || 1

  const [allLeads, setAllLeads] = useState<Enquiry[]>(() => {
    if (initialLeads && initialLeads.length > 0) return initialLeads
    return getStoredLeads()
  })

  useEffect(() => {
    if (initialLeads && initialLeads.length > 0) {
      syncStoredLeads(initialLeads)
      setAllLeads(initialLeads)
    } else {
      setAllLeads(getStoredLeads())
    }
    return subscribeToDataChanges(() => setAllLeads(getStoredLeads()))
  }, [initialLeads])

  const filtered = statusParam
    ? allLeads.filter((e) => e.status === statusParam)
    : allLeads

  const perPage = 20
  const total = filtered.length
  const totalPages = Math.ceil(total / perPage) || 1
  const currentPage = Math.min(Math.max(1, pageParam), totalPages)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">Leads</h1>
          <p className="text-white/40 text-sm mt-0.5">{allLeads.length} total enquiries</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => (
          <Link
            key={s || 'all'}
            href={s ? `/admin/leads?status=${s}` : '/admin/leads'}
            className={`px-3 py-1.5 text-xs rounded-sm border transition-colors ${
              statusParam === s
                ? 'border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.1)] text-[#c9a84c]'
                : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'
            }`}
          >
            {s ? s.replace(/_/g, ' ') : 'All'}
          </Link>
        ))}
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="p-10 text-center border border-white/5 rounded-sm">
          <p className="text-white/30">
            No enquiries found{statusParam ? ` with status "${statusParam}"` : ''}.
          </p>
        </div>
      ) : (
        <div className="border border-white/5 rounded-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {['Reference', 'Name', 'Phone', 'Email', 'Type', 'Status', 'Date', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-white/30 text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {paginated.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="px-4 py-3 text-[#c9a84c] font-mono text-xs whitespace-nowrap">
                    <Link href={`/admin/leads/${e.id}`} className="hover:underline">
                      {e.referenceId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-white whitespace-nowrap">
                    <Link href={`/admin/leads/${e.id}`} className="hover:text-[#c9a84c]">
                      {e.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a
                      href={`tel:${e.phone}`}
                      className="text-white/70 hover:text-[#c9a84c] transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {e.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-white/50 text-xs">{e.email || '—'}</td>
                  <td className="px-4 py-3 text-white/60 text-xs whitespace-nowrap">
                    {TYPE_LABELS[e.enquiryType] || e.enquiryType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block border text-xs font-medium px-2 py-0.5 rounded ${
                        STATUS_COLORS[e.status] ?? 'bg-white/10 text-white/40'
                      }`}
                    >
                      {e.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">
                    {new Intl.DateTimeFormat('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(e.createdAt))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/leads/${e.id}`}
                        className="text-[#c9a84c] text-xs hover:underline"
                      >
                        View
                      </Link>
                      {waNumber && (
                        <a
                          href={`https://wa.me/${e.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hello ${e.fullName}, thank you for your enquiry regarding Rock One Square (Ref: ${e.referenceId}). How can we assist you today?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors p-1"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/leads?page=${p}${statusParam ? `&status=${statusParam}` : ''}`}
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                p === currentPage
                  ? 'border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10'
                  : 'border-white/10 text-white/40 hover:text-white'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Lead Detail Client ─────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="py-3 border-b border-white/5 last:border-0">
      <dt className="text-xs font-medium text-white/40 uppercase tracking-wider mb-0.5">
        {label}
      </dt>
      <dd className="text-white text-sm">{value ?? <span className="text-white/30 italic">—</span>}</dd>
    </div>
  )
}

export function LeadDetailClient({ id, initialLead }: { id: string; initialLead?: Enquiry | null }) {
  const router = useRouter()
  const [enquiry, setEnquiry] = useState<Enquiry | null>(() => {
    if (initialLead) return initialLead
    return null
  })
  const [status, setStatus] = useState(() => initialLead?.status || '')
  const [noteText, setNoteText] = useState('')
  const [savedMsg, setSavedMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialLead) {
      setEnquiry(initialLead)
      setStatus(initialLead.status)
    } else {
      const found = getStoredLeads().find((l) => l.id === id)
      if (found) {
        setEnquiry(found)
        setStatus(found.status)
      }
    }
  }, [id, initialLead])

  if (!enquiry) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Leads
        </Link>
        <div className="p-6 border border-white/10 rounded text-white/50">Lead not found.</div>
      </div>
    )
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    updateLeadStatus(id, status, noteText)
    await updateLeadStatusAction(id, status, noteText)
    const updated = getStoredLeads().find((l) => l.id === id)
    if (updated) {
      setEnquiry({ ...updated })
    }
    setNoteText('')
    setSavedMsg('Status updated successfully!')
    setLoading(false)
    router.refresh()
    setTimeout(() => setSavedMsg(''), 3000)
  }

  const statusStyle = STATUS_COLORS[enquiry.status] ?? 'bg-white/10 text-white/40'

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Leads
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1
              className="text-2xl font-semibold text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {enquiry.fullName}
            </h1>
            <p className="text-white/40 text-sm mt-1">{enquiry.phone}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30 text-xs font-mono px-3 py-1 rounded">
              {enquiry.referenceId}
            </span>
            <span className={`inline-block border text-xs font-medium px-3 py-1 rounded ${statusStyle}`}>
              {enquiry.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      </div>

      {savedMsg && (
        <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded">
          {savedMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Lead Details */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Lead Details
            </h2>
            <dl>
              <DetailRow label="Full Name" value={enquiry.fullName} />
              <DetailRow label="Phone" value={enquiry.phone} />
              <DetailRow label="Email" value={enquiry.email} />
              <DetailRow label="Enquiry Type" value={enquiry.enquiryType} />
              <DetailRow label="Offering Interest" value={enquiry.offeringType} />
              <DetailRow
                label="Status"
                value={
                  <span
                    className={`inline-block border text-xs font-medium px-2 py-0.5 rounded ${statusStyle}`}
                  >
                    {enquiry.status.replace(/_/g, ' ')}
                  </span>
                }
              />
              <DetailRow
                label="Created At"
                value={new Intl.DateTimeFormat('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(enquiry.createdAt))}
              />
              <DetailRow label="Source" value={enquiry.source} />
            </dl>
          </section>

          {enquiry.message && (
            <section className="bg-white/5 rounded-lg border border-white/10 p-6">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                Message
              </h2>
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                {enquiry.message}
              </p>
            </section>
          )}

          {(enquiry.preferredDate || enquiry.preferredTime) && (
            <section className="bg-white/5 rounded-lg border border-white/10 p-6">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                Preferred Date / Time
              </h2>
              <dl>
                {enquiry.preferredDate && (
                  <DetailRow
                    label="Date"
                    value={new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(
                      new Date(enquiry.preferredDate)
                    )}
                  />
                )}
                {enquiry.preferredTime && (
                  <DetailRow label="Time" value={enquiry.preferredTime} />
                )}
              </dl>
            </section>
          )}

          {/* Notes list */}
          <section className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Notes History ({enquiry.notes?.length ?? 0})
            </h2>
            {!enquiry.notes || enquiry.notes.length === 0 ? (
              <p className="text-white/30 text-sm">No notes added yet.</p>
            ) : (
              <ul className="space-y-4">
                {enquiry.notes.map((n) => (
                  <li key={n.id} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <p className="text-white/80 text-sm whitespace-pre-wrap">{n.note}</p>
                    <p className="text-white/30 text-xs mt-1">
                      {n.userName} ·{' '}
                      {new Intl.DateTimeFormat('en-IN', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      }).format(new Date(n.createdAt))}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Right — Update Status & Add Note */}
        <div className="space-y-6">
          <section className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Update Status
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#0a0f1e] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">
                  Add Note (optional)
                </label>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. Called customer, requested callback tomorrow…"
                  className="w-full bg-[#0a0f1e] border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c9a84c] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a84c] text-black font-semibold text-sm py-2 rounded hover:bg-[#e4c870] transition-colors disabled:opacity-50"
              >
                Save Update
              </button>
            </form>
          </section>

          {/* Quick Actions */}
          <section className="bg-white/5 rounded-lg border border-white/10 p-6 space-y-3">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Quick Contact
            </h2>
            <a
              href={`tel:${enquiry.phone}`}
              className="flex items-center gap-2 w-full px-3 py-2 border border-white/10 rounded text-sm text-white/70 hover:text-white hover:border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c9a84c]" />
              Call {enquiry.phone}
            </a>
            {enquiry.email && (
              <a
                href={`mailto:${enquiry.email}?subject=Regarding your enquiry for Rock One Square`}
                className="flex items-center gap-2 w-full px-3 py-2 border border-white/10 rounded text-sm text-white/70 hover:text-white hover:border-white/20 transition-colors"
              >
                Email Customer
              </a>
            )}
            <a
              href={`https://wa.me/${enquiry.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Hello ${enquiry.fullName}, thank you for your enquiry regarding Rock One Square (Ref: ${enquiry.referenceId}). How can we assist you today?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-3 py-2 border border-green-500/30 rounded text-sm text-green-400 hover:border-green-500/60 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
