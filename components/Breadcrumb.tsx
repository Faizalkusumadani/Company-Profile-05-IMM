import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
}

// Gambar latar ini sekarang tetap untuk semua halaman, tidak lagi bisa
// di-override lewat props — lihat catatan di bawah kode.
const BACKGROUND_IMAGE = "/background/New-banner.png";

export default function PageBreadcrumb({ title, items }: PageBreadcrumbProps) {
  return (
    <section className="absolute top-0 w-full h-64 md:h-106 overflow-hidden">
      {/* Background Image */}
      <Image
        src={BACKGROUND_IMAGE}
        alt="Page header background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient bawah untuk kesan depth */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {/* Content - rata kiri bawah */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-start justify-end pb-8 md:pb-12">
        {/* Page Title */}
        <h1 className="text-imm-blue text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg mb-3 sm:mb-4 text-left">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-1.5 sm:gap-2 flex-nowrap sm:flex-wrap justify-start overflow-x-auto sm:overflow-visible py-1 scrollbar-hide">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 shrink-0"
                >
                  {isLast ? (
                    // Item aktif (halaman sekarang)
                    <span
                      aria-current="page"
                      className="text-imm-blue text-sm sm:text-base font-medium max-w-35 sm:max-w-none truncate sm:whitespace-normal"
                    >
                      {item.label}
                    </span>
                  ) : (
                    // Item yang bisa diklik — padding vertikal untuk area tap yang lebih nyaman di mobile
                    <Link
                      href={item.href ?? "#"}
                      className="group relative text-white/70 text-sm sm:text-base font-normal hover:text-white transition-colors duration-200 py-1.5 -my-1.5 max-w-25 sm:max-w-none truncate sm:whitespace-normal inline-block"
                    >
                      {item.label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white/80 transition-all duration-200 group-hover:w-full" />
                    </Link>
                  )}

                  {/* Separator — sembunyikan setelah item terakhir */}
                  {!isLast && (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
}
