import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'
import { assignOrderFieldHook } from './hooks/assignOrder'

export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  access: {
    read: authenticated,
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
      min: 1,
      hooks: {
        beforeChange: [assignOrderFieldHook],
      },
      admin: {
        description:
          'This decided in what order the category is displayed on the website, lower value means display first. Leave this blank to auto assign a value',
      },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
  admin: {
    useAsTitle: 'name',
  },
}
