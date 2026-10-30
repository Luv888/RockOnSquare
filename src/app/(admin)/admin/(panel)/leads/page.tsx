import React, { Suspense } from 'react'
import { getServerLeads } from '@/lib/data/server-data'
import { LeadsListClient } from './LeadsClient'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const leads = await getServerLeads()
  return (
    <Suspense fallback={<div className="p-10 text-white/50 text-sm">Loading leads…</div>}>
      <LeadsListClient initialLeads={leads} />
    </Suspense>
  )
}
