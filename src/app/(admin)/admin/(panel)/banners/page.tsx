import { getServerBanners } from '@/lib/data/server-data'
import { BannersListClient } from './BannersClient'

export const dynamic = 'force-dynamic'

export default async function BannersPage() {
  const banners = await getServerBanners(false)
  return <BannersListClient initialBanners={banners} />
}
