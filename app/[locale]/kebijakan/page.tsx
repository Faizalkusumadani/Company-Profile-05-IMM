import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations } from "next-intl/server";

// ─── Small building blocks ──────────────────────────────────────────────────
function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-semibold text-foreground">
        {number}. {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-700">
        {children}
      </div>
    </section>
  );
}

function InfoTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg border border-neutral-200 text-left text-sm">
      <tbody>
        {rows.map(([label, value]) => (
          <tr
            key={label}
            className="border-b border-neutral-200 last:border-b-0"
          >
            <th className="w-1/3 bg-neutral-50 p-3 align-top font-medium text-neutral-700">
              {label}
            </th>
            <td className="p-3 text-neutral-700">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CookieTable() {
  const rows: [string, string, string][] = [
    ["Diperlukan (necessary)", "Menjalankan fungsi dasar situs", "Tidak"],
    [
      "Analitik (analytics)",
      "Mengukur kunjungan & perilaku pengguna via Google Analytics",
      "Ya",
    ],
    ["Pemasaran (marketing)", "Mengukur efektivitas kampanye/iklan", "Ya"],
  ];

  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg border border-neutral-200 text-left text-sm">
      <thead>
        <tr className="bg-neutral-50">
          <th className="p-3 font-medium text-neutral-700">Kategori</th>
          <th className="p-3 font-medium text-neutral-700">Fungsi</th>
          <th className="p-3 font-medium text-neutral-700">Bisa dimatikan?</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([category, fn, disable]) => (
          <tr key={category} className="border-t border-neutral-200">
            <td className="p-3 align-top font-medium text-neutral-800">
              {category}
            </td>
            <td className="p-3 align-top">{fn}</td>
            <td className="p-3 align-top">{disable}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function PrivacyPolicy() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      <header className="relative flex h-64 items-center justify-center md:h-116">
        <Breadcrumbs
          title="Kebijakan Privasi"
          items={[
            { label: t("nav.home"), href: "/" },
            { label: "Kebijakan Privasi" },
          ]}
        />
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <h1 className="border-b border-neutral-200 pb-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Kebijakan Privasi
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          <strong className="font-medium text-neutral-600">
            PT. Intisukses Mitratama Mandiri
          </strong>{" "}
          · Berlaku sejak: 21 Agustus 2026 · Versi: 1.0
        </p>
        <Section number={1} title="Pendahuluan">
          <p>
            PT. Intisukses Mitratama Mandiri (&quot;kami&quot;) mengelola situs
            intisukses-mm.com dan berkomitmen melindungi privasi setiap
            pengunjung dan pelanggan yang mengakses situs ini. Kebijakan ini
            menjelaskan data apa yang kami kumpulkan saat Anda mengunjungi
            situs, untuk apa data itu digunakan — termasuk untuk keperluan
            analisa kunjungan dan pengarsipan data pelanggan yang menghubungi
            kami — serta hak Anda atas data tersebut.
          </p>
          <p>
            Dengan menggunakan situs ini, Anda menyetujui praktik yang
            dijelaskan dalam kebijakan ini, kecuali untuk pemrosesan yang memang
            membutuhkan persetujuan eksplisit terpisah (misalnya cookie
            analitik).
          </p>
        </Section>
        <Section number={2} title="Identitas Pengendali Data">
          <InfoTable
            rows={[
              ["Nama badan hukum", "PT. Intisukses Mitratama Mandiri"],
              [
                "Alamat",
                "Grand Puri Niaga Blok K6 No. 50 JI. Puri Kencana, Kembangan Jakarta 11610",
              ],
              ["Email", "project@intisukses-mm.com"],
              ["Telepon", "+6221 300 67 868"],
            ]}
          />
        </Section>
        <Section number={3} title="Data yang Kami Kumpulkan">
          <h3 className="font-medium text-neutral-800">
            a. Data yang Anda berikan langsung
          </h3>
          <p>Saat mengisi formulir kontak di situs ini, kami mengumpulkan:</p>
          <List
            items={[
              "Nama lengkap",
              "Alamat email",
              "Nomor telepon",
              "Kota",
              "Pesan",
            ]}
          />
          <p>
            <strong className="font-medium text-neutral-800">
              Data Rekrutmen (Halaman Karir):
            </strong>{" "}
            Jika Anda menggunakan halaman karir kami untuk melamar pekerjaan,
            kami juga akan mengumpulkan dan memproses informasi tambahan yang
            lebih sensitif, seperti Curriculum Vitae (CV), riwayat pekerjaan,
            dan latar belakang pendidikan Anda.
          </p>

          <h3 className="pt-2 font-medium text-neutral-800">
            b. Data yang terkumpul otomatis (analitik)
          </h3>
          <p>
            Saat Anda mengunjungi situs, kami secara otomatis mengumpulkan data
            kunjungan untuk keperluan analisa, seperti:
          </p>
          <List
            items={[
              "Alamat IP (biasanya dalam bentuk teranonimkan/terpotong)",
              "Jenis perangkat, browser, dan sistem operasi",
              "Halaman yang dikunjungi, durasi kunjungan, dan sumber rujukan (referrer)",
            ]}
          />
          <p className="italic text-neutral-500">
            Data ini dikumpulkan melalui Google Analytics.
          </p>
        </Section>
        <Section number={4} title="Tujuan Penggunaan Data">
          <p>Kami menggunakan data yang dikumpulkan untuk:</p>
          <List
            items={[
              "Merespons pertanyaan atau permintaan yang Anda ajukan lewat formulir.",
              <>
                <strong className="font-medium text-neutral-800">
                  Mengarsipkan data pelanggan yang pernah menghubungi kami
                </strong>
                , sebagai dokumentasi internal dan riwayat komunikasi/transaksi.
              </>,
              "Menganalisa pola kunjungan situs untuk meningkatkan kualitas layanan dan konten (mis. halaman mana yang paling sering dikunjungi).",
              "Memenuhi kewajiban hukum, jika diminta oleh instansi yang berwenang.",
            ]}
          />
        </Section>
        <Section number={5} title="Dasar Hukum Pemrosesan">
          <List
            items={[
              <>
                <strong className="font-medium text-neutral-800">
                  Persetujuan (consent)
                </strong>{" "}
                — untuk cookie analitik/pemasaran, dan untuk data yang Anda
                kirim secara sukarela lewat formulir.
              </>,
              <>
                <strong className="font-medium text-neutral-800">
                  Pra-kontrak/kontrak
                </strong>{" "}
                — jika data dikumpulkan dalam rangka proses kerja sama bisnis
                atau rekrutmen.
              </>,
              <>
                <strong className="font-medium text-neutral-800">
                  Kepentingan sah (legitimate interest)
                </strong>{" "}
                — untuk analisa umum kunjungan situs dan keamanan sistem.
              </>,
            ]}
          />
        </Section>
        <Section number={6} title="Cookie & Teknologi Pelacakan">
          <p>
            Situs ini menggunakan cookie yang dikelompokkan menjadi tiga
            kategori:
          </p>
          <CookieTable />
          <p>
            Anda dapat mengatur preferensi cookie kapan saja lewat banner
            consent yang muncul di situs.
          </p>
        </Section>
        <Section number={7} title="Berbagi Data ke Pihak Ketiga">
          <p>
            Kami membagikan data kepada pihak ketiga berikut, sebatas yang
            diperlukan untuk menjalankan layanan:
          </p>
          <List
            items={[
              <>
                <strong className="font-medium text-neutral-800">
                  Google Analytics
                </strong>{" "}
                — untuk analisa kunjungan situs. Data dapat diproses di server
                milik Google yang berlokasi di luar Indonesia.
              </>,
              <>
                <strong className="font-medium text-neutral-800">
                  Google Sheets
                </strong>{" "}
                — digunakan sebagai pengelola dan penyimpanan arsip data
                pengunjung/pelanggan secara internal.
              </>,
            ]}
          />
          <p>
            Kami tidak menjual data pribadi Anda kepada pihak ketiga untuk
            kepentingan komersial pihak lain.
          </p>
        </Section>

        <Section number={8} title="Retensi & Arsip Data">
          <p>
            Data kontak dan formulir Anda akan kami simpan selama{" "}
            <strong className="font-medium text-neutral-800">
              12 bulan sejak komunikasi atau interaksi terakhir
            </strong>{" "}
            sebagai dokumentasi arsip internal, kecuali ada kewajiban hukum yang
            mengharuskan penyimpanan lebih lama.
          </p>
          <p>
            Data analitik disimpan sesuai retensi default Google Analytics.
            Setelah masa retensi berakhir, data akan dihapus atau dianonimkan.
          </p>
        </Section>
        <Section number={9} title="Keamanan Data">
          <p>
            Kami menerapkan langkah teknis dan organisasional yang wajar untuk
            melindungi data, termasuk koneksi terenkripsi (HTTPS), pembatasan
            akses internal ke data pelanggan, dan pembaruan keamanan sistem
            secara berkala.
          </p>
        </Section>
        <Section number={10} title="Hak Anda atas Data Pribadi">
          <p>
            Sesuai UU Pelindungan Data Pribadi (UU No. 27/2022), Anda berhak
            untuk:
          </p>
          <List
            items={[
              "Mengetahui tujuan pengumpulan dan penggunaan data Anda.",
              "Mengakses dan memperoleh salinan data pribadi Anda.",
              "Memperbaiki data yang tidak akurat.",
              "Menghapus data pribadi Anda, sepanjang tidak bertentangan dengan ketentuan hukum lain.",
              "Menarik persetujuan (consent) kapan saja.",
              "Mengajukan keberatan atas pemrosesan tertentu.",
            ]}
          />
          <p>
            Untuk menggunakan hak-hak ini, hubungi kami melalui
            customersupport@reddmasgroup.com.
          </p>
        </Section>
        <Section number={11} title="Data Anak">
          <p>
            Situs ini tidak ditujukan untuk anak di bawah 18 tahun, dan kami
            tidak secara sengaja mengumpulkan data pribadi anak tanpa
            persetujuan orang tua atau wali.
          </p>
        </Section>
        <Section number={12} title="Perubahan Kebijakan">
          <p>
            Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan
            signifikan akan diberitahukan melalui notice di halaman ini, dan
            tanggal &quot;Berlaku sejak&quot; di atas akan diperbarui.
          </p>
        </Section>
        <section className="mt-10 rounded-lg border-l-4 border-smp-blue bg-neutral-50 p-5">
          <h2 className="text-xl font-semibold text-foreground">13. Kontak</h2>
          <p className="mt-3 text-[15px] text-neutral-700">
            Pertanyaan atau permintaan terkait kebijakan privasi ini dapat
            diajukan ke:
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
            <strong className="font-medium text-neutral-800">
              PT. Intisukses Mitratama Mandiri
            </strong>
            <br />
            Grand Puri Niaga Blok K6 No. 50
            <br />
            JI. Puri Kencana, Kembangan Jakarta 11610
            <br />
            Email: project@intisukses-mm.com
            <br />
            Telepon: +62 21 300 678 68
          </p>
        </section>
      </div>
    </div>
  );
}
