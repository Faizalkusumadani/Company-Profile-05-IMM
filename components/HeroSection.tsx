"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, animate, type Variants } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const HERO_IMAGE_SRC = "/background/Hero-Section.webp";
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function parseStatValue(value: string) {
  const match = value.match(/\d+(?:[.,]\d+)?/);
  if (!match || match.index === undefined) return null;

  const numericStr = match[0];
  const normalized = numericStr.replace(",", ".");
  const decimals = normalized.includes(".")
    ? normalized.split(".")[1].length
    : 0;

  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + numericStr.length),
    target: parseFloat(normalized),
    decimals,
  };
}

function formatCount(
  prefix: string,
  current: number,
  suffix: string,
  decimals: number,
) {
  const num =
    decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
  return `${prefix}${num}${suffix}`;
}

function CountUpStat({ value }: { value: string }) {
  const parsed = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(() =>
    parsed
      ? formatCount(parsed.prefix, 0, parsed.suffix, parsed.decimals)
      : value,
  );

  useEffect(() => {
    if (!parsed || !isInView) return;

    const controls = animate(0, parsed.target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(
          formatCount(parsed.prefix, latest, parsed.suffix, parsed.decimals),
        );
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  // No number found in the string (rare) — just render as-is.
  if (!parsed) return <span ref={ref}>{value}</span>;

  return <span ref={ref}>{display}</span>;
}

export function HeroSection() {
  const t = useTranslations();
  const stats = [
    { label: t("stat.label_01"), value: "15" },
    { label: t("stat.label_02"), value: "550+" },
    { label: t("stat.label_03"), value: "2016" },
    { label: t("stat.label_04"), value: "40+" },
  ];
  return (
    <section className="relative isolate">
      <div className="relative min-h-140 w-full overflow-hidden sm:min-h-170 lg:min-h-200">
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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={container}
              className="max-w-4xl"
            >
              <motion.h1
                variants={item}
                className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                {t("hero.label_01")}
                <br />
                {t("hero.label_02")}
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg"
              >
                {t("hero.desc")}
              </motion.p>

              <motion.div variants={item} className="mt-9">
                <Link
                  href="#kontak"
                  className="inline-flex items-center gap-2 rounded-full bg-imm-blue px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#073A66]"
                >
                  <PhoneCall className="h-4 w-4" />
                  {t("hero.cta")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Kartu spesifikasi mengambang — lebar & margin disamakan dengan container hero di atas agar selaras */}
      <div className="relative z-10 mx-auto -mt-12 w-full max-w-7xl px-6 sm:-mt-16 sm:px-10">
        <div className="rounded-2xl border border-gray-300 bg-white shadow-xl shadow-black/10">
          <div className="overflow-hidden rounded-2xl backdrop-blur">
            <div className="grid grid-cols-2 divide-y divide-gray-300 text-foreground sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-6 py-7 text-center sm:px-8 sm:py-9"
                >
                  <div className="text-xs uppercase tracking-[0.14em] text-gray-600">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-xl font-bold sm:text-2xl">
                    <CountUpStat value={stat.value} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
