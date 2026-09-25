// ─── Import data varian per produk ─────────────────────────────────────────────
import DaikinVariants from "./daikin";
import GreeVariants from "./gree";
import AquaVariants from "./aqua";
import HitachiVariants from "./hitachi";
import PanasonicVariants from "./panasonic";
import SamsungVariants from "./samsung";
import MideaVariants from "./midea";
import LGVariants from "./lg";
import FrimecVariants from "./frimec";
import TicaVariants from "./tica";
import JAFVariants from "./jaf";
import en from "@/messages/en.json";

type productMessages = typeof en.product;
export type ProductTranslationKey = keyof productMessages;

// ─── Type Definition ──────────────────────────────────────────────────────────

export type ProductCategory = "ac" | "hepa" | "chiller";

export type ProductVariant = {
  id?: number | string;
  name: string;
  image?: string;
  size?: string;
  color?: string;
  weight?: string;
  description?: string;
  price?: number;
  [key: string]: string | number | undefined;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  gambarUtama: string;
  namaBrand: string;
  logoSrc: string;
  descKey: ProductTranslationKey;
  category: ProductCategory;
  rating: number;
  reviews: number;
  href: string;
  discount?: string;
  price?: number;
  itemsBadge?: string;
  featuresKeys: ProductTranslationKey[];
  gallery?: string[];
  variants: ProductVariant[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
export const produkDetailList: Product[] = [
  {
    id: 1,
    name: "Daikin",
    slug: "daikin",
    image: "/images/produk/DAIKIN.png",
    gambarUtama: "/images/produk/DAIKIN.png",
    namaBrand: "Daikin",
    logoSrc: "/images/logo-/Daikin.png",
    descKey: "daikin_desc",
    gallery: ["/images/produk/DAIKIN.png"],
    featuresKeys: [
      "daikin_features_1",
      "daikin_features_2",
      "daikin_features_3",
      "daikin_features_4",
      "daikin_features_5",
      "daikin_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 175,
    itemsBadge: "6 Model",
    href: "/produk/daikin",
    variants: DaikinVariants,
  },
  {
    id: 2,
    name: "Gree",
    slug: "gree",
    image: "/images/produk/GREE.png",
    gambarUtama: "/images/produk/GREE.png",
    namaBrand: "Gree",
    logoSrc: "/images/logo-/Gree.png",
    descKey: "gree_desc",
    gallery: ["/images/produk/GREE.png"],
    featuresKeys: [
      "gree_features_1",
      "gree_features_2",
      "gree_features_3",
      "gree_features_4",
      "gree_features_5",
      "gree_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 340,
    itemsBadge: "8 Model",
    href: "/produk/gree",
    variants: GreeVariants,
  },
  {
    id: 3,
    name: "Aqua",
    slug: "aqua",
    image: "/images/produk/AQUA.png",
    gambarUtama: "/images/produk/AQUA.png",
    namaBrand: "Aqua",
    logoSrc: "/images/logo-/Aqua.png",
    descKey: "aqua_desc",
    gallery: ["/images/produk/Aqua.png"],
    featuresKeys: [
      "aqua_features_1",
      "aqua_features_2",
      "aqua_features_3",
      "aqua_features_4",
      "aqua_features_5",
      "aqua_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 165,
    itemsBadge: "5 Model",
    href: "/produk/aqua",
    variants: AquaVariants,
  },
  {
    id: 4,
    name: "Hitachi",
    slug: "hitachi",
    image: "/images/produk/HITACHI.png",
    gambarUtama: "/images/produk/HITACHI.png",
    namaBrand: "Hitachi",
    logoSrc: "/images/logo-/Hitachi.png",
    descKey: "hitachi_desc",
    gallery: ["/images/produk/HITACHI.png"],
    featuresKeys: [
      "hitachi_features_1",
      "hitachi_features_2",
      "hitachi_features_3",
      "hitachi_features_4",
      "hitachi_features_5",
      "hitachi_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 165,
    itemsBadge: "6 Model",
    href: "/produk/hitachi",
    variants: HitachiVariants,
  },
  {
    id: 5,
    name: "Panasonic",
    slug: "panasonic",
    image: "/images/produk/PANASONIC.png",
    gambarUtama: "/images/produk/PANASONIC.png",
    namaBrand: "Panasonic",
    logoSrc: "/images/logo-/Panasonic.png",
    descKey: "panasonic_desc",
    gallery: ["/images/produk/PANASONIC.png"],
    featuresKeys: [
      "panasonic_features_1",
      "panasonic_features_2",
      "panasonic_features_3",
      "panasonic_features_4",
      "panasonic_features_5",
      "panasonic_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 340,
    itemsBadge: "6 Model",
    href: "/produk/panasonic",
    variants: PanasonicVariants,
  },
  {
    id: 6,
    name: "Samsung",
    slug: "samsung",
    image: "/images/produk/SAMSUNG.png",
    gambarUtama: "/images/produk/SAMSUNG.png",
    namaBrand: "Samsung",
    logoSrc: "/images/logo-/Samsung.png",
    descKey: "samsung_desc",
    gallery: ["/images/produk/SAMSUNG.png"],
    featuresKeys: [
      "samsung_features_1",
      "samsung_features_2",
      "samsung_features_3",
      "samsung_features_4",
      "samsung_features_5",
      "samsung_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 340,
    itemsBadge: "4 Model",
    href: "/produk/samsung",
    variants: SamsungVariants,
  },
  {
    id: 7,
    name: "Midea",
    slug: "midea",
    image: "/images/produk/Midea.png",
    gambarUtama: "/images/produk/Midea.png",
    namaBrand: "Midea",
    logoSrc: "/images/logo-/Midea.png",
    descKey: "midea_desc",
    gallery: [
      "/images/produk/Variants/Midea/AC Celest Inverter Midea MSCE-25CRFN8.png",
    ],
    featuresKeys: [
      "midea_features_1",
      "midea_features_2",
      "midea_features_3",
      "midea_features_4",
      "midea_features_5",
      "midea_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 330,
    itemsBadge: "6 Model",
    href: "/produk/midea",
    variants: MideaVariants,
  },
  {
    id: 8,
    name: "LG",
    slug: "lg",
    image: "/images/produk/LG.png",
    gambarUtama: "/images/produk/LG.png",
    namaBrand: "LG",
    logoSrc: "/images/logo-/LG.png",
    descKey: "lg_desc",
    gallery: ["/images/produk/Variants/LG/Multi-V-S-U4-U36A-Front.jpeg"],
    featuresKeys: [
      "lg_features_1",
      "lg_features_2",
      "lg_features_3",
      "lg_features_4",
      "lg_features_5",
      "lg_features_6",
    ],
    category: "ac",
    rating: 5,
    reviews: 340,
    itemsBadge: "6 Model",
    href: "/produk/lg",
    variants: LGVariants,
  },
  {
    id: 9,
    name: "Frimec",
    slug: "frimec",
    image: "/images/produk/FRIMEC.png",
    gambarUtama: "/images/produk/FRIMEC.png",
    namaBrand: "Frimec",
    logoSrc: "/images/logo-/Firmec.png",
    descKey: "frimec_desc",
    gallery: ["/images/produk/Variants/Frimec/Air Cooled Scroll Chiller.png"],
    featuresKeys: [
      "frimec_features_1",
      "frimec_features_2",
      "frimec_features_3",
      "frimec_features_4",
      "frimec_features_5",
      "frimec_features_6",
    ],
    category: "chiller",
    rating: 5,
    reviews: 340,
    itemsBadge: "6 Model",
    href: "/produk/frimec",
    variants: FrimecVariants,
  },
  {
    id: 10,
    name: "TICA",
    slug: "tica",
    image: "/images/produk/TICA.png",
    gambarUtama: "/images/produk/TICA.png",
    namaBrand: "TICA",
    logoSrc: "/images/logo-/Tica.png",
    descKey: "tica_desc",
    gallery: ["/images/produk/TICA.png"],
    featuresKeys: [
      "tica_features_1",
      "tica_features_2",
      "tica_features_3",
      "tica_features_4",
      "tica_features_5",
      "tica_features_6",
    ],
    category: "chiller",
    rating: 5,
    reviews: 340,
    itemsBadge: "6 Model",
    href: "/produk/tica",
    variants: TicaVariants,
  },
  {
    id: 11,
    name: "JAF (Japan Air Filter)",
    slug: "jaf",
    image: "/images/produk/JAF.png",
    gambarUtama: "/images/produk/JAF.png",
    namaBrand: "JAF",
    logoSrc: "/images/logo-/JAF.png",
    descKey: "jaf_desc",
    gallery: ["/images/produk/JAF.png"],
    featuresKeys: [
      "jaf_features_1",
      "jaf_features_2",
      "jaf_features_3",
      "jaf_features_4",
      "jaf_features_5",
      "jaf_features_6",
    ],
    category: "hepa",
    rating: 5,
    reviews: 340,
    itemsBadge: "7 Model",
    href: "/produk/jaf",
    variants: JAFVariants,
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return produkDetailList;
}

export function getProductBySlug(slug: string): Product | undefined {
  return produkDetailList.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase(),
  );
}

export function getProductsByCategory(
  category: "all" | "ac" | "hepa" | "chiller",
): Product[] {
  if (category === "all") return produkDetailList;
  return produkDetailList.filter((p) => p.category === category);
}

export default produkDetailList;
