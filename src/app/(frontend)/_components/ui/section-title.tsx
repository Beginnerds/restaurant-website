import React from 'react'

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h4 className="inline-block max-sm:text-center max-sm:w-full text-black text-3xl md:text-4xl lg:text-6xl font-bold leading-[131.5%]">
      {children}
    </h4>
  )
}

export default SectionTitle
