import type { Tab } from 'payload'

const FEATURED_CATEGORY_ITEMS_LIMIT = 3

const tab: Tab = {
  name: 'featured-section',
  label: 'Featured Items Section',
  fields: [
    {
      name: 'featuredMenuItems',
      label: 'Featured Menu Items',
      type: 'array',
      // dont show popular dish section if no items are present here
      // required:true,
      fields: [
        {
          name: 'featuredMenuItem',
          type: 'relationship',
          relationTo: 'menu-items',
          required: true,
          label: 'Featured Menu Item',
          filterOptions: ({ relationTo }) => {
            return {
              image: {
                exists: true,
              },
            }
          },
        },
      ],
      admin: {
        description: `Items to show in the home page, only items containing an image will be shown here.`,
      },
    },
    {
      name: 'featuredCategoryItems',
      label: 'Featured Category Items',
      type: 'array',
      // dont show popular category section if no items are present ehre
      // required:true,
      fields: [
        {
          name: 'featuredCategoryItem',
          type: 'relationship',
          relationTo: 'menu-categories',
          required: true,
          filterOptions: ({ relationTo }) => {
            return {
              image: {
                exists: true,
              },
            }
          },
        },
      ],
      admin: {
        description: `Select up to ${FEATURED_CATEGORY_ITEMS_LIMIT} items to show in the home page, only items containing an image will be shown here.`,
      },
    },
  ],
}

export default tab
