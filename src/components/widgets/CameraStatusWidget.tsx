const CameraStatusWidget = ({
  online,
  offline,
}: {
  online: number;
  offline: number;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Camera Status</h3>
      <p className="text-green-500">Online: {online}</p>
      <p className="text-red-500">Offline: {offline}</p>
    </div>
  );
};

export default CameraStatusWidget;
