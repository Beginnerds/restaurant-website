'use client'

import React, { useCallback, useEffect } from 'react'
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'
import Card, { CardProps } from './card'
import SectionTitle from '../../ui/section-title'
import CarouseNavBtn, { usePrevNextButtons } from './carousel-nav-btn'

type carouselProps = {
  cardsData: CardProps[]
}

export const EmblaCarousel: React.FC<carouselProps> = (props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <div>
      <div className="flex flex-row mitems-center justify-between">
        <SectionTitle>Standout Dishes From Our Menu</SectionTitle>
        <div className="hidden sm:flex basis-2/3  justify-end items-center gap-2">
          {' '}
          <CarouseNavBtn type="prev" handleClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <CarouseNavBtn type="next" handleClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 sm:hidden sm:pointer-events-none z-[20]">
          <CarouseNavBtn type="prev" handleClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 sm:hidden sm:pointer-events-none z-[20]">
          <CarouseNavBtn type="next" handleClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="embla w-full overflow-hidden pb-10 mt-10" ref={emblaRef}>
          <div className="embla__container flex gap-8 ">
            {props.cardsData.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
