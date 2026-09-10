import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import PageBreadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";

const siteUrl = "https://intisukses-mm.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("karir.meta");
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "PT Intisukses Mitratama Mandiri",
      url: `${siteUrl}/${locale}/karir`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/karir`,
      languages: {
        "id-ID": `${siteUrl}/id/karir`,
        "en-US": `${siteUrl}/en/karir`,
      },
    },
  };
}

export default async function LayananlPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      {/* Header Banner */}
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <PageBreadcrumb
          title={t("nav.career")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.career") },
          ]}
        />
      </header>

      {/* Kontainer Utama - Diubah dari <article> menjadi <main> */}
      <section id="karir">
        <div className="w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4 mb-12 sm:mb-16">
              <span className="inline-block text-xs sm:text-sm font-semibold text-imm-blue uppercase tracking-[0.18em]">
                {t("karir.tag")}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {t("karir.header")}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("karir.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
