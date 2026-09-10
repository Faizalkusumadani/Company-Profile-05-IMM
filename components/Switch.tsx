"use client";

import { useTransition } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

interface LocaleToggleProps {
  currentLocale: Locale;
}

export default function LocaleToggle({ currentLocale }: LocaleToggleProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname(); // pathname TANPA prefix locale (next-intl otomatis strip)

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
      className="flex items-center gap-1.5 rounded-full border border-gray-400 bg-gray/8 px-3 py-1.5 text-foreground/70 transition-colors hover:bg-imm-blue hover:text-white disabled:opacity-50"
    >
      <Globe
        className={`h-4 w-4 ${isPending ? "animate-pulse" : ""}`}
        strokeWidth={2}
      />
      <span className="text-[11px] font-semibold uppercase tracking-wide">
        {currentLocale}
      </span>
    </button>
  );
}
