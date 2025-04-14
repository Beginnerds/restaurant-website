import NavDesktop from './nav-desktop'
import NavMobile from './nav-mobile'

import { getPayload } from 'payload'
import config from '@payload-config'

const NavBar = async () => {
  const payload = await getPayload({ config })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const logoMedia = siteSettings.logo

  const logoUrl = typeof logoMedia === 'object' && logoMedia?.url ? logoMedia.url : ''
  return (
    <>
      <div className="w-full h-[80px]  md:max-w-7xl mx-auto">
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
