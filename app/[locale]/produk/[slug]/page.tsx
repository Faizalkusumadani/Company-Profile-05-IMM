import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ProductTabs from "@/components/Tabs";
import produkDetailList from "@/data/data-produk";
import PageBreadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";

const siteUrl = "https://intisukses-mm.com/";
const siteName = "PT. Intisukses Mitratama Mandiri";

export async function generateStaticParams() {
  const locales = ["id", "en"];
  return locales.flatMap((locale) =>
    produkDetailList.map((p) => ({ locale, slug: p.slug })),
  );
}

// Generate Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const produk = produkDetailList.find((p) => p.slug === slug);
  if (!produk) return { title: "Produk tidak ditemukan" };

  const tProduct = await getTranslations({ locale, namespace: "product" });

  const title = produk.namaBrand;
  const description = tProduct(produk.descKey);
  const url = `${siteUrl}/${locale}${produk.href}`;
  const ogImage = `${siteUrl}${produk.gambarUtama}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteUrl}/id${produk.href}`,
        en: `${siteUrl}/en${produk.href}`,
      },
    },
    openGraph: {
      title: `${siteName} | ${produk.namaBrand}`,
      description,
      url,
      siteName,
      type: "article",
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: produk.namaBrand },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | ${produk.namaBrand}`,
      description,
      images: [ogImage],
    },
  };
}

// Komponen utama — tambahkan await params
export default async function ProdukDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const produk = produkDetailList.find((p) => p.slug === slug);
  if (!produk) notFound();

  const t = await getTranslations({ locale });
  const tProduct = await getTranslations({ locale, namespace: "product" });

  return (
    <section id={produk.slug}>
      <div className="w-full min-h-screen">
        <header className="relative h-64 md:h-96 flex items-center justify-center">
          <PageBreadcrumb
            title={produk.namaBrand}
            items={[
              { label: t("nav.home"), href: "/" },
              { label: t("nav.product"), href: "/produk" },
              { label: produk.namaBrand },
            ]}
          />
        </header>

        <article className="px-4 sm:px-6 lg:px-8 py-15 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
              <div className="order-1 lg:order-2">
                <div className="relative mx-auto w-full max-w-md rounded-2xl bg-neutral-50 p-6 sm:p-8 group">
                  <div className="aspect-square relative">
                    <Image
                      src={produk.gambarUtama}
                      fill
                      alt={`Produk ${produk.namaBrand}`}
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 400px"
                    />
                  </div>
                </div>
              </div>
              <div className="order-2 lg:order-1 space-y-6">
                <Image
                  src={produk.logoSrc}
                  width={200}
                  height={150}
                  alt={`Logo ${produk.namaBrand}`}
                  className="block"
                  style={{ width: "auto", height: "auto" }}
                />
                <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed text-justify [text-align-last:start]">
                  {tProduct(produk.descKey)}
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="px-4 sm:px-6 lg:px-8 py-15">
          <div className="mx-auto max-w-7xl">
            <ProductTabs produk={produk} accent="red" />
          </div>
        </div>
      </div>
    </section>
  );
}
