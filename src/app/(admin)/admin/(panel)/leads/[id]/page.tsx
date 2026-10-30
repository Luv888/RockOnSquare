import React from 'react'
import { getServerLeads } from '@/lib/data/server-data'
import { LeadDetailClient } from '../LeadsClient'

export const dynamic = 'force-dynamic'

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const leads = await getServerLeads()
  const lead = leads.find((l) => l.id === id) || null
  return <LeadDetailClient id={id} initialLead={lead} />
}
