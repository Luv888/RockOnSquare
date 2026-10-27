import React from 'react'
import { requireAdmin } from '@/lib/auth/guards'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminInactivityTracker } from '@/components/admin/AdminInactivityTracker'

export default async function AdminPagesLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth guard — middleware can't check session revocation
  await requireAdmin()

  return (
    <div className="flex min-h-screen bg-[#080d18]">
      <AdminInactivityTracker />
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}
