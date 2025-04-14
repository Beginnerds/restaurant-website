import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'price', type: 'number', required: true },
    { name: 'category', type: 'relationship', relationTo: 'menu-categories', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Item will be hidden if this is unchecked',
      },
    },
  ],
  admin: {
    useAsTitle: 'title',
  },
}
