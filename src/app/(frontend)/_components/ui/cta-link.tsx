import React from 'react'
import Link from 'next/link'
import { LinkProps } from 'next/link'

type ButtonProps = LinkProps & {
  showShadow?: boolean
  target?: React.HTMLAttributeAnchorTarget | undefined
  children: React.ReactNode
}

const CTALink: React.FC<ButtonProps> = (props) => {
  return (
    <Link
      href={props.href}
      target={props.target || ''}
      className={`bg-primary text-white font-semibold text-xl md:text-2xl rounded-[40px] filter transition-all hover:brightness-90 px-8 py-4 ${props.showShadow ? 'shadow-xl shadow-primary/40' : ''}`}
    >
      {props.children}
    </Link>
  )
}

export default CTALink
