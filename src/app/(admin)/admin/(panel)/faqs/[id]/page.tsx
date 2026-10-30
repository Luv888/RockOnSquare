import { getServerFAQs } from '@/lib/data/server-data'
import { FAQFormClient } from '../FAQsClient'

export const dynamic = 'force-dynamic'

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const faqs = await getServerFAQs(false)
  const faq = faqs.find((f) => f.id === id) || null
  return <FAQFormClient id={id} initialFaq={faq} />
}
