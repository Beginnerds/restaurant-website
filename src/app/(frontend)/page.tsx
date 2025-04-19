import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import Hero from './_components/hero'
import CategorySection from './_components/category-section'
import FeaturedFoodSection from './_components/featured-food-section'
import TestimonialsSection from './_components/testimonials-section/testimonials-section'
import ServicesSection from './_components/services-section'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const homePageData = await payload.findGlobal({
    slug: 'home-page',
  })

  const heroMedia = homePageData.hero.heroImage

  const heroImageUrl = typeof heroMedia === 'object' && heroMedia?.url ? heroMedia.url : ''
  return (
    <div className="px-4 md:px-8">
      <Hero
        heading={homePageData.hero.heading}
        description={homePageData.hero.description}
        imageUrl={heroImageUrl}
        ctaText={homePageData.hero.ctaText}
        ctaUrl={homePageData.hero.ctaLink}
        ctaShadow={true}
      />
      <CategorySection
        featuredCategoryItems={homePageData['featured-section']?.featuredCategoryItems}
      />
      <FeaturedFoodSection
        featuredMenuItems={homePageData['featured-section']?.featuredMenuItems}
      />
      <TestimonialsSection {...homePageData.testimonials} />
      <ServicesSection {...homePageData['services-section']} />
    </div>
  )
}
