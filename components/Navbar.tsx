"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import LocaleToggle from "@/components/Switch";
import { Link, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

// ─── Types & Data ──────────────────────────────────────────────────────────────
interface NavItem {
  href?: string;
  labelKey: string;
  children?: { href: string; labelKey: string }[];
}

const navItems: NavItem[] = [
  {
    href: "/tentang-kami",
    labelKey: "nav.about",
    children: [
      {
        href: "/tentang-kami/profil-perusahaan",
        labelKey: "nav.profil",
      },
      { href: "/tentang-kami/visi-misi", labelKey: "nav.visi-misi" },
      { href: "/tentang-kami/nilai-nilai", labelKey: "nav.nilai-nilai" },
      { href: "/tentang-kami/manajemen", labelKey: "nav.manajemen" },
    ],
  },
  {
    href: "/layanan",
    labelKey: "nav.services",
    children: [
      {
        href: "/layanan/instalasi",
        labelKey: "nav.services_01",
      },
      { href: "/layanan/pemeliharaan", labelKey: "nav.services_02" },
      { href: "/layanan/perbaikan", labelKey: "nav.services_03" },
    ],
  },
  { href: "/proyek", labelKey: "nav.project" },
  { href: "/karir", labelKey: "nav.career" },
  { href: "/kontak", labelKey: "nav.contact" },
];

const SCROLL_THRESHOLD = 70;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function stripLocale(path: string) {
  return path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
}

function isPathActive(pathname: string, href: string) {
  const clean = stripLocale(pathname);
  if (href === "/") return clean === "/";
  return clean === href || clean.startsWith(`${href}/`);
}

function getActiveState(pathname: string, item: NavItem) {
  const childActive =
    item.children?.some((c) => isPathActive(pathname, c.href)) ?? false;
  const selfActive = item.href ? isPathActive(pathname, item.href) : false;
  return selfActive || childActive;
}

// ─── Shared: Logo ──────────────────────────────────────────────────────────────
function NavLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2"
      aria-label="Intisukses Mitratama Mandiri"
    >
      <Image
        src="/logo/logo-imm.png"
        alt="logo-imm"
        width={90}
        height={60}
        className="h-9 w-9 shrink-0 object-contain sm:h-13 sm:w-13"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span className="whitespace-nowrap text-sm font-medium text-foreground sm:text-base">
          Intisukses
        </span>
        <span className="whitespace-nowrap text-sm font-medium text-imm-blue sm:text-base">
          Mitratama Mandiri
        </span>
      </span>
    </Link>
  );
}

// DESKTOP
// ══════════════════════════════════════════════════════════════════════════════

function DesktopDropdown({
  items,
  pathname,
}: {
  items: { href: string; labelKey: string }[];
  pathname: string;
}) {
  const t = useTranslations();
  return (
    <motion.ul
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 top-full z-50 mt-4 w-86 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl shadow-black/10 backdrop-blur-xl"
    >
      {items.map((item) => {
        const active = isPathActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center justify-between gap-2 rounded-xl px-3.5 py-3 text-sm transition-colors ${
                active
                  ? "bg-smp-blue/10 text-imm-blue"
                  : "text-foreground/65 hover:bg-black/5 hover:text-imm-blue"
              }`}
            >
              {t(item.labelKey)}
              {active && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-smp-blue" />
              )}
            </Link>
          </li>
        );
      })}
    </motion.ul>
  );
}

function DesktopNavUnderline({ show }: { show: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ scaleX: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ originX: 0.5 }}
      className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-smp-blue"
    />
  );
}

function DesktopNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function handleMouseEnter() {
    clearCloseTimer();
    setOpen(true);
  }

  function handleMouseLeave() {
    // Delay kecil supaya cursor yang bergerak dari trigger ke panel dropdown
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  // Tutup dropdown saat klik di luar area item ini, atau saat tekan Escape.
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Bersihkan timer kalau komponen unmount saat timer masih berjalan.
  useEffect(() => clearCloseTimer, []);

  const active = getActiveState(pathname, item);

  if (item.children) {
    return (
      <li
        ref={ref}
        className="group relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className={`flex items-center gap-1.5 py-2 text-base font-normal whitespace-nowrap transition-colors ${
            active
              ? "text-imm-blue"
              : "text-foreground/70 group-hover:text-imm-blue"
          }`}
        >
          {t(item.labelKey)}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>
        {/* underline saat hover — murni CSS, tidak butuh state React */}
        <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 origin-center scale-x-0 rounded-full bg-smp-blue/40 opacity-0 transition-all duration-200 group-hover:scale-x-100 group-hover:opacity-100" />
        {active && <DesktopNavUnderline show />}
        <AnimatePresence>
          {open && (
            <DesktopDropdown items={item.children} pathname={pathname} />
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        href={item.href!}
        className={`inline-block py-2 text-base font-normal whitespace-nowrap transition-colors ${
          active
            ? "text-imm-blue"
            : "text-foreground/70 group-hover:text-imm-blue"
        }`}
      >
        {t(item.labelKey)}
      </Link>
      <span className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 origin-center scale-x-0 rounded-full bg-smp-blue/40 opacity-0 transition-all duration-200 group-hover:scale-x-100 group-hover:opacity-100" />
      {active && <DesktopNavUnderline show />}
    </li>
  );
}

function DesktopNavbar({
  pathname,
  locale,
}: {
  pathname: string;
  locale: Locale;
}) {
  return (
    <header className="fixed inset-x-0 top-4 z-50 hidden justify-center lg:flex">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-8 rounded-full bg-white/70 px-5 py-3 shadow-lg shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl transition-shadow duration-300"
      >
        {/* Kiri: logo */}
        <NavLogo />

        {/* Tengah: menu, selalu di tengah pill terlepas dari lebar logo/toggle */}
        <ul className="flex items-center justify-center gap-7 justify-self-center">
          {navItems.map((item) => (
            <DesktopNavItem
              key={item.labelKey}
              item={item}
              pathname={pathname}
            />
          ))}
        </ul>

        {/* Kanan: separator + language toggle */}
        <div className="flex items-center justify-end gap-4 justify-self-end">
          <span
            className="h-5 w-px shrink-0 bg-smp-blue/30"
            aria-hidden="true"
          />
          <LocaleToggle currentLocale={locale} />
        </div>
      </motion.nav>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE
// ══════════════════════════════════════════════════════════════════════════════

function MobileOverlay({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const t = useTranslations();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  // Kunci scroll body selama overlay terbuka, kembalikan otomatis saat ditutup.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function toggleExpand(key: string) {
    setExpandedKey((prev) => (prev === key ? null : key));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-60 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {open && (
        <motion.div
          key="panel"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-y-0 right-0 z-60 flex w-full flex-col bg-white  shadow-2xl shadow-black/10 sm:max-w-sm sm:border-l sm:border-black/10"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between border-b border-black/8 px-5 py-5">
            <NavLogo onClick={onClose} />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-black/5 hover:text-foreground"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav list */}
          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = getActiveState(pathname, item);
                const isExpanded = expandedKey === item.labelKey;

                return (
                  <li key={item.labelKey}>
                    {item.children ? (
                      <>
                        {/* Trigger Dropmenu */}
                        <button
                          onClick={() => toggleExpand(item.labelKey)}
                          aria-expanded={isExpanded}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-normal transition-colors ${
                            active
                              ? "bg-smp-blue/10 text-imm-blue"
                              : "text-foreground/75 hover:bg-black/5 hover:text-imm-blue"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-smp-blue" />
                            )}
                            {t(item.labelKey)}
                          </span>
                          <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </motion.svg>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 flex flex-col gap-0.5 overflow-hidden border-l border-black/10 pl-3"
                            >
                              {item.children.map((child) => {
                                const childIsActive = isPathActive(
                                  pathname,
                                  child.href,
                                );
                                return (
                                  // dropmenu
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                        childIsActive
                                          ? "text-imm-blue bg-smp-blue/10"
                                          : "text-foreground/55 hover:bg-black/5 hover:text-imm-blue"
                                      }`}
                                    >
                                      {t(child.labelKey)}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      // Link
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className={`flex items-center gap-2 rounded-lg px-3 py-3.5 text-base font-normal transition-colors ${
                          active
                            ? "bg-smp-blue/10 text-imm-blue"
                            : "text-foreground/75 hover:bg-black/5 hover:text-imm-blue"
                        }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-smp-blue" />
                        )}
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Trigger bar mobile, kini juga pill mengambang senada dengan versi desktop:
// logo di kiri, locale toggle + hamburger di kanan. Warna solid permanen;
// efek sembunyikan-saat-scroll-ke-bawah dari versi lama tetap dipertahankan.
function MobileNavbar({
  pathname,
  locale,
}: {
  pathname: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const navbar = headerRef.current;
    if (!navbar) return;

    function updateNavbarOnScroll(): void {
      const currentY = window.scrollY;
      const shouldHide =
        currentY > SCROLL_THRESHOLD && currentY > lastScrollY.current;
      navbar!.classList.toggle("-translate-y-[calc(100%+2rem)]", shouldHide);
      navbar!.classList.toggle("translate-y-0", !shouldHide);
      lastScrollY.current = currentY;
    }

    updateNavbarOnScroll();
    window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbarOnScroll);
  }, []);

  return (
    <>
      <header
        id="navbar-mobile"
        ref={headerRef}
        className="fixed inset-x-3 top-4 z-50 translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-6 lg:hidden"
      >
        <div className="flex items-center justify-between gap-3 rounded-full bg-white/80 px-4 py-2.5 shadow-lg shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl">
          <NavLogo />
          <div className="flex items-center gap-3">
            <LocaleToggle currentLocale={locale} />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full transition-colors duration-300 hover:bg-black/5"
            >
              <span className="block h-0.5 w-5 bg-foreground/70" />
              <span className="block h-0.5 w-3.5 bg-foreground/70" />
              <span className="block h-0.5 w-5 bg-foreground/70" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay */}
      <MobileOverlay
        open={open}
        onClose={() => setOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <>
      <DesktopNavbar pathname={pathname} locale={locale} />
      <MobileNavbar pathname={pathname} locale={locale} />
    </>
  );
}
