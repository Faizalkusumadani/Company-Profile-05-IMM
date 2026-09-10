import { getTranslations, getLocale, getMessages } from "next-intl/server";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import type { Metadata } from "next";
import { coreValuesData } from "@/data/data-core";
import CoreValuesList from "@/components/CoreSection";

const siteUrl = "https://intisukses-mm.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("corevalues.meta");
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "PT Intisukses Mitratama Mandiri",
      url: `${siteUrl}/${locale}/tentang-kami/nilai-nilai Perusahaan`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tentang-kami/nilai-nilai Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/tentang-kami/nilai-nilai Perusahaan`,
        "en-US": `${siteUrl}/en/tentang-kami/nilai-nilai Perusahaan`,
      },
    },
  };
}

interface CoreValueText {
  title: string;
  description: string;
}

export default async function Nilai_NilaiPage() {
  const t = await getTranslations();
  const messages = await getMessages();

  const coreValuesMessages = (
    messages as {
      corevalues: Record<string, CoreValueText> & { heading: string };
    }
  ).corevalues;

  const items = coreValuesData
    .map(({ id, accentColor }) => {
      const value = coreValuesMessages?.[id];

      if (!value) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `[nilai-nilai] Key "coreValues.${id}" tidak ditemukan di file translation. ` +
              `Pastikan key ini ada di messages/id.json dan messages/en.json.`,
          );
        }
        return null;
      }

      return {
        id,
        accentColor,
        title: value.title,
        description: value.description,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="w-full min-h-screen">
      {/* Header Banner */}
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.nilai-nilai")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.nilai-nilai") },
          ]}
        />
      </header>

      <section id="nilai-nilai" className="relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-5%] bottom-1.25 hidden h-120 w-120 opacity-[0.04] md:block lg:right-[2%] lg:bottom-2.5 lg:h-120 lg:w-120"
        >
          <Image
            src="/logo/Logo-icon.png"
            alt="logo-reddmas"
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-16 md:pt-24 pb-20">
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground md:text-6xl">
              {t("corevalues.heading")}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
              {t("corevalues.desc_corevalues")}
            </p>
          </div>

          {/* Dekorasi Tambahan: Membungkus list dengan border-t atau membiarkannya mengalir */}
          <div className="border-t border-gray-300 pt-8  [&_>_div]:pb-8">
            <CoreValuesList items={items} />
          </div>
        </div>
      </section>
    </div>
  );
}
