import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'
import { assignOrderFieldHook } from './hooks/assignOrder'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

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
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          collection: 'menu-categories',
          req,
        })

        return path
      },
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 50, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
