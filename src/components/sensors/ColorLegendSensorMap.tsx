// src/components/sensors/ColorLegendSensorMap.tsx
"use client";

export default function ColorLegendSensorMap() {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-sm font-bold mb-2">Legend</h3>
      <ul className="text-sm">
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#00E676" }}
          ></span>
          Online &amp; OK
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#FFC107" }}
          ></span>
          Slow Connection
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#FF0000" }}
          ></span>
          Sensor/Cam Issues
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#808080" }}
          ></span>
          Offline
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#0000FF" }}
          ></span>
          Maintenance
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#800080" }}
          ></span>
          In Progress
        </li>
      </ul>
    </div>
  );
}
