import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations, getLocale } from "next-intl/server";
import { visiMisiData } from "@/data/data-visimisi";

const siteUrl = "https://intisukses-mm.com/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("visiMisi.meta");
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "PT Intisukses Mitratama Mandiri",
      url: `${siteUrl}/${locale}/tentang-kami/visi-misi Perusahaan`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tentang-kami/visi-misi Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/tentang-kami/visi-misi Perusahaan`,
        "en-US": `${siteUrl}/en/tentang-kami/visi-misi Perusahaan`,
      },
    },
  };
}

interface MisiPoint {
  title: string;
  description: string;
}

export default async function Visi_MisiPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-96 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.visi-misi")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.visi-misi") },
          ]}
        />
      </header>
      <section id="visi-misi">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24 space-y-24 md:space-y-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visiMisiData.map(({ id, icon: Icon }) => (
              <div key={id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-imm-blue/10 shrink-0">
                    <Icon className="w-7 h-7 text-imm-blue" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                    {t(`visiMisi.${id}.title`)}
                  </h2>
                </div>

                {id === "visi" && (
                  <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                    {t("visiMisi.visi.description")}
                  </p>
                )}

                {id === "misi" && (
                  <ol className="space-y-8">
                    {(() => {
                      const rawList = t.raw("visiMisi.misi.list");
                      const list: MisiPoint[] = Array.isArray(rawList)
                        ? rawList
                        : Object.values(rawList ?? {});

                      return list.map((point: MisiPoint, idx: number) => (
                        <li key={point.title} className="flex gap-4">
                          <span className="text-foreground font-bold text-lg shrink-0 w-6">
                            {idx + 1}.
                          </span>
                          <div>
                            <p className="text-gray-600 leading-relaxed">
                              {point.description}
                            </p>
                          </div>
                        </li>
                      ));
                    })()}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}
