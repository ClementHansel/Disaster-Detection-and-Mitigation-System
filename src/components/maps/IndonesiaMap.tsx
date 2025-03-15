// src/components/IndonesiaMap.tsx
"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface IndonesiaMapProps {
  children?: React.ReactNode;
  center?: [number, number];
  zoom?: number;
  style?: React.CSSProperties;
}

export default function IndonesiaMap({
  children,
  center = [-6.2, 107.0],
  zoom = 6,
  style = { height: "500px", width: "100%" },
}: IndonesiaMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={style}
      className="rounded-lg shadow-md"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
    </MapContainer>
  );
}
