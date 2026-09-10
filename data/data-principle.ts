export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export const brandData: Brand[] = [
  { id: "1", name: "Daikin", logo: "/images/logo-/logo-daikin.svg" },
  { id: "2", name: "Gree", logo: "/images/logo-/logo-gree.png" },
  { id: "3", name: "JAF", logo: "/images/logo-/logo-jaf.png" },
  {
    id: "4",
    name: "Panasonic",
    logo: "/images/logo-/logo-panasonic.jpeg",
  },
  { id: "5", name: "Tica", logo: "/images/logo-/logo-tica.png" },
  { id: "6", name: "Midea", logo: "/images/logo-/logo-midea.png" },
  { id: "6", name: "Samsung", logo: "/images/logo-/logo-samsung.png" },
];
