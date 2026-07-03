const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@dayunnasgor/ui", "@dayunnasgor/schema"],
  output: "standalone"
}

module.exports = withPWA(nextConfig)
