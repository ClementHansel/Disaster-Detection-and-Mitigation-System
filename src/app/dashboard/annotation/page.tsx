"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockData } from "@/data/ai/mockData";
import { FilterOptions, DataPoint } from "@/types/ai";
import { filterData } from "@/lib/ai/dataUtils";
import Filters from "@/components/ai/Filters";
import AIAnalysis from "@/components/ai/AIAnalysis";
import Chart from "@/components/ai/Chart";

const AnnotationPage = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    site: null,
    sensor: null,
    dateFrom: null,
    dateTo: null,
    timeFrom: null,
    timeTo: null,
  });

  const filteredAnnotations: DataPoint[] = filterData(
    mockData,
    filters.site,
    filters.sensor,
    filters.dateFrom,
    filters.dateTo,
    filters.timeFrom,
    filters.timeTo
  );

  // ✅ Fix: Ensure each sensor appears only once
  const uniqueSensors = new Set<string>();
  const sensorList = filteredAnnotations.filter((annotation) => {
    if (!uniqueSensors.has(annotation.sensor)) {
      uniqueSensors.add(annotation.sensor);
      return true;
    }
    return false;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Annotations</h1>

      <Filters filters={filters} setFilters={setFilters} />

      {filters.site && filters.sensor ? (
        <>
          <Chart
            data={filteredAnnotations}
            site={filters.site}
            sensor={filters.sensor}
          />
          <AIAnalysis data={filteredAnnotations} />
        </>
      ) : (
        <p>Please select a site and sensor to view data.</p>
      )}

      <ul>
        {sensorList.map((annotation) => (
          <li key={annotation.sensor} className="border p-4 rounded mb-2">
            <Link href={`/dashboard/annotation/${annotation.sensor}`}>
              <span className="text-blue-500 cursor-pointer">
                {annotation.site} - {annotation.sensor}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnotationPage;
