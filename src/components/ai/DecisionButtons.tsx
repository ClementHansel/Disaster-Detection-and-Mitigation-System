// DecisionButtons.tsx - User action buttons

import React from "react";

type DecisionButtonsProps = {
  onDecision: (decision: string) => void;
};

export const DecisionButtons: React.FC<DecisionButtonsProps> = ({
  onDecision,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white flex gap-2">
      <button
        onClick={() => onDecision("Anomaly")}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Anomaly
      </button>
      <button
        onClick={() => onDecision("Good")}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Good
      </button>
      <button
        onClick={() => onDecision("Bad")}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Bad
      </button>
    </div>
  );
};
