import { PayloadRequest, CollectionSlug, GlobalSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug | GlobalSlug, string>> = {
  'about-page': '/about',
  'home-page': '/',
  'menu-categories': '/menu',
  'menu-items': '/menu',
  'menu-page': '/menu',
  'site-settings': '/',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection }: Props) => {
  const encodedParams = new URLSearchParams({
    collection,
    path: `${collectionPrefixMap[collection]}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
