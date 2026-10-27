'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ChevronLeft, Save } from 'lucide-react'
import {
  getStoredFAQs,
  saveFAQ,
  deleteFAQ,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import type { FAQ } from '@/lib/data/types'

const inputClass =
  'w-full bg-[#0a0f1e] border border-white/10 rounded px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]'
const labelClass = 'block text-sm font-medium text-white/70 mb-1'

// ─── FAQs List ────────────────────────────────────────────────

export function FAQsListClient() {
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    setFaqs(getStoredFAQs())
    return subscribeToDataChanges(() => setFaqs(getStoredFAQs()))
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    deleteFAQ(id)
    setFaqs(getStoredFAQs())
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">FAQs</h1>
          <p className="text-white/40 text-sm mt-0.5">Manage frequently asked questions</p>
        </div>
        <Link href="/admin/faqs/new" className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors">
          <Plus className="w-4 h-4" /> Add FAQ
        </Link>
      </div>

      {faqs.length === 0 ? (
        <div className="p-10 text-center border border-white/5 rounded-sm bg-white/2">
          <p className="text-white/30 text-sm mb-4">No FAQs yet. The default set will display until custom FAQs are added.</p>
          <Link href="/admin/faqs/new" className="text-[#c9a84c] text-sm hover:underline">Add First FAQ →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.id} className="p-4 border border-white/5 rounded-sm bg-white/2 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/25 text-xs">#{i + 1}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-sm ${f.isPublished ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
                      {f.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium">{f.question}</p>
                  <p className="text-white/40 text-xs mt-1 line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link href={`/admin/faqs/${f.id}`} className="text-[#c9a84c] text-xs hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(f.id)} className="text-red-400/50 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── FAQ Form (Create / Edit) ─────────────────────────────────

interface FAQFormProps {
  id?: string
}

export function FAQFormClient({ id }: FAQFormProps) {
  const router = useRouter()
  const isNew = !id

  const [form, setForm] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    sortOrder: 0,
    isPublished: true,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      const found = getStoredFAQs().find((f) => f.id === id)
      if (found) setForm(found)
      else setError('FAQ not found.')
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
    if (!form.question?.trim() || !form.answer?.trim()) { setError('Question and answer are required.'); return }
    const faq: FAQ = {
      id: id || `faq-${Date.now()}`,
      question: form.question!,
      answer: form.answer!,
      sortOrder: form.sortOrder ?? 0,
      isPublished: form.isPublished ?? true,
    }
    saveFAQ(faq)
    router.push('/admin/faqs')
  }

  const handleDelete = () => {
    if (!id || !confirm('Permanently delete this FAQ?')) return
    deleteFAQ(id)
    router.push('/admin/faqs')
  }

  if (error && id) return <div className="p-6 border border-red-500/20 rounded-sm text-red-400 text-sm">{error}</div>

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/admin/faqs" className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to FAQs
        </Link>
        <h1 className="text-2xl font-semibold text-white">{isNew ? 'New FAQ' : 'Edit FAQ'}</h1>
        {id && <p className="text-white/40 text-sm mt-1">ID: {id}</p>}
      </div>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 rounded-lg border border-white/10 p-6">
        <div>
          <label className={labelClass}>Question *</label>
          <textarea name="question" value={form.question ?? ''} onChange={handleChange} required rows={2} className={`${inputClass} resize-y`} />
        </div>
        <div>
          <label className={labelClass}>Answer *</label>
          <textarea name="answer" value={form.answer ?? ''} onChange={handleChange} required rows={5} className={`${inputClass} resize-y`} />
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
            <Save className="w-4 h-4" />{isNew ? 'Create FAQ' : 'Save Changes'}
          </button>
          <Link href="/admin/faqs" className="px-6 py-2 rounded border border-white/20 text-white hover:bg-white/5 transition-colors">Cancel</Link>
        </div>
      </form>

      {!isNew && (
        <div className="mt-8 rounded-lg border border-red-500/30 p-6 border-t-4 border-t-red-500">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-white/50 text-sm mb-4">Permanently delete this FAQ. This action cannot be undone.</p>
          <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700 transition-colors">Delete FAQ</button>
        </div>
      )}
    </div>
  )
}
