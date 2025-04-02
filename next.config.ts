/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        port: "",
        pathname: "/apod/image/**",
      },
    ],
  },
};

module.exports = nextConfig;