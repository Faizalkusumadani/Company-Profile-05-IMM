import { getTranslations, getLocale } from "next-intl/server";
import PageBreadcrumb from "@/components/Breadcrumb";
import ProdukCatalog from "@/components/ProdukCatalog";
import { getAllProducts } from "@/data/data-produk";
import type { Metadata } from "next";

const siteUrl = "https://intisukses-mm.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("product.meta");
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "PT Intisukses Mitratama Mandiri",
      url: `${siteUrl}/${locale}/produk`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/produk`,
      languages: {
        "id-ID": `${siteUrl}/id/produk`,
        "en-US": `${siteUrl}/en/produk`,
      },
    },
  };
}

export default async function ProdukPage() {
  const t = await getTranslations();
  const products = getAllProducts();

  return (
    <div className="w-full min-h-screen">
      {/* Header Banner */}
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <PageBreadcrumb
          title={t("nav.product")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.product") },
          ]}
        />
      </header>

      <section id="Produk">
        <div className="w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-12">
              <div className="text-center space-y-6">
                <span className="inline-block text-xs sm:text-sm font-semibold text-imm-blue uppercase tracking-[0.18em]">
                  {t("product.tag")}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                  {t("product.header")}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("product.desc")}
                </p>
              </div>
            </div>

            <ProdukCatalog products={products} />
          </div>
        </div>
      </section>
    </div>
  );
}
