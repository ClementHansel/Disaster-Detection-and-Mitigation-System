"use client";

import React, { useState } from "react";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import FilterControls from "@/components/analytics/FilterControls";
import ChartContainer from "@/components/analytics/ChartContainer";
import CumulativeWaterAndPressureChart from "@/components/analytics/CumulativeWaterAndPressureChart";
import SiteWaterLevelRealtimeChart from "@/components/analytics/SiteWaterLevelRealtimeChart";
import AverageWaterLevelChart from "@/components/analytics/AverageWaterLevelChart";
import SiteWaterPressureRealtimeChart from "@/components/analytics/SiteWaterPressureRealtimeChart";
import AverageWaterPressureChart from "@/components/analytics/AverageWaterPressureChart";
import IndividualWaterLevelChart from "@/components/analytics/IndividualWaterLevelChart";
import IndividualWaterPressureChart from "@/components/analytics/IndividualWaterPressureChart";
import { AnalyticsFilter } from "@/types/analyticsTypes";
import {
  realtimeSensorData,
  historicalSensorData,
} from "@/data/analyticsMockData";

// Transform realtimeSensorData for cumulative chart.
const cumulativeData = realtimeSensorData.map((dataPoint) => ({
  timestamp: dataPoint.timestamp,
  waterLevel: dataPoint.value, // rename value to waterLevel
  waterPressure: dataPoint.value + 68, // dummy transformation for water pressure
}));

const siteWaterLevelData = realtimeSensorData.map((dataPoint) => ({
  timestamp: dataPoint.timestamp,
  value: dataPoint.value,
}));

const averageWaterLevelData = realtimeSensorData.map((dataPoint) => ({
  timestamp: dataPoint.timestamp,
  averageWaterLevel: dataPoint.value,
}));

const siteWaterPressureData = realtimeSensorData.map((dataPoint) => ({
  timestamp: dataPoint.timestamp,
  waterPressure: dataPoint.value + 68,
}));

const averageWaterPressureData = realtimeSensorData.map((dataPoint) => ({
  timestamp: dataPoint.timestamp,
  averageWaterPressure: dataPoint.value + 68,
}));

// For individual charts, transform the data so that each object has a "waterLevel" property.
const individualWaterLevelData = realtimeSensorData
  .slice(0, 4)
  .map((dataPoint) => ({
    timestamp: dataPoint.timestamp,
    waterLevel: dataPoint.value,
  }));

const individualWaterPressureData = realtimeSensorData
  .slice(0, 4)
  .map((dataPoint) => ({
    timestamp: dataPoint.timestamp,
    waterPressure: dataPoint.value + 68,
  }));

// Historical data mappings
const historicalCumulativeData = historicalSensorData.map((dataPoint) => ({
  timestamp: dataPoint.timestamp,
  waterLevel: dataPoint.value,
  waterPressure: dataPoint.value + 68,
}));
const historicalSiteWaterLevelData = historicalSensorData.map((dataPoint) => ({
  timestamp: dataPoint.timestamp,
  value: dataPoint.value,
}));
const historicalAverageWaterLevelData = historicalSensorData.map(
  (dataPoint) => ({
    timestamp: dataPoint.timestamp,
    averageWaterLevel: dataPoint.value,
  })
);
const historicalSiteWaterPressureData = historicalSensorData.map(
  (dataPoint) => ({
    timestamp: dataPoint.timestamp,
    waterPressure: dataPoint.value + 68,
  })
);
const historicalAverageWaterPressureData = historicalSensorData.map(
  (dataPoint) => ({
    timestamp: dataPoint.timestamp,
    averageWaterPressure: dataPoint.value + 68,
  })
);
const historicalIndividualWaterLevelData = historicalSensorData
  .slice(0, 4)
  .map((dataPoint) => ({
    timestamp: dataPoint.timestamp,
    waterLevel: dataPoint.value,
  }));
const historicalIndividualWaterPressureData = historicalSensorData
  .slice(0, 4)
  .map((dataPoint) => ({
    timestamp: dataPoint.timestamp,
    waterPressure: dataPoint.value + 68,
  }));

const AnalyticsPage: React.FC = () => {
  // Filter state
  const [filter, setFilter] = useState<AnalyticsFilter>({
    site: "All Sites",
    sensorType: "All Sensors",
    startDate: "",
    endDate: "",
  });
  // Data mode state: "realtime" or "historical"
  const [dataMode, setDataMode] = useState<"realtime" | "historical">(
    "realtime"
  );

  // Choose data arrays based on dataMode
  const currentCumulativeData =
    dataMode === "realtime" ? cumulativeData : historicalCumulativeData;
  const currentSiteWaterLevelData =
    dataMode === "realtime" ? siteWaterLevelData : historicalSiteWaterLevelData;
  const currentAverageWaterLevelData =
    dataMode === "realtime"
      ? averageWaterLevelData
      : historicalAverageWaterLevelData;
  const currentSiteWaterPressureData =
    dataMode === "realtime"
      ? siteWaterPressureData
      : historicalSiteWaterPressureData;
  const currentAverageWaterPressureData =
    dataMode === "realtime"
      ? averageWaterPressureData
      : historicalAverageWaterPressureData;
  const currentIndividualWaterLevelData =
    dataMode === "realtime"
      ? individualWaterLevelData
      : historicalIndividualWaterLevelData;
  const currentIndividualWaterPressureData =
    dataMode === "realtime"
      ? individualWaterPressureData
      : historicalIndividualWaterPressureData;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <AnalyticsHeader title="Sensor Analytics" />
      <FilterControls
        searchTerm={filter.site}
        setSearchTerm={(term) => setFilter({ ...filter, site: term })}
        selectedSite={filter.site}
        setSelectedSite={(site) => setFilter({ ...filter, site })}
        selectedSensorType={filter.sensorType}
        setSelectedSensorType={(sensorType) =>
          setFilter({ ...filter, sensorType })
        }
        startDate={filter.startDate}
        setStartDate={(startDate) => setFilter({ ...filter, startDate })}
        endDate={filter.endDate}
        setEndDate={(endDate) => setFilter({ ...filter, endDate })}
        dataMode={dataMode}
        setDataMode={setDataMode}
      />
      <ChartContainer>
        <CumulativeWaterAndPressureChart data={currentCumulativeData} />
        <SiteWaterLevelRealtimeChart data={currentSiteWaterLevelData} />
        <AverageWaterLevelChart data={currentAverageWaterLevelData} />
        <SiteWaterPressureRealtimeChart data={currentSiteWaterPressureData} />
        <AverageWaterPressureChart data={currentAverageWaterPressureData} />
        <IndividualWaterLevelChart
          sensorName="Sensor A"
          data={currentIndividualWaterLevelData}
        />
        <IndividualWaterPressureChart
          sensorName="Sensor B"
          data={currentIndividualWaterPressureData}
        />
      </ChartContainer>
    </div>
  );
};

export default AnalyticsPage;
