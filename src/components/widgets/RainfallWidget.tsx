import React from "react";

interface RainfallData {
  timestamp: string;
  value: number; // Assuming it's in mm
}

const RainfallWidget = ({ data }: { data: RainfallData[] }) => {
  return (
    <div className="widget">
      <h3>Rainfall Data</h3>
      {data.map((entry, index) => (
        <p key={index}>
          {entry.timestamp}: {entry.value} mm
        </p>
      ))}
    </div>
  );
};

export default RainfallWidget;
