import React from 'react'
import { getServerConstructionUpdates } from '@/lib/data/server-data'
import { ConstructionFormClient } from '../ConstructionClient'

export const dynamic = 'force-dynamic'

export default async function EditConstructionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const updates = await getServerConstructionUpdates(false)
  const update = updates.find((u) => u.id === id) || null
  return <ConstructionFormClient id={id} initialUpdate={update} />
}
