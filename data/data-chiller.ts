import {
  Ruler,
  ShieldCheck,
  Zap,
  LucideIcon,
  ClipboardList,
  Wrench,
  Cable,
  Gauge,
  ClipboardCheck,
  Activity,
} from "lucide-react";

export const checklistPointKeys = [
  "point_01",
  "point_02",
  "point_03",
  "point_04",
] as const;

export const scopeOfWorkKeys = [
  "scope_01",
  "scope_02",
  "scope_03",
  "scope_04",
  "scope_05",
  "scope_06",
] as const;

export const scopeIcons: LucideIcon[] = [
  ClipboardList,
  Wrench,
  Cable,
  Gauge,
  Activity,
  ClipboardCheck,
];

export const benefitPointKeys = ["point_01", "point_02", "point_03"] as const;
export type BenefitPointKey = (typeof benefitPointKeys)[number];

export interface BenefitItem {
  id: "presisi" | "kebersihan" | "hemat_daya";
  icon: LucideIcon;
  colorClass: string;
  badgeClass: string;
  pointKeys: readonly BenefitPointKey[];
}

export const benefitItems: BenefitItem[] = [
  {
    id: "presisi",
    icon: Ruler,
    colorClass: "text-imm-blue bg-imm-blue/10",
    badgeClass: "bg-blue-50 text-imm-blue border-blue-200/60",
    pointKeys: benefitPointKeys,
  },
  {
    id: "kebersihan",
    icon: ShieldCheck,
    colorClass: "text-emerald-600 bg-emerald-500/10",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    pointKeys: benefitPointKeys,
  },
  {
    id: "hemat_daya",
    icon: Zap,
    colorClass: "text-imm-orange bg-imm-orange/10",
    badgeClass: "bg-orange-50 text-imm-orange border-orange-200/60",
    pointKeys: benefitPointKeys,
  },
];
