"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoSearch, IoClose, IoSync } from "react-icons/io5";
import produkDetailList, { type Product } from "@/data/data-produk";
import { type Locale } from "@/i18n/routing";

// ─── 1. Sanitasi & util anti-XSS ───────────────────────────────────────────

const MAX_QUERY_LENGTH = 80;

/** Bersihkan input pencarian dari kemungkinan payload XSS. */
function sanitizeQuery(raw: string): string {
  return (
    raw
      // buang seluruh tag html/xml, termasuk yang belum tertutup: <script..., <img onerror=...
      .replace(/<[^>]*>?/g, "")
      // buang karakter yang sering dipakai untuk memecah konteks HTML/JS
      .replace(/[<>"'`;]/g, "")
      // normalisasi whitespace berlebih
      .replace(/\s+/g, " ")
      .trimStart()
      .slice(0, MAX_QUERY_LENGTH)
  );
}

/** Normalisasi string untuk pencocokan (lowercase, trim). */
function normalize(str: string): string {
  return str.toLowerCase().trim();
}

// ─── 2. Tipe hasil pencarian ────────────────────────────────────────────────

type SearchResult = Product & { _matchScore: number };

// ─── 3. Hook debounce sederhana ─────────────────────────────────────────────

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

// Deteksi "sudah mount di client" tanpa setState di dalam effect (lint
// react-hooks/set-state-in-effect). getServerSnapshot mengembalikan false
// saat SSR, getSnapshot mengembalikan true di client — React otomatis
// re-render begitu hydration selesai, tanpa perlu setState manual.
function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

// ─── 4. Highlight aman (render sebagai node React, bukan HTML string) ──────

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;

  const safeQuery = sanitizeQuery(query);
  if (!safeQuery) return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerQuery = safeQuery.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);

  if (idx === -1) return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + safeQuery.length);
  const after = text.slice(idx + safeQuery.length);

  return (
    <>
      {before}
      <mark className="bg-amber-200/70 text-inherit rounded-sm px-0.5">
        {match}
      </mark>
      {after}
    </>
  );
}

// ─── 5. Label kategori (untuk badge) ────────────────────────────────────────

const CATEGORY_LABEL: Record<Product["category"], string> = {
  ac: "Ac",
  hepa: "Hepa Filter",
  chiller: "Chiller",
};

// ─── 6. Tombol trigger di navbar ───────────────────────────────────────────

function SearchTriggerButton({
  onClick,
  isScrolled,
  compact = false,
}: {
  onClick: () => void;
  isScrolled: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Buka pencarian produk"
      className={`flex items-center justify-center rounded-2xl border transition-colors duration-300 ${
        compact ? "p-1" : "p-3"
      } ${
        isScrolled
          ? "border-black/15 bg-white text-foreground/60 hover:border-imm-blue hover:bg-imm-blue hover:text-white shadow-lg shadow-black/15 "
          : "border-white/5 bg-white/60 backdrop-blur-xl text-foreground/70 hover:bg-imm-blue hover:text-white"
      }`}
    >
      <IoSearch className={compact ? "h-4 w-4" : "h-6 w-6"} aria-hidden />
    </button>
  );
}

// ─── 7. Modal pencarian ─────────────────────────────────────────────────────

function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const t = useTranslations("product");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [rawInput, setRawInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  // Query yang sudah disanitasi — satu-satunya nilai yang dipakai untuk
  // pencarian & highlight, tidak pernah rawInput mentah.
  const cleanQuery = useMemo(() => sanitizeQuery(rawInput), [rawInput]);
  const debouncedQuery = useDebouncedValue(cleanQuery, 200);

  // Derived value langsung dari state yang ada — bukan state sendiri,
  // supaya tidak perlu setState di dalam effect (hindari cascading
  // render / lint react-hooks/set-state-in-effect).
  const isSearching = cleanQuery !== debouncedQuery && cleanQuery.length > 0;

  const [prevQuery, setPrevQuery] = useState(debouncedQuery);
  if (debouncedQuery !== prevQuery) {
    setPrevQuery(debouncedQuery);
    setActiveIndex(-1);
  }

  // ── Auto-focus input & lock scroll body saat modal terbuka ──
  useEffect(() => {
    inputRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // ── Pencarian produk ──
  const results: SearchResult[] = useMemo(() => {
    const q = normalize(debouncedQuery);
    if (!q) return [];

    const scored: SearchResult[] = [];

    for (const product of produkDetailList) {
      const haystacks = [
        normalize(product.name),
        normalize(product.namaBrand),
        normalize(product.slug),
        normalize(CATEGORY_LABEL[product.category]),
        normalize(t(product.descKey)),
      ];

      let score = -1;
      for (const h of haystacks) {
        if (h === q) {
          score = Math.max(score, 100); // exact match
        } else if (h.startsWith(q)) {
          score = Math.max(score, 75); // prefix match
        } else if (h.includes(q)) {
          score = Math.max(score, 50); // substring match
        }
      }

      if (score > 0) {
        scored.push({ ...product, _matchScore: score });
      }
    }

    return scored.sort((a, b) => b._matchScore - a._matchScore).slice(0, 8);
  }, [debouncedQuery, t]);

  const goToProduct = useCallback(
    (product: Product) => {
      onClose();
      router.push(product.href);
    },
    [router, onClose],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[activeIndex] ?? results[0];
      if (chosen) goToProduct(chosen);
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-slate-900/40 px-4 pt-24 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian produk"
    >
      <div
        ref={panelRef}
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* ── Input ── */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <IoSearch className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="product-search-listbox"
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            maxLength={MAX_QUERY_LENGTH}
            placeholder={t("result-01")}
            value={rawInput}
            onChange={(e) => setRawInput(sanitizeQuery(e.target.value))}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          {isSearching && (
            <IoSync
              className="h-4 w-4 shrink-0 animate-spin text-slate-300"
              aria-hidden
            />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pencarian"
            className="shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        {/* ── Hasil ── */}
        <ul
          id="product-search-listbox"
          role="listbox"
          className="max-h-104 overflow-y-auto p-2"
        >
          {debouncedQuery.length === 0 ? (
            <li className="px-4 py-10 text-center text-sm text-slate-400">
              {t("header-result")}
            </li>
          ) : results.length === 0 ? (
            <li className="px-4 py-10 text-center text-sm text-imm-red">
              {t("tag")} “{debouncedQuery}” {t("error")}
            </li>
          ) : (
            results.map((product, i) => (
              <li
                key={product.id}
                role="option"
                aria-selected={i === activeIndex}
              >
                <button
                  type="button"
                  onClick={() => goToProduct(product)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === activeIndex ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      <HighlightedText
                        text={product.name}
                        query={debouncedQuery}
                      />
                    </p>
                    <p className="truncate text-xs text-imm-muted">
                      <HighlightedText
                        text={t(product.descKey)}
                        query={debouncedQuery}
                      />
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-imm-blue">
                    {CATEGORY_LABEL[product.category]}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

interface ProductSearchProps {
  currentLocale: Locale;
  isScrolled?: boolean;
  compact?: boolean;
}

// ─── 8. Komponen utama (export default) ────────────────────────────────────

export default function ProductSearch({
  isScrolled = false,
  compact = false,
}: ProductSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Portal hanya boleh dipakai setelah mount di client (document belum
  // tentu ada saat SSR).
  const mounted = useIsMounted();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Shortcut opsional: buka modal dengan "/" saat tidak sedang mengetik
  // di elemen form lain.
  useEffect(() => {
    function handleGlobalKeyDown(e: globalThis.KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <>
      <SearchTriggerButton
        onClick={open}
        isScrolled={isScrolled}
        compact={compact}
      />

      {mounted &&
        isOpen &&
        createPortal(<SearchModal onClose={close} />, document.body)}
    </>
  );
}
