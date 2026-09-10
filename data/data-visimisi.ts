import { FaEye, FaBullseye } from "react-icons/fa";
import type { IconType } from "react-icons";

export interface VisiMisiEntry {
  id: "visi" | "misi";
  icon: IconType;
}

export const visiMisiData: VisiMisiEntry[] = [
  { id: "visi", icon: FaEye },
  { id: "misi", icon: FaBullseye },
];
