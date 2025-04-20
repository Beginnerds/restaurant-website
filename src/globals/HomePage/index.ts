import type { GlobalConfig } from 'payload'
import HeroTab from './tabs/hero'
import FeaturedTab from './tabs/featured'
import TestimonialsTab from './tabs/testimonials'
import ServicesTab from './tabs/services'
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page Settings',
  access: {
    read: authenticated,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          collection: 'home-page',
          req,
        })

        return path
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [HeroTab, FeaturedTab, TestimonialsTab, ServicesTab],
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
