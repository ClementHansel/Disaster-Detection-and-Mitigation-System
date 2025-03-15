// src/data/floods/mockGeoJSON.ts

export const floodExtentGeoJSON = {
  type: "Feature" as const,
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [105.0, -7.0],
        [105.0, -6.0],
        [107.0, -6.0],
        [107.0, -7.0],
        [105.0, -7.0],
      ],
    ],
  },
  properties: {
    name: "Flood Extent",
    fill: "#0000FF",
    "fill-opacity": 0.3,
    stroke: "#0000FF",
    "stroke-width": 2,
    "stroke-opacity": 0.5,
  },
};
