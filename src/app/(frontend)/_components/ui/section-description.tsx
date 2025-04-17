import React from 'react'

const SectionDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xl leading-[155%] font-medium text-[#555555] max-md:text-center">
      {children}
    </p>
  )
}

export default SectionDescription
