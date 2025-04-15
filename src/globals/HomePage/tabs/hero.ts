import type { Tab } from 'payload'

const tab: Tab = {
  name: 'hero',
  label: 'Hero',
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
      admin: {
        description: 'Image for the hero section',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'heading',
      admin: {
        description: 'Title to show in hero section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Hero Sub Text',
      admin: {
        description: 'Description text for hero section',
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

export default tab
