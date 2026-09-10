"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaChevronRight, FaHouse, FaXmark } from "react-icons/fa6";

interface ManagementModalProps {
  name: string;
  position: string;
  image: string;
  description: string[];
}

export default function ManagementModal({
  name,
  position,
  image,
  description,
}: ManagementModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  // Lock body scroll + close on ESC (standard modal a11y behavior)
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-imm-blue hover:gap-3 transition-all duration-200"
      >
        {t("bod.cta")}
        <span aria-hidden="true">
          <FaChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="management-modal-title"
          >
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex w-full max-w-6xl max-h-[85vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md hover:bg-gray-100 hover:text-imm-blue transition-colors"
                aria-label="Tutup"
              >
                <FaXmark size={20} />
              </button>

              {/* ── Left Panel: Photo + Identity (fixed, non-scrolling) ── */}
              <div className="flex shrink-0 flex-col items-center bg-gray-200 p-6 md:w-[34%] md:p-10 lg:w-[32%] border-b border-gray-200 md:border-b-0 md:border-r">
                <div className="relative mb-5 h-52 w-40 shrink-0 overflow-hidden rounded-2xl md:h-72 md:w-full lg:h-102">
                  <Image
                    src={image}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 160px, 340px"
                    priority
                    alt={name}
                  />
                </div>

                <div className="text-center md:text-left">
                  <h2
                    id="management-modal-title"
                    className="text-2xl font-bold leading-tight text-foreground sm:text-3xl"
                  >
                    {name}
                  </h2>
                  <div className="mt-2 flex items-center justify-center gap-1.5 md:justify-center">
                    <span className="block h-0.5 w-2 rounded-full bg-gray-300" />
                    <p className="text-sm font-semibold text-imm-blue sm:text-base">
                      {position}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Right Panel: Description (independently scrollable) ── */}
              <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-10">
                <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {description.map((desc, i) => (
                    <p key={i}>{desc}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
