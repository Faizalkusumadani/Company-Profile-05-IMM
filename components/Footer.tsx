import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import { IoMail, IoLocationSharp } from "react-icons/io5";

export default async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="pb-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 pt-16 md:flex md:justify-between gap-12">
        {/* CONNECT WITH US */}
        <div>
          {/* Heading menggunakan imm-blue */}
          <h3 className="text-lg sm:text-xl font-semibold uppercase mb-6 text-imm-blue">
            {t("footer.header_footer")}
          </h3>
          <div className="relative pb-6">
            <Image
              src="/logo/logo-imm.png"
              width={140}
              height={140}
              quality={75}
              sizes="140px"
              alt="Logo Sinergi"
              className="object-contain"
              loading="eager"
              style={{ width: "140px", height: "auto" }}
            />
            <h3 className="text-base sm:text-lg font-semibold text-foreground/70">
              Intisukses Mitratama Mandiri
            </h3>
          </div>
          {/* Ikon sosial media warna default imm-blue, hover menjadi smp-orange */}
          <div className="flex items-center gap-5 text-3xl text-foreground/70">
            <a
              href="https://www.instagram.com/sinergi.mp?igsh=MW1tb3VnYW9vdHl1bA%3D%3D"
              target="blank"
              aria-label="Instagram"
              className="hover:text-gray-300 transition-colors"
            >
              <FaInstagram size={40} />
            </a>
            <a
              href="https://www.linkedin.com/company/reddmas-group/"
              aria-label="LinkedIn"
              target="blank"
              className="hover:text-gray-300 transition-colors"
            >
              <FaLinkedin size={40} />
            </a>
            <a
              href="https://www.youtube.com/@reddmasgroup"
              aria-label="YouTube"
              target="blank"
              className="hover:text-gray-300 transition-colors"
            >
              <FaYoutube size={45} />
            </a>
          </div>
        </div>

        {/* HEAD OFFICE */}
        <div className="mt-12 md:mt-0 ">
          {/* Heading menggunakan imm-blue */}
          <h3 className="text-lg sm:text-xl font-semibold mb-6 text-imm-blue">
            {t("footer.header_footer_01")}
          </h3>
          <address className="not-italic space-y-6 text-base text-foreground/70">
            <p className="flex items-start gap-3">
              {/* Ikon menggunakan smp-orange sebagai aksen */}
              <IoLocationSharp
                className="text-xl mt-0.5 shrink-0 text-foreground/70"
                aria-hidden="true"
              />
              <span>
                Grand Puri Niaga Blok K6 No. 50 <br />
                JI. Puri Kencana, Kembangan Jakarta 11610
              </span>
            </p>

            <p className="flex items-center gap-3">
              {/* Ikon menggunakan smp-orange sebagai aksen */}
              <FaPhoneAlt
                className="text-xl shrink-0 text-foreground/70"
                aria-hidden="true"
              />
              {/* Link hover menjadi imm-blue */}
              <a
                href="tel:+622130067868 "
                className="hover:text-imm-blue transition-colors"
              >
                +62 21 300 678 68
              </a>
            </p>

            <p className="flex items-center gap-3">
              {/* Ikon menggunakan smp-orange sebagai aksen */}
              <IoMail
                className="text-xl shrink-0 text-foreground/70"
                aria-hidden="true"
              />
              {/* Link hover menjadi imm-blue */}
              <a
                href="mailto:project@intisukses-mm.com"
                className="hover:text-imm-blue transition-colors"
              >
                project@intisukses-mm.com
              </a>
            </p>

            <p className="flex items-center gap-3">
              {/* Ikon menggunakan smp-orange sebagai aksen */}
              <FaRegClock
                className="text-xl shrink-0 text-smp-white/80"
                aria-hidden="true"
              />
              <span className="hover:text-imm-blue transition-colors">
                Senin–Jumat : 08.00 – 16.30 WIB
              </span>
            </p>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 mt-14 pt-4 text-smp-muted text-center text-sm">
        <span className="inline-flex items-center justify-center gap-2 flex-wrap">
          © 2025 PT Intisukses Mitratama Mandiri. All Rights Reserved | Member
          of
          <a
            href="https://www.reddmasgroup.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reddmas Group (opens in new tab)"
          >
            <Image
              src="/logo/logoreddmas.png"
              width={80}
              height={24}
              alt="Reddmas Group"
              className="object-contain inline-block align-middle"
              loading="eager"
              style={{ width: "80px", height: "30px" }}
            />
          </a>
        </span>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://api.whatsapp.com/send/?phone=6282156666802&text&type=phone_number&app_absent=0"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-xl hover:bg-green-600 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi kami via WhatsApp"
      >
        <Image
          src="/whatsapp.png"
          width={32}
          height={32}
          alt=""
          aria-hidden="true"
          className="w-8 h-8"
        />

        {/* Ping dot */}
        <span className="absolute  -top-2 -right-2 w-6 h-6 text-xs font-semibold text-white bg-red-600 rounded-full flex items-center justify-center">
          1
        </span>
      </a>
    </footer>
  );
}
