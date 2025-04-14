import type { GlobalConfig } from 'payload'
import HeroTab from './tabs/hero'
import FeaturedTab from './tabs/featured'
import TestimonialsTab from './tabs/testimonials'
import ServicesTab from './tabs/services'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page Settings',

  fields: [
    {
      type: 'tabs',
      tabs: [HeroTab, FeaturedTab, TestimonialsTab, ServicesTab],
    },
  ],
}
