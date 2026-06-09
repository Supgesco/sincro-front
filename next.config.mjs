/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath: isProd ? '/sincro-front' : '',
  assetPrefix: isProd ? '/sincro-front/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/sincro-front' : '',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(isProd && { output: 'export' }),
  images: {
    unoptimized: true,
  }
}

export default nextConfig
