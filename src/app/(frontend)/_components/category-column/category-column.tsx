import MenuItem from './menu-item'
import React from 'react'

import { MenuItem as MenuItemPayloadType } from '@/payload-types'

type CategoryColumnProps = {
  title: string
  menuItems: MenuItemPayloadType[]
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({ title, menuItems }) => {
  if (menuItems.length == 0) {
    return null
  }
  return (
    <div>
      <h2 className="text-2xl font-bold capitalize mb-4">{title}</h2>
      {menuItems.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default CategoryColumn
