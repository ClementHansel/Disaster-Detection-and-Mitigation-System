// src/hooks/useAnalytics.ts

import { useState, useEffect } from "react";
import { SensorData, AnalyticsFilter } from "@/types/analyticsTypes";
import { realtimeSensorData } from "@/data/analyticsMockData";

export function useAnalytics(filter: AnalyticsFilter) {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // For now, simply use the mock realtime data
    // You can filter the data based on the filter parameter here if needed
    const timeout = setTimeout(() => {
      setData(realtimeSensorData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [filter]);

  return { data, loading, error: null };
}
