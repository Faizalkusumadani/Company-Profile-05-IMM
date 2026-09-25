export type ServiceKey =
  | "installation-ac"
  | "installation-hepa"
  | "installation-chiller"
  | "maintenance";

export type ServiceItem = {
  key: ServiceKey;
  image: string;
  href: string;
};

export const services: ServiceItem[] = [
  {
    key: "installation-ac",
    image: "/images/bongkar.png",

    href: "/layanan/ac-instalasi",
  },
  {
    key: "installation-hepa",
    image: "/images/cuci-ac.jpeg",
    href: "/layanan/hepa-instalasi",
  },
  {
    key: "installation-chiller",
    image: "/images/pemasangan.jpeg",
    href: "/layanan/chiller-instalasi",
  },
  {
    key: "maintenance",
    image: "/images/perbaikan.jpeg",
    href: "/layanan/maintenance",
  },
];
