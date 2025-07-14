import { withPayload } from '@payloadcms/next/withPayload'

// Turn S3_ENDPOINT into just the hostname
const SUPABASE_HOST = new URL(
  process.env.S3_ENDPOINT ??
  'https://rixfzzingeadnwvljrah.supabase.co/storage/v1/s3'
).host; // => 'rixfzzingeadnwvljrah.supabase.co'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: SUPABASE_HOST,
        // Either of the two pathname patterns below will work:
        pathname: '/storage/v1/**',                        // ← simplest, covers every bucket
        // pathname: `/storage/v1/s3/${process.env.S3_BUCKET}/**`, // only that bucket
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
