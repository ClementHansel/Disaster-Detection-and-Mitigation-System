// 📌 File: src/lib/ai/aiUtils.tsx

import { DataPoint, AIAnalysisResult } from "@/types/ai";

export const analyzeDataWithAI = async (
  data: DataPoint[]
): Promise<AIAnalysisResult> => {
  if (data.length === 0) {
    return {
      summary: "No data available for analysis.",
      comparison: "No comparison possible.",
      conclusion: "Please select a sensor and time range.",
    };
  }

  // Example AI analysis logic (Replace this with real AI model logic)
  const totalValues = data.reduce((sum, point) => sum + point.value, 0);
  const avgValue = totalValues / data.length;
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;

  const trend = lastValue > firstValue ? "increasing" : "decreasing";

  return {
    summary: `The sensor recorded ${
      data.length
    } readings with an average value of ${avgValue.toFixed(2)}.`,
    comparison: `The sensor readings are ${trend} over time.`,
    conclusion:
      avgValue > 50
        ? "Warning: High sensor readings detected."
        : "Sensor readings are within a safe range.",
  };
};
