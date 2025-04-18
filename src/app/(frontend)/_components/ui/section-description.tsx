import React from 'react'

const SectionDescription = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <p
      className={`text-xl leading-[155%] font-medium text-[#555555] max-md:text-center ${className}`}
    >
      {children}
    </p>
  )
}

export default SectionDescription
