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
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE_SRC = "/background/Benefits-image.webp";
const ABOUT_IMAGE_SRC = "/images/instalasi-ac.png";

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

      {/* TENTANG KAMI / ABOUT US */}
      <section
        id="tentang-kami"
        className="w-full py-16 sm:py-20 lg:py-24 border-b border-gray-100 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Teks Kiri */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block text-xs sm:text-sm font-semibold text-imm-blue uppercase tracking-[0.18em]">
                {t("home_profile.tag")}
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-snug">
                Intisukses Mitratama Mandiri
              </h2>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t("home_profile.desc")}
              </p>

              {/* Tombol CTA ke Profil Perusahaan */}
              <div className="pt-3">
                <Link
                  href="/tentang-kami/profil-perusahaan"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-imm-blue px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-imm-blue/20 hover:bg-[#073A66] hover:shadow-lg transition-all duration-200 group"
                >
                  <span>{t("home_profile.cta")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Gambar Kanan */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 sm:aspect-5/4 lg:aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 group">
                <Image
                  src={ABOUT_IMAGE_SRC}
                  alt="teknisi imm"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 95vw, (max-width: 1200px) 45vw, 540px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <ServicesCarousel
        eyebrow={t("home.tag")}
        title={t("home.header")}
        description={t("home.desc")}
        items={services.map(({ key, image, href }) => ({
          key,
          title: t(`services.${key}.title`),
          desc: t(`services.${key}.desc`),
          href,
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
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
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
