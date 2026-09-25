import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Pageloader from "@/components/PageLoader";
import CookieConsent from "@/components/Cookie";
import { routing, type Locale } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Site Config ──────────────────────────────────────────────────────────
const siteConfig = {
  url: "https://intisukses-mm.com",
  name: "Intisukses Mitratama Mandiri",
  shortName: "IMM",
  description:
    "PT Intisukses Mitratama Mandiri merupakan perusahaan Layanan Jasa instalasi, pengadaan dan perawatan HVACR di indonesia",
  ogImage: "/logo/og-image.png",
  logo: "/logo/logo-imm.png",
  themeColor: "#ffffff",
} as const;

const OG_LOCALE_MAP: Record<string, string> = {
  id: "id_ID",
  en: "en_US",
};

// ─── Viewport ──────────────────────────────────────────────────────────────
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: siteConfig.themeColor,
  };
}

// ─── Metadata (locale-aware) ────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pageUrl = `${siteConfig.url}/${locale}`;
  const defaultTitle = `${siteConfig.name} | Merupakan perusahaan Layanan Jasa instalasi, pengadaan dan pemeliharaan HVACR di indonesia`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: defaultTitle,
      template: `${siteConfig.name} | %s`,
    },
    description: siteConfig.description,
    keywords: [
      "Intisukses Mitratama Mandiri",
      "Layanan Jasa Instalasi, Pemeliharaan dan Perawatan HVACR",
      "Service AC di indonesia",
      "Jasa Pasang AC di indonesia",
      "Instalasi AC di indonesia",
      "Instalasi Hepa Filter di indonesia",
      "Instalasi Chiller di indonesia",
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,

    // Hindari nomor telepon otomatis jadi link di mobile browser
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Isi hanya jika sudah punya kode verifikasi asli dari
    // Google Search Console / Bing Webmaster (lewat env var, jangan hardcode).
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    }),

    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: siteConfig.name,
      locale: OG_LOCALE_MAP[locale] ?? "id_ID",
      title: defaultTitle,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `Banner ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | Merupakan perusahaan Layanan Jasa HVACR instalasi, pengadaan dan service di indonesia`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "id-ID": `${siteConfig.url}/id`,
        "en-US": `${siteConfig.url}/en`,
      },
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.name,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Guard: kalau locale di URL tidak terdaftar (mis. /fr/...), 404
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Wajib dipanggil supaya static rendering per-locale bekerja dengan benar
  setRequestLocale(locale);

  // Dynamic Schema JSON-LD per Locale — tetap di layout karena ini
  // dipakai di semua halaman.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${siteConfig.url}/#organization`,
    description: siteConfig.description,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${siteConfig.url}/${locale}`,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: "+62-21-300-678-68",
    email: "project@intisukses-mm.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Grand Puri Niaga Blok K6 No. 50 JI. Puri Kencana",
      addressLocality: "Jakarta-Barat",
      addressRegion: "DKI Jakarta",
      postalCode: "11610",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.183925463337667,
      longitude: 106.69935959559166,
    },
    // Diperluas sesuai cakupan bisnis (Jabodetabek), bukan cuma Banten
    areaServed: [
      { "@type": "AdministrativeArea", name: "DKI Jakarta" },
      { "@type": "AdministrativeArea", name: "Banten" },
      { "@type": "AdministrativeArea", name: "Jawa Barat" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:30",
    },
    sameAs: ["https://www.instagram.com/intisukses.mm?stkn=a3kwcXpnbzVtc3Nx"],
  };

  const messages = await getMessages();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html lang={locale} className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Pageloader />
          <Navbar locale={locale as Locale} />
          <main className="bg-white min-h-screen">{children}</main>
          <Footer />
          <CookieConsent gaId={gaId} />
        </NextIntlClientProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
