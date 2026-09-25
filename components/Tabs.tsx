"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Product, ProductVariant } from "@/data/data-produk";

// ─── Ikon (inline SVG, tanpa dependency tambahan) ──────────────────────────
const ICONS = {
  Settings: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Layers: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Phone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  Check: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.7 7.7-5.4 5.4a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 1 1 1.4-1.4l1.9 1.9 4.7-4.7a1 1 0 0 1 1.4 1.4Z"
        clipRule="evenodd"
      />
    </svg>
  ),
} as const;

type TabId = "fitur" | "tipe" | "kontak";
type Accent = "red" | "blue";

const ACCENT_STYLES: Record<
  Accent,
  {
    activeText: string;
    activeBorder: string;
    activeBackground: string;
    ring: string;
  }
> = {
  red: {
    activeText: "text-rose-500",
    activeBorder: "border-rose-500",
    activeBackground: "bg-gray-50",
    ring: "focus-visible:ring-rose-400",
  },
  blue: {
    activeText: "text-imm-blue",
    activeBorder: "border-imm-blue",
    activeBackground: "bg-gray-50",
    ring: "focus-visible:ring-imm-blue",
  },
};

// ─── Panel: daftar fitur (checklist, tanpa kotak, 3 kolom di desktop) ──────
function FeatureList({
  features,
  heading,
}: {
  features: string[];
  heading: string;
}) {
  if (!features.length)
    return <EmptyState text="Belum ada spesifikasi untuk produk ini." />;
  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-foreground sm:text-xl">
        {heading}
      </h3>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 h-5 w-5 shrink-0 text-rose-500">
              {ICONS.Check}
            </span>
            <span className="text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Panel: grid varian/tipe ────────────────────────────────────────────────
function VariantGrid({ variants }: { variants: ProductVariant[] }) {
  if (!variants.length)
    return <EmptyState text="Belum ada tipe/varian untuk produk ini." />;
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
              {variant.size && <span>Ukuran: {variant.size}</span>}
              {variant.color && <span>Warna: {variant.color}</span>}
              {variant.weight && <span>Berat: {variant.weight}</span>}
            </div>
            {variant.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400">
                {variant.description}
              </p>
            )}
            {typeof variant.price === "number" && (
              <p className="mt-2 text-sm font-semibold text-imm-blue">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(variant.price)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Panel: kontak ──────────────────────────────────────────────────────────
function ContactPanel({
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        <span className="h-5 w-5">{ICONS.Phone}</span>
      </div>
      <div>
        <h4 className="text-lg font-bold text-foreground">{title}</h4>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 rounded-full bg-imm-blue px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        {ctaLabel}
      </a>
    </div>
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
  const tProduct = useTranslations("product");
  const features = produk.featuresKeys.map((key) => tProduct(key));
  const variants = produk.variants ?? [];

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    features.length > 0 && {
      id: "fitur" as const,
      label: tProduct("tab-menu-01"),
      icon: ICONS.Settings,
    },
    variants.length > 0 && {
      id: "tipe" as const,
      label: tProduct("tab-menu-02"),
      icon: ICONS.Layers,
    },
    {
      id: "kontak" as const,
      label: tProduct("tab-menu-03"),
      icon: ICONS.Phone,
    },
  ].filter(Boolean) as { id: TabId; label: string; icon: React.ReactNode }[];

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
      {/* Tab list — gaya underline, simpel & scrollable di mobile */}
      <div
        role="tablist"
        aria-label="Informasi produk"
        className="flex gap-2 overflow-x-auto border-b border-gray-200 sm:gap-3"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === active;
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
                "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-lg border-b-2 px-3 pb-3 pt-2 text-sm sm:text-base font-medium outline-none transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-offset-2",
                style.ring,
                isActive
                  ? `${style.activeBorder} ${style.activeText} ${style.activeBackground}`
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700",
              ].join(" ")}
            >
              <span className="h-4 w-4 shrink-0">{tab.icon}</span>
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
            heading={`${tProduct("tab-content-01")}`}
          />
        )}
        {active === "tipe" && <VariantGrid variants={variants} />}
        {active === "kontak" && (
          <ContactPanel
            title={`Tertarik dengan ${produk.namaBrand}?`}
            description="Konsultasikan dengan tim profesional kami untuk kebutuhan proyek konstruksi Anda."
            ctaHref={contactHref}
            ctaLabel="Hubungi Kami"
          />
        )}
      </div>
    </div>
  );
}
