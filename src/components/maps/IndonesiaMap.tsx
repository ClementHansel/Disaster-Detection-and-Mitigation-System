"use client";

import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import type { Feature, Polygon } from "geojson";
import { floodGeoJSON } from "@/data/floods/mockGeoJSON";

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
  const router = useRouter();

  // Approximate bounds for Indonesia (SW and NE corners)
  const indonesiaBounds: [[number, number], [number, number]] = [
    [-11, 95],
    [6, 141],
  ];

  const { BaseLayer, Overlay } = LayersControl;

  // Define a proper type for our flood feature properties.
  type FloodProperties = {
    name: string;
    fill: string;
    "fill-opacity": number;
    stroke: string;
    "stroke-width": number;
    "stroke-opacity": number;
  };

  // onEachFloodFeature: Binds a popup to each flood feature and adds event handlers.
  const onEachFloodFeature = (
    feature: Feature<Polygon, FloodProperties>,
    layer: L.Layer
  ): void => {
    const popupContent = `
      <div class="text-sm">
        <strong>${feature.properties.name}</strong><br />
        Flood extent area
      </div>
    `;
    layer.bindPopup(popupContent);
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        console.log("Mouseover at:", e.latlng);
        e.target.openPopup();
      },
      mouseout: (e: L.LeafletMouseEvent) => {
        console.log("Mouseout at:", e.latlng);
        e.target.closePopup();
      },
      click: (e: L.LeafletMouseEvent) => {
        console.log("Click event at:", e.latlng);
        router.push(
          `/dashboard/floods/${feature.properties.name.toLowerCase()}`
        );
      },
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={5} // Prevent zooming out too far
      style={style}
      className="rounded-lg shadow-md"
      maxBounds={indonesiaBounds}
      maxBoundsViscosity={1.0}
    >
      <LayersControl position="topright">
        {/* Base Layers */}
        <BaseLayer checked name="Street View">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </BaseLayer>
        <BaseLayer name="OpenTopoMap">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)"
          />
        </BaseLayer>
        <BaseLayer name="Satellite View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />
        </BaseLayer>
        {/* Overlay: Hybrid Labels */}
        <Overlay checked name="Hybrid Labels">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri"
          />
        </Overlay>
        {/* Custom Thematic Layer: Flood Extent */}
        <Overlay name="Flood Extent">
          <GeoJSON data={floodGeoJSON} onEachFeature={onEachFloodFeature} />
        </Overlay>
      </LayersControl>
      {children}
    </MapContainer>
  );
}
