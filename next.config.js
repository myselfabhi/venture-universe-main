/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.nasa.gov" },
      { protocol: "https", hostname: "apod.nasa.gov" },
      { protocol: "https", hostname: "**.wikimedia.org" },
      { protocol: "https", hostname: "**.thespacedevs.com" },
      { protocol: "https", hostname: "**.spaceflightnow.com" },
      { protocol: "https", hostname: "**.spacenews.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
