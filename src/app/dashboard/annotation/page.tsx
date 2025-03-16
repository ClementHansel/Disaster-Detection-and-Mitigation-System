"use client";
import { useState, useCallback } from "react";
import Filters from "@/components/ai/Filters";
import Chart from "@/components/ai/Chart";
import AIAnalysis from "@/components/ai/AIAnalysis";
import Annotate from "@/components/ai/Annotate";
import AnnotatedList from "@/components/ai/AnnotatedList";

export default function AnnotationPage() {
  const [filters, setFilters] = useState({
    site: "",
    sensor: "",
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
  });

  // Memoized filter update to avoid unnecessary re-renders
  const handleFilterChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900">Annotation Page</h1>

      {/* Filters Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Filters</h2>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Chart</h2>
        <Chart filters={filters} />
      </div>

      {/* AI Analysis Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">AI Analysis</h2>
        <AIAnalysis filters={filters} />
      </div>

      {/* Annotation Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Annotation</h2>
        <Annotate filters={filters} />
      </div>

      {/* Annotated List Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Annotated List
        </h2>
        <AnnotatedList filters={filters} />
      </div>
    </div>
  );
}
