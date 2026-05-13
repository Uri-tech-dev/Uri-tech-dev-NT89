import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uurii.next.erxes.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tic.next.erxes.io",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
