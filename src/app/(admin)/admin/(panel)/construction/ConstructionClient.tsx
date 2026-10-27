'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ChevronLeft, Save, Star } from 'lucide-react'
import {
  getStoredConstructionUpdates,
  saveConstructionUpdate,
  deleteConstructionUpdate,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import type { ConstructionUpdate } from '@/lib/data/types'

const inputClass =
  'w-full bg-[#0a0f1e] border border-white/10 rounded px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]'
const labelClass = 'block text-sm font-medium text-white/70 mb-1'

// ─── Construction List ────────────────────────────────────────

export function ConstructionListClient() {
  const [updates, setUpdates] = useState<ConstructionUpdate[]>([])

  useEffect(() => {
    setUpdates(getStoredConstructionUpdates())
    return subscribeToDataChanges(() => setUpdates(getStoredConstructionUpdates()))
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this construction update?')) return
    deleteConstructionUpdate(id)
    setUpdates(getStoredConstructionUpdates())
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">Construction Progress</h1>
          <p className="text-white/40 text-sm mt-0.5">Manage construction updates and milestones</p>
        </div>
        <Link href="/admin/construction/new" className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors">
          <Plus className="w-4 h-4" /> Add Update
        </Link>
      </div>

      {updates.length === 0 ? (
        <div className="p-10 text-center border border-white/5 rounded-sm bg-white/2">
          <p className="text-white/30 text-sm mb-4">No construction updates yet.</p>
          <Link href="/admin/construction/new" className="text-[#c9a84c] text-sm hover:underline">Add First Update →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {updates.map((u) => (
            <div key={u.id} className="p-4 border border-white/5 rounded-sm bg-white/2 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {u.isMilestone && (
                      <span className="px-2 py-0.5 text-xs bg-[rgba(201,168,76,0.15)] text-[#c9a84c] rounded-sm flex items-center gap-1">
                        <Star className="w-3 h-3" /> Milestone
                      </span>
                    )}
                    <span className={`px-2 py-0.5 text-xs rounded-sm ${u.isPublished ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
                      {u.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-white font-medium">{u.title}</p>
                  {u.description && <p className="text-white/40 text-xs mt-0.5 max-w-xl">{u.description}</p>}
                  <p className="text-white/25 text-xs mt-1">
                    {new Date(u.updateDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {u.floorsCompleted != null && ` · ${u.floorsCompleted} floors complete`}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link href={`/admin/construction/${u.id}`} className="text-[#c9a84c] text-xs hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(u.id)} className="text-red-400/50 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Construction Form ────────────────────────────────────────

interface ConstructionFormProps {
  id?: string
}

export function ConstructionFormClient({ id }: ConstructionFormProps) {
  const router = useRouter()
  const isNew = !id

  const todayISO = new Date().toISOString().slice(0, 10)

  const [form, setForm] = useState({
    title: '',
    description: '',
    updateDate: todayISO,
    floorsCompleted: '',
    overallProgress: '',
    isMilestone: false,
    milestoneLabel: '',
    isPublished: true,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      const found = getStoredConstructionUpdates().find((u) => u.id === id)
      if (found) {
        setForm({
          title: found.title,
          description: found.description ?? '',
          updateDate: new Date(found.updateDate).toISOString().slice(0, 10),
          floorsCompleted: found.floorsCompleted != null ? String(found.floorsCompleted) : '',
          overallProgress: found.overallProgress != null ? String(found.overallProgress) : '',
          isMilestone: found.isMilestone,
          milestoneLabel: found.milestoneLabel ?? '',
          isPublished: found.isPublished,
        })
      } else {
        setError('Construction update not found.')
      }
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'isPublished' ? value === 'true' : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required.'); return }
    if (!form.updateDate) { setError('Date is required.'); return }
    const update: ConstructionUpdate = {
      id: id || `cu-${Date.now()}`,
      projectId: 'proj-rock-one-square',
      title: form.title,
      description: form.description || null,
      updateDate: form.updateDate,
      floorsCompleted: form.floorsCompleted ? Number(form.floorsCompleted) : null,
      overallProgress: form.overallProgress ? Number(form.overallProgress) : null,
      isMilestone: form.isMilestone,
      milestoneLabel: form.milestoneLabel || null,
      photoUrls: [],
      isPublished: form.isPublished,
      sortOrder: 0,
    }
    saveConstructionUpdate(update)
    router.push('/admin/construction')
  }

  const handleDelete = () => {
    if (!id || !confirm('Permanently delete this update?')) return
    deleteConstructionUpdate(id)
    router.push('/admin/construction')
  }

  if (error && id) return <div className="p-6 border border-red-500/20 rounded-sm text-red-400 text-sm">{error}</div>

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/admin/construction" className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Construction
        </Link>
        <h1 className="text-2xl font-semibold text-white">{isNew ? 'New Construction Update' : 'Edit Construction Update'}</h1>
      </div>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 rounded-lg border border-white/10 p-6">
        <div>
          <label className={labelClass}>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. 7 Floors Complete" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={`${inputClass} resize-y`} placeholder="Detailed description…" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Update Date *</label>
            <input name="updateDate" type="date" value={form.updateDate} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Floors Completed</label>
            <input name="floorsCompleted" type="number" value={form.floorsCompleted} onChange={handleChange} min={0} max={20} placeholder="e.g. 7" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Overall Progress (%)</label>
            <input name="overallProgress" type="number" value={form.overallProgress} onChange={handleChange} min={0} max={100} placeholder="e.g. 65" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="isPublished" value={form.isPublished ? 'true' : 'false'} onChange={handleChange} className={inputClass}>
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input name="isMilestone" type="checkbox" checked={form.isMilestone} onChange={handleChange} id="isMilestone" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#c9a84c]" />
          <label htmlFor="isMilestone" className="text-white/70 text-sm">Mark as Milestone</label>
        </div>
        {form.isMilestone && (
          <div>
            <label className={labelClass}>Milestone Label</label>
            <input name="milestoneLabel" value={form.milestoneLabel} onChange={handleChange} placeholder="e.g. Major Milestone" className={inputClass} />
          </div>
        )}
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="flex items-center gap-2 bg-[#c9a84c] text-black px-6 py-2 rounded font-medium hover:bg-[#e4c870] transition-colors">
            <Save className="w-4 h-4" />{isNew ? 'Create Update' : 'Save Changes'}
          </button>
          <Link href="/admin/construction" className="px-6 py-2 rounded border border-white/20 text-white hover:bg-white/5 transition-colors">Cancel</Link>
        </div>
      </form>

      {!isNew && (
        <div className="mt-8 rounded-lg border border-red-500/30 p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-white/50 text-sm mb-4">Permanently delete this construction update.</p>
          <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700 transition-colors">Delete Update</button>
        </div>
      )}
    </div>
  )
}
