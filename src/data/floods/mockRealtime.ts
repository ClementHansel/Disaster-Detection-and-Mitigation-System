// src/data/floods/mockRealtime.ts
import { FloodEvent } from "@/types/floods";

export const fetchRealTimeFloodData = (): FloodEvent[] => [
  {
    id: "jakarta",
    name: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    floodSeverity: "severe",
    radius_km: 6, // Approximate radius (km) of the flood extent
    impactedArea: 5, // A relative measure or unit for impacted area
    description: "Heavy flooding in downtown areas.",
    isHistorical: false,
  },
  {
    id: "surabaya",
    name: "Surabaya",
    lat: -7.2504,
    lng: 112.7688,
    floodSeverity: "moderate",
    radius_km: 4, // Approximate radius (km)
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
    radius_km: 2, // Approximate radius (km)
    impactedArea: 2,
    description: "Minor flooding detected near the river.",
    isHistorical: false,
  },
  {
    id: "medan",
    name: "Medan",
    lat: 3.5952,
    lng: 98.6722,
    floodSeverity: "moderate",
    radius_km: 5, // Approximate radius (km)
    impactedArea: 4,
    description: "Increased water levels in suburban areas.",
    isHistorical: false,
  },
  {
    id: "bali",
    name: "Bali",
    lat: -8.4095,
    lng: 115.1889,
    floodSeverity: "severe",
    radius_km: 7, // Approximate radius (km)
    impactedArea: 6,
    description: "Severe floods impacting coastal areas.",
    isHistorical: false,
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    lat: -7.7956,
    lng: 110.3695,
    floodSeverity: "moderate",
    radius_km: 3, // Approximate radius (km)
    impactedArea: 3,
    description: "Flood warnings issued due to heavy rains.",
    isHistorical: false,
  },
  {
    id: "makasar",
    name: "Makasar",
    lat: -5.1477,
    lng: 119.4327,
    floodSeverity: "moderate",
    radius_km: 3, // Approximate radius (km)
    impactedArea: 3,
    description: "Flooding affecting local infrastructure.",
    isHistorical: false,
  },
];
