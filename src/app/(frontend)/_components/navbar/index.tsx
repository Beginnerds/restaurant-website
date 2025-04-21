import NavDesktop from './nav-desktop'
import NavMobile from './nav-mobile'

import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/live-preview-listener'

const NavBar = async () => {
  const payload = await getPayload({ config })

  const { isEnabled: draft } = await draftMode()

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    draft,
  })

  const logoMedia = siteSettings?.logo

  const logoUrl = typeof logoMedia === 'object' && logoMedia?.url ? logoMedia.url : ''
  return (
    <>
      {draft && <LivePreviewListener />}
      <div className="w-full h-[80px]  mx-auto font-nav bg-background">
        <div className="hidden md:block h-full">
          <NavDesktop logoUrl={logoUrl} />
        </div>
        <div className="md:hidden h-full">
          <NavMobile logoUrl={logoUrl} />
        </div>
      </div>
    </>
  )
}

export default NavBar
