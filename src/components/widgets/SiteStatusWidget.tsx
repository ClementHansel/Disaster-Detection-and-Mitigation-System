const SiteStatusWidget = ({
  online,
  offline,
  calibration,
}: {
  online: number;
  offline: number;
  calibration: number;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Site Status</h3>
      <p className="text-green-500">Online: {online}</p>
      <p className="text-red-500">Offline: {offline}</p>
      <p className="text-yellow-500">Need Calibration: {calibration}</p>
    </div>
  );
};

export default SiteStatusWidget;
