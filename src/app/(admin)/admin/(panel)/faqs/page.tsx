import { getServerFAQs } from '@/lib/data/server-data'
import { FAQsListClient } from './FAQsClient'

export const dynamic = 'force-dynamic'

export default async function FAQsPage() {
  const faqs = await getServerFAQs(false)
  return <FAQsListClient initialFaqs={faqs} />
}
