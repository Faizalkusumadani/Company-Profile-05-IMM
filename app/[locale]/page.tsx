import { services } from "@/data/data-services";
import { benefits } from "@/data/data-benefits";
import { processSteps } from "@/data/data-process";
import { brandData } from "@/data/data-principle";
import { testimonials } from "@/data/data-testimoni";
import { faqs } from "@/data/data-faq";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { BrandMarquee } from "@/components/Brandmarquee";
import { useTranslations } from "next-intl";
import { ServicesCarousel } from "@/components/Services";
import { TestimonialsCarousel } from "@/components/Testimonicarousel";

const HERO_IMAGE_SRC = "/background/Benefits-image.webp";

export default function Beranda() {
  const t = useTranslations();
  const faqItems = faqs.map(({ key }) => ({
    q: t(`faq.${key}.q`),
    a: t(`faq.${key}.a`),
  }));

  const testimonialItems = testimonials.map(({ key, name }) => ({
    name,
    role: t(`testimonials.${key}.role`),
    quote: t(`testimonials.${key}.quote`),
  }));

  return (
    <div className="w-full min-h-screen">
      {/* HERO */}
      <HeroSection />

      {/* LAYANAN */}
      <ServicesCarousel
        eyebrow={t("home.tag")}
        title={t("home.header")}
        description={t("home.desc")}
        items={services.map(({ key, image }) => ({
          key,
          title: t(`services.${key}.title`),
          desc: t(`services.${key}.desc`),
          image,
        }))}
      />

      {/* KENAPA PILIH KAMI */}
      <section id="keunggulan" className="relative isolate overflow-hidden">
        <div className="relative min-h-140 w-full sm:min-h-170 lg:min-h-200">
          <Image
            src={HERO_IMAGE_SRC}
            alt="Teknisi profesional membersihkan unit AC split di dinding rumah"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />

          {/* Overlay: gelap di kiri untuk kontras teks, foto tetap terlihat di kanan */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0B131A] via-[#0B131A]/70 to-[#0B131A]/10" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0B131A]/85 via-transparent to-transparent" />

          <div className="relative flex h-full min-h-140 items-center sm:min-h-170 lg:min-h-200">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
              <div className="max-w-5xl mb-3">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
                  {t("home_about.tag")}
                </span>
                <h2 className="mt-3 text-balance text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                  {t("home_about.header")}
                </h2>
                <p className="mt-4 max-w-2xl text-pretty leading-7 text-white/70">
                  {t("home_about.desc")}
                </p>
              </div>
              {benefits.map(([Icon, key]) => (
                <div key={key} className="flex items-start gap-5 py-6">
                  <span className="flex size-18 shrink-0 items-center justify-center rounded-xl ">
                    <Icon
                      aria-hidden
                      className="size-15 text-imm-blue"
                      strokeWidth={1.8}
                    />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-xl">
                      {t(`benefits.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {t(`benefits.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ALUR PENGERJAAN */}
      <section id="proses" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
              {t("flow_work.tag")}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("flow_work.header")}
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, i) => (
              <div key={item.step} className="relative pl-0">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-imm-blue/30">
                    {item.step}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-foreground/10 lg:block" />
                  )}
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {t(`flow_work.steps.${item.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {t(`flow_work.steps.${item.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEREK YANG DITANGANI */}
      <BrandMarquee label={t("brands.tag")} brands={brandData} />

      {/* TESTIMONI */}
      <TestimonialsCarousel
        eyebrow={t("home_testi.tag")}
        title={t("home_testi.header")}
        testimonials={testimonialItems}
      />

      {/* FAQ */}
      <section id="faq" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-start">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
              {t("faq.tag")}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {t("faq.header")}
            </h2>
          </div>

          <div className="mt-12 divide-y divide-foreground/10 border-y border-foreground/10">
            {faqItems.map((faq) => (
              <details key={faq.q} className="group py-8">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-semibold text-foreground marker:content-none">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-imm-blue transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-500">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
