import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import PageBreadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";

const siteUrl = "https://intisukses-mm.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("about.meta");
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "PT Intisukses Mitratama Mandiri",
      url: `${siteUrl}/${locale}/tentang-kami/profil-perusahaan`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tentang-kami/profil-perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/tentang-kami/profil-perusahaan`,
        "en-US": `${siteUrl}/en/tentang-kami/profil-perusahaan`,
      },
    },
  };
}

const officeImages = [
  {
    src: "/images/kantor/2.webp",
    alt: "Lobi Utama & Resepsionis ",
    size: "md:col-span-8 h-[400px]",
  },
  {
    src: "/images/kantor/1.webp",
    alt: "Halaman Utama",
    size: "md:col-span-4 h-[400px]",
  },
  {
    src: "/images/kantor/3.webp",
    alt: "Ruang Rapat Eksekutif & Kemitraan",
    size: "md:col-span-4 h-[320px]",
  },
  {
    src: "/images/kantor/4.webp",
    alt: "Fasilitas Operasional & Ruang Kerja Tim",
    size: "md:col-span-8 h-[320px]",
  },
];

export default async function ProfilPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      {/* Header Banner */}
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <PageBreadcrumb
          title={t("nav.profil")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.profil") },
          ]}
        />
      </header>

      {/* Kontainer Utama - Diubah dari <article> menjadi <main> */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24 space-y-24 md:space-y-36">
        <section id="profile-perusahaan" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-gray-300 pb-16">
            {/* Kiri: Judul & Subtitle */}
            <div className="lg:col-span-5 space-y-3">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
                {t("about.tag_company")}
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground leading-tight">
                {t("about.header_01")}
                <br />
                <span className="font-semibold text-foreground">
                  {t("about.header_02")}
                </span>{" "}
                {t("about.header_03")}
              </h2>
            </div>

            {/* Kanan: Deskripsi Utama */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-justify [text-align-last:start] space-y-3">
                {t
                  .raw("about.ihktisar")
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section id="imm-office" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-200 pb-6">
            <div className="space-y-2">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
                {t("about.tag_office")}
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Intisukses Mitratama Mandiri{" "}
                <span className="font-semibold text-foreground">Office</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-md text-xs md:text-sm font-normal leading-relaxed md:text-right">
              {t("about.desc_office")}
            </p>
          </div>

          {/* Galeri Arsitektur / Fasilitas - Diubah menjadi <ul> dan <li> */}
          <ul className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {officeImages.map((img, idx) => (
              <li
                key={idx}
                className={`relative rounded-xl overflow-hidden border border-gray-300 bg-smp-blue/30 group corporate-shadow ${img.size}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 80vw"
                  className="object-cover filter grayscale contrast-105 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-linear-to-t from-smp-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase font-bold text-imm-blue tracking-wider">
                    {t("about.image-header")}
                  </span>
                  <p className="text-sm font-medium text-white mt-1">
                    {img.alt}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
