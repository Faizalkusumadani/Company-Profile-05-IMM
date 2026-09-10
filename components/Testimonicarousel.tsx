"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Opsional — URL foto. Kalau kosong, otomatis fallback ke inisial nama. */
  avatar?: string;
};

interface TestimonialsCarouselProps {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialsCarousel({
  eyebrow,
  title,
  testimonials,
}: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const mounted = useHydrated();

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");

    const updateCardsPerView = () => {
      if (mqLg.matches) setCardsPerView(3);
      else if (mqSm.matches) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateCardsPerView();
    mqLg.addEventListener("change", updateCardsPerView);
    mqSm.addEventListener("change", updateCardsPerView);
    return () => {
      mqLg.removeEventListener("change", updateCardsPerView);
      mqSm.removeEventListener("change", updateCardsPerView);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || testimonials.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        if (!active) return;
        const index = cardRefs.current.findIndex((el) => el === active.target);
        if (index !== -1) setActiveIndex(index);
      },
      { root: track, rootMargin: "0px -75% 0px 0%", threshold: 0 },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [testimonials.length]);

  const scrollToIndex = (index: number) => {
    const card = cardRefs.current[index];
    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  if (testimonials.length === 0) return null;

  // Total "halaman" dots — bukan total kartu.
  const totalPages = Math.max(1, Math.ceil(testimonials.length / cardsPerView));
  const activePage = Math.min(
    Math.floor(activeIndex / cardsPerView),
    totalPages - 1,
  );
  const isFirst = activePage === 0;
  const isLast = activePage === totalPages - 1;

  const scrollToPage = (page: number) => {
    const index = Math.min(page * cardsPerView, testimonials.length - 1);
    scrollToIndex(index);
  };

  return (
    <section id="testimoni" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-imm-blue">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="relative mt-14">
          {/* Fade edges — memberi isyarat visual bahwa konten bisa di-scroll */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white to-transparent sm:w-16" />

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-card
                className="group relative w-full shrink-0 snap-start rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-imm-blue/30 hover:shadow-xl sm:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)]"
              >
                <Quote
                  className="absolute right-5 top-5 h-8 w-8 text-imm-blue/10"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <div className="flex gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-3.5 w-3.5 fill-current"
                    />
                  ))}
                </div>

                <p className="mt-5 line-clamp-4 min-h-26 text-base leading-relaxed text-gray-600">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-5">
                  {item.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-15 w-15 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full bg-imm-blue/10 text-sm font-bold text-imm-blue">
                      {getInitials(item.name)}
                    </span>
                  )}
                  <div>
                    <div className="text-base font-semibold text-foreground">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-600">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mounted && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => scrollToPage(Math.max(activePage - 1, 0))}
                disabled={isFirst}
                aria-label="Testimoni sebelumnya"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground transition hover:border-imm-blue hover:text-imm-blue disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-foreground/10 disabled:hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Dots — satu dot per halaman, bukan per kartu */}
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Navigasi testimoni"
              >
                {Array.from({ length: totalPages }).map((_, page) => (
                  <button
                    key={page}
                    type="button"
                    role="tab"
                    aria-selected={activePage === page}
                    aria-label={`Ke halaman testimoni ${page + 1}`}
                    onClick={() => scrollToPage(page)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activePage === page
                        ? "w-6 bg-imm-blue"
                        : "w-2 bg-foreground/15 hover:bg-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  scrollToPage(Math.min(activePage + 1, totalPages - 1))
                }
                disabled={isLast}
                aria-label="Testimoni berikutnya"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground transition hover:border-imm-blue hover:text-imm-blue disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-foreground/10 disabled:hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
