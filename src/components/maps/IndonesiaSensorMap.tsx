// src/components/maps/IndonesiaSensorMap.tsx
"use client";
import IndonesiaMap from "./IndonesiaMap";
import IndonesiaSensorMarkers from "@/components/sensors/IndonesiaSensorMarkers";
import ColorLegendSensorMap from "@/components/sensors/ColorLegendSensorMap";

export default function IndonesiaSensorMap() {
  return (
    <div className="relative">
      <IndonesiaMap center={[-2.5489, 118.0149]} zoom={5}>
        <IndonesiaSensorMarkers />
      </IndonesiaMap>
      <div className="mt-4">
        <ColorLegendSensorMap />
      </div>
    </div>
  );
}
