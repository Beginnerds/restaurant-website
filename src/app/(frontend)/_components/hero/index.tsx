import React from 'react'

import Image from 'next/image'
import CTALink from '../ui/cta-link'

type BaseHeroProps = {
  heading: string
  description: string
  imageUrl: string
}

type HeroWithCTA = BaseHeroProps & {
  ctaText: string
  ctaUrl: string
  ctaShadow?: boolean
}

type HeroWithoutCTA = BaseHeroProps

type HeroProps = HeroWithCTA | HeroWithoutCTA

const Hero: React.FC<HeroProps> = async (props) => {
  if (!props.heading || !props.description || !props.imageUrl) {
    return null
  }

  const hasCTA = 'ctaText' in props && 'ctaUrl' in props

  const headingWordsArr = props.heading?.split(' ')

  const headingLastWord = headingWordsArr[headingWordsArr.length - 1]
  // sm:h-[400px] md:h-[800px]
  return (
    // min-h because nav is 80px
    <section className="max-sm:min-h-[calc(100vh-80px)] w-full grid grid-cols-1 md:grid-cols-2 justify-items-center md:justify-items-start md:items-center max-md:text-center pb-10 overflow-x-clip ">
      <div className="relative order-1 md:order-2 aspect-square justify-self-center">
        <Image
          className="h-[max(50vh,350px)] sm:h-[min(50vh,800px)] lg:h-[800px]  w-auto mx-auto object-contain"
          alt={'hero image'}
          src={props.imageUrl}
          height={850}
          width={850}
          priority
        />
      </div>
      <div className="order-2 md:order-1">
        <h1 className="font-extrabold text-4xl lg:text-6xl leading-[145.5%]">
          {props.heading.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary">{headingLastWord}</span>
        </h1>
        <p className="font-medium text-xl 2xl:text-2xl leading-[170%] text-[#4a4a4a] mt-8 mb-18">
          {props.description}
        </p>
        {hasCTA && (
          <CTALink href={props.ctaUrl} showShadow={props.ctaShadow} target="_blank">
            {props.ctaText}
          </CTALink>
        )}
      </div>
    </section>
  )
}

export default Hero
