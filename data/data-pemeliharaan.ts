import {
  Wind,
  Sparkles,
  Droplets,
  Activity,
  Zap,
  ShieldCheck,
  CheckCircle2,
  LucideIcon,
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
  Wind,
  Droplets,
  Activity,
  Zap,
  Sparkles,
  CheckCircle2,
];

export const benefitPointKeys = ["point_01", "point_02", "point_03"] as const;
export type BenefitPointKey = (typeof benefitPointKeys)[number];

export interface BenefitItem {
  id: "efisiensi" | "kesehatan" | "keawetan";
  icon: LucideIcon;
  colorClass: string;
  badgeClass: string;
  pointKeys: readonly BenefitPointKey[];
}

export const benefitItems: BenefitItem[] = [
  {
    id: "efisiensi",
    icon: Zap,
    colorClass: "text-imm-blue bg-imm-blue/10",
    badgeClass: "bg-blue-50 text-imm-blue border-blue-200/60",
    pointKeys: benefitPointKeys,
  },
  {
    id: "kesehatan",
    icon: Sparkles,
    colorClass: "text-emerald-600 bg-emerald-500/10",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    pointKeys: benefitPointKeys,
  },
  {
    id: "keawetan",
    icon: ShieldCheck,
    colorClass: "text-imm-orange bg-imm-orange/10",
    badgeClass: "bg-orange-50 text-imm-orange border-orange-200/60",
    pointKeys: benefitPointKeys,
  },
];

export type ChecklistPointKey = (typeof checklistPointKeys)[number];
export type ScopeOfWorkKey = (typeof scopeOfWorkKeys)[number];
