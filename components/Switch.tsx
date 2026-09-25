"use client";

import { useTransition } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { type Locale } from "@/i18n/routing";

interface LocaleToggleProps {
  currentLocale: Locale;
  /** true saat navbar berubah jadi pill putih solid (isScrolled) — warna
   *  border/teks perlu gelap supaya tetap kontras di atas background putih. */
  isScrolled?: boolean;
  /** true untuk versi mobile — ukuran ikon, teks, dan padding lebih kecil
   *  daripada versi desktop. */
  compact?: boolean;
}

export default function LocaleToggle({
  currentLocale,
  isScrolled = false,
  compact = false,
}: LocaleToggleProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("");

  const isId = currentLocale === "id";

  function toggle() {
    const next: Locale = isId ? "en" : "id";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={`Switch language to ${isId ? "English" : "Bahasa Indonesia"}`}
      title={isId ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      className={`flex items-center rounded-2xl border transition-colors duration-300 disabled:opacity-50 ${
        compact ? "gap-1 px-2 py-1" : "gap-1.5 px-3 py-3"
      } ${
        isScrolled
          ? "border-black/15 bg-white text-foreground/60 hover:border-imm-blue hover:bg-imm-blue hover:text-white shadow-lg shadow-black/15 "
          : "border-white/5 bg-white/60 backdrop-blur-xl text-foreground/70 hover:bg-imm-blue hover:text-white"
      }`}
    >
      <Globe
        className={`${compact ? "h-4 w-4" : "h-6 w-6"} ${isPending ? "animate-pulse" : ""}`}
        strokeWidth={2}
      />
      <span
        className={`font-medium uppercase tracking-wide ${
          compact ? "text-xs" : "text-base"
        }`}
      >
        {currentLocale}
      </span>
    </button>
  );
}
