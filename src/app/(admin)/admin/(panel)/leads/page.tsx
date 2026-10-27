import React, { Suspense } from 'react'
import { LeadsListClient } from './LeadsClient'

export default function LeadsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white/50 text-sm">Loading leads…</div>}>
      <LeadsListClient />
    </Suspense>
  )
}
