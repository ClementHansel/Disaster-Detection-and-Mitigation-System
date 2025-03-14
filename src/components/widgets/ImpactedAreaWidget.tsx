import React from "react";
interface ImpactedAreaData {
  location: string;
  radius_km: number;
}

const ImpactedAreaWidget = ({ data }: { data: ImpactedAreaData[] }) => {
  return (
    <div className="widget">
      <h3>Impacted Areas</h3>
      {data.map((area, index) => (
        <p key={index}>
          {area.location} - {area.radius_km} km affected
        </p>
      ))}
    </div>
  );
};

export default ImpactedAreaWidget;
