import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: authenticated,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          collection: 'about-page',
          req,
        })

        return path
      },
    },
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero Section',
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
          name: 'heroHeading',
          type: 'text',
          required: true,
          label: 'Heading',
          admin: {
            description:
              'Title to show in hero section, Last word here will be shown in different color',
          },
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          required: true,
          label: 'Hero Description',
          admin: {
            description: 'Description text for hero section',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Who We Are Section',
      fields: [
        {
          name: 'whoWeAreImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Who We Are Image',
          admin: {
            description: 'Image for this section',
          },
        },
        {
          name: 'whoWeAreHeading',
          type: 'text',
          required: true,
          label: 'Who We Are Heading',
          admin: {
            description: 'Title to show for this section',
          },
        },
        {
          name: 'whoWeAreDescription',
          type: 'textarea',
          required: true,
          label: 'Who We Are Description',
          admin: {
            description: 'Description text to show for this section',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Our Services Section',
      fields: [
        {
          name: 'servicesImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Services Image',
          admin: {
            description: 'Image for this section',
          },
        },
        {
          name: 'servicesHeading',
          type: 'text',
          required: true,
          label: 'Services Heading',
          admin: {
            description: 'Title to show for this section',
          },
        },
        {
          name: 'servicesDescription',
          type: 'textarea',
          required: true,
          label: 'Services Description',
          admin: {
            description: 'Description text to show for this section',
          },
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 50, // We set this interval for optimal live preview
      },
    },
    max: 50,
  },
}
