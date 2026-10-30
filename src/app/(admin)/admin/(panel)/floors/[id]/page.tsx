import React from 'react'
import { getServerFloors } from '@/lib/data/server-data'
import { FloorFormClient } from '../FloorsClient'

export const dynamic = 'force-dynamic'

export default async function EditFloorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const floors = await getServerFloors()
  const floor = floors.find((f) => f.id === id) || null
  return <FloorFormClient id={id} initialFloor={floor} />
}
