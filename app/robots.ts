import type { MetadataRoute } from "next";

const baseUrl = "https://intisukses-mm.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/ruby", "/forgot-password", "/*/imm"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
