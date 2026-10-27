import React from 'react'
import { ConstructionFormClient } from '../ConstructionClient'

export default async function EditConstructionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ConstructionFormClient id={id} />
}
