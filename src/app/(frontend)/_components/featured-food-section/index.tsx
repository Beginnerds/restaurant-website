import React from 'react'
import { EmblaCarousel } from './carousel/carousel'
import SectionLabel from '../ui/section-label'
import { HomePage, MenuItem } from '@/payload-types'

type FeaturedSection = NonNullable<HomePage['featured-section']>
type FeaturedMenuItems = FeaturedSection['featuredMenuItems']
type FeaturedMenuItemsProps = {
  featuredMenuItems: FeaturedMenuItems
}

const FeaturedFoodSection: React.FC<FeaturedMenuItemsProps> = (props) => {
  if (!props.featuredMenuItems || props.featuredMenuItems.length == 0) {
    return null
  }

  const items = props.featuredMenuItems as unknown as {
    featuredMenuItem: MenuItem
  }[]

  const mappedItems = items.map((i) => {
    const imgMedia = i.featuredMenuItem.image

    const imgUrl = typeof imgMedia === 'object' && imgMedia?.url ? imgMedia.url : ''

    return {
      title: i.featuredMenuItem.title,
      imageUrl: imgUrl,
      description: i.featuredMenuItem.description || '',
      price: i.featuredMenuItem.price,
    }
  })

  return (
    <section className="w-full mt-52">
      <SectionLabel>Special Dishes </SectionLabel>
      <EmblaCarousel cardsData={mappedItems} />
    </section>
  )
}

export default FeaturedFoodSection
