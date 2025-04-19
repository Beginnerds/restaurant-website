import { MenuItem as MenuItemPayloadType } from '@/payload-types'
import React from 'react'

const MenuItem: React.FC<MenuItemPayloadType> = (props) => {
  return (
    <p className="font-semibold text-lg flex items-center justify-between py-4 border-t border-t-[#555555]/20 text-[#4a4a4a]">
      {props.title} <span className="text-primary">₹{props.price}</span>
    </p>
  )
}

export default MenuItem
