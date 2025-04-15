import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import Hero from './_components/hero'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const homePageData = await payload.findGlobal({
    slug: 'home-page',
  })

  return (
    <div className="px-4 md:px-8">
      <Hero {...homePageData.hero} />
    </div>
  )
}
