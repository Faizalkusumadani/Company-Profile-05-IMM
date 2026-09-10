import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import ManagementModal from "@/components/Modal";
import { getTranslations, getLocale } from "next-intl/server";
import { modalData } from "@/data/data-BOD";

const siteUrl = "https://intisukses-mm.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("bod.meta");
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "PT Intisukses Mitratama Mandiri",
      url: `${siteUrl}/${locale}/tentang-kami/manajemen`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tentang-kami/manajemen`,
      languages: {
        "id-ID": `${siteUrl}/id/tentang-kami/manajemen`,
        "en-US": `${siteUrl}/en/tentang-kami/manajemen`,
      },
    },
  };
}

export default async function ManajemenPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.manajemen")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.manajemen") },
          ]}
        />
      </header>
      <section id="BOD">
        {/* ── BOD List ── */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24 space-y-24 md:space-y-30">
          {modalData.map((item, index) => {
            // Ambil teks terjemahan berdasarkan key masing-masing anggota
            const position = t(`bod.${item.key}.position`);
            const description = t.raw(
              `bod.${item.key}.description`,
            ) as string[];

            return (
              <React.Fragment key={item.id}>
                {/* Card per anggota */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start py-12">
                  {/* ── Foto ── */}
                  <div className="flex justify-center md:justify-start">
                    <Image
                      src={item.image}
                      width={400}
                      height={500}
                      className="w-64 h-auto bg-gray-200 rounded-lg object-cover shadow-lg"
                      alt={item.name}
                    />
                  </div>

                  {/* ── Konten teks ── */}
                  <div className="md:col-span-2 flex flex-col justify-center space-y-4">
                    {/* Nomor urut + nama */}
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-0.5 leading-tight">
                        {item.name}
                      </h2>
                      {/* Garis aksen di bawah nama */}
                      <div className="flex items-center gap-1.5 mt-2 justify-center md:justify-start">
                        <p className="text-gray-600 font-medium text-sm sm:text-base">
                          {position}
                        </p>
                      </div>
                    </div>

                    {/* Cuplikan deskripsi */}
                    <div className="space-y-2 text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-4 text-center md:text-left">
                      {description.map((desc, i) => (
                        <p key={i}>{desc}</p>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center md:justify-start pt-1">
                      <ManagementModal
                        name={item.name}
                        position={position}
                        image={item.image}
                        description={description}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Separator antara item (tidak muncul setelah item terakhir) ── */}
                {index < modalData.length - 1 && (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    {/* Motif titik di tengah separator */}
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-mas-red" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </main>
      </section>
    </div>
  );
}
