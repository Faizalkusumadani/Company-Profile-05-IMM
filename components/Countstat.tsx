"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

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

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Membaca preferensi "reduced motion" sebagai external store (tanpa setState di effect).
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

type Props = {
  value: string;
  /** Set false untuk angka yang bukan "jumlah" (mis. tahun berdiri). */
  animate?: boolean;
  duration?: number;
};

export function CountUpStat({ value, animate = true, duration = 1500 }: Props) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const shouldAnimate = animate && !!parsed && !reduceMotion;

  const [display, setDisplay] = useState(() =>
    parsed && animate
      ? formatCount(parsed.prefix, 0, parsed.suffix, parsed.decimals)
      : value,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || !shouldAnimate) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = parsed.target * easeOutCubic(progress);
          setDisplay(
            formatCount(parsed.prefix, current, parsed.suffix, parsed.decimals),
          );
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed, shouldAnimate, duration]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={value}>
      {shouldAnimate ? display : value}
    </span>
  );
}
