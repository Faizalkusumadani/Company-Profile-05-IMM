"use client";

import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  TbAirConditioning,
  TbFilter,
  TbLayoutGrid,
  TbSnowflake,
} from "react-icons/tb";
import type { ProductCategory } from "@/data/data-produk";

export type CategoryKey = "all" | ProductCategory;

const NAMESPACE = "product";
export const CATEGORY_OPTIONS: { key: CategoryKey; icon: IconType }[] = [
  { key: "all", icon: TbLayoutGrid },
  { key: "ac", icon: TbAirConditioning },
  { key: "chiller", icon: TbSnowflake },
  { key: "hepa", icon: TbFilter },
];

// Pengganti CATEGORY_BADGE_LABEL: pakai hook ini di komponen yang menampilkan badge kategori.
// Contoh: const badgeLabel = useCategoryLabels(); ... {badgeLabel[product.category]}
export function useCategoryLabels(): Record<CategoryKey, string> {
  const t = useTranslations(NAMESPACE);

  return {
    all: t("categories.all"),
    ac: t("categories.ac"),
    chiller: t("categories.chiller"),
    hepa: t("categories.hepa"),
  };
}

type Props = {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
  counts: Record<string, number>;
};

export default function CategoryFilter({ active, onChange }: Props) {
  const labels = useCategoryLabels();

  return (
    <div
      role="tablist"
      aria-label="Filter kategori produk"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {CATEGORY_OPTIONS.map(({ key, icon: Icon }) => {
        const isActive = active === key;

        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={[
              "group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2",
              isActive
                ? "border-imm-blue bg-imm-blue text-white shadow-sm shadow-gray-200"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-50 text-imm-blue",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            {labels[key]}
          </button>
        );
      })}
    </div>
  );
}
