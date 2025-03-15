"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Marker, Popup } from "react-leaflet";
import IndonesiaMap from "./IndonesiaMap";
import { FloodEvent } from "@/types/floods";
import { fetchRealTimeFloodData } from "@/data/floods/mockRealtime";
import { getPulseMarkerIcon } from "@/lib/flood/floodUtils";

interface IndonesiaFloodMapProps {
  onSiteClick?: (flood: FloodEvent) => void;
}

export default function IndonesiaFloodMap({
  onSiteClick,
}: IndonesiaFloodMapProps) {
  const router = useRouter();
  const realtimeData = fetchRealTimeFloodData();

  useEffect(() => {
    console.log("Realtime flood data:", realtimeData);
  }, [realtimeData]);

  return (
    <IndonesiaMap>
      {realtimeData.map((flood: FloodEvent) => (
        <Marker
          key={flood.id}
          position={[flood.lat, flood.lng]}
          icon={getPulseMarkerIcon(flood)}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
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
    </IndonesiaMap>
  );
}
