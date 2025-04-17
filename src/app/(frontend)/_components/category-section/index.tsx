import React from 'react'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { MenuCategory } from '@/payload-types'
import { HomePage } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '../ui/section-label'

type FeaturedSection = NonNullable<HomePage['featured-section']>
type FeaturedCategoryItems = FeaturedSection['featuredCategoryItems']
type FeaturedCategoryItemsProps = {
  featuredCategoryItems: FeaturedCategoryItems
}

const CategorySection: React.FC<FeaturedCategoryItemsProps> = async (props) => {
  if (!props.featuredCategoryItems || props.featuredCategoryItems.length == 0) {
    return null
  }

  const payload = await getPayload({ config: config })

  const menuItemsResult = await payload.find({
    collection: 'menu-items',
    pagination: false,
    limit: 9999,
  })

  const items = props.featuredCategoryItems as unknown as {
    featuredCategoryItem: MenuCategory
    id: string
  }[]

  const mappedItems = items.map((i) => {
    const imgMedia = i.featuredCategoryItem.image

    const imgUrl = typeof imgMedia === 'object' && imgMedia?.url ? imgMedia.url : ''

    const totalDishes = menuItemsResult.docs
      .slice()
      .filter((item) => (item.category as MenuCategory).name == i.featuredCategoryItem.name)

    return {
      name: i.featuredCategoryItem.name,
      imgUrl,
      dishesCount: totalDishes.length,
    }
  })

  return (
    <section className="my-10">
      <SectionLabel>Popular Categories</SectionLabel>
      <div className="flex justify-evenly lg:justify-between items-center gap-8 flex-wrap">
        {mappedItems.map((item, ind) => (
          <Card key={ind} name={item.name} imgUrl={item.imgUrl} dishesCount={item.dishesCount} />
        ))}
        <Card
          name="Browse All"
          imgUrl="/other-category-items.png"
          dishesCount={menuItemsResult.docs.length}
          all={true}
        />
      </div>
    </section>
  )
}

export default CategorySection

type CardProps = {
  name: string
  imgUrl: string
  dishesCount?: number
  all?: boolean
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <Link
      href={'/menu'}
      className="bg-white rounded-[40px] px-12 py-8   shadow-xl transition-all hover:shadow-sm hover:scale-95"
    >
      <div className="rounded-full bg-[#C1F1C6] p-4 h-3/4 w-3/4 mx-auto aspect-square grid place-content-center">
        <Image
          className="object-contain h-full w-full2"
          src={props.imgUrl}
          height={100}
          width={100}
          alt={props.name + '_category'}
        />
      </div>
      <p className="mt-3 font-semibold text-xl md:text-2xl text-center text-[#1e1e1e]">
        {props.name}
      </p>
      {props.dishesCount && (
        <p className="mt-1 text-[#555555] text-base md:text-lg text-center">{`(${props.dishesCount} ${props.all ? 'items' : props.name.toLowerCase()})`}</p>
      )}
    </Link>
  )
}
