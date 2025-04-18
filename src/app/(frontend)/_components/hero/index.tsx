import React from 'react'

import Image from 'next/image'
import { HomePage } from '@/payload-types'
import CTALink from '../ui/cta-link'

type HeroProps = HomePage['hero']

const Hero: React.FC<HeroProps> = async (props) => {
  if (!props.heading || !props.description || !props.heroImage || !props.ctaText) {
    return null
  }

  const heroMedia = props.heroImage

  const heroImageUrl = typeof heroMedia === 'object' && heroMedia?.url ? heroMedia.url : ''

  const headingWordsArr = props.heading?.split(' ')

  const headingLastWord = headingWordsArr[headingWordsArr.length - 1]
  // sm:h-[400px] md:h-[800px]
  return (
    // min-h because nav is 80px
    <section className="max-sm:min-h-[calc(100vh-80px)] w-full grid grid-cols-1 md:grid-cols-2 justify-items-center md:justify-items-start md:items-center max-md:text-center pb-10 overflow-x-clip">
      <div className="relative order-1 md:order-2 aspect-square justify-self-center">
        <Image
          className="h-[350px] sm:h-auto md:h-[min(50vh,800px)] lg:h-[800px]  w-auto mx-auto object-contain"
          alt={'hero image'}
          src={heroImageUrl}
          height={850}
          width={850}
          priority
        />
      </div>
      <div className="order-2 md:order-1">
        <h1 className="font-extrabold text-4xl 2xl:text-6xl leading-[145.5%]">
          {props.heading.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary">{headingLastWord}</span>
        </h1>
        <p className="font-medium text-xl 2xl:text-2xl leading-[170%] text-[#4a4a4a] mt-8 mb-18">
          {props.description}
        </p>
        <CTALink href={'https://google.com'} showShadow={true}>
          Order Now
        </CTALink>
      </div>
    </section>
  )
}

export default Hero
