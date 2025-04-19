import React from 'react'
import SectionDescription from '../ui/section-description'
import SectionTitle from '../ui/section-title'
import Image from 'next/image'

type SectionProps = {
  title: string
  description: string
  imageUrl: string
  flip?: boolean
}

const SimpleSection: React.FC<SectionProps> = ({ title, description, imageUrl, flip }) => {
  if (!title || !description || !imageUrl) {
    return null
  }
  return (
    <section
      className={`w-full mt-16 md:mt-40 flex ${flip ? 'flex-col-reverse md:flex-row-reverse' : 'flex-col md:flex-row'} justify-start items-center gap-8 md:justify-between md:items-center`}
    >
      <div>
        <SectionTitle>{title}</SectionTitle>
        <div className="mt-9">
          <SectionDescription>{description}</SectionDescription>
        </div>
      </div>
      <Image
        className="w-[300px] sm:w-[400px] lg:w-[500px] h-auto mx-auto rounded-xl "
        src={imageUrl}
        alt="section-image"
        width={549}
        height={789}
      />
    </section>
  )
}

export default SimpleSection
