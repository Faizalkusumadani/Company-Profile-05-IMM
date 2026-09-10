import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import { locations, LocationIcon } from "@/data/data-kontak";
import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Mail, Phone, Download, ArrowUpRight } from "lucide-react";
import Form from "@/components/Form";

const siteUrl = "https://intisukses-mm.com/id";

const iconMap: Record<LocationIcon, React.ElementType> = {
  office: MapPin,
  email: Mail,
  phone: Phone,
  download: Download,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Kontak Perusahaan",
    description: "Kontak Intisukses Mitratama Mandiri yang dapat dihubungi",
    openGraph: {
      title: "Intisukses Mitratama Mandiri | Kontak Perusahaan",
      description: "Kontak Intisukses Mitratama Mandiri yang dapat dihubungi",
      url: `${siteUrl}/${locale}/kontak`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/kontak`,
      languages: {
        "id-ID": `${siteUrl}/id/kontak`,
        "en-US": `${siteUrl}/en/kontak`,
      },
    },
  };
}

export default async function KontakPage() {
  const t = await getTranslations();

  return (
    <div className="w-full py-20">
      <header className="w-full h-64 md:h-106">
        <Breadcrumbs
          title={t("nav.contact")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.contact") },
          ]}
        />
      </header>

      <section id="kontak">
        <div className="max-w-7xl w-full mx-auto px-4 space-y-24">
          {/* ================= Lokasi Kami ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                {t("kontak.location_heading")}
              </h2>
              <p className="mt-3 text-gray-600 max-w-5xl">
                {t("kontak.desc_heading")}
              </p>

              <div className="mt-10 divide-y divide-gray-300">
                {locations.map((loc) => {
                  const Icon = iconMap[loc.icon];
                  const name = t(`kontak.locations.${loc.key}.name`);
                  const isLink = Boolean(loc.href);

                  const rowContent = (
                    <div className="group flex items-center gap-5 py-5">
                      <Icon
                        className="h-5 w-5 shrink-0 text-imm-blue"
                        strokeWidth={1.75}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-normal tracking-wide text-gray-400 hover:text-imm-blue">
                          {name}
                        </p>
                        <p className="mt-0.5 text-base text-foreground leading-relaxed">
                          {loc.value}
                        </p>
                      </div>
                      {isLink && (
                        <ArrowUpRight className="h-4 w-4 text-gray-300 transition-all duration-300 group-hover:text-imm-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </div>
                  );

                  return loc.href ? (
                    <a
                      key={loc.key}
                      href={loc.href}
                      target={loc.icon === "download" ? "_blank" : undefined}
                      rel={
                        loc.icon === "download"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      download={loc.icon === "download"}
                      className="block"
                    >
                      {rowContent}
                    </a>
                  ) : (
                    <div key={loc.key}>{rowContent}</div>
                  );
                })}
              </div>
            </div>

            {/* Kolom kanan: image talent, natural tanpa overlay */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-4/5 w-full max-w-md mx-auto rounded-3xl overflow-hidden ">
                <Image
                  src="/images/CS-.jpeg"
                  alt="Customer Service IMM"
                  fill
                  className="object-contain mask-[linear-gradient(to_bottom,black_80%,transparent_100%)]"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ================= Form Kontak ================= */}
          <div className="mb-4 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              {t("kontak.hero_heading_01")} {""}
              <span className="text-imm-blue">
                {t("kontak.hero_heading_02")}
              </span>
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
              {t("kontak.hero_subtext")}
            </p>
            {/* Form */}
            <Form />
          </div>
        </div>
      </section>
    </div>
  );
}
