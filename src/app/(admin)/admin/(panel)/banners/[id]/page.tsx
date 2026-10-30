import { getServerBanners } from '@/lib/data/server-data'
import { BannerFormClient } from '../BannersClient'

export const dynamic = 'force-dynamic'

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const banners = await getServerBanners(false)
  const banner = banners.find((b) => b.id === id) || null
  return <BannerFormClient id={id} initialBanner={banner} />
}
