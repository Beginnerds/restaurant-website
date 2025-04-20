import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    update: authenticated,
    read: anyone,
  },
  label: 'Site Settings',
  admin: {
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          collection: 'site-settings',
          req,
        })

        return path
      },
    },
  },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'address', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'text', required: true },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,

          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'Instagram',
            },
            {
              label: 'X',
              value: 'x',
            },
            {
              label: 'Youtube',
              value: 'youtube',
            },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 50, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    max: 50,
  },
}
