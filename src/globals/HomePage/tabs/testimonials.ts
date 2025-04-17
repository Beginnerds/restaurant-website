import type { Tab } from 'payload'

const tab: Tab = {
  name: 'testimonials',
  label: 'Testimonials Section',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
      admin: {
        description: 'Image for the testimonials section',
      },
    },
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
        description: 'Testimonial to show for this section',
      },
    },
  ],
}

export default tab
