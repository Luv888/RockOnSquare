import { getServerAmenities } from '@/lib/data/server-data'
import { AmenitiesListClient } from './AmenitiesClient'

export const dynamic = 'force-dynamic'

export default async function AmenitiesPage() {
  const amenities = await getServerAmenities(false)
  return <AmenitiesListClient initialAmenities={amenities} />
}
