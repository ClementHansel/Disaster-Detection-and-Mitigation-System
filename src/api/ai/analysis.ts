import { analyzeDataWithAI } from "../../lib/ai/aiUtils";
import { DataPoint } from "../../types/ai";

export const analyzeData = async (
  data: DataPoint[]
): Promise<{ insights: string; comparison: string; conclusion: string }> => {
  try {
    return await analyzeDataWithAI(data);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      insights: "Error processing data",
      comparison: "N/A",
      conclusion: "N/A",
    };
  }
};
