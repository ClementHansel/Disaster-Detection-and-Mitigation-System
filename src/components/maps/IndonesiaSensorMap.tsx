"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ColorLegend from "./ColorLegendSensorMap";

// Define the union type for site status
type SiteStatus = "online" | "offline" | "in progress" | "maintenance";

// Define the type for a location
type Location = {
  name: string;
  lat: number;
  lng: number;
  status: SiteStatus;
  totalSensors: number;
  onlineSensors: number;
  totalCameras: number;
  onlineCameras: number;
  connection: "stable" | "slow";
  tasks: string;
};

// Function to compute marker color based on conditions
const getMarkerColor = (site: Location): string => {
  if (site.status === "offline") return "#808080"; // Grey
  if (site.status === "maintenance") return "#0000FF"; // Blue
  if (site.status === "in progress") return "#800080"; // Purple
  // For online sites:
  if (site.connection === "slow") return "#FFC107"; // Warm amber for slow connection
  if (
    site.onlineSensors < site.totalSensors ||
    site.onlineCameras < site.totalCameras
  )
    return "#FF0000"; // Red if sensor/camera problem
  return "#00E676"; // Brighter green for online & all OK
};

// Function to create a custom marker icon using a div with inline styles
const getMarkerIcon = (site: Location): L.DivIcon => {
  // Check for window to avoid SSR issues
  if (typeof window === "undefined") {
    return new L.DivIcon();
  }
  const color = getMarkerColor(site);
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Mock location data for 15 sites
const locationsData: Location[] = [
  {
    name: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    status: "online",
    totalSensors: 10,
    onlineSensors: 10,
    totalCameras: 5,
    onlineCameras: 5,
    connection: "stable",
    tasks: "Completed: 8",
  },
  {
    name: "Surabaya",
    lat: -7.2504,
    lng: 112.7688,
    status: "online",
    totalSensors: 8,
    onlineSensors: 7, // Sensor problem
    totalCameras: 4,
    onlineCameras: 4,
    connection: "stable",
    tasks: "In Progress: 2",
  },
  {
    name: "Bandung",
    lat: -6.9147,
    lng: 107.6098,
    status: "offline",
    totalSensors: 6,
    onlineSensors: 0,
    totalCameras: 3,
    onlineCameras: 0,
    connection: "stable",
    tasks: "No Connection",
  },
  {
    name: "Medan",
    lat: 3.5952,
    lng: 98.6722,
    status: "in progress",
    totalSensors: 7,
    onlineSensors: 7,
    totalCameras: 5,
    onlineCameras: 5,
    connection: "stable",
    tasks: "In Progress: 1",
  },
  {
    name: "Bali",
    lat: -8.4095,
    lng: 115.1889,
    status: "online",
    totalSensors: 6,
    onlineSensors: 6,
    totalCameras: 3,
    onlineCameras: 3,
    connection: "slow", // Connection slow
    tasks: "Completed: 3",
  },
  {
    name: "Makasar",
    lat: -5.1477,
    lng: 119.4327,
    status: "online",
    totalSensors: 5,
    onlineSensors: 5,
    totalCameras: 4,
    onlineCameras: 3, // Camera problem
    connection: "stable",
    tasks: "In Progress: 2",
  },
  {
    name: "Raja Ampat",
    lat: -0.4436,
    lng: 130.9938,
    status: "online",
    totalSensors: 12,
    onlineSensors: 12,
    totalCameras: 8,
    onlineCameras: 8,
    connection: "stable",
    tasks: "Completed: 4",
  },
  {
    name: "Pekanbaru",
    lat: 0.5071,
    lng: 101.4478,
    status: "offline",
    totalSensors: 6,
    onlineSensors: 0,
    totalCameras: 3,
    onlineCameras: 0,
    connection: "stable",
    tasks: "No Connection",
  },
  {
    name: "Manado",
    lat: 1.4748,
    lng: 124.8421,
    status: "online",
    totalSensors: 7,
    onlineSensors: 7,
    totalCameras: 5,
    onlineCameras: 4, // Camera problem
    connection: "stable",
    tasks: "In Progress: 1",
  },
  {
    name: "Gorontalo",
    lat: 0.5435,
    lng: 123.0564,
    status: "online",
    totalSensors: 6,
    onlineSensors: 6,
    totalCameras: 4,
    onlineCameras: 4,
    connection: "stable",
    tasks: "Completed: 2",
  },
  {
    name: "Ambon",
    lat: -3.6547,
    lng: 128.1908,
    status: "online",
    totalSensors: 12,
    onlineSensors: 11, // Sensor problem
    totalCameras: 8,
    onlineCameras: 4, // Camera problem
    connection: "stable",
    tasks: "Issue: Check devices",
  },
  {
    name: "Sorong",
    lat: -0.8711,
    lng: 131.2559,
    status: "maintenance", // Under maintenance
    totalSensors: 8,
    onlineSensors: 8,
    totalCameras: 4,
    onlineCameras: 4,
    connection: "stable",
    tasks: "Maintenance ongoing",
  },
  {
    name: "Timika",
    lat: -4.554,
    lng: 136.888,
    status: "online",
    totalSensors: 8,
    onlineSensors: 8,
    totalCameras: 6,
    onlineCameras: 6,
    connection: "stable",
    tasks: "Completed: 5",
  },
  {
    name: "Flores",
    lat: -8.6574,
    lng: 121.0794,
    status: "online",
    totalSensors: 9,
    onlineSensors: 9,
    totalCameras: 5,
    onlineCameras: 4, // Camera problem
    connection: "stable",
    tasks: "In Progress: 1",
  },
  {
    name: "Gili",
    lat: -8.3482,
    lng: 116.0465,
    status: "online",
    totalSensors: 7,
    onlineSensors: 7,
    totalCameras: 4,
    onlineCameras: 4,
    connection: "stable",
    tasks: "Completed: 3",
  },
];

export default function IndonesiaMap() {
  const router = useRouter();

  useEffect(() => {
    console.log("Map component mounted with locations", locationsData);
  }, []);

  return (
    <div className="relative">
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locationsData.map((site) => (
          <Marker
            key={site.name}
            position={[site.lat, site.lng]}
            icon={getMarkerIcon(site)}
          >
            <Popup>
              <div className="text-sm">
                <strong>{site.name}</strong> <br />
                Status: {site.status} <br />
                Sensors: {site.onlineSensors}/{site.totalSensors} online <br />
                Cameras: {site.onlineCameras}/{site.totalCameras} online <br />
                Connection: {site.connection} <br />
                Tasks: {site.tasks} <br />
                <button
                  onClick={() =>
                    router.push(`/dashboard/sites/${site.name.toLowerCase()}`)
                  }
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  title="View Detail"
                >
                  View Detail
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="mt-4">
        <ColorLegend />
      </div>
    </div>
  );
}
