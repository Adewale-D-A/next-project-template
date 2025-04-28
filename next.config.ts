/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
  webpack: (config: any) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
