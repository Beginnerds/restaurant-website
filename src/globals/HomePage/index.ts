import type { GlobalConfig } from 'payload'
import HeroTab from './tabs/hero'
import FeaturedTab from './tabs/featured'
import TestimonialsTab from './tabs/testimonials'
import ServicesTab from './tabs/services'
import { authenticated } from '@/access/authenticated'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page Settings',
  access: {
    read: authenticated,
    update: authenticated,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [HeroTab, FeaturedTab, TestimonialsTab, ServicesTab],
    },
  ],
}
