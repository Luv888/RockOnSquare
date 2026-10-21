'use client'

import React, { useActionState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { KeyRound, Loader2, AlertCircle } from 'lucide-react'
import { changeOwnPassword, type ChangePasswordState } from '@/lib/actions/admin'

const inputClass =
  'w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors'

export function ChangePasswordForm({ loginPath }: { loginPath: string }) {
  const [state, action, pending] = useActionState<ChangePasswordState, FormData>(changeOwnPassword, {})

  // Sessions are already revoked server-side; signOut clears the cookie and sends the user to log in again
  useEffect(() => {
    if (state.success) signOut({ callbackUrl: `${loginPath}?reason=password_changed` })
  }, [state.success, loginPath])

  return (
    <div className="p-6 border border-white/5 rounded-sm bg-white/2 max-w-md">
      <h2 className="text-white font-medium mb-1 flex items-center gap-2">
        <KeyRound className="w-4 h-4 text-[#c9a84c]" />
        Change Password
      </h2>
      <p className="text-white/40 text-xs mb-4">You will be signed out and must log in with the new password.</p>

      {state.error && (
        <div className="flex items-start gap-2.5 p-3 mb-4 border border-red-500/30 rounded-sm bg-red-500/10">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-xs leading-relaxed">{state.error}</p>
        </div>
      )}

      <form action={action} className="space-y-3">
        <div>
          <label htmlFor="currentPassword" className="block text-white/60 text-xs mb-1.5">Current password</label>
          <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-white/60 text-xs mb-1.5">New password (min 12 characters)</label>
          <input id="newPassword" name="newPassword" type="password" autoComplete="new-password" minLength={12} maxLength={200} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-white/60 text-xs mb-1.5">Confirm new password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={12} maxLength={200} required className={inputClass} />
        </div>
        <button
          type="submit"
          disabled={pending || state.success}
          className="flex items-center gap-2 px-4 py-2 text-xs bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#c9a84c] rounded-sm hover:bg-[rgba(201,168,76,0.2)] transition-colors disabled:opacity-50"
        >
          {(pending || state.success) && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {state.success ? 'Signing out…' : 'Update password'}
        </button>
      </form>
    </div>
  )
}
