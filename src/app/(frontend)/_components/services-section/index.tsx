import React from 'react'
import SectionLabel from '../ui/section-label'
import { HomePage } from '@/payload-types'
import SectionDescription from '../ui/section-description'
import SectionTitle from '../ui/section-title'
import CTALink from '../ui/cta-link'
import Image from 'next/image'

type ServicesPrpos = HomePage['services-section']

const ServicesSection: React.FC<ServicesPrpos> = (props) => {
  const { cards, ctaText, description, heading } = props
  if (!cards || !ctaText || !description || !heading) {
    return null
  }
  const mappedCards = props.cards.slice().map((item) => {
    const cardMedia = item.image

    const cardImageUrl = typeof cardMedia === 'object' && cardMedia?.url ? cardMedia.url : ''

    return {
      ...item,
      title: item.heading,
      imageUrl: cardImageUrl,
    }
  })

  return (
    <section className="w-full pb-10 mt-24 md:mt-52 flex flex-col justify-start items-center gap-8 lg:flex-row lg:justify-between lg:items-center">
      <div>
        <SectionLabel>Our Story And Services</SectionLabel>
        <SectionTitle className="max-lg:text-center! max-lg:w-full!">{props.heading}</SectionTitle>
        <div className="mt-9">
          <SectionDescription className="max-lg:text-center!">
            {props.description}
          </SectionDescription>
        </div>
        <div className="mt-14 max-lg:text-center">
          <CTALink href={'/about'}>Explore</CTALink>
        </div>
      </div>
      <div className="lg:max-w-1/2 mt-10 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mappedCards.map((item, ind) => (
          <Card key={ind} {...item} />
        ))}
      </div>
    </section>
  )
}

export default ServicesSection

type CardProps = {
  title: string
  description: string
  imageUrl: string
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white shadow-xl rounded-[40px] py-8 px-4 transition-all hover:scale-95 hover:shadow-md">
      <Image
        className="size-16 mx-auto"
        src={imageUrl}
        alt="service-img"
        height={300}
        width={200}
      />
      <p className="mt-8 text-primary font-bold text-xl text-center uppercase">{title}</p>
      <p className="mt-4 font-semibold text-lg text-center text-[#90BD95]">{description}</p>
    </div>
  )
}
