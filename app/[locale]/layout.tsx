import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Pageloader from "@/components/PageLoader";
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

// ─── Site Config ──────────────────────────────────────────────────────────────
const siteConfig = {
  url: "https://intisukses-mm.com",
  name: "Intisukses Mitratama Mandiri",
  shortName: "Intisukses Mitratama Mandiri",
  description:
    "PT Intisukses Mitratama Mandiri merupakan perusahaan Layanan Jasa instalasi, pemeliharaan dan perawatan HVACR di indonesia",
  ogImage: "/logo/og-image.png",
  logo: "/logo/logo-imm.png",
  themeColor: "#ffffff",
} as const;

// ─── Viewport ──────────────────
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: siteConfig.themeColor,
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Merupakan perusahaan Layanan Jasa instalasi, pemeliharaan dan perawatan HVACR di indonesia`,
    template: `${siteConfig.name} | %s`,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Merupakan perusahaan Layanan Jasa instalasi, pemeliharaan dan perawatan HVACR di indonesia`,
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
    title: `${siteConfig.name} | Merupakan perusahaan Layanan Jasa HVAC instalasi dan service di indonesia`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
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

  return (
    <html lang={locale} className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Pageloader />
          <Navbar locale={locale as Locale} />
          <main className="bg-white min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
