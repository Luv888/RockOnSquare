import { BannerFormClient } from '../BannersClient'
export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <BannerFormClient id={id} />
}
