import {
  Search,
  Wrench,
  Activity,
  Zap,
  Cpu,
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

/**
 * File ini HANYA berisi data struktural (key, icon, class).
 * Semua teks yang tampil ke user WAJIB diambil lewat t() dari message file,
 * bukan ditulis ulang di sini. Ini menghindari duplikasi ID/EN di komponen.
 */

// ---------------------------------------------------------------------------
// Checklist (Hero section)
// ---------------------------------------------------------------------------
export const checklistPointKeys = [
  "point_01",
  "point_02",
  "point_03",
  "point_04",
] as const;
export type ChecklistPointKey = (typeof checklistPointKeys)[number];

// ---------------------------------------------------------------------------
// Scope of Work (Cakupan Perbaikan)
// Urutan array ini WAJIB selaras dengan urutan scopeOfWorkKeys.
// ---------------------------------------------------------------------------
export const scopeOfWorkKeys = [
  "scope_01", // diagnosa
  "scope_02", // kompresor
  "scope_03", // freon-leak
  "scope_04", // kapasitor
  "scope_05", // pcb-sensor
  "scope_06", // fan-motor
] as const;
export type ScopeOfWorkKey = (typeof scopeOfWorkKeys)[number];

export const scopeIcons: LucideIcon[] = [
  Search, // scope_01 - diagnosa
  Wrench, // scope_02 - kompresor
  Activity, // scope_03 - freon-leak
  Zap, // scope_04 - kapasitor
  Cpu, // scope_05 - pcb-sensor
  ShieldCheck, // scope_06 - fan-motor
];

// ---------------------------------------------------------------------------
// Benefits (Diagnosa, Sparepart, Garansi)
// ---------------------------------------------------------------------------
export const benefitPointKeys = ["point_01", "point_02", "point_03"] as const;
export type BenefitPointKey = (typeof benefitPointKeys)[number];

export interface BenefitItem {
  id: "diagnosa" | "sparepart" | "garansi";
  icon: LucideIcon;
  colorClass: string;
  badgeClass: string;
  pointKeys: readonly BenefitPointKey[];
}

export const benefitItems: BenefitItem[] = [
  {
    id: "diagnosa",
    icon: Search,
    colorClass: "text-imm-blue bg-imm-blue/10",
    badgeClass: "bg-blue-50 text-imm-blue border-blue-200/60",
    pointKeys: benefitPointKeys,
  },
  {
    id: "sparepart",
    icon: ShieldCheck,
    colorClass: "text-emerald-600 bg-emerald-500/10",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    pointKeys: benefitPointKeys,
  },
  {
    id: "garansi",
    icon: CheckCircle2,
    colorClass: "text-imm-orange bg-imm-orange/10",
    badgeClass: "bg-orange-50 text-imm-orange border-orange-200/60",
    pointKeys: benefitPointKeys,
  },
];

// ---------------------------------------------------------------------------
// Steps (Alur Kerja Reparasi / SOP Workflow)
// Urutan array ini WAJIB selaras dengan urutan stepKeys.
// ---------------------------------------------------------------------------
export const stepKeys = ["step_01", "step_02", "step_03", "step_04"] as const;
export type StepKey = (typeof stepKeys)[number];

export const stepIcons: LucideIcon[] = [
  CalendarCheck, // step_01
  Search, // step_02
  Wrench, // step_03
  CheckCircle2, // step_04
];
