import { AmenityFormClient } from '../AmenitiesClient'
export default async function EditAmenityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AmenityFormClient id={id} />
}
