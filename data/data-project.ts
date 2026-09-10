export interface ProjectItem {
  id: string;
  image: string;
  title: string;
  category: string;
  location: string;
  description: string;
}

const proyekData: ProjectItem[] = [
  {
    id: "01",
    image: "Duta Mall.webp",
    title: "Duta Mall",
    category: "Construction",
    location: "Banjarmasin, Kalimantan Selatan",
    description:
      "Supply Unit Chiller Centrifugal Water Cooled 1000TR 4 unit - Chiller Unit By DAIKIN (2017)",
  },
  {
    id: "02",
    image: "BSD City Marketing Office.webp",
    title: "BSD City Marketing Office",
    category: "Construction",
    location: "Tangerang, Banten",
    description: "HVAC Renovation - AC By York and Daikin (2019)",
  },
  {
    id: "03",
    image: "AOCC Bandara Soekarno Hatta.webp",
    title: "AOCC Bandara Soekarno Hatta",
    category: "Construction",
    location: "Kota Tangerang, Banten",
    description: "VAC Installation - AC By Daikin (2019)",
  },
  {
    id: "04",
    image: "Kantor Bupati Pesisir Barat.webp",
    title: "Kantor Bupati Pesisir Barat",
    category: "Construction",
    location: "Lampung",
    description: "Supply unit System AC VRV by DAIKIN (2022)",
  },
  {
    id: "05",
    image: "Marigold Nava Park Apartment.webp",
    title: "Marigold Nava Park Apartment",
    category: "Construction",
    location: "BSD City, Tangerang, Banten",
    description: "Supply Unit Multi Split System AC By DAIKIN (2017 - 2021)",
  },
  {
    id: "06",
    image: "Marketing Gallery Giantara City.webp",
    title: "Marketing Gallery Giantara City",
    category: "Construction",
    location: "Serpong",
    description: "Supply unit AC and Installation AC By DAIKIN (2023)",
  },
  {
    id: "07",
    image: "Chitose International Indonesia.webp",
    title: "Chitose International Indonesia",
    category: "Construction",
    location: "Bandung",
    description: "Supply unit AC and Installation AC By DAIKIN (2018)",
  },
  {
    id: "08",
    image: "HQuarters Office and Apartment.webp",
    title: "HQuarters Office and Apartment",
    category: "Construction",
    location: "Bandung",
    description: "Supply unit AC System VRV by DAIKIN (2023)",
  },
  {
    id: "09",
    image: "ALOFT Bali Seminyak Hotel.webp",
    title: "ALOFT Bali Seminyak Hotel",
    category: "Construction",
    location: "Bali",
    description: "Supply Unit AC system and Installation AC VRV DAIKIN (2019)",
  },
  {
    id: "10",
    image: "Fugo Hotel Samarinda.webp",
    title: "Fugo Hotel Samarinda",
    category: "Construction",
    location: "Samarinda",
    description:
      "Supply unit Chiller, FCU & AHU Chiller, FCU & AHU By DAIKIN (2022)",
  },
  {
    id: "11",
    image: "Clubhouse Samasana The Zora.webp",
    title: "Clubhouse Samasana The Zora",
    category: "Construction",
    location: "BSD City",
    description: "Supply unit AC and Installation AC by DAIKIN (2022)",
  },
  {
    id: "12",
    image: "Cluster Caelus Greenwich.webp",
    title: "Cluster Caelus Greenwich",
    category: "Construction",
    location: "BSD City",
    description: "Supply unit AC and Installation AC By SAMSUNG (2020)",
  },
  {
    id: "13",
    image: "Aure Amata Cluster.webp",
    title: "Aure Amata Cluster",
    category: "Construction",
    location: "BSD City",
    description: "Supply unit AC and Installation AC by PANASONIC (2021)",
  },
  {
    id: "14",
    image: "Show House Unit LYNDON Navapark.webp",
    title: "Show House Unit LYNDON Navapark",
    category: "Construction",
    location: "Sinarmas Land, Tangerang",
    description: "Supply unit AC System AC VRV By DAIKIN (2022)",
  },
  {
    id: "15",
    image: "Universitas Sultan Ageng Tirtayasa (UNTIRTA).webp",
    title: "Universitas Sultan Ageng Tirtayasa (UNTIRTA)",
    category: "Construction",
    location: "Serang, Banten",
    description: "Supply unit AC System AC VRV by DAIKIN (2022)",
  },
  {
    id: "16",
    image: "Kemenkeu Data Center.webp",
    title: "Kemenkeu Data Center",
    category: "Construction",
    location: "Jakarta",
    description: "Supply Unit AC and Installation AC VRV By DAIKIN (2022)",
  },
  {
    id: "17",
    image: "Bank Raya Menara Brilliant.webp",
    title: "Bank Raya Menara Brilliant",
    category: "Construction",
    location: "Jakarta",
    description: "Supply Unit AC and Installation AC VRV By DAIKIN (2022)",
  },
  {
    id: "18",
    image: "LAYTON Navapark.webp",
    title: "LAYTON Navapark",
    category: "Construction",
    location: "BSD City",
    description: "Supply unit AC and Installation (2023)",
  },
];

export default proyekData;

/**
 * Memisahkan tahun/rentang tahun di akhir description, mis:
 * "Supply unit ... By DAIKIN (2022)" -> { text: "Supply unit ... By DAIKIN", year: "2022" }
 * "Supply Unit ... (2017 - 2021)" -> { text: "...", year: "2017 - 2021" }
 * Kalau tidak ada pola "(...)" di akhir, year akan null dan text = description asli.
 */
export function parseProjectDescription(description: string): {
  text: string;
  year: string | null;
} {
  const match = description.match(/\(([^()]+)\)\s*$/);
  if (!match || match.index === undefined) {
    return { text: description.trim(), year: null };
  }
  return {
    text: description.slice(0, match.index).trim(),
    year: match[1].trim(),
  };
}
