import { authenticated } from '@/access/authenticated'
import { GlobalConfig } from 'payload'

export const MenuPage: GlobalConfig = {
  slug: 'menu-page',
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
      admin: {
        description: 'Image for the hero section of this page',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      admin: {
        description: 'Title to show in hero section of this page',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Description text for hero section of this page',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      label: 'CTA Button Text',
      admin: {
        description: 'Text to show for the CTA (call to action) button',
        placeholder: 'Order Now',
      },
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      label: 'CTA Button Link',
      admin: {
        description: 'Link for the CTA button',
      },
    },
  ],
}
