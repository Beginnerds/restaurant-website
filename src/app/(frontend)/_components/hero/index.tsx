import React from 'react'

import Image from 'next/image'
import { HomePage } from '@/payload-types'
import styles from './styles.module.css'
import CTALink from '../ui/cta-link'

type HeroProps = HomePage['hero']

const Hero: React.FC<HeroProps> = async (props) => {
  const heroMedia = props.heroImage

  const heroImageUrl = typeof heroMedia === 'object' && heroMedia?.url ? heroMedia.url : ''

  const headingWordsArr = props.heading.split(' ')

  const headingLastWord = headingWordsArr[headingWordsArr.length - 1]

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 justify-items-center md:justify-items-start items-center max-md:text-center  sm:pt-5 md:pt-10">
      <div className="relative order-1 md:order-2 aspect-square">
        <div
          className={`absolute top-0 left-0 h-full w-full -z-10 bg-primary ${styles.clip}`}
        ></div>
        <Image
          className="h-[250px] sm:h-[400px] md:h-full w-full object-contain"
          alt={'hero image'}
          src={heroImageUrl}
          height={850}
          width={850}
        />
      </div>
      <div className=" order-2 md:order-1">
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
