import React from 'react'
import { FloorFormClient } from '../FloorsClient'

export default async function EditFloorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <FloorFormClient id={id} />
}
