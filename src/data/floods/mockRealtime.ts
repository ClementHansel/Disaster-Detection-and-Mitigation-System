// src/data/floods/mockRealtime.ts
import { FloodEvent } from "@/types/floods";

export const fetchRealTimeFloodData = (): FloodEvent[] => [
  {
    id: "jakarta",
    name: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    floodSeverity: "severe",
    impactedArea: 5,
    description: "Heavy flooding in downtown areas.",
    isHistorical: false,
  },
  {
    id: "surabaya",
    name: "Surabaya",
    lat: -7.2504,
    lng: 112.7688,
    floodSeverity: "moderate",
    impactedArea: 3,
    description: "Rising water levels in low-lying zones.",
    isHistorical: false,
  },
  {
    id: "bandung",
    name: "Bandung",
    lat: -6.9147,
    lng: 107.6098,
    floodSeverity: "low",
    impactedArea: 2,
    description: "Minor flooding detected near the river.",
    isHistorical: false,
  },
];
