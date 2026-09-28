"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export type ServiceCarouselItem = {
  key: string;
  title: string;
  desc: string;
  image: string;
  href: string;
};

const GAP = 24;
const INITIAL_STEP = 340 + GAP;

// Kelas tombol navigasi dipakai bersama oleh tombol prev dan next.
// - relative z-20: memastikan tombol berada di atas elemen lain di sekitarnya
// - size-12 + touch-manipulation: area sentuh lebih besar dan tanpa jeda 300 ms
const NAV_BUTTON_CLASS =
  "relative z-20 flex size-12 touch-manipulation items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:border-imm-blue hover:bg-imm-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imm-blue aria-disabled:pointer-events-none aria-disabled:opacity-30";

function ServiceCard({ item }: { item: ServiceCarouselItem }) {
  const t = useTranslations();
  return (
    <div className="group relative h-100 w-70 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 sm:h-110 sm:w-85">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 640px) 340px, 280px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6 pb-8">
        <h3 className="text-lg font-bold leading-snug text-white">
          {item.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-white/70">
          {item.desc}
        </p>

        {/* Wrapper CTA.
            Semua efek di bawah hanya aktif di desktop: lebar sm ke atas DAN
            perangkat yang punya hover (sm:[@media(hover:hover)]:).
            - mobile, tablet sentuh: CTA tampil biasa, tanpa animasi/clipping
            - desktop: tinggi CTA menciut (0fr), terbuka saat hover/fokus keyboard,
              sehingga deskripsi terdorong naik saat CTA muncul dari bawah. */}
        <div
          className="grid grid-rows-[1fr]
                     sm:[@media(hover:hover)]:grid-rows-[0fr] sm:[@media(hover:hover)]:opacity-0
                     sm:[@media(hover:hover)]:transition-[grid-template-rows,opacity] sm:[@media(hover:hover)]:duration-300 sm:[@media(hover:hover)]:ease-out
                     sm:[@media(hover:hover)]:group-hover:grid-rows-[1fr] sm:[@media(hover:hover)]:group-hover:opacity-100
                     sm:[@media(hover:hover)]:group-focus-within:grid-rows-[1fr] sm:[@media(hover:hover)]:group-focus-within:opacity-100
                     motion-reduce:transition-none"
        >
          <div className="sm:[@media(hover:hover)]:min-h-0 sm:[@media(hover:hover)]:overflow-hidden">
            <Link
              href={item.href}
              className="mt-3 flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground
                         sm:[@media(hover:hover)]:translate-y-2 sm:[@media(hover:hover)]:transition-transform sm:[@media(hover:hover)]:duration-300 sm:[@media(hover:hover)]:ease-out
                         sm:[@media(hover:hover)]:group-hover:translate-y-0 sm:[@media(hover:hover)]:group-focus-within:translate-y-0
                         motion-reduce:transition-none"
            >
              {t("services.cta")}
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
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
  const [index, setIndex] = useState(0);

  // Hasil pengukuran DOM: lebar satu langkah (kartu + gap) dan jarak geser
  // maksimum agar kartu terakhir berhenti tepat di tepi kanan viewport.
  const [metrics, setMetrics] = useState({
    step: INITIAL_STEP,
    maxOffset: 0,
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Lebar kartu berbeda di mobile (280px) dan sm ke atas (340px), jadi kita
  // ukur dari DOM alih-alih memakai konstanta. ResizeObserver langsung
  // dipanggil sekali saat observe() dimulai, sehingga tidak perlu memanggil
  // setState secara sinkron di dalam effect.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!viewport || !track || !firstCard) return;

    const measure = () => {
      const step = firstCard.offsetWidth + GAP;
      const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setMetrics((prev) =>
        prev.step === step && prev.maxOffset === maxOffset
          ? prev
          : { step, maxOffset },
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(firstCard);
    return () => observer.disconnect();
  }, [items.length]);

  const { step, maxOffset } = metrics;

  // Jumlah klik maksimum sampai kartu terakhir mentok di kanan.
  const maxIndex = maxOffset > 0 ? Math.ceil(maxOffset / step) : 0;

  // Jika layar membesar dan maxIndex mengecil, index otomatis ikut terjepit
  // tanpa perlu effect tambahan.
  const current = Math.min(index, maxIndex);

  // Functional update: klik berturut-turut yang cepat selalu membaca state
  // terbaru, bukan nilai `current` dari render sebelumnya.
  const goPrev = () => setIndex((i) => Math.max(0, Math.min(i, maxIndex) - 1));
  const goNext = () =>
    setIndex((i) => Math.min(maxIndex, Math.min(i, maxIndex) + 1));

  // Klik terakhir tidak melewati batas: track berhenti pas di tepi kanan,
  // bukan menyisakan ruang kosong.
  const offset = -Math.min(current * step, maxOffset);

  const isFirst = current === 0;
  const isLast = current >= maxIndex;

  return (
    <section id="layanan" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
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

          {/* min-w-0 mencegah kolom grid melebar mengikuti isi track */}
          <div ref={viewportRef} className="min-w-0 overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex gap-6"
              animate={{ x: offset }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 32 }
              }
            >
              {items.map((item) => (
                <ServiceCard key={item.key} item={item} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigasi panah. Sengaja memakai aria-disabled, bukan atribut
            `disabled`: Firefox memulihkan state `disabled` pada form control
            setelah reload sehingga DOM tidak lagi sama dengan HTML server
            (hydration mismatch). aria-disabled tidak dipulihkan browser, dan
            fokus keyboard tidak hilang saat tombol mencapai ujung. onClick
            aman karena goPrev/goNext sudah dijepit ke batas. */}
        <div className="relative z-20 mt-10 flex justify-end gap-2.5 pb-4">
          <button
            type="button"
            onClick={goPrev}
            aria-disabled={isFirst}
            aria-label="Sebelumnya"
            className={NAV_BUTTON_CLASS}
          >
            <ArrowLeft className="size-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-disabled={isLast}
            aria-label="Berikutnya"
            className={NAV_BUTTON_CLASS}
          >
            <ArrowRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
