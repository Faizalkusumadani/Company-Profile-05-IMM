import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 65, 70, 75, 80, 100],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
