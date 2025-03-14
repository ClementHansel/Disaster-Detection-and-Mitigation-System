type FloodSeverity = "low" | "moderate" | "severe";

interface FloodAlert {
  id: string;
  location: string;
  severity: FloodSeverity;
  message: string;
  level: FloodSeverity;
}

export default function FloodAlertWidget({
  data = [],
}: {
  data?: FloodAlert[];
}) {
  return (
    <div className="widget p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Flood Alerts</h3>
      {data.length > 0 ? (
        data.map((alert, index) => (
          <p key={index} className="text-sm">
            <strong>{alert.level.toUpperCase()}:</strong> {alert.message}
          </p>
        ))
      ) : (
        <p className="text-gray-500">No active flood alerts</p>
      )}
    </div>
  );
}
