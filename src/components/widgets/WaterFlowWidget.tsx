import React from "react";
interface WaterFlowData {
  timestamp: string;
  flow_rate: number; // Cubic meters per second
}

const WaterFlowWidget = ({ data }: { data: WaterFlowData[] }) => {
  return (
    <div className="widget p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold">Water Flow</h3>
      <ul className="mt-2">
        {data.map((entry, index) => (
          <li key={index} className="text-sm text-gray-700">
            {entry.timestamp}:{" "}
            <span className="font-bold">{entry.flow_rate} m³/s</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaterFlowWidget;
