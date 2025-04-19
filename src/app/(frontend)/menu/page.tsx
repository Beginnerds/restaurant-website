import { getPayload } from 'payload'
import config from '@/payload.config'
import Hero from '../_components/hero'
import CategoryColumn from '../_components/category-column/category-column'
import { MenuCategory } from '@/payload-types'

export default async function page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const menuPageData = await payload.findGlobal({
    slug: 'menu-page',
  })

  const heroMedia = menuPageData.heroImage

  const heroImageUrl = typeof heroMedia === 'object' && heroMedia?.url ? heroMedia.url : ''

  const menuItemsData = await payload.find({
    collection: 'menu-items',
    pagination: false,
    limit: 9999,
  })

  const categoryItemsData = await payload.find({
    collection: 'menu-categories',
    pagination: false,
    sort: 'order',
    limit: 9999,
  })

  const filterMenuItemsByCategory = (catId: number) => {
    return menuItemsData.docs.slice().filter((item) => (item.category as MenuCategory).id == catId)
  }

  return (
    <div className="w-full px-4 md:px-8">
      <Hero
        heading={menuPageData.heading}
        description={menuPageData.description}
        imageUrl={heroImageUrl}
        ctaText={menuPageData.ctaText}
        ctaUrl={menuPageData.ctaLink}
        ctaShadow={true}
      />
      <section className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
        {categoryItemsData.docs.map((item) => (
          <CategoryColumn
            key={item.id}
            title={item.name}
            menuItems={filterMenuItemsByCategory(item.id)}
          />
        ))}
      </section>
    </div>
  )
}
