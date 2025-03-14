import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type FloodSeverity = "low" | "moderate" | "severe";

interface FloodEvent {
  id: string;
  name: string;
  floodSeverity: FloodSeverity;
  impactedArea: number;
  description: string;
  isHistorical: boolean; // Ensure isHistorical is always required
}

interface HistoricalFloodDataProps {
  historicalFloodData: FloodEvent[];
}

const severityColors: Record<FloodSeverity, string> = {
  low: "bg-green-200",
  moderate: "bg-yellow-200",
  severe: "bg-red-200",
};

const HistoricalFloodData: React.FC<HistoricalFloodDataProps> = ({
  historicalFloodData,
}) => {
  return (
    <Card className="mt-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Historical Flood Data</h2>
      {historicalFloodData.length === 0 ? (
        <p className="text-gray-500">No historical flood records available.</p>
      ) : (
        historicalFloodData.map((flood) => (
          <CardContent
            key={flood.id}
            className={`p-2 mb-2 border rounded-md ${
              severityColors[flood.floodSeverity]
            }`}
          >
            <strong>{flood.name}</strong> - Severity: {flood.floodSeverity}
            <br /> Impacted Area: {flood.impactedArea} km radius
            <br /> {flood.description}
          </CardContent>
        ))
      )}
    </Card>
  );
};

export default HistoricalFloodData;
