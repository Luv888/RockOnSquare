import React from 'react'
import { LeadDetailClient } from '../LeadsClient'

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <LeadDetailClient id={id} />
}
