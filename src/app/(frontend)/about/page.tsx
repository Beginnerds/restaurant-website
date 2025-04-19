import { getPayload } from 'payload'
import config from '@/payload.config'
import Hero from '../_components/hero'
import SimpleSection from '../_components/simple-section/simple-section'

export default async function page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const aboutPageData = await payload.findGlobal({
    slug: 'about-page',
  })

  const heroMedia = aboutPageData.heroImage

  const heroImageUrl = typeof heroMedia === 'object' && heroMedia?.url ? heroMedia.url : ''
  const whoWeAreMedia = aboutPageData.whoWeAreImage

  const whoWeAreImageUrl =
    typeof whoWeAreMedia === 'object' && whoWeAreMedia?.url ? whoWeAreMedia.url : ''

  const servicesMdia = aboutPageData.servicesImage

  const servicesImageUrl =
    typeof servicesMdia === 'object' && servicesMdia?.url ? servicesMdia.url : ''

  return (
    <div className="px-4 md:px-8">
      <Hero
        heading={aboutPageData.heroHeading}
        description={aboutPageData.heroDescription}
        imageUrl={heroImageUrl}
      />
      <SimpleSection
        title={aboutPageData.whoWeAreHeading}
        description={aboutPageData.whoWeAreDescription}
        imageUrl={whoWeAreImageUrl}
      />
      <SimpleSection
        title={aboutPageData.servicesHeading}
        description={aboutPageData.servicesDescription}
        imageUrl={servicesImageUrl}
        flip={true}
      />
    </div>
  )
}
