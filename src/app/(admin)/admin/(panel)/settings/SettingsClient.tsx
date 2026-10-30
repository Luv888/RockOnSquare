'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, RefreshCw, Check } from 'lucide-react'
import {
  getStoredSettings,
  saveSetting,
  resetToDemoDefaults,
  syncStoredSettings,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import { saveSettingAction } from '@/lib/actions/admin'
import type { SiteSetting } from '@/lib/data/types'

export function SettingsClient({ initialSettings }: { initialSettings?: SiteSetting[] }) {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSetting[]>(() => {
    if (initialSettings && initialSettings.length > 0) return initialSettings
    return getStoredSettings()
  })
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [savedKey, setSavedKey] = useState<string | null>(null)

  useEffect(() => {
    if (initialSettings && initialSettings.length > 0) {
      syncStoredSettings(initialSettings)
      setSettings(initialSettings)
    } else {
      setSettings(getStoredSettings())
    }
    return subscribeToDataChanges(() => setSettings(getStoredSettings()))
  }, [initialSettings])

  const groups = Array.from(new Set(settings.map((s) => s.group || 'General')))

  const handleStartEdit = (key: string, currentVal: string) => {
    setEditingKey(key)
    setEditValue(currentVal || '')
  }

  const handleSave = async (key: string) => {
    saveSetting(key, editValue)
    setSettings(getStoredSettings())
    setEditingKey(null)
    setSavedKey(key)

    await saveSettingAction(key, editValue)
    router.refresh()

    setTimeout(() => setSavedKey(null), 2500)
  }

  const handleReset = () => {
    if (confirm('Reset all demo data (settings, banners, amenities, etc.) to default sample values?')) {
      resetToDemoDefaults()
      setSettings(getStoredSettings())
      router.refresh()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold">Site Settings</h1>
          <p className="text-white/40 text-sm mt-0.5">
            Configure business details, contact information, and site content
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 rounded border border-white/10 text-white/50 hover:text-white hover:border-white/20 text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Demo Defaults
        </button>
      </div>

      <div className="p-4 mb-6 border border-[#c9a84c]/20 rounded-sm bg-[#c9a84c]/5">
        <p className="text-[#c9a84c] text-xs font-medium">Authoritative Settings Synchronization</p>
        <p className="text-white/60 text-xs mt-1">
          Settings are saved to MongoDB and synchronized across the website. Click the edit button on any row to change a value.
        </p>
      </div>

      {settings.length === 0 ? (
        <div className="p-10 text-center border border-white/5 rounded-sm bg-white/2">
          <p className="text-white/30 text-sm">No settings found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => {
            const groupSettings = settings.filter((s) => (s.group || 'General') === group)
            return (
              <div key={group}>
                <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
                  {group}
                </h2>
                <div className="border border-white/5 rounded-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/2">
                        <th className="px-4 py-3 text-left text-white/30 text-xs">Setting</th>
                        <th className="px-4 py-3 text-left text-white/30 text-xs">Value</th>
                        <th className="px-4 py-3 text-left text-white/30 text-xs">Public</th>
                        <th className="px-4 py-3 text-right text-white/30 text-xs">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupSettings.map((s) => {
                        const isEditing = editingKey === s.key
                        const justSaved = savedKey === s.key

                        return (
                          <tr key={s.id} className="border-b border-white/5 hover:bg-white/2">
                            <td className="px-4 py-3 text-white/70">
                              <p className="font-medium text-white">{s.label || s.key}</p>
                              <p className="text-white/30 font-mono text-xs">{s.key}</p>
                            </td>
                            <td className="px-4 py-3 text-white max-w-xs">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full bg-[#0a0f1e] border border-[#c9a84c] rounded px-2 py-1 text-white text-xs focus:outline-none"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave(s.key)
                                    if (e.key === 'Escape') setEditingKey(null)
                                  }}
                                />
                              ) : (
                                <span className="text-white/80 text-xs break-all">
                                  {s.value || <span className="text-white/25 italic">Not set</span>}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <span
                                className={`px-2 py-0.5 rounded-sm ${
                                  s.isPublic
                                    ? 'bg-green-500/10 text-green-400'
                                    : 'bg-white/5 text-white/30'
                                }`}
                              >
                                {s.isPublic ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {isEditing ? (
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleSave(s.key)}
                                    className="flex items-center gap-1 text-xs text-[#c9a84c] hover:underline"
                                  >
                                    <Save className="w-3 h-3" /> Save
                                  </button>
                                  <button
                                    onClick={() => setEditingKey(null)}
                                    className="text-xs text-white/40 hover:text-white"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-end gap-2">
                                  {justSaved && (
                                    <span className="flex items-center gap-1 text-xs text-green-400">
                                      <Check className="w-3 h-3" /> Saved
                                    </span>
                                  )}
                                  <button
                                    onClick={() => handleStartEdit(s.key, s.value || '')}
                                    className="text-xs text-[#c9a84c] hover:underline"
                                  >
                                    Edit
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
