import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import PageBreadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import proyekData, { parseProjectDescription } from "@/data/data-project";

const siteUrl = "https://intisukses-mm.com";
const IMAGE_BASE_PATH = "/images/Proyek/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("proyek.meta");

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/proyek`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/proyek`,
      languages: {
        "id-ID": `${siteUrl}/id/proyek`,
        "en-US": `${siteUrl}/en/project`,
      },
    },
  };
}

export default async function ProyekPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      {/* Header Banner */}
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <PageBreadcrumb
          title={t("nav.project")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.project") },
          ]}
        />
      </header>

      <main id="project-main">
        <section id="project" className="w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Intro */}
            <div className="max-w-3xl space-y-4 mb-12 sm:mb-16">
              <span className="inline-block text-xs sm:text-sm font-semibold text-imm-blue uppercase tracking-[0.18em]">
                {t("proyek.hero.badge")}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {t("proyek.hero.title")}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("proyek.hero.desc")}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-400 pt-1">
                {t("proyek.hero.count", { count: proyekData.length })}
              </p>
            </div>

            {/* Grid Proyek */}
            {proyekData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {proyekData.map((item) => {
                  const { text, year } = parseProjectDescription(
                    item.description,
                  );

                  return (
                    <div
                      key={item.id}
                      className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-imm-blue/30 transition-all duration-300"
                    >
                      {/* Gambar */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                        <Image
                          src={`${IMAGE_BASE_PATH}${item.image}`}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      {/* Konten */}
                      <div className="p-5 sm:p-6 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-imm-blue">
                            {item.category}
                          </span>
                          {year && (
                            <span className="text-[11px] font-medium text-gray-400 font-mono">
                              {year}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-imm-blue transition-colors duration-200">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span>{item.location}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 pt-1">
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">{t("proyek.empty")}</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
