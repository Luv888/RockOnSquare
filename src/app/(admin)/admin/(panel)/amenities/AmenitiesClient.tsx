'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ChevronLeft, Save } from 'lucide-react'
import {
  getStoredAmenities,
  saveAmenity,
  deleteAmenity,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import type { Amenity } from '@/lib/data/types'

const inputClass =
  'w-full bg-[#0a0f1e] border border-white/10 rounded px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]'
const labelClass = 'block text-sm font-medium text-white/70 mb-1'

// ─── Amenities List ───────────────────────────────────────────

export function AmenitiesListClient() {
  const [amenities, setAmenities] = useState<Amenity[]>([])

  useEffect(() => {
    setAmenities(getStoredAmenities())
    return subscribeToDataChanges(() => setAmenities(getStoredAmenities()))
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this amenity?')) return
    deleteAmenity(id)
    setAmenities(getStoredAmenities())
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">Amenities</h1>
          <p className="text-white/40 text-sm mt-0.5">Manage building amenities displayed on the website</p>
        </div>
        <Link href="/admin/amenities/new" className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors">
          <Plus className="w-4 h-4" /> Add Amenity
        </Link>
      </div>

      {amenities.length === 0 ? (
        <div className="p-10 text-center border border-white/5 rounded-sm bg-white/2">
          <p className="text-white/30 text-sm mb-4">No amenities. Add amenities to display on the public website.</p>
          <Link href="/admin/amenities/new" className="text-[#c9a84c] text-sm hover:underline">Add First Amenity →</Link>
        </div>
      ) : (
        <div className="border border-white/5 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {['Name', 'Icon', 'Sort Order', 'Published', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-white/30 text-xs font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {amenities.map((a) => (
                <tr key={a.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white">{a.name}</p>
                    {a.description && <p className="text-white/35 text-xs mt-0.5 truncate max-w-xs">{a.description}</p>}
                  </td>
                  <td className="px-4 py-3 text-white/50 text-xs font-mono">{a.iconName || '—'}</td>
                  <td className="px-4 py-3 text-white/50">{a.sortOrder}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm text-xs ${a.isPublished ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
                      {a.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Link href={`/admin/amenities/${a.id}`} className="text-[#c9a84c] text-xs hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(a.id)} className="text-red-400/50 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Amenity Form (Create / Edit) ─────────────────────────────

interface AmenityFormProps {
  id?: string
}

export function AmenityFormClient({ id }: AmenityFormProps) {
  const router = useRouter()
  const isNew = !id

  const [form, setForm] = useState<Partial<Amenity>>({
    name: '',
    description: '',
    iconName: '',
    imageUrl: '',
    sortOrder: 0,
    isPublished: true,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      const found = getStoredAmenities().find((a) => a.id === id)
      if (found) setForm({ ...found, imageUrl: found.imageUrl ?? '' })
      else setError('Amenity not found.')
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sortOrder' ? Number(value) : name === 'isPublished' ? value === 'true' : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name?.trim()) { setError('Name is required.'); return }
    const amenity: Amenity = {
      id: id || `amenity-${Date.now()}`,
      name: form.name!,
      description: form.description ?? null,
      iconName: form.iconName ?? null,
      imageUrl: form.imageUrl || null,
      sortOrder: form.sortOrder ?? 0,
      isPublished: form.isPublished ?? true,
    }
    saveAmenity(amenity)
    router.push('/admin/amenities')
  }

  const handleDelete = () => {
    if (!id || !confirm('Permanently delete this amenity?')) return
    deleteAmenity(id)
    router.push('/admin/amenities')
  }

  if (error && id) return <div className="p-6 border border-red-500/20 rounded-sm text-red-400 text-sm">{error}</div>

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/admin/amenities" className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Amenities
        </Link>
        <h1 className="text-2xl font-semibold text-white">{isNew ? 'New Amenity' : 'Edit Amenity'}</h1>
      </div>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 rounded-lg border border-white/10 p-6">
        <div>
          <label className={labelClass}>Amenity Name *</label>
          <input name="name" value={form.name ?? ''} onChange={handleChange} required placeholder="e.g. Swimming Pool" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" value={form.description ?? ''} onChange={handleChange} rows={3} className={inputClass} placeholder="Brief description" />
        </div>
        <div>
          <label className={labelClass}>Lucide Icon Name</label>
          <input name="iconName" value={form.iconName ?? ''} onChange={handleChange} placeholder="e.g. Zap, Car, Shield" className={inputClass} />
          <p className="text-xs text-white/40 mt-1">Examples: Zap, Shield, Car, Wind, Camera, Gem, Package</p>
        </div>
        <div>
          <label className={labelClass}>Amenity Image Path or URL</label>
          <input name="imageUrl" value={form.imageUrl ?? ''} onChange={handleChange} type="text" placeholder="/images/retail-1.jpg or https://…" className={inputClass} />
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="text-white/40 self-center">Project Assets:</span>
            {[
              { label: 'Retail Finishes', path: '/images/retail-1.jpg' },
              { label: 'HVAC Office', path: '/images/office-1.jpg' },
              { label: 'Building Elevation', path: '/images/building-front.jpg' },
              { label: 'Aerial View', path: '/images/building-aerial.jpg' },
              { label: 'Fine Dining', path: '/images/fine-dining-1.jpg' },
            ].map((img) => (
              <button
                key={img.path}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, imageUrl: img.path }))}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#c9a84c]/20 hover:text-[#c9a84c] border border-white/10 text-white/60 transition-colors"
              >
                {img.label}
              </button>
            ))}
          </div>
          {form.imageUrl && (
            <div className="mt-2 relative w-full h-24 rounded border border-white/10 overflow-hidden bg-black/40">
              <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <div>
          <label className={labelClass}>Sort Order</label>
          <input name="sortOrder" type="number" value={form.sortOrder ?? 0} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select name="isPublished" value={form.isPublished ? 'true' : 'false'} onChange={handleChange} className={inputClass}>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="flex items-center gap-2 bg-[#c9a84c] text-black px-6 py-2 rounded font-medium hover:bg-[#e4c870] transition-colors">
            <Save className="w-4 h-4" />{isNew ? 'Create Amenity' : 'Save Changes'}
          </button>
          <Link href="/admin/amenities" className="px-6 py-2 rounded border border-white/20 text-white hover:bg-white/5 transition-colors">Cancel</Link>
        </div>
      </form>

      {!isNew && (
        <div className="mt-8 rounded-lg border border-red-500/30 p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-white/50 text-sm mb-4">Permanently delete this amenity.</p>
          <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700 transition-colors">Delete Amenity</button>
        </div>
      )}
    </div>
  )
}
