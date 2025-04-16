import { span } from 'motion/react-client'
import React from 'react'

const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="block w-full max-md:text-center text-lg text-section-label tracking-[17%] uppercase font-bold mb-10">
      {children}
    </span>
  )
}

export default SectionLabel
