/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static exports for GitHub Pages
  output: 'export',
  // Configure images
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 