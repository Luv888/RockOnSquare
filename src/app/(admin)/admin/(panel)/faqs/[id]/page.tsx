import { FAQFormClient } from '../FAQsClient'
export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <FAQFormClient id={id} />
}
