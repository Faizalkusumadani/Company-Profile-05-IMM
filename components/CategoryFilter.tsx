"use client";

import type { ProductCategory } from "@/data/data-produk";

export type CategoryKey = "all" | ProductCategory;

type CategoryOption = {
  key: CategoryKey;
  label: string;
  icon: React.ReactNode;
};

// Ikon: stroke konsisten 1.75, rounded cap/join — terasa lebih "dibuat", bukan default.
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <rect
      x="3.5"
      y="3.5"
      width="7"
      height="7"
      rx="2"
      className="fill-current"
    />
    <rect
      x="13.5"
      y="3.5"
      width="7"
      height="7"
      rx="2"
      className="fill-current opacity-45"
    />
    <rect
      x="3.5"
      y="13.5"
      width="7"
      height="7"
      rx="2"
      className="fill-current opacity-45"
    />
    <rect
      x="13.5"
      y="13.5"
      width="7"
      height="7"
      rx="2"
      className="fill-current"
    />
  </svg>
);

const AcIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <rect x="2.5" y="5.5" width="19" height="6.5" rx="2" />
    <path d="M6.5 12v2.2M11 12v3.2M15.5 12v2.2M19 12v3.2" />
    <path d="M4 19.2c1-1.1 2-1.1 3 0s2 1.1 3 0 2-1.1 3 0 2 1.1 3 0" />
  </svg>
);

const ChillerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M12 3v18M5 6.5l14 11M19 6.5L5 17.5" />
    <path d="M12 3l-1.8 1.8M12 3l1.8 1.8M12 21l-1.8-1.8M12 21l1.8-1.8" />
    <path d="M5 6.5l2.5.6M5 6.5l.6-2.5M19 17.5l-2.5-.6M19 17.5l-.6 2.5" />
  </svg>
);

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M4 6h16M4 6a2 2 0 1 0 0 .01" />
    <path d="M8 12h12M8 12a2 2 0 1 1-.01 0" />
    <path d="M4 18h16M4 18a2 2 0 1 0 0 .01" />
  </svg>
);

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { key: "all", label: "Semua", icon: <GridIcon /> },
  { key: "ac", label: "AC", icon: <AcIcon /> },
  { key: "chiller", label: "Chiller", icon: <ChillerIcon /> },
  { key: "hepa", label: "Hepa Filter", icon: <FilterIcon /> },
];

export const CATEGORY_BADGE_LABEL: Record<ProductCategory, string> = {
  ac: "AC",
  chiller: "Chiller",
  hepa: "Hepa Filter",
};

type Props = {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
  counts: Record<string, number>;
};

export default function CategoryFilter({ active, onChange, counts }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filter kategori produk"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {CATEGORY_OPTIONS.map((opt) => {
        const isActive = active === opt.key;
        const count = counts[opt.key] ?? 0;

        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.key)}
            className={[
              "group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2",
              isActive
                ? "border-imm-blue bg-imm-blue text-white shadow-sm shadow-gray-200"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-6 w-6 items-center justify-center rounded-full",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-50 text-imm-blue",
              ].join(" ")}
            >
              {opt.icon}
            </span>
            {opt.label}
            <span
              className={[
                "rounded-full px-1.5 py-0.5 text-xs",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500",
              ].join(" ")}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
