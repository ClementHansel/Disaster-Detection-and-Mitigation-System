// src/lib/floodUtils.ts
import L from "leaflet";
import { FloodEvent, FloodSeverity } from "@/types/floods";

export function getFloodColor(severity: FloodSeverity): string {
  // Using Tailwind classes for colors in the marker HTML
  switch (severity) {
    case "low":
      return "bg-yellow-500";
    case "moderate":
      return "bg-orange-500";
    case "severe":
      return "bg-red-500";
    default:
      return "bg-yellow-500";
  }
}

export function getPulseMarkerIcon(flood: FloodEvent): L.DivIcon {
  const colorClass = getFloodColor(flood.floodSeverity);
  return L.divIcon({
    className: "relative flex items-center justify-center",
    html: `
      <div class="w-6 h-6 rounded-full ${colorClass} shadow-md relative">
        <div class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}
