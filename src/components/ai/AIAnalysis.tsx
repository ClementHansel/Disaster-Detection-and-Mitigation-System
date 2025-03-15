// 📌 File: src/components/ai/AIAnalysis.tsx

import React, { useEffect, useState } from "react";
import { DataPoint, AIAnalysisResult } from "@/types/ai";
import { analyzeDataWithAI } from "@/lib/ai/aiUtils";

interface AIAnalysisProps {
  data: DataPoint[];
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ data }) => {
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysisResult | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      analyzeDataWithAI(data).then((result: AIAnalysisResult) => {
        setAIAnalysis(result);
      });
    }
  }, [data]);

  if (!aiAnalysis) return <p>AI analysis in progress...</p>;

  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <h2 className="text-xl font-semibold">AI Analysis</h2>
      <p>
        <strong>Summary:</strong> {aiAnalysis.summary}
      </p>
      <p>
        <strong>Comparison:</strong> {aiAnalysis.comparison}
      </p>
      <p>
        <strong>Conclusion:</strong> {aiAnalysis.conclusion}
      </p>
    </div>
  );
};

export default AIAnalysis;
