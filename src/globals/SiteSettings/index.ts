import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    update: authenticated,
    read: anyone,
  },
  label: 'Site Settings',
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
}
