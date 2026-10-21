import React from 'react'
import { SettingsClient } from './SettingsClient'
import { ChangePasswordForm } from '@/components/admin/ChangePasswordForm'

export default function SettingsPage() {
  return (
    <>
      <SettingsClient />
      <div className="mt-8">
        <ChangePasswordForm loginPath="/admin/login" />
      </div>
    </>
  )
}
