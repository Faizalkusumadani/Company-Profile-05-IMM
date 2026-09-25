import type { MetadataRoute } from "next";
import { produkDetailList } from "@/data/data-produk";

const BASE_URL = "https://www.intisukses-mm.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 1,
    },

    // Tentang Kami
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tentang-kami/profil-perusahaan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tentang-kami/visi-misi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tentang-kami/nilai-nilai`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tentang-kami/manajemen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Produk (index)
    {
      url: `${BASE_URL}/produk`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Proyek
    {
      url: `${BASE_URL}/proyek`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Layanan
    {
      url: `${BASE_URL}/layanan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/layanan/ac-desain-instalasi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/layanan/hepa-desain-instalasi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/layanan/chiller-desain-instalasi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/layanan/perawatan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Karir
    {
      url: `${BASE_URL}/karir`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },

    // Kontak
    {
      url: `${BASE_URL}/kontak`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Rute produk dinamis, diambil dari data produk (@/data/data-produk)
  const productRoutes: MetadataRoute.Sitemap = produkDetailList.map(
    (product) => ({
      url: `${BASE_URL}/produk/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...productRoutes];
}
