"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FloodNotification from "@/components/FloodNotification";
import FloodAlertWidget from "@/components/widgets/FloodAlertWidget";
import AlertLevelWidget from "@/components/widgets/AlertLevelWidget";
import ImpactedAreaWidget from "@/components/widgets/ImpactedAreaWidget";
import WaterFlowWidget from "@/components/widgets/WaterFlowWidget";
import RainfallWidget from "@/components/widgets/RainfallWidget";

type FloodSeverity = "low" | "moderate" | "severe";

interface FloodEvent {
  id: string;
  name: string;
  lat: number;
  lng: number;
  floodSeverity: FloodSeverity;
  radius_km: number;
  impactedArea: number;
  description: string;
}

const fetchRealTimeFloodData = (): FloodEvent[] => [
  {
    id: "jakarta",
    name: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    floodSeverity: "severe",
    radius_km: 5,
    impactedArea: 5,
    description: "Heavy flooding in downtown areas.",
  },
  {
    id: "surabaya",
    name: "Surabaya",
    lat: -7.2504,
    lng: 112.7688,
    floodSeverity: "moderate",
    radius_km: 3,
    impactedArea: 3,
    description: "Rising water levels in low-lying zones.",
  },
  {
    id: "bandung",
    name: "Bandung",
    lat: -6.9147,
    lng: 107.6098,
    floodSeverity: "low",
    radius_km: 2,
    impactedArea: 2,
    description: "Minor flooding detected near the river.",
  },
];

const historicalFloodData: FloodEvent[] = [
  {
    id: "jakarta-2023",
    name: "Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    floodSeverity: "severe",
    radius_km: 6,
    impactedArea: 6,
    description: "Severe flooding in early 2023.",
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
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [realTimeFloodData, setRealTimeFloodData] = useState<FloodEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<FloodSeverity | "all">(
    "all"
  );

  useEffect(() => {
    setRealTimeFloodData(fetchRealTimeFloodData());
  }, []);

  const getPulseMarkerIcon = (severity: FloodSeverity) => {
    const color =
      severity === "severe"
        ? "bg-red-500"
        : severity === "moderate"
        ? "bg-orange-500"
        : "bg-yellow-500";
    return L.divIcon({
      className: "relative flex items-center justify-center",
      html: `
        <div class="w-6 h-6 rounded-full ${color} shadow-md relative">
          <div class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const filteredHistoricalData = historicalFloodData.filter(
    (flood) =>
      (severityFilter === "all" || flood.floodSeverity === severityFilter) &&
      flood.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <h1>Flood Monitoring Dashboard</h1>
      {/* Flood Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <FloodAlertWidget
          data={realTimeFloodData.map((flood) => ({
            id: flood.id,
            location: flood.name,
            severity: flood.floodSeverity,
            message: flood.description,
            level: flood.floodSeverity,
          }))}
        />
        <AlertLevelWidget
          data={realTimeFloodData.map((flood) => ({
            location: flood.name,
            level: flood.floodSeverity,
            active: true,
          }))}
        />
        <ImpactedAreaWidget
          data={realTimeFloodData.map((flood) => ({
            location: flood.name,
            radius_km: flood.radius_km,
          }))}
        />
        <WaterFlowWidget
          data={realTimeFloodData.map((flood) => ({
            location: flood.name,
            timestamp: new Date().toISOString(),
            flow_rate: Math.random() * 50 + 10,
          }))}
        />
        <RainfallWidget
          data={realTimeFloodData.map((flood) => ({
            location: flood.name,
            timestamp: new Date().toISOString(),
            value: Math.random() * 100,
          }))}
        />
      </div>

      {/* Flood Map Section */}
      <MapContainer
        center={[-6.2, 107.0]}
        zoom={6}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {realTimeFloodData.map((flood) => (
          <Marker
            key={flood.id}
            position={[flood.lat, flood.lng]}
            icon={getPulseMarkerIcon(flood.floodSeverity)}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
              click: () => router.push(`/dashboard/floods/${flood.id}`),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{flood.name}</strong>
                <br />
                Severity: {flood.floodSeverity}
                <br />
                Impacted Area: {flood.radius_km} km radius
                <br />
                {flood.description}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Flood Notification Section */}
      <FloodNotification floodData={realTimeFloodData} />

      {/* Historical Flood Data Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-3">📜 Historical Flood Data</h2>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="🔍 Search flood history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <select
            value={severityFilter}
            onChange={(e) =>
              setSeverityFilter(e.target.value as FloodSeverity | "all")
            }
            className="p-2 border rounded"
            aria-label="Filter by Severity"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </div>
        {filteredHistoricalData.length === 0 ? (
          <p className="text-gray-500">No results found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredHistoricalData.map((flood) => (
              <li
                key={flood.id}
                className="p-2 border-b flex justify-between items-center"
              >
                <div>
                  <strong>{flood.name}</strong> - {flood.description}
                </div>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    flood.floodSeverity === "severe"
                      ? "bg-red-500"
                      : flood.floodSeverity === "moderate"
                      ? "bg-orange-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {flood.floodSeverity.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
