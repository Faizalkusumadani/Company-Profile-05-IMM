import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import PageBreadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Zap, Sparkles, Check } from "lucide-react";
import {
  checklistPointKeys,
  scopeOfWorkKeys,
  scopeIcons,
  benefitItems,
} from "@/data/data-pemeliharaan";

const siteUrl = "https://intisukses-mm.com";
const HERO_IMAGE = "/images/cuci-ac.jpeg";
const GALLERY_IMAGE = "/images/gallery/perawatan-AC-01.png";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("pemeliharaan.meta");
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/layanan/pemeliharaan`,
      siteName: "PT Intisukses Mitratama Mandiri",
      images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/layanan/pemeliharaan`,
      languages: {
        "id-ID": `${siteUrl}/id/layanan/pemeliharaan`,
        "en-US": `${siteUrl}/en/layanan/maintenance`,
      },
    },
  };
}

export default async function LayananPemeliharaanPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      {/* Header Banner - PERSIS SESUAI BREADCRUMB ASLI */}
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <PageBreadcrumb
          title={t("nav.services_04")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.services_04") },
          ]}
        />
      </header>

      {/* Kontainer Utama */}
      <main id="layanan-pemeliharaan-main">
        {/* 1. HERO OVERVIEW SECTION                                          */}
        <section
          id="layanan-pemeliharaan"
          className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Kolom Kiri: Teks & Checklist */}
              <div className="lg:col-span-7 space-y-4">
                {/* Badge Tag */}
                <span className="inline-block text-xs sm:text-sm font-semibold text-imm-blue uppercase tracking-[0.18em]">
                  {t("pemeliharaan.tag")}
                </span>

                {/* Judul Utama */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
                  {t("pemeliharaan.header")}
                </h1>

                {/* Deskripsi */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
                  {t("pemeliharaan.desc")}
                </p>

                {/* Checklist Points Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {checklistPointKeys.map((key) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:border-imm-blue/30 hover:bg-white hover:shadow-xs"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-imm-blue/10 text-imm-blue">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span>{t(`pemeliharaan.${key}`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kolom Kanan: Card Gambar dengan Floating Badges */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  {/* Image container */}
                  <div className="relative rounded-3xl shadow-2xl">
                    <div className="relative aspect-4/3 sm:aspect-5/4 lg:aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
                      <Image
                        src={HERO_IMAGE}
                        alt="Teknisi melakukan pembersihan dan pemeliharaan AC"
                        fill
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 95vw, (max-width: 1200px) 45vw, 540px"
                        priority
                      />

                      {/* Subtle natural gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

                      {/* Floating Badge Top Left */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-lg border border-white/40">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-imm-blue/10 text-imm-blue">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 leading-tight">
                            {t("pemeliharaan.badge_01")}
                          </p>
                          <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                            {t("pemeliharaan.badge_02")}
                          </p>
                        </div>
                      </div>

                      {/* Floating Badge Bottom Right */}
                      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5 rounded-xl bg-imm-dark/90 backdrop-blur-md px-4 py-2.5 shadow-xl border border-white/10 text-white">
                        <ShieldCheck className="h-6 w-6 text-imm-orange shrink-0" />
                        <div>
                          <p className="text-[10px] sm:text-[11px] text-gray-300 leading-tight">
                            {t("pemeliharaan.badge_03")}
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
                            {t("pemeliharaan.badge_04")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LINGKUP PEKERJAAN PEMELIHARAAN                                 */}
        <section
          id="lingkup-pemeliharaan"
          className="w-full py-16 sm:py-20 lg:py-24 bg-neutral-50/70 border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block text-xs sm:text-sm font-semibold text-imm-blue uppercase tracking-[0.18em]">
                {t("pemeliharaan.scope_tag")}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {t("pemeliharaan.scope_title")}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("pemeliharaan.scope_desc")}
              </p>
            </div>

            <div className="mt-12 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {scopeOfWorkKeys.map((key, i) => {
                const Icon = scopeIcons[i % scopeIcons.length];
                return (
                  <div
                    key={key}
                    className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-imm-blue/40 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-imm-blue/10 text-imm-blue group-hover:bg-imm-blue group-hover:text-white transition-colors duration-300">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 font-mono">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-imm-blue transition-colors duration-200">
                        {t(`pemeliharaan.${key}_title`)}
                      </h3>

                      <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">
                        {t(`pemeliharaan.${key}_desc`)}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-imm-blue">
                      <span>{t("pemeliharaan.scope_stag")}</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. SECTION BENEFITS (Efisiensi, Kesehatan, Keawetan)             */}
        <section
          id="benefits"
          className="w-full py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
            {/* Bagian Atas: Komitmen Kualitas (Teks Kiri, Gambar Kanan) */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Teks Kiri */}
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block text-xs sm:text-sm font-semibold text-imm-blue uppercase tracking-[0.18em]">
                  {t("pemeliharaan.benefit_tag")}
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-snug">
                  {t("pemeliharaan.benefit_title")}
                </h2>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {t("pemeliharaan.benefit_desc")}
                </p>

                {/* Callout Box Edukasi */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6 flex items-start gap-4">
                  <div className="rounded-xl bg-imm-blue p-2.5 text-white shrink-0 shadow-xs">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">
                      {t("pemeliharaan.benefit_tag_notif")}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {t("pemeliharaan.benefit_content")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gambar Kanan */}
              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 sm:aspect-5/4 lg:aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 group">
                  <Image
                    src={GALLERY_IMAGE}
                    alt="Proses pemeliharaan dan cuci unit AC"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 95vw, (max-width: 1200px) 45vw, 540px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-imm-orange px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {t("pemeliharaan.benefit_img_badge")}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {t("pemeliharaan.benefit_img_title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed">
                      {t("pemeliharaan.benefit_img_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Bawah: 3 Core Benefits (Efisiensi, Kesehatan, Keawetan) */}
            <div className="border-t border-gray-200/80 pt-12 sm:pt-16">
              <div className="max-w-3xl mb-8 sm:mb-12 space-y-4">
                <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-imm-blue">
                  {t("pemeliharaan.benefit_card_01")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {t("pemeliharaan.benefit_card_02")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("pemeliharaan.benefit_card_03")}
                </p>
              </div>

              {/* Grid 3 Kartu Keunggulan */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {benefitItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="group relative flex flex-col justify-between rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-imm-blue/40 transition-all duration-300"
                    >
                      <div>
                        {/* Header Kartu: Icon & Badge */}
                        <div className="flex items-center justify-between gap-4 mb-6">
                          <span
                            className={`flex h-13 w-13 items-center justify-center rounded-2xl ${item.colorClass} transition-transform duration-300 group-hover:scale-110 shadow-xs`}
                          >
                            <Icon className="h-6 w-6" />
                          </span>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${item.badgeClass}`}
                          >
                            {t(`pemeliharaan.benefit_${item.id}_tag`)}
                          </span>
                        </div>

                        {/* Judul Benefit */}
                        <h4 className="text-xl font-bold text-foreground group-hover:text-imm-blue transition-colors duration-200">
                          {t(`pemeliharaan.benefit_${item.id}_title`)}
                        </h4>

                        {/* Deskripsi Benefit */}
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                          {t(`pemeliharaan.benefit_${item.id}_desc`)}
                        </p>

                        <div className="my-6 border-t border-gray-100" />

                        {/* Poin-poin Spesifik */}
                        <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                          {item.pointKeys.map((key) => (
                            <li key={key} className="flex items-center gap-2.5">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </span>
                              <span className="font-medium leading-snug">
                                {t(`pemeliharaan.benefit_${item.id}_${key}`)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer Kartu */}
                      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-imm-blue">
                        <span>{t("pemeliharaan.benefit_card_footer")}</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
