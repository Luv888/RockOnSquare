import { getServerAmenities } from '@/lib/data/server-data'
import { AmenityFormClient } from '../AmenitiesClient'

export const dynamic = 'force-dynamic'

export default async function EditAmenityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const amenities = await getServerAmenities(false)
  const amenity = amenities.find((a) => a.id === id) || null
  return <AmenityFormClient id={id} initialAmenity={amenity} />
}
