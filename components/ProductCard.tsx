"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Product } from "@/data/data-produk";
import { useCategoryLabels } from "./CategoryFilter";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const t = useTranslations("product");
  const categoryLabels = useCategoryLabels();

  // itemsBadge dari data tetap diprioritaskan; fallback-nya sekarang diterjemahkan
  const itemsLabel =
    product.itemsBadge ?? t("itemsCount", { count: product.variants.length });
  const categoryLabel = categoryLabels[product.category];

  return (
    <Link
      href={product.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 w-full bg-gray-100">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
          {itemsLabel}
        </span>
        <Image
          src={product.gambarUtama}
          alt={product.namaBrand}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-base font-bold text-foreground">
          {product.namaBrand}
        </h3>
        <span className="text-xs font-medium text-imm-blue">
          {categoryLabel}
        </span>
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
          {t(product.descKey)}
        </p>
      </div>
    </Link>
  );
}
