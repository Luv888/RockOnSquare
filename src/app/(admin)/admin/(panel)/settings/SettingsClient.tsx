'use client'

import React, { useState, useEffect } from 'react'
import { Save, RefreshCw, Check } from 'lucide-react'
import {
  getStoredSettings,
  saveSetting,
  resetToDemoDefaults,
  subscribeToDataChanges,
} from '@/lib/data/local-storage'
import type { SiteSetting } from '@/lib/data/types'

export function SettingsClient() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [savedKey, setSavedKey] = useState<string | null>(null)

  useEffect(() => {
    setSettings(getStoredSettings())
    return subscribeToDataChanges(() => setSettings(getStoredSettings()))
  }, [])

  const groups = Array.from(new Set(settings.map((s) => s.group || 'General')))

  const handleStartEdit = (key: string, currentVal: string) => {
    setEditingKey(key)
    setEditValue(currentVal || '')
  }

  const handleSave = (key: string) => {
    saveSetting(key, editValue)
    setSettings(getStoredSettings())
    setEditingKey(null)
    setSavedKey(key)
    setTimeout(() => setSavedKey(null), 2500)
  }

  const handleReset = () => {
    if (confirm('Reset all demo data (settings, banners, amenities, etc.) to default sample values?')) {
      resetToDemoDefaults()
      setSettings(getStoredSettings())
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
        <p className="text-[#c9a84c] text-xs font-medium">Demo Mode Active</p>
        <p className="text-white/60 text-xs mt-1">
          Settings are saved to browser local storage. Click the edit button on any row to change a value.
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
                            <td className="px-4 py-3">
                              <p className="text-white text-sm">{s.label || s.key}</p>
                              <p className="text-white/25 text-xs font-mono">{s.key}</p>
                            </td>
                            <td className="px-4 py-3">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full max-w-md bg-[#0a0f1e] border border-white/20 rounded px-2.5 py-1 text-white text-xs focus:outline-none focus:border-[#c9a84c]"
                                  autoFocus
                                />
                              ) : (
                                <p className="text-white/70 text-sm max-w-xs truncate">
                                  {s.value || <span className="text-white/20 italic">Not set</span>}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-sm text-xs ${
                                  s.isPublic
                                    ? 'bg-green-500/15 text-green-400'
                                    : 'bg-white/10 text-white/30'
                                }`}
                              >
                                {s.isPublic ? 'Public' : 'Private'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {isEditing ? (
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleSave(s.key)}
                                    className="px-2.5 py-1 bg-[#c9a84c] text-black text-xs font-medium rounded hover:bg-[#e4c870] transition-colors flex items-center gap-1"
                                  >
                                    <Save className="w-3 h-3" /> Save
                                  </button>
                                  <button
                                    onClick={() => setEditingKey(null)}
                                    className="px-2 py-1 text-white/40 hover:text-white text-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : justSaved ? (
                                <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                                  <Check className="w-3.5 h-3.5" /> Saved
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleStartEdit(s.key, s.value ?? '')}
                                  className="text-[#c9a84c] text-xs hover:underline"
                                >
                                  Edit
                                </button>
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
