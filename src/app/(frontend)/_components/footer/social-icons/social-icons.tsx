import React from 'react'
import { SiteSetting } from '@/payload-types'
import Link from 'next/link'

type SocialLinkTypeEnum = NonNullable<SiteSetting['socialLinks']>[number]['platform']

const iconsDefault: Record<SocialLinkTypeEnum, any> = {
  facebook: (
    <svg className="size-full" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="29" cy="28.5" rx="29" ry="28.5" fill="#EDFFEF" />
      <path
        d="M36 16H32.1818C30.4941 16 28.8754 16.6704 27.6821 17.8639C26.4886 19.0573 25.8182 20.6759 25.8182 22.3636V26.1818H22V31.2727H25.8182V41.4545H30.9091V31.2727H34.7273L36 26.1818H30.9091V22.3636C30.9091 22.0261 31.0432 21.7024 31.2819 21.4637C31.5205 21.225 31.8443 21.0909 32.1818 21.0909H36V16Z"
        stroke="#484848"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Instagram: (
    <svg className="size-full" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28.5" cy="28.5" r="28.5" fill="#EDFFEF" />
      <path
        d="M28 33.8891C30.7 33.8891 32.8889 31.7002 32.8889 29.0002C32.8889 26.3002 30.7 24.1113 28 24.1113C25.3 24.1113 23.1111 26.3002 23.1111 29.0002C23.1111 31.7002 25.3 33.8891 28 33.8891Z"
        stroke="#484848"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 33.8889V24.1111C17 20.736 19.736 18 23.1111 18H32.8889C36.2639 18 39 20.736 39 24.1111V33.8889C39 37.2639 36.2639 40 32.8889 40H23.1111C19.736 40 17 37.2639 17 33.8889Z"
        stroke="#484848"
        strokeWidth="2.5"
      />
      <path
        d="M34.7222 22.2907L34.7351 22.2764"
        stroke="#484848"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  youtube: (
    <svg className="size-full" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="29" cy="28.5" rx="29" ry="28.5" fill="#EDFFEF" />
      <path
        d="M32.2 28.5855L27.475 31.2855V25.8855L32.2 28.5855Z"
        fill="#484848"
        stroke="#484848"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 29.5403V27.6299C16 23.7212 16 21.7668 17.2224 20.5093C18.4448 19.2518 20.3694 19.1974 24.2184 19.0885C26.0423 19.037 27.9054 19 29.5 19C31.0946 19 32.9578 19.037 34.7816 19.0885C38.6306 19.1974 40.5551 19.2518 41.7776 20.5093C43 21.7668 43 23.7212 43 27.6299V29.5403C43 33.4489 43 35.4033 41.7776 36.6607C40.5551 37.9182 38.6307 37.9726 34.7817 38.0816C32.9578 38.1331 31.0946 38.1701 29.5 38.1701C27.9054 38.1701 26.0422 38.1331 24.2183 38.0816C20.3693 37.9726 18.4448 37.9182 17.2224 36.6607C16 35.4033 16 33.4489 16 29.5403Z"
        stroke="#484848"
        strokeWidth="2.5"
      />
    </svg>
  ),
  x: (
    <svg className="size-full" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="29" cy="28.5" rx="29" ry="28.5" fill="#EDFFEF" />
      <path
        d="M17.0181 20H23.5021L29.2152 28.0973L36.343 20H38.2201L30.0585 29.2655L39 41.9646H32.4821L26.4402 33.3829L18.8681 41.9735H17L25.6037 32.1947L17.0181 20Z"
        fill="#484848"
      />
      <path d="M22.7313 21.4336H19.8112L33.296 40.5398H36.2069L22.7313 21.4336Z" fill="white" />
    </svg>
  ),
}

const iconsAccent: Record<SocialLinkTypeEnum, any> = {
  facebook: (
    <svg className="size-full" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="29" cy="28.5" rx="29" ry="28.5" fill="#39DB4A" />
      <path
        d="M36 16H32.1818C30.4941 16 28.8754 16.6704 27.6821 17.8639C26.4886 19.0573 25.8182 20.6759 25.8182 22.3636V26.1818H22V31.2727H25.8182V41.4545H30.9091V31.2727H34.7273L36 26.1818H30.9091V22.3636C30.9091 22.0261 31.0432 21.7024 31.2819 21.4637C31.5205 21.225 31.8443 21.0909 32.1818 21.0909H36V16Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Instagram: (
    <svg className="size-full" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28.5" cy="28.5" r="28.5" fill="#39DB4A" />
      <path
        d="M28 33.8891C30.7 33.8891 32.8889 31.7002 32.8889 29.0002C32.8889 26.3002 30.7 24.1113 28 24.1113C25.3 24.1113 23.1111 26.3002 23.1111 29.0002C23.1111 31.7002 25.3 33.8891 28 33.8891Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 33.8889V24.1111C17 20.736 19.736 18 23.1111 18H32.8889C36.2639 18 39 20.736 39 24.1111V33.8889C39 37.2639 36.2639 40 32.8889 40H23.1111C19.736 40 17 37.2639 17 33.8889Z"
        stroke="white"
        strokeWidth="2.5"
      />
      <path
        d="M34.7222 22.2907L34.7351 22.2764"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  x: (
    <svg className="size-full" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="29" cy="28.5" rx="29" ry="28.5" fill="#39DB4A" />
      <path
        d="M18.0181 18H24.5021L30.2152 26.0973L37.343 18H39.2201L31.0585 27.2655L40 39.9646H33.4821L27.4402 31.3829L19.8681 39.9735H18L26.6037 30.1947L18.0181 18Z"
        fill="white"
      />
      <path d="M23.7313 19.4336H20.8112L34.296 38.5398H37.2069L23.7313 19.4336Z" fill="#39DB4A" />
    </svg>
  ),
  youtube: (
    <svg className="size-full" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="29" cy="28.5" rx="29" ry="28.5" fill="#39DB4A" />
      <path
        d="M32.2 28.5855L27.475 31.2855V25.8855L32.2 28.5855Z"
        fill="#484848"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 29.5403V27.6299C16 23.7212 16 21.7668 17.2224 20.5093C18.4448 19.2518 20.3694 19.1974 24.2184 19.0885C26.0423 19.037 27.9054 19 29.5 19C31.0946 19 32.9578 19.037 34.7816 19.0885C38.6306 19.1974 40.5551 19.2518 41.7776 20.5093C43 21.7668 43 23.7212 43 27.6299V29.5403C43 33.4489 43 35.4033 41.7776 36.6607C40.5551 37.9182 38.6307 37.9726 34.7817 38.0816C32.9578 38.1331 31.0946 38.1701 29.5 38.1701C27.9054 38.1701 26.0422 38.1331 24.2183 38.0816C20.3693 37.9726 18.4448 37.9182 17.2224 36.6607C16 35.4033 16 33.4489 16 29.5403Z"
        stroke="white"
        strokeWidth="2.5"
      />
    </svg>
  ),
}

const SocialIcons: React.FC<{
  data: SiteSetting['socialLinks']
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-8">
      {data?.map((item, ind) => (
        <Link
          className="size-16 grid place-content-center transition-all hover:scale-95 filter hover:brightness-90"
          href={item.url}
          key={item.id}
          target="_blank"
        >
          {ind == 0 ? iconsAccent[item.platform] : iconsDefault[item.platform]}
        </Link>
      ))}
    </div>
  )
}

export default SocialIcons
