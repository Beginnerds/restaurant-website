import type { Tab } from 'payload'

const tab: Tab = {
  name: 'services-section',
  label: 'Services Section',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Heading to show for this section',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      admin: {
        description: 'Description to show for this section',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      label: 'CTA Button Text',
      admin: {
        description: 'Text to show for the CTA (call to action) button',
        placeholder: 'Explore',
      },
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      maxRows: 4,
      admin: {
        description: 'Add up to 4 cards to show in this section',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Icon for this card',
          },
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
          required: true,
          admin: {
            description: 'Heading to show for this card',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true,
          admin: {
            description: 'Description to show for this card',
          },
        },
      ],
    },
  ],
}

export default tab
