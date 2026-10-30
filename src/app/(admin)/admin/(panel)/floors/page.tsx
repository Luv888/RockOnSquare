import React from 'react'
import { getServerFloors } from '@/lib/data/server-data'
import { FloorsListClient } from './FloorsClient'

export const dynamic = 'force-dynamic'

export default async function FloorsPage() {
  const floors = await getServerFloors()
  return <FloorsListClient initialFloors={floors} />
}
