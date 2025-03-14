import React from "react";

interface AlertLevel {
  level: string;
  active: boolean;
}

const AlertLevelWidget = ({ data }: { data: AlertLevel[] }) => {
  // Find the active alert or default to "None"
  const activeAlert = data.find((alert) => alert.active) || {
    level: "None",
    active: false,
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Alert Level</h3>
      <p className="text-xl font-bold">{activeAlert.level}</p>
    </div>
  );
};

export default AlertLevelWidget;
