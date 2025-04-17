import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export type CardProps = {
  title: string
  imageUrl: string
  description: string
  price: number
}

const Card: React.FC<CardProps> = ({ title, imageUrl, description, price }) => {
  return (
    <Link
      href={`/menu`}
      className="grow-0 shrink-0 basis-[100%] sm:basis-[50%] md:basis-[33%] min-w-0 max-w-full bg-white rounded-[40px] px-6 sm:px-10 md:px-14 py-8 shadow-lg transition-all hover:shadow-md hover:scale-90 relative"
    >
      <div className="absolute top-0 right-0 w-1/5 h-1/6">
        <svg viewBox="0 0 87 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0H49.5C70.2107 0 87 16.7893 87 37.5V75H42.5C19.0279 75 0 55.9721 0 32.5V0Z"
            fill="#39DB4A"
          />
          <g clipPath="url(#clip0_0_1)">
            <path
              d="M48.5 27.9165C47.3739 27.934 46.2724 28.2484 45.3068 28.8278C44.3411 29.4072 43.5453 30.2312 43 31.2165C42.4546 30.2312 41.6589 29.4072 40.6932 28.8278C39.7275 28.2484 38.626 27.934 37.5 27.9165C35.7049 27.9945 34.0137 28.7798 32.7958 30.1008C31.5778 31.4217 30.9322 33.1711 31 34.9665C31 39.5135 35.786 44.4795 39.8 47.8465C40.6962 48.5997 41.8293 49.0126 43 49.0126C44.1706 49.0126 45.3038 48.5997 46.2 47.8465C50.214 44.4795 55 39.5135 55 34.9665C55.0677 33.1711 54.4221 31.4217 53.2042 30.1008C51.9863 28.7798 50.295 27.9945 48.5 27.9165Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_1">
              <rect width="24" height="24" fill="white" transform="translate(31 26)" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Image
        className="mx-auto h-[300px] w-auto object-contain"
        src={imageUrl}
        alt="food"
        width={300}
        height={400}
      />
      <p className="mt-4 text-black font-semibold text-2xl tracking-tight">{title}</p>
      <p className="mt-4 text-[#555555] font-semibold text-lg line-clamp-1">{description}</p>
      <div className="mt-4 w-full flex items-center justify-between">
        <p className="font-semibold text-black tracking-tight text-2xl">
          <span className="text-lg text-[#ff6868]">₹</span>
          {price}
        </p>

        <span className="flex items-center justify-between gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_97)">
              <path
                d="M1.3268 12.4003L4.8868 15.0003L3.5348 19.1873C3.31631 19.8367 3.31354 20.5393 3.52691 21.1904C3.74027 21.8415 4.15834 22.4062 4.7188 22.8003C5.26965 23.2071 5.93719 23.425 6.62195 23.4216C7.30671 23.4182 7.97204 23.1936 8.5188 22.7813L11.9998 20.2193L15.4818 22.7783C16.0317 23.1828 16.6956 23.4024 17.3782 23.4058C18.0607 23.4091 18.7268 23.1959 19.2806 22.7968C19.8343 22.3977 20.2473 21.8333 20.4601 21.1848C20.6729 20.5362 20.6745 19.8369 20.4648 19.1873L19.1128 15.0003L22.6728 12.4003C23.2219 11.9988 23.6302 11.4341 23.8391 10.7867C24.0481 10.1393 24.0472 9.44249 23.8365 8.79569C23.6258 8.1489 23.216 7.58523 22.6658 7.18521C22.1156 6.78519 21.4531 6.56927 20.7728 6.56831H16.3998L15.0728 2.43231C14.8641 1.78126 14.4541 1.21332 13.9018 0.810371C13.3495 0.407422 12.6835 0.190292 11.9998 0.190292C11.3161 0.190292 10.6501 0.407422 10.0978 0.810371C9.54553 1.21332 9.13548 1.78126 8.9268 2.43231L7.5998 6.56831H3.2308C2.55054 6.56927 1.88799 6.78519 1.33778 7.18521C0.787564 7.58523 0.377837 8.1489 0.167118 8.79569C-0.0436018 9.44249 -0.0445344 10.1393 0.164453 10.7867C0.37344 11.4341 0.781657 11.9988 1.3308 12.4003H1.3268Z"
                fill="#FFE605"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_97">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="">4.9</span>
        </span>
      </div>
    </Link>
  )
}

export default Card
