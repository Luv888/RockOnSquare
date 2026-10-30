import React from 'react'
import { getServerConstructionUpdates } from '@/lib/data/server-data'
import { ConstructionListClient } from './ConstructionClient'

export const dynamic = 'force-dynamic'

export default async function ConstructionPage() {
  const updates = await getServerConstructionUpdates(false)
  return <ConstructionListClient initialUpdates={updates} />
}
