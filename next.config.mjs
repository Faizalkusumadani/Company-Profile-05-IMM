import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    qualities: [60, 65, 70, 75, 80, 85, 90, 100],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
