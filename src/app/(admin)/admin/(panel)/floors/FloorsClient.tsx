'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, ChevronRight, ChevronLeft, Save } from 'lucide-react'
import {
  getStoredFloors,
  saveFloor,
  deleteFloor,
  syncStoredFloors,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import { saveFloorAction, deleteFloorAction } from '@/lib/actions/admin'
import type { Floor, OfferingType } from '@/lib/data/types'

const TYPE_COLORS: Record<string, string> = {
  RETAIL: 'bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30',
  ENTERTAINMENT: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  OFFICE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  STUDIO_APARTMENT: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  HOTEL: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  DINING: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  OTHER: 'bg-white/10 text-white/50 border-white/20',
}

const TYPE_LABELS: Record<string, string> = {
  RETAIL: 'Retail',
  ENTERTAINMENT: 'Entertainment',
  OFFICE: 'Office',
  STUDIO_APARTMENT: 'Studio/Service Apt',
  HOTEL: 'Hotel',
  DINING: 'Dining',
  OTHER: 'Other',
}

const inputClass =
  'w-full bg-[#0a0f1e] border border-white/10 rounded px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]'
const labelClass = 'block text-sm font-medium text-white/70 mb-1'

export function FloorsListClient({ initialFloors }: { initialFloors?: Floor[] }) {
  const router = useRouter()
  const [floors, setFloors] = useState<Floor[]>(() => {
    if (initialFloors && initialFloors.length > 0) return initialFloors
    return getStoredFloors()
  })

  useEffect(() => {
    if (initialFloors && initialFloors.length > 0) {
      syncStoredFloors(initialFloors)
      setFloors(initialFloors)
    } else {
      setFloors(getStoredFloors())
    }
    return subscribeToDataChanges(() => setFloors(getStoredFloors()))
  }, [initialFloors])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="text-[#c9a84c]" size={24} />
          <h1 className="text-2xl font-semibold text-white">Floor Configuration</h1>
        </div>
        <Link
          href="/admin/floors/new"
          className="bg-[#c9a84c] text-black px-4 py-2 rounded font-medium text-sm hover:bg-[#e4c870] transition-colors"
        >
          + Add Floor
        </Link>
      </div>

      {floors.length === 0 ? (
        <div className="text-center py-20 border border-white/10 rounded-lg bg-white/[0.02]">
          <Building2 size={40} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">
            No floors configured. Add floors to enable the building explorer.
          </p>
          <Link
            href="/admin/floors/new"
            className="inline-block mt-4 text-[#c9a84c] text-sm hover:underline"
          >
            Add your first floor →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-white/50 font-medium">Floor #</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Label</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Type</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Description</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Status</th>
                <th className="text-right px-4 py-3 text-white/50 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {floors.map((floor) => (
                <tr
                  key={floor.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-medium text-[#c9a84c]">
                    {floor.floorNumber === 0 ? 'GF' : `${floor.floorNumber}F`}
                  </td>
                  <td className="px-4 py-3 text-white font-medium">
                    {floor.floorLabel}
                    {floor.shortLabel && (
                      <span className="ml-2 text-xs text-white/40">({floor.shortLabel})</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {floor.offeringType ? (
                      <span
                        className={`text-xs px-2 py-0.5 rounded border font-medium ${
                          TYPE_COLORS[floor.offeringType] || TYPE_COLORS.OTHER
                        }`}
                      >
                        {TYPE_LABELS[floor.offeringType] || floor.offeringType}
                      </span>
                    ) : (
                      <span className="text-white/30 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/60 max-w-xs truncate text-xs">
                    {floor.description || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        floor.status === 'PUBLISHED'
                          ? 'bg-green-500/20 text-green-400'
                          : floor.status === 'ARCHIVED'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {floor.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/floors/${floor.id}`}
                      className="text-[#c9a84c] hover:underline text-xs inline-flex items-center gap-1"
                    >
                      Edit <ChevronRight size={12} />
                    </Link>
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

// ─── Floor Form (Create / Edit) ──────────────────────────────

interface FloorFormProps {
  id?: string
  initialFloor?: Floor | null
}

export function FloorFormClient({ id, initialFloor }: FloorFormProps) {
  const router = useRouter()
  const isNew = !id

  const [form, setForm] = useState<{
    floorNumber: number
    floorLabel: string
    shortLabel: string
    offeringType: string
    description: string
    imageUrl: string
    highlights: string
    sortOrder: number
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  }>(() => {
    if (initialFloor) {
      return {
        floorNumber: initialFloor.floorNumber,
        floorLabel: initialFloor.floorLabel,
        shortLabel: initialFloor.shortLabel ?? '',
        offeringType: initialFloor.offeringType ?? 'OTHER',
        description: initialFloor.description ?? '',
        imageUrl: initialFloor.imageUrls?.[0] ?? '',
        highlights: initialFloor.highlights?.join('\n') ?? '',
        sortOrder: initialFloor.sortOrder,
        status: initialFloor.status,
      }
    }
    return {
      floorNumber: 0,
      floorLabel: '',
      shortLabel: '',
      offeringType: 'RETAIL',
      description: '',
      imageUrl: '',
      highlights: '',
      sortOrder: 0,
      status: 'PUBLISHED',
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      if (initialFloor) {
        setForm({
          floorNumber: initialFloor.floorNumber,
          floorLabel: initialFloor.floorLabel,
          shortLabel: initialFloor.shortLabel ?? '',
          offeringType: initialFloor.offeringType ?? 'OTHER',
          description: initialFloor.description ?? '',
          imageUrl: initialFloor.imageUrls?.[0] ?? '',
          highlights: initialFloor.highlights?.join('\n') ?? '',
          sortOrder: initialFloor.sortOrder,
          status: initialFloor.status,
        })
      } else {
        const found = getStoredFloors().find((f) => f.id === id)
        if (found) {
          setForm({
            floorNumber: found.floorNumber,
            floorLabel: found.floorLabel,
            shortLabel: found.shortLabel ?? '',
            offeringType: found.offeringType ?? 'OTHER',
            description: found.description ?? '',
            imageUrl: found.imageUrls?.[0] ?? '',
            highlights: found.highlights?.join('\n') ?? '',
            sortOrder: found.sortOrder,
            status: found.status,
          })
        } else {
          setError('Floor not found.')
        }
      }
    }
  }, [id, initialFloor])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'floorNumber' || name === 'sortOrder'
          ? parseInt(value) || 0
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.floorLabel.trim()) {
      setError('Floor label is required.')
      return
    }
    setLoading(true)

    const floorData: Floor = {
      id: id || `floor-${Date.now()}`,
      projectId: 'proj-rock-one-square',
      floorNumber: form.floorNumber,
      floorLabel: form.floorLabel.trim(),
      shortLabel: form.shortLabel.trim() || null,
      offeringType: (form.offeringType as OfferingType) || null,
      description: form.description.trim() || null,
      highlights: form.highlights
        ? form.highlights.split('\n').map((h) => h.trim()).filter(Boolean)
        : [],
      imageUrls: form.imageUrl ? [form.imageUrl.trim()] : [],
      sortOrder: form.sortOrder,
      status: form.status,
    }

    saveFloor(floorData)

    await saveFloorAction({
      id,
      floorNumber: floorData.floorNumber,
      floorLabel: floorData.floorLabel,
      shortLabel: floorData.shortLabel,
      offeringType: floorData.offeringType,
      description: floorData.description,
      imageUrls: floorData.imageUrls,
      highlights: floorData.highlights,
      sortOrder: floorData.sortOrder,
      status: floorData.status,
    })

    router.push('/admin/floors')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!id || !confirm('Permanently delete this floor?')) return
    setLoading(true)
    deleteFloor(id)
    await deleteFloorAction(id)
    router.push('/admin/floors')
    router.refresh()
  }

  if (error && id) {
    return (
      <div className="p-6 border border-red-500/20 rounded-sm text-red-400 text-sm">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/floors"
          className="text-white/60 hover:text-white flex items-center gap-1 text-sm"
        >
          <ChevronLeft size={16} /> Back to Floors
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-white mb-6">
        {isNew ? 'Add Floor' : 'Edit Floor'}
      </h1>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="floorNumber" className={labelClass}>
            Floor Number (0 = Ground, 1 = First, etc.)
          </label>
          <input
            id="floorNumber"
            name="floorNumber"
            type="number"
            value={form.floorNumber}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="floorLabel" className={labelClass}>
            Floor Label (e.g. Ground Floor) *
          </label>
          <input
            id="floorLabel"
            name="floorLabel"
            type="text"
            required
            placeholder="Ground Floor"
            value={form.floorLabel}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shortLabel" className={labelClass}>
            Short Label (e.g. GF, 1F)
          </label>
          <input
            id="shortLabel"
            name="shortLabel"
            type="text"
            placeholder="GF"
            value={form.shortLabel}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="offeringType" className={labelClass}>
            Commercial Offering Type
          </label>
          <select
            id="offeringType"
            name="offeringType"
            value={form.offeringType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="RETAIL">Retail</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="OFFICE">Office</option>
            <option value="STUDIO_APARTMENT">Studio / Service Apartment</option>
            <option value="HOTEL">Hotel</option>
            <option value="DINING">Dining</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Describe this floor's purpose and key features…"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className={labelClass}>
            Floor Visual Image Path or URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            placeholder="/images/retail-1.jpg or https://…"
            value={form.imageUrl}
            onChange={handleChange}
            className={inputClass}
          />
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="text-white/40 self-center">Project Assets:</span>
            {[
              { label: 'Retail Flagship', path: '/images/retail-1.jpg' },
              { label: 'Fine Dining & Skydeck', path: '/images/fine-dining-1.jpg' },
              { label: 'Entertainment & Dining', path: '/images/lord-of-the-drinks.jpg' },
              { label: 'Gaming Zone', path: '/images/gaming-zone-bumper-cars.png' },
              { label: 'Executive Office', path: '/images/office-1.jpg' },
              { label: 'Commercial Office', path: '/images/office-2.jpg' },
              { label: 'Studio Suite 1', path: '/images/studio-apartment-1.jpg' },
              { label: 'Studio Suite 2', path: '/images/studio-apartment-2.jpg' },
              { label: 'Studio Suite 3', path: '/images/studio-apartment-3.jpg' },
              { label: 'Studio Suite 4', path: '/images/studio-apartment-4.jpg' },
              { label: 'Building Front', path: '/images/building-front.jpg' },
              { label: 'Building Aerial', path: '/images/building-aerial.jpg' },
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
            <div className="mt-3 relative w-full h-28 rounded border border-white/10 overflow-hidden bg-black/40">
              <img src={form.imageUrl} alt="Floor Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="highlights" className={labelClass}>
            Floor Highlights (one per line)
          </label>
          <textarea
            id="highlights"
            name="highlights"
            rows={3}
            placeholder="30-metre arterial road frontage&#10;Double-height retail facades&#10;Direct plaza access"
            value={form.highlights}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sortOrder" className={labelClass}>
              Sort Order
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#c9a84c] text-black px-6 py-2 rounded font-medium hover:bg-[#e4c870] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isNew ? 'Add Floor' : 'Save Changes'}
          </button>
          <Link
            href="/admin/floors"
            className="px-6 py-2 rounded border border-white/20 text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && (
        <div className="mt-10 pt-6 border-t border-red-900/30">
          <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
          <p className="text-white/50 text-sm mb-3">
            Permanently delete this floor. This cannot be undone.
          </p>
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-900/40 text-red-400 border border-red-900/50 px-4 py-2 rounded hover:bg-red-900/60 text-sm disabled:opacity-50"
          >
            Delete Floor
          </button>
        </div>
      )}
    </div>
  )
}
