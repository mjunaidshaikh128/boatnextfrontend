/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/booking",
        destination: "http://localhost:3000/booking",
      },
    ];
  },
};

module.exports = nextConfig;
