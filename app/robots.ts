import type { MetadataRoute } from "next";

const baseUrl = "https://sinergimandiriperkasa.co.id/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/ruby", "/forgot-password", " /*/smp"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
