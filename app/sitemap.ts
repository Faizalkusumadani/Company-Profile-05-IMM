import type { MetadataRoute } from "next";
import { produkDetailList } from "@/data/data-produk";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://intisukses-mm.com";

interface RouteConfig {
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

// ─── Rute Statis Aktual (Sesuai Folder Fisik app/[locale]/...) ────────────────
const staticRoutesConfig: RouteConfig[] = [
  // Beranda
  { path: "", changeFrequency: "weekly", priority: 1.0 },

  // Layanan (Rute aktual sesuai struktur folder)
  { path: "/layanan/ac-instalasi", changeFrequency: "weekly", priority: 0.9 },
  { path: "/layanan/hepa-instalasi", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/layanan/chiller-instalasi",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  { path: "/layanan/maintenance", changeFrequency: "weekly", priority: 0.9 },

  // Produk (Katalog Utama)
  { path: "/produk", changeFrequency: "weekly", priority: 0.8 },

  // Proyek Referensi
  { path: "/proyek", changeFrequency: "weekly", priority: 0.8 },

  // Tentang Kami
  {
    path: "/tentang-kami/profil-perusahaan",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/tentang-kami/visi-misi",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/tentang-kami/nilai-nilai",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/tentang-kami/manajemen",
    changeFrequency: "monthly",
    priority: 0.6,
  },

  // Karir
  { path: "/karir", changeFrequency: "weekly", priority: 0.6 },

  // Kontak
  { path: "/kontak", changeFrequency: "monthly", priority: 0.5 },

  // Kebijakan Privasi
  { path: "/kebijakan", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const { locales } = routing;

  // 1. Generate sitemap rute statis per-locale dengan anotasi hreflang alternates (Standar Google i18n)
  const staticSitemap: MetadataRoute.Sitemap = staticRoutesConfig.flatMap(
    (route) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route.path}`]),
          ),
        },
      })),
  );

  // 2. Generate sitemap rute produk dinamis per-locale dengan anotasi hreflang alternates
  const productSitemap: MetadataRoute.Sitemap = produkDetailList.flatMap(
    (product) => {
      const productPath = `/produk/${product.slug}`;
      return locales.map((locale) => ({
        url: `${BASE_URL}/${locale}${productPath}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${productPath}`]),
          ),
        },
      }));
    },
  );

  return [...staticSitemap, ...productSitemap];
}
