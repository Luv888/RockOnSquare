import React from 'react'
import Link from 'next/link'
import { getServerAmenities, getServerBanners, getServerLeads } from '@/lib/data/server-data'
import { requireAdmin } from '@/lib/auth/guards'
import { Users, Layout, HardHat, Star, TrendingUp, Clock, AlertCircle } from 'lucide-react'

async function getDashboardStats() {
  const [banners, amenities, enquiries] = await Promise.all([
    getServerBanners(false),
    getServerAmenities(false),
    getServerLeads(),
  ])

  const totalEnquiries = enquiries.length
  const newEnquiries = enquiries.filter((e) => e.status === 'NEW').length
  const followUpsDue = enquiries.filter((e) => e.status === 'FOLLOW_UP').length
  const publishedBanners = banners.filter((b) => b.status === 'PUBLISHED').length
  const publishedAmenities = amenities.filter((a) => a.isPublished).length
  const recentEnquiries = enquiries.slice(0, 6)

  return { totalEnquiries, newEnquiries, followUpsDue, publishedBanners, publishedAmenities, recentEnquiries }
}

const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  GENERAL: 'General', SITE_VISIT: 'Site Visit', CALLBACK: 'Callback',
  BROCHURE: 'Brochure', RETAIL: 'Retail', OFFICE: 'Office', STUDIO: 'Studio', OTHER: 'Other',
}
const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500/20 text-blue-400', CONTACTED: 'bg-yellow-500/20 text-yellow-400',
  FOLLOW_UP: 'bg-orange-500/20 text-orange-400', SITE_VISIT_SCHEDULED: 'bg-purple-500/20 text-purple-400',
  INTERESTED: 'bg-green-500/20 text-green-400', CONVERTED: 'bg-emerald-500/20 text-emerald-400',
  CLOSED: 'bg-white/10 text-white/40', NOT_INTERESTED: 'bg-red-500/20 text-red-400',
}

export default async function DashboardPage() {
  await requireAdmin()
  const stats = await getDashboardStats()

  const statCards = [
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: Users, href: '/admin/leads', color: 'text-[#c9a84c]' },
    { label: 'New Leads', value: stats.newEnquiries, icon: TrendingUp, href: '/admin/leads?status=NEW', color: 'text-blue-400' },
    { label: 'Follow-ups Due', value: stats.followUpsDue, icon: Clock, href: '/admin/leads', color: 'text-orange-400' },
    { label: 'Published Banners', value: stats.publishedBanners, icon: Layout, href: '/admin/banners', color: 'text-purple-400' },
  ]

  return (
    <div>
      {/* Demo Notice */}
      <div className="mb-6 px-4 py-3 border border-[rgba(201,168,76,0.25)] rounded-sm bg-[rgba(201,168,76,0.06)] text-xs text-white/50">
        <span className="text-[#c9a84c] font-medium">Demo Mode —</span>{' '}
        Data is stored in browser localStorage. Stats refresh on page reload. Changes to banners, FAQs, amenities, and construction updates reflect on the public site after refresh.
      </div>

      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Rock One Square · Senflore Hospitality LLP</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="p-5 border border-white/5 rounded-sm bg-white/2 hover:border-[rgba(201,168,76,0.2)] transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-3xl font-light ${color}`}>{value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: 'View All Leads', href: '/admin/leads', icon: Users },
          { label: 'Manage Banners', href: '/admin/banners', icon: Layout },
          { label: 'Add Construction Update', href: '/admin/construction', icon: HardHat },
          { label: 'Manage Amenities', href: '/admin/amenities', icon: Star },
          { label: 'Edit FAQs', href: '/admin/faqs', icon: AlertCircle },
          { label: 'Site Settings', href: '/admin/settings', icon: Star },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 px-4 py-3 border border-white/5 rounded-sm text-sm text-white/60 hover:text-white hover:border-white/15 transition-colors"
          >
            <Icon className="w-4 h-4 text-[#c9a84c]" />
            {label}
          </Link>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-medium">Recent Enquiries</h2>
          <Link href="/admin/leads" className="text-[#c9a84c] text-xs hover:underline">View all →</Link>
        </div>
        {stats.recentEnquiries.length === 0 ? (
          <div className="p-8 text-center border border-white/5 rounded-sm">
            <p className="text-white/30 text-sm">No enquiries yet. They will appear here when customers submit the contact form.</p>
          </div>
        ) : (
          <div className="border border-white/5 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  {['Reference', 'Name', 'Phone', 'Type', 'Status', 'Date'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-white/30 text-xs font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentEnquiries.map((e) => (
                  <tr key={e.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-[#c9a84c] font-mono text-xs">{e.referenceId}</td>
                    <td className="px-4 py-3 text-white">{e.fullName}</td>
                    <td className="px-4 py-3 text-white/60">{e.phone}</td>
                    <td className="px-4 py-3 text-white/60">{ENQUIRY_TYPE_LABELS[e.enquiryType] || e.enquiryType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-sm text-xs ${STATUS_COLORS[e.status] || 'bg-white/10 text-white/40'}`}>
                        {e.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      {new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-3 text-white/25 text-xs italic">
          Note: Dashboard stats are based on initial demo data. Visit Leads to see localStorage-updated enquiries.
        </p>
      </div>
    </div>
  )
}
