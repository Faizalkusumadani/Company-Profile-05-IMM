export type LocationIcon = "office" | "email" | "phone" | "download";

export interface ContactLocation {
  key: string;
  icon: LocationIcon;
  value: string;
  href?: string;
}

export const locations: ContactLocation[] = [
  {
    key: "kantor-utama",
    icon: "office",
    value:
      "Business Park Kebon Jeruk Blok C-2 No.8 Jl. Meruya Ilir Raya No. 88 Meruya Utara, Kembangan Jakarta 11620",
  },
  {
    key: "email",
    icon: "email",
    value: "project@intisukses-mm.com ",
    href: "mailto:project@intisukses-mm.com ",
  },
  {
    key: "telepon",
    icon: "phone",
    value: "+62 21 300 678 68",
    href: "tel:+622130067868",
  },
  {
    key: "company-profile",
    icon: "download",
    value: "klik here",
    href: "/files/Compro Reddmas-Group.pdf",
  },
];
