import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataPoint } from "@/types/ai";

interface ChartProps {
  data: DataPoint[];
  site: string | null;
  sensor: string | null;
}

const Chart: React.FC<ChartProps> = ({ data, site, sensor }) => {
  if (!site || !sensor) {
    return <p>Please select a site and sensor to view the chart.</p>;
  }

  // Filter data based on selected site and sensor
  const filteredData = data.filter(
    (point) => point.site === site && point.sensor === sensor
  );

  if (filteredData.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No data available for this selection.
      </p>
    );
  }

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-lg font-bold mb-2 text-center">{`Sensor Data: ${sensor} at ${site}`}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(time) => new Date(time).toLocaleString()}
          />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sensorValue" // Ensure this matches your mock data
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
