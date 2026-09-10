"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export type ServiceCarouselItem = {
  key: string;
  title: string;
  desc: string;
  image: string;
};

function ServiceCard({ item }: { item: ServiceCarouselItem }) {
  return (
    <div className="group relative h-[400px] w-[280px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 sm:h-[440px] sm:w-[340px]">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 640px) 340px, 280px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* gradient overlay, dipertebal di bawah supaya teks tidak menempel ke tepi */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />

      {/* konten teks diangkat dari tepi bawah kartu agar ada ruang napas */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6 pb-8">
        <h3 className="text-lg font-bold leading-snug text-white">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/70">{item.desc}</p>
      </div>
    </div>
  );
}

export function ServicesCarousel({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: ServiceCarouselItem[];
}) {
  // berapa kartu yang "pas" terlihat penuh di layar lebar, sisanya intip di tepi
  const CARD_WIDTH = 340; // samakan dengan lebar ServiceCard pada breakpoint sm ke atas
  const GAP = 24; // gap-6

  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - 1);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const offset = -(index * (CARD_WIDTH + GAP));

  return (
    <section id="layanan" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
          {/* Kiri: heading + link lihat semua, statis (tidak ikut geser) */}
          <div className="pb-10 sm:pb-30">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-md text-pretty leading-7 text-gray-600">
                {description}
              </p>
            )}
          </div>

          {/* Kanan: viewport carousel, kartu berikutnya sengaja terpotong di tepi */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: offset }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
              {items.map((item) => (
                <ServiceCard key={item.key} item={item} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigasi panah, di bawah kanan seperti pada referensi */}
        <div className="mt-10 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Sebelumnya"
            className="flex size-11 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all hover:border-imm-blue hover:bg-imm-blue hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Berikutnya"
            className="flex size-11 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all hover:border-imm-blue hover:bg-imm-blue hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
