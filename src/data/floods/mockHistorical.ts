// src/data/floods/mockHistorical.ts
import { FloodEvent } from "@/types/floods";

export const mockHistoricalFloodData: FloodEvent[] = [
  {
    id: "jakarta-2023",
    name: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    floodSeverity: "severe",
    radius_km: 6,
    impactedArea: 6,
    description: "Severe flooding in early 2023.",
    isHistorical: true,
  },
  {
    id: "surabaya-2022",
    name: "Surabaya",
    lat: -7.2504,
    lng: 112.7688,
    floodSeverity: "moderate",
    radius_km: 4,
    impactedArea: 4,
    description: "Moderate flooding in late 2022.",
    isHistorical: true,
  },
  {
    id: "bandung-2021",
    name: "Bandung",
    lat: -6.9147,
    lng: 107.6098,
    floodSeverity: "low",
    radius_km: 3,
    impactedArea: 3,
    description: "Light flooding in early 2021.",
    isHistorical: true,
  },
  {
    id: "medan-2020",
    name: "Medan",
    lat: 3.5952,
    lng: 98.6722,
    floodSeverity: "moderate",
    radius_km: 4,
    impactedArea: 4,
    description: "Moderate flooding in Medan during 2020.",
    isHistorical: true,
  },
  {
    id: "bali-2019",
    name: "Bali",
    lat: -8.4095,
    lng: 115.1889,
    floodSeverity: "severe",
    radius_km: 7,
    impactedArea: 7,
    description: "Severe coastal flooding in Bali in 2019.",
    isHistorical: true,
  },
];
