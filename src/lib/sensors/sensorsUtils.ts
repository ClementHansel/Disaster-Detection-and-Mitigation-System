// src/lib/sensors/sensorUtils.ts
import L from "leaflet";
import { Location, SensorData } from "@/types/sensors";

/**
 * Filters sensor readings by site name (case-insensitive).
 * @param sensors - Array of sensor data.
 * @param site - The site name to search for.
 * @returns An array of sensors whose site names include the search term.
 */
export function filterSensorsBySite(
  sensors: SensorData[],
  site: string
): SensorData[] {
  return sensors.filter((sensor) =>
    sensor.site.toLowerCase().includes(site.toLowerCase())
  );
}

/**
 * Computes the marker color for a sensor location based on its status,
 * connection speed, and sensor/camera availability.
 * @param site - The sensor location.
 * @returns A hex color string.
 */
export function getMarkerColor(site: Location): string {
  if (site.status === "offline") return "#808080"; // Grey for offline
  if (site.status === "maintenance") return "#0000FF"; // Blue for maintenance
  if (site.status === "in progress") return "#800080"; // Purple for in progress
  if (site.connection === "slow") return "#FFC107"; // Amber for slow connection
  if (
    site.onlineSensors < site.totalSensors ||
    site.onlineCameras < site.totalCameras
  )
    return "#FF0000"; // Red if sensor/camera problem exists
  return "#00E676"; // Bright green if all is OK
}

/**
 * Creates a custom Leaflet DivIcon for a sensor location.
 * If the site has any issues (not online or lacking sensors/cameras), a pulsing layer is added.
 * @param site - The sensor location.
 * @returns A Leaflet DivIcon.
 */
export function getMarkerIcon(site: Location): L.DivIcon {
  // Ensure this code runs on the client (window is defined)
  if (typeof window === "undefined") return new L.DivIcon();

  const color = getMarkerColor(site);
  // Determine if the site has any issues:
  // Either it's not online or it has fewer online sensors/cameras than expected.
  const hasProblem =
    site.status !== "online" ||
    site.onlineSensors < site.totalSensors ||
    site.onlineCameras < site.totalCameras;

  if (hasProblem) {
    // Return a marker with an inner circle and a pulsing outer circle
    return new L.DivIcon({
      html: `
        <div class="relative">
          <div class="w-6 h-6 rounded-full" style="background-color: ${color}; border: 2px solid white;"></div>
          <div class="animate-ping absolute inset-0 rounded-full" style="background-color: ${color}; opacity: 0.5;"></div>
        </div>
      `,
      className: "",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  } else {
    // Return a simple marker with a colored circle
    return new L.DivIcon({
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
      className: "",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  }
}
