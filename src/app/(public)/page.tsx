import React from 'react'
import { HeroSection } from '@/components/public/HeroSection'
import { ProjectIntro } from '@/components/public/ProjectIntro'
import { CommercialOfferings } from '@/components/public/CommercialOfferings'
import { FloorExplorer } from '@/components/public/FloorExplorer'
import { LocationSection } from '@/components/public/LocationSection'
import { AmenitiesSection } from '@/components/public/AmenitiesSection'
import { ConstructionProgress } from '@/components/public/ConstructionProgress'
import { FAQSection } from '@/components/public/FAQSection'
import { ContactSection } from '@/components/public/ContactSection'
import { ProjectGallery } from '@/components/public/ProjectGallery'
import {
  getServerBanners,
  getServerAmenities,
  getServerFAQs,
  getServerConstructionUpdates,
} from '@/lib/data/server-data'

export const revalidate = 60

async function getPageData() {
  const [banners, amenities, faqs, constructionUpdates] = await Promise.all([
    getServerBanners(true),
    getServerAmenities(true),
    getServerFAQs(true),
    getServerConstructionUpdates(true),
  ])
  return { banners, amenities, faqs, constructionUpdates }
}

export default async function HomePage() {
  const { banners, amenities, faqs, constructionUpdates } = await getPageData()

  return (
    <>
      <HeroSection banners={banners} />
      <ProjectIntro />
      <CommercialOfferings />
      <FloorExplorer />
      <ProjectGallery />
      <LocationSection />
      <AmenitiesSection amenities={amenities} />
      <ConstructionProgress updates={constructionUpdates} />
      <FAQSection faqs={faqs} />
      <ContactSection />
    </>
  )
}
