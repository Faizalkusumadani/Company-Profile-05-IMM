"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  TbCircleCheckFilled,
  TbLayoutGrid,
  TbListDetails,
  TbPhone,
  TbPhoneCall,
} from "react-icons/tb";
import type { Product, ProductVariant } from "@/data/data-produk";

type TabId = "fitur" | "tipe" | "kontak";
type Accent = "red" | "blue";

type TabItem = { id: TabId; label: string; icon: IconType };

// Semua class ditulis utuh (bukan dirakit) supaya terbaca oleh Tailwind.
const ACCENT_STYLES: Record<
  Accent,
  {
    activeText: string;
    activeBorder: string;
    activeBackground: string;
    ring: string;
    icon: string;
    bar: string;
    contactBg: string;
    contactCta: string;
  }
> = {
  red: {
    activeText: "text-rose-500",
    activeBorder: "border-rose-500",
    activeBackground: "bg-gray-50",
    ring: "focus-visible:ring-rose-400",
    icon: "text-rose-500",
    bar: "bg-rose-500",
    contactBg: "bg-rose-600",
    contactCta: "text-rose-600",
  },
  blue: {
    activeText: "text-imm-blue",
    activeBorder: "border-imm-blue",
    activeBackground: "bg-gray-50",
    ring: "focus-visible:ring-imm-blue",
    icon: "text-imm-blue",
    bar: "bg-imm-blue",
    contactBg: "bg-imm-blue",
    contactCta: "text-imm-blue",
  },
};

type AccentStyle = (typeof ACCENT_STYLES)[Accent];

// ─── Panel: spesifikasi ─────────────────────────────────────────────────────
// Gaya lembar spesifikasi: judul di kiri (sticky di desktop), daftar di kanan
// dipisah garis tipis per baris — bukan kartu, agar terbaca seperti datasheet.
function FeatureList({
  features,
  heading,
  countLabel,
  emptyText,
  style,
}: {
  features: string[];
  heading: string;
  countLabel: string;
  emptyText: string;
  style: AccentStyle;
}) {
  if (!features.length) return <EmptyState text={emptyText} />;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
      <header className="lg:sticky lg:top-28 lg:self-start">
        <h3 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">
          {heading}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{countLabel}</p>
        <div className={`mt-5 h-1 w-12 rounded-full ${style.bar}`} />
      </header>

      <ul className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-2 sm:gap-x-12">
        {features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-3 border-t border-gray-200 py-4"
          >
            <TbCircleCheckFilled
              aria-hidden="true"
              className={`mt-0.5 h-5 w-5 shrink-0 ${style.icon}`}
            />
            <span className="text-sm font-medium leading-snug text-foreground sm:text-[15px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Panel: grid varian/tipe ────────────────────────────────────────────────
function VariantGrid({
  variants,
  emptyText,
  labels,
}: {
  variants: ProductVariant[];
  emptyText: string;
  labels: { size: string; color: string; weight: string };
}) {
  const locale = useLocale();

  if (!variants.length) return <EmptyState text={emptyText} />;

  const formatter = new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {variants.map((variant, i) => (
        <div
          key={variant.id ?? i}
          className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          {variant.image && (
            <div className="relative aspect-square w-full bg-gray-50">
              <Image
                src={variant.image}
                alt={variant.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-6"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-1 p-4">
            <h4 className="text-sm font-bold text-foreground">
              {variant.name}
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
              {variant.size && (
                <span>
                  {labels.size}: {variant.size}
                </span>
              )}
              {variant.color && (
                <span>
                  {labels.color}: {variant.color}
                </span>
              )}
              {variant.weight && (
                <span>
                  {labels.weight}: {variant.weight}
                </span>
              )}
            </div>
            {variant.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400">
                {variant.description}
              </p>
            )}
            {typeof variant.price === "number" && (
              <p className="mt-2 text-sm font-semibold text-imm-blue">
                {formatter.format(variant.price)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Panel: kontak ──────────────────────────────────────────────────────────
// Satu blok berwarna solid sebagai penutup halaman produk: pesan singkat,
// satu tombol aksi yang jelas. Ikon besar di sudut hanya watermark.
function ContactPanel({
  title,
  description,
  ctaHref,
  ctaLabel,
  style,
}: {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  style: AccentStyle;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl px-6 py-10 text-white sm:px-12 sm:py-14 ${style.contactBg}`}
    >
      <TbPhoneCall
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 text-white/10 sm:-right-2 sm:h-80 sm:w-80"
      />

      <div className="relative max-w-2xl">
        <h4 className="text-2xl font-bold leading-tight sm:text-4xl">
          {title}
        </h4>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          {description}
        </p>

        <Link
          href={ctaHref}
          className={`mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:text-base ${style.contactCta}`}
        >
          <TbPhone aria-hidden="true" className="h-5 w-5" />
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-400">
      {text}
    </p>
  );
}

// ─── Komponen utama ─────────────────────────────────────────────────────────
type Props = {
  produk: Product;
  accent?: Accent;
  defaultTab?: TabId;
  contactHref?: string;
};

export default function ProductTabs({
  produk,
  accent = "red",
  defaultTab,
  contactHref = "/kontak",
}: Props) {
  const t = useTranslations("product");
  const features = produk.featuresKeys.map((key) => t(key));
  const variants = produk.variants ?? [];

  const tabs: TabItem[] = [
    ...(features.length > 0
      ? [{ id: "fitur" as const, label: t("tab-menu-01"), icon: TbListDetails }]
      : []),
    ...(variants.length > 0
      ? [{ id: "tipe" as const, label: t("tab-menu-02"), icon: TbLayoutGrid }]
      : []),
    { id: "kontak" as const, label: t("tab-menu-03"), icon: TbPhone },
  ];

  const [active, setActive] = useState<TabId>(
    defaultTab ?? tabs[0]?.id ?? "kontak",
  );
  const style = ACCENT_STYLES[accent];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;

    if (next !== null) {
      e.preventDefault();
      setActive(tabs[next].id);
      document.getElementById(`produk-tab-${tabs[next].id}`)?.focus();
    }
  };

  return (
    <div>
      {/* Tab list — gaya underline, scrollable di mobile */}
      <div
        role="tablist"
        aria-label={t("tabs-aria")}
        className="flex gap-2 overflow-x-auto border-b border-gray-200 sm:gap-3"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === active;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`produk-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`produk-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={[
                "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-lg border-b-2 px-3 pb-3 pt-2 text-sm font-medium outline-none transition-colors duration-200 sm:text-base",
                "focus-visible:ring-2 focus-visible:ring-offset-2",
                style.ring,
                isActive
                  ? `${style.activeBorder} ${style.activeText} ${style.activeBackground}`
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700",
              ].join(" ")}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        key={active}
        id={`produk-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`produk-tab-${active}`}
        tabIndex={0}
        className="mt-8 focus:outline-none sm:mt-10"
      >
        {active === "fitur" && (
          <FeatureList
            features={features}
            heading={t("tab-content-01")}
            countLabel={t("spec-count", { count: features.length })}
            emptyText={t("empty-features")}
            style={style}
          />
        )}
        {active === "tipe" && (
          <VariantGrid
            variants={variants}
            emptyText={t("empty-variants")}
            labels={{
              size: t("variant-size"),
              color: t("variant-color"),
              weight: t("variant-weight"),
            }}
          />
        )}
        {active === "kontak" && (
          <ContactPanel
            title={t("contact-title", { brand: produk.namaBrand })}
            description={t("contact-desc")}
            ctaHref={contactHref}
            ctaLabel={t("contact-cta")}
            style={style}
          />
        )}
      </div>
    </div>
  );
}
