"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/data-produk";
import CategoryFilter, { type CategoryKey } from "./CategoryFilter";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProdukCatalog({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: products.length };
    for (const p of products) {
      base[p.category] = (base[p.category] ?? 0) + 1;
    }
    return base;
  }, [products]);

  return (
    <div className="flex flex-col items-center gap-10">
      <CategoryFilter
        active={activeCategory}
        onChange={setActiveCategory}
        counts={counts}
      />

      <p className="text-sm text-gray-500">
        Menampilkan{" "}
        <span className="font-semibold text-rose-500">
          {filteredProducts.length}
        </span>{" "}
        produk
      </p>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="py-12 text-sm text-gray-400">
          Belum ada produk untuk kategori ini.
        </p>
      )}
    </div>
  );
}
