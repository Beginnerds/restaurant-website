import React, { HTMLAttributes } from 'react'

const SectionTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h4
      className={`inline-block max-md:text-center max-md:w-full text-black text-3xl md:text-4xl lg:text-6xl font-bold leading-[131.5%] ${className}`}
    >
      {children}
    </h4>
  )
}

export default SectionTitle
