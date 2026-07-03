const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@dayunnasgor/ui", "@dayunnasgor/schema"],
  output: "standalone"
}

module.exports = withPWA(nextConfig)
