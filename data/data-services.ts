export type ServiceKey =
  | "installation"
  | "maintenance"
  | "relocation"
  | "repair"
  | "refill"
  | "contract";

export type ServiceItem = {
  key: ServiceKey;
  image: string;
};

export const services: ServiceItem[] = [
  { key: "installation", image: "/images/pemasangan.jpeg" },
  { key: "maintenance", image: "/images/cuci-ac.jpeg" },
  { key: "relocation", image: "/images/bongkar.png" },
  { key: "repair", image: "/images/perbaikan.jpeg" },
  { key: "refill", image: "/images/isi-freon.png" },
  { key: "contract", image: "/images/kontrak.jpeg" },
];
