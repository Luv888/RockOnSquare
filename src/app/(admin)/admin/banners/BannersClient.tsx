'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Eye, EyeOff, Trash2, ChevronLeft, Save } from 'lucide-react'
import {
  getStoredBanners,
  saveBanner,
  deleteBanner,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import { INITIAL_BANNERS } from '@/lib/data/initial-data'
import type { Banner } from '@/lib/data/types'

// ─── Banners List Page ────────────────────────────────────────

function BannerThumbnail({ url }: { url?: string | null }) {
  const [error, setError] = useState(false)
  if (error || !url) {
    return (
      <div className="w-16 h-10 bg-white/5 rounded-sm flex-shrink-0 flex items-center justify-center">
        <span className="text-white/20 text-xs">No img</span>
      </div>
    )
  }
  return (
    <img
      src={url}
      alt=""
      onError={() => setError(true)}
      className="w-16 h-10 object-cover rounded-sm bg-white/5 flex-shrink-0"
    />
  )
}

export function BannersListClient() {
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    setBanners(getStoredBanners())
    return subscribeToDataChanges(() => setBanners(getStoredBanners()))
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this banner?')) return
    deleteBanner(id)
    setBanners(getStoredBanners())
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">Banners</h1>
          <p className="text-white/40 text-sm mt-0.5">Manage hero carousel banners</p>
        </div>
        <Link
          href="/admin/banners/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </Link>
      </div>

      {banners.length === 0 ? (
        <div className="p-10 text-center border border-white/5 rounded-sm bg-white/2">
          <p className="text-white/30 text-sm mb-4">No banners yet. Add your first hero banner.</p>
          <Link href="/admin/banners/new" className="text-[#c9a84c] text-sm hover:underline">Create Banner →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4 border border-white/5 rounded-sm bg-white/2 hover:border-white/10 transition-colors">
              <BannerThumbnail url={b.imageUrl} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{b.title}</p>
                {b.subtitle && <p className="text-white/40 text-xs truncate">{b.subtitle}</p>}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-sm ${b.status === 'PUBLISHED' ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
                  {b.status === 'PUBLISHED' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {b.status}
                </span>
                <span className="text-white/30 text-xs">Order: {b.sortOrder}</span>
                <Link href={`/admin/banners/${b.id}`} className="text-[#c9a84c] text-xs hover:underline">Edit</Link>
                <button onClick={() => handleDelete(b.id)} className="text-red-400/50 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Banner Form (Create / Edit) ──────────────────────────────

interface BannerFormProps {
  id?: string
}

const inputClass =
  'w-full bg-[#0a0f1e] border border-white/10 rounded px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]'
const labelClass = 'block text-sm font-medium text-white/70 mb-1'

export function BannerFormClient({ id }: BannerFormProps) {
  const router = useRouter()
  const isNew = !id

  const [form, setForm] = useState<Partial<Banner>>({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    ctaLabel: '',
    ctaUrl: '',
    secondaryCtaLabel: '',
    secondaryCtaUrl: '',
    badge: '',
    sortOrder: 0,
    status: 'DRAFT',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      const banners = getStoredBanners()
      const found = banners.find((b) => b.id === id)
      if (found) setForm(found)
      else setError('Banner not found.')
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sortOrder' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title?.trim()) { setError('Title is required.'); return }
    setLoading(true)
    const banner: Banner = {
      ...INITIAL_BANNERS[0],
      ...form,
      id: id || `banner-${Date.now()}`,
      title: form.title!,
      sortOrder: form.sortOrder ?? 0,
      status: form.status as Banner['status'] ?? 'DRAFT',
    }
    saveBanner(banner)
    router.push('/admin/banners')
  }

  const handleDelete = () => {
    if (!id || !confirm('Permanently delete this banner?')) return
    deleteBanner(id)
    router.push('/admin/banners')
  }

  if (error && id) return (
    <div className="p-6 border border-red-500/20 rounded-sm text-red-400 text-sm">{error}</div>
  )

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/banners" className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
          <ChevronLeft size={16} /> Back to Banners
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-white mb-6">{isNew ? 'New Banner' : 'Edit Banner'}</h1>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Banner Title *</label>
          <input name="title" value={form.title ?? ''} onChange={handleChange} required placeholder="e.g. Welcome to Rock One Square" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Subtitle</label>
          <input name="subtitle" value={form.subtitle ?? ''} onChange={handleChange} placeholder="e.g. Premium Commercial Development" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" value={form.description ?? ''} onChange={handleChange} rows={3} className={inputClass} placeholder="Short description…" />
        </div>
        <div>
          <label className={labelClass}>Badge Text (e.g. New Launch)</label>
          <input name="badge" value={form.badge ?? ''} onChange={handleChange} placeholder="New Launch" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Image URL or Project Asset Path</label>
          <input
            name="imageUrl"
            value={form.imageUrl ?? ''}
            onChange={handleChange}
            type="text"
            placeholder="/images/building-front.jpg or https://…"
            className={inputClass}
          />
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="text-white/40 self-center">Quick Select:</span>
            {[
              { label: 'Building Elevation', path: '/images/building-front.jpg' },
              { label: 'Lord of the Drinks', path: '/images/lord-of-the-drinks.jpg' },
              { label: 'Gaming Zone', path: '/images/gaming-zone-hero.jpg' },
              { label: 'Retail', path: '/images/retail-1.jpg' },
              { label: 'Modern Offices', path: '/images/office-1.jpg' },
              { label: 'Studio Apartment', path: '/images/studio-apartment-1.jpg' },
            ].map((img) => (
              <button
                key={img.path}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, imageUrl: img.path }))}
                className="px-2 py-1 rounded bg-white/5 hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] border border-white/10 text-white/60 transition-colors"
              >
                {img.label}
              </button>
            ))}
          </div>
          {form.imageUrl && (
            <div className="mt-3 relative w-full h-32 rounded border border-white/10 overflow-hidden bg-black/40">
              <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Primary CTA Label</label>
            <input name="ctaLabel" value={form.ctaLabel ?? ''} onChange={handleChange} placeholder="Explore Now" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Primary CTA URL</label>
            <input name="ctaUrl" value={form.ctaUrl ?? ''} onChange={handleChange} placeholder="#contact" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Secondary CTA Label</label>
            <input name="secondaryCtaLabel" value={form.secondaryCtaLabel ?? ''} onChange={handleChange} placeholder="Learn More" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Secondary CTA URL</label>
            <input name="secondaryCtaUrl" value={form.secondaryCtaUrl ?? ''} onChange={handleChange} placeholder="/about" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Sort Order (0 = first)</label>
            <input name="sortOrder" type="number" value={form.sortOrder ?? 0} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={form.status ?? 'DRAFT'} onChange={handleChange} className={inputClass}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#c9a84c] text-black px-6 py-2 rounded font-medium hover:bg-[#e4c870] transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />
            {isNew ? 'Create Banner' : 'Save Changes'}
          </button>
          <Link href="/admin/banners" className="px-6 py-2 rounded border border-white/20 text-white hover:bg-white/5 transition-colors">Cancel</Link>
        </div>
      </form>

      {!isNew && (
        <div className="mt-10 pt-6 border-t border-red-900/30">
          <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
          <p className="text-white/50 text-sm mb-3">Permanently delete this banner. This cannot be undone.</p>
          <button onClick={handleDelete} className="bg-red-900/40 text-red-400 border border-red-900/50 px-4 py-2 rounded hover:bg-red-900/60 text-sm">
            Delete Banner
          </button>
        </div>
      )}
    </div>
  )
}
