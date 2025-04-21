import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import SocialIcons from './social-icons/social-icons'
import Link from 'next/link'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { draftMode } from 'next/headers'

const Footer = async () => {
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
      {' '}
      {draft && <LivePreviewListener />}
      <footer className="mt-20 pb-10 lg:mt-40 grid grid-cols-2 sm:grid-cols-3  gap-x-2 gap-y-10 sm:gap-y-32 justify-items-center overflow-hidden [p,a]:max-w-full [p,a]:break-words wrap-break-word">
        <div className="max-sm:col-span-full">
          <Image className="mx-auto sm:mx-0" src={logoUrl} alt="logo" width={200} height={200} />
          <p className="mt-10 text-center sm:text-start text-lg font-medium tracking-wider text-[#555555]">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </div>
        <div className="">
          <p className="font-semibold text-xl text-black text-center sm:text-start">Useful Links</p>
          <div className="mt-8 flex flex-col justify-between items-center sm:items-start gap-8">
            <Link href="#home" className="font-medium text-lg text-[#555555]">
              Home
            </Link>
            <Link href="/about" className="font-medium text-lg text-[#555555]">
              About
            </Link>
            <Link href="/menu" className="font-medium text-lg text-[#555555]">
              Menu
            </Link>
            <Link href="#services" className="font-medium text-lg text-[#555555]">
              Services
            </Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-xl text-black text-center sm:text-start">Contact Us</p>
          <div className="mt-8 flex flex-col justify-between items-center sm:items-start gap-8">
            {siteSettings.email && (
              <p className="font-medium text-lg text-[#555555]">{siteSettings.email}</p>
            )}
            {siteSettings.phone && (
              <p className="font-medium text-lg text-[#555555]">{siteSettings.phone}</p>
            )}
            {siteSettings.address && (
              <p className="font-medium text-lg text-[#555555] ">{siteSettings.address}</p>
            )}
          </div>
        </div>
        <div className="max-sm:col-span-full sm:justify-self-start">
          <SocialIcons data={siteSettings['socialLinks']} />
        </div>
        <div className="col-span-full sm:col-span-2 grid place-content-center">
          <p className="text-[#555555]">Copyright 2025 | Developed by Shubham Kalra</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
