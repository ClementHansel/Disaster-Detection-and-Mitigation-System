"use client";

import { Marker, Popup } from "react-leaflet";
import { useRouter } from "next/navigation";
import L from "leaflet";
import { locationsData } from "@/data/sensors/mockSensorLocations";
import { getMarkerIcon } from "@/lib/sensors/sensorsUtils";
import { Location } from "@/types/sensors";

export default function IndonesiaSensorMarkers() {
  const router = useRouter();

  return (
    <>
      {locationsData.map((site: Location) => (
        <Marker
          key={site.name}
          position={[site.lat, site.lng]}
          icon={getMarkerIcon(site)}
          eventHandlers={{
            mouseover: (e: L.LeafletMouseEvent) => {
              e.target.openPopup();
            },
            mouseout: (e: L.LeafletMouseEvent) => {
              e.target.closePopup();
            },
            click: (e: L.LeafletMouseEvent) => {
              console.log("Marker clicked at:", e.latlng);
              router.push(`/dashboard/sites/${site.name.toLowerCase()}`);
            },
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>{site.name}</strong>
              <br />
              Status: {site.status}
              <br />
              Sensors: {site.onlineSensors}/{site.totalSensors} online
              <br />
              Cameras: {site.onlineCameras}/{site.totalCameras} online
              <br />
              Connection: {site.connection}
              <br />
              Tasks: {site.tasks}
              <br />
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
    </>
  );
}
