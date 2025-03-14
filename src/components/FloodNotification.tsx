import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type FloodSeverity = "low" | "moderate" | "severe";

interface FloodEvent {
  id: string;
  name: string;
  floodSeverity: FloodSeverity;
  impactedArea: number;
  description: string;
}

interface FloodNotificationProps {
  floodData: FloodEvent[];
}

const severityColors: Record<FloodSeverity, string> = {
  low: "bg-green-200 border-green-400",
  moderate: "bg-yellow-200 border-yellow-400",
  severe: "bg-red-200 border-red-400",
};

const FloodNotification: React.FC<FloodNotificationProps> = ({ floodData }) => {
  return (
    <Card className="mt-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Flood Notifications</h2>
      {floodData.length === 0 ? (
        <p className="text-gray-500">No active flood events.</p>
      ) : (
        floodData.map((flood) => (
          <CardContent
            key={flood.id}
            className={`p-2 mb-2 border rounded-md ${
              severityColors[flood.floodSeverity]
            }`}
          >
            <strong className="text-gray-800">{flood.name}</strong>
            <br />
            <span className="font-semibold">Severity:</span>{" "}
            {flood.floodSeverity}
            <br />
            <span className="font-semibold">Impacted Area:</span>{" "}
            {flood.impactedArea} km radius
            <br />
            <span className="font-semibold">Description:</span>{" "}
            {flood.description}
          </CardContent>
        ))
      )}
    </Card>
  );
};

export default FloodNotification;
