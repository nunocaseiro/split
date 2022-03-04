/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      include: [options.dir],
      use: [
        "next-swc-loader",
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
};
