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
      "Grand Puri Niaga Blok K6 No. 50 JI. Puri Kencana, Kembangan Jakarta 11610",
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
    href: "/files/Compro_Intisukses-Mitratama-mandiri.pdf",
  },
];
