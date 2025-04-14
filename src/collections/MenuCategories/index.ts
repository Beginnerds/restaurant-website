import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      min: 0,
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
  admin: {
    useAsTitle: 'name',
  },
}
