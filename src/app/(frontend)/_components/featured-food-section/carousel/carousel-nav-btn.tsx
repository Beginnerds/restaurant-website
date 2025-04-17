'use client'

import { UseEmblaCarouselType } from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'

type CarouseNavBtnProps = {
  type: 'next' | 'prev'
  disabled?: boolean
  handleClick: () => any
}

export const usePrevNextButtons = (emblaApi: UseEmblaCarouselType['1']) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType['1']) => {
    setPrevBtnDisabled(!emblaApi?.canScrollPrev())
    setNextBtnDisabled(!emblaApi?.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

const CarouseNavBtn: React.FC<CarouseNavBtnProps> = ({ type, disabled = false, handleClick }) => {
  return (
    <button
      className={`relative w-10 h-10 sm:w-14 sm:h-14  md:w-20 md:h-20 rounded-full`}
      onClick={handleClick}
      disabled={disabled}
    >
      <svg
        className={`${disabled ? 'fill-[#efefef]' : 'fill-primary'}`}
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="40" />
      </svg>
      <svg
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 ${type == 'next' ? '' : 'rotate-180'} ${disabled ? 'fill-[#6f6e6e]' : 'fill-white'}`}
        viewBox="0 0 12 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 2L9.7645 9.7645" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M2 18L9.7645 10.2355" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export default CarouseNavBtn
