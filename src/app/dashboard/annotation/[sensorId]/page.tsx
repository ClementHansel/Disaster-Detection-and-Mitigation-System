"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mockData } from "@/data/ai/mockData";
import { DataPoint, FilterOptions } from "@/types/ai";
import { filterData } from "@/lib/ai/dataUtils";
import Filters from "@/components/ai/Filters";
import Chart from "@/components/ai/Chart";

const SensorDetailPage = () => {
  const params = useParams();
  const sensorId = Array.isArray(params.sensorId)
    ? params.sensorId[0]
    : params.sensorId;

  const [filters, setFilters] = useState<FilterOptions>({
    site: null,
    sensor: sensorId ?? null, // Ensure it's string | null
    dateFrom: null,
    dateTo: null,
    timeFrom: null,
    timeTo: null,
  });

  const [filteredData, setFilteredData] = useState<DataPoint[] | null>(null);

  useEffect(() => {
    if (!sensorId) return;

    const result = filterData(
      mockData,
      filters.site,
      sensorId,
      filters.dateFrom,
      filters.dateTo,
      filters.timeFrom,
      filters.timeTo
    );

    setFilteredData(result);
  }, [sensorId, filters]);

  if (!sensorId) return <p>Invalid Sensor</p>;
  if (filteredData === null) return <p>Loading...</p>; // ✅ Fix: Show only when still loading

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sensor: {sensorId}</h1>

      <Filters filters={filters} setFilters={setFilters} />

      {filteredData.length > 0 ? (
        <Chart data={filteredData} site={filters.site} sensor={sensorId} />
      ) : (
        <p>No data available for this sensor.</p>
      )}

      <h2 className="text-lg font-semibold mt-4">Annotations</h2>
      <ul>
        {filteredData.map((data) => (
          <li key={data.timestamp} className="border p-4 rounded mb-2">
            {new Date(data.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorDetailPage;
