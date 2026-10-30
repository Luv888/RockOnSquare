import React from 'react'
import { getServerSiteSettings } from '@/lib/data/server-data'
import { SettingsClient } from './SettingsClient'
import { ChangePasswordForm } from '@/components/admin/ChangePasswordForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const settings = await getServerSiteSettings()
  return (
    <>
      <SettingsClient initialSettings={settings} />
      <div className="mt-8">
        <ChangePasswordForm loginPath="/admin/login" />
      </div>
    </>
  )
}
