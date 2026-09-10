import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 65, 70, 75, 80, 100],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
