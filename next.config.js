/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }); // 针对 SVG 的处理规则

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/donate3',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
