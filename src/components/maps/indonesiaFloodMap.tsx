"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Define the flood severity type and flood event interface
type FloodSeverity = "low" | "moderate" | "severe";

interface FloodEvent {
  id: string;
  name: string;
  lat: number;
  lng: number;
  floodSeverity: FloodSeverity;
  impactedArea: number; // in km
  description: string;
  isHistorical: boolean; // Ensure this is not optional
}

interface IndonesiaFloodMapProps {
  onSiteClick?: (flood: FloodEvent) => void;
}

// Mock flood event data (using sensor locations)
const floodData: FloodEvent[] = [
  {
    id: "jakarta",
    name: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    floodSeverity: "severe",
    impactedArea: 5,
    description: "Heavy flooding in downtown areas.",
    isHistorical: true, // Add this
  },
  {
    id: "surabaya",
    name: "Surabaya",
    lat: -7.2504,
    lng: 112.7688,
    floodSeverity: "moderate",
    impactedArea: 3,
    description: "Rising water levels in low-lying zones.",
    isHistorical: false, // Add this
  },
  {
    id: "bandung",
    name: "Bandung",
    lat: -6.9147,
    lng: 107.6098,
    floodSeverity: "low",
    impactedArea: 2,
    description: "Minor flooding detected near the river.",
    isHistorical: false, // Add this
  },
  {
    id: "medan",
    name: "Medan",
    lat: 3.5952,
    lng: 98.6722,
    floodSeverity: "moderate",
    impactedArea: 4,
    description: "Increased water levels in suburban areas.",
    isHistorical: false, // Add this
  },
  {
    id: "bali",
    name: "Bali",
    lat: -8.4095,
    lng: 115.1889,
    floodSeverity: "severe",
    impactedArea: 6,
    description: "Severe floods impacting coastal areas.",
    isHistorical: true, // Example of a historical event
  },
  {
    id: "makasar",
    name: "Makasar",
    lat: -5.1477,
    lng: 119.4327,
    floodSeverity: "moderate",
    impactedArea: 3,
    description: "Flooding affecting local infrastructure.",
    isHistorical: false, // Add this
  },
  {
    id: "raja-ampat",
    name: "Raja Ampat",
    lat: -0.4436,
    lng: 130.9938,
    floodSeverity: "low",
    impactedArea: 2,
    description: "Minor flooding reported in remote areas.",
    isHistorical: false, // Example of a historical event
  },
  {
    id: "pekanbaru",
    name: "Pekanbaru",
    lat: 0.5071,
    lng: 101.4478,
    floodSeverity: "severe",
    impactedArea: 5,
    description: "Critical flooding; immediate action required.",
    isHistorical: true, // Add this
  },
  {
    id: "manado",
    name: "Manado",
    lat: 1.4748,
    lng: 124.8421,
    floodSeverity: "moderate",
    impactedArea: 3,
    description: "Flood warning in place for downtown.",
    isHistorical: false, // Add this
  },
  {
    id: "gorontalo",
    name: "Gorontalo",
    lat: 0.5435,
    lng: 123.0564,
    floodSeverity: "low",
    impactedArea: 1,
    description: "Light rain with minor water accumulation.",
    isHistorical: false, // Add this
  },
];

function getFloodColor(severity: FloodSeverity): string {
  switch (severity) {
    case "low":
      return "#00E676"; // Green for low severity
    case "moderate":
      return "#FFC107"; // Amber for moderate severity
    case "severe":
      return "#FF1744"; // Red for severe events
    default:
      return "#00E676";
  }
}

const getFloodMarkerIcon = (flood: FloodEvent): L.DivIcon | undefined => {
  if (typeof window === "undefined") return undefined;
  const color = getFloodColor(flood.floodSeverity);
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white;"></div>`,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

export default function IndonesiaFloodMap({
  onSiteClick,
}: IndonesiaFloodMapProps) {
  const router = useRouter();

  useEffect(() => {
    console.log("Flood map mounted with events", floodData);
  }, []);

  return (
    <div className="relative">
      <MapContainer
        center={[-6.2, 107.0]} // Adjust the center based on your needs
        zoom={6}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {floodData.map((flood) => (
          <Marker
            key={flood.id}
            position={[flood.lat, flood.lng]}
            icon={getFloodMarkerIcon(flood)}
            eventHandlers={{
              click: () => {
                if (onSiteClick) {
                  onSiteClick(flood);
                } else {
                  router.push(`/dashboard/floods/${flood.id}`);
                }
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{flood.name}</strong>
                <br />
                Severity: {flood.floodSeverity}
                <br />
                Impacted Area: {flood.impactedArea} km radius
                <br />
                {flood.description}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
