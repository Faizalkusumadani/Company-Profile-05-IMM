export interface CoreValueEntry {
  id:
    | "responsibility"
    | "excellent"
    | "dedicated"
    | "detailOriented"
    | "modernization"
    | "agility"
    | "senseOfBelonging";
  accentColor: string;
}

export const coreValuesData: CoreValueEntry[] = [
  { id: "responsibility", accentColor: "text-reddmas-red" },
  { id: "excellent", accentColor: "text-reddmas-red" },
  { id: "dedicated", accentColor: "text-reddmas-red" },
  { id: "detailOriented", accentColor: "text-reddmas-red" },
  { id: "modernization", accentColor: "text-amber-500" },
  { id: "agility", accentColor: "text-amber-500" },
  { id: "senseOfBelonging", accentColor: "text-amber-500" },
];
