"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import modular widget components
import FloodAlertWidget from "@/components/widgets/FloodAlertWidget";
import AlertLevelWidget from "@/components/widgets/AlertLevelWidget";
import ImpactedAreaWidget from "@/components/widgets/ImpactedAreaWidget";
import WaterFlowWidget from "@/components/widgets/WaterFlowWidget";
import RainfallWidget from "@/components/widgets/RainfallWidget";

// Import Flood Notification component
import FloodNotification from "@/components/floods/FloodNotification";

// Import types and mock data for flood information
import { FloodEvent, FloodSeverity } from "@/types/floods";
import { fetchRealTimeFloodData } from "@/data/floods/mockRealtime";
import { mockHistoricalFloodData } from "@/data/floods/mockHistorical";

// Lazy-load the IndonesiaFloodMap component to improve performance and avoid SSR issues
const IndonesiaFloodMap = dynamic(
  () => import("@/components/maps/IndonesiaFloodMap"),
  { ssr: false, loading: () => <p>Loading map...</p> }
);

export default function DashboardPage() {
  const [realTimeFloodData, setRealTimeFloodData] = useState<FloodEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<FloodSeverity | "all">(
    "all"
  );

  useEffect(() => {
    setRealTimeFloodData(fetchRealTimeFloodData());
  }, []);

  const filteredHistoricalData = mockHistoricalFloodData.filter(
    (flood) =>
      (severityFilter === "all" || flood.floodSeverity === severityFilter) &&
      flood.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <h1>Flood Monitoring Dashboard</h1>

      {/* Widgets Section */}
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
      <div className="mb-6">
        <IndonesiaFloodMap />
      </div>

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
