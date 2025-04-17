import { HomePage } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import SectionLabel from '../ui/section-label'
import SectionTitle from '../ui/section-title'
import SectionDescription from '../ui/section-description'

type Testimonials = HomePage['testimonials']

const TestimonialsSection: React.FC<Testimonials> = (props) => {
  const media = props.image

  const imageUrl = typeof media === 'object' && media?.url ? media.url : ''

  return (
    <section className="w-full mt-24 md:mt-52 flex flex-col justify-start items-center gap-8 md:flex-row md:justify-between md:items-center">
      <Image
        className="w-[300px] sm:w-[400px] lg:w-[500px] h-auto mx-auto"
        src={imageUrl}
        alt="chef-image"
        width={549}
        height={789}
      />{' '}
      <div>
        <SectionLabel>Testimonials</SectionLabel>
        <SectionTitle>{props.heading}</SectionTitle>
        <div className="mt-9">
          <SectionDescription>{props.description}</SectionDescription>
        </div>
        <div className="mt-12 flex flex-col justify-start items-center lg:flex-row lg:justify-start lg:items-center gap-8">
          <div className="flex items-center justify-start">
            <Image
              src={'/testimonial-2.jpg'}
              width={300}
              height={200}
              className="size-20 rounded-full object-cover"
              alt="testimonial-review-image"
            />
            <Image
              src={'/testimonial-1.jpg'}
              width={300}
              height={200}
              className="size-20 rounded-full object-cover -ml-4 border-4 box-content border-white"
              alt="testimonial-review-image"
            />

            <Image
              src={'/testimonial-3.jpg'}
              width={300}
              height={200}
              className="size-20 rounded-full object-cover -ml-4 border-4 box-content border-white"
              alt="testimonial-review-image"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <p className="font-black text-xl">Customer Feedback</p>
            <p className="flex">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_69)">
                  <path
                    d="M1.3268 12.4003L4.8868 15.0003L3.5348 19.1873C3.31631 19.8367 3.31354 20.5393 3.52691 21.1904C3.74027 21.8415 4.15834 22.4062 4.7188 22.8003C5.26965 23.2071 5.93719 23.425 6.62195 23.4216C7.30671 23.4182 7.97204 23.1936 8.5188 22.7813L11.9998 20.2193L15.4818 22.7783C16.0317 23.1828 16.6956 23.4025 17.3782 23.4058C18.0607 23.4091 18.7268 23.1959 19.2806 22.7968C19.8343 22.3978 20.2473 21.8334 20.4601 21.1848C20.6729 20.5362 20.6745 19.8369 20.4648 19.1873L19.1128 15.0003L22.6728 12.4003C23.2219 11.9988 23.6302 11.4341 23.8391 10.7867C24.0481 10.1394 24.0472 9.44251 23.8365 8.79571C23.6258 8.14891 23.216 7.58525 22.6658 7.18523C22.1156 6.7852 21.4531 6.56929 20.7728 6.56832H16.3998L15.0728 2.43232C14.8641 1.78128 14.4541 1.21333 13.9018 0.810386C13.3495 0.407437 12.6835 0.190308 11.9998 0.190308C11.3161 0.190308 10.6501 0.407437 10.0978 0.810386C9.54553 1.21333 9.13548 1.78128 8.9268 2.43232L7.5998 6.56832H3.2308C2.55054 6.56929 1.88799 6.7852 1.33778 7.18523C0.787564 7.58525 0.377837 8.14891 0.167118 8.79571C-0.0436018 9.44251 -0.0445344 10.1394 0.164453 10.7867C0.37344 11.4341 0.781657 11.9988 1.3308 12.4003H1.3268Z"
                    fill="#FFE605"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_69">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="ml-1 text-[#454545] font-semibold text-lg">4.9</span>
              <span className="ml-4 font-medium text-[#807e7e]">{`( 10.5k Reviews)`}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
