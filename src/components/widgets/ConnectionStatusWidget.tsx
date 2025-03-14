const ConnectionStatusWidget = ({
  avg,
  high,
  low,
}: {
  avg: string;
  high: string;
  low: string;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Connection Status</h3>
      <p className="text-blue-500">AVG Speed: {avg}</p>
      <p className="text-blue-600">Highest Speed: {high}</p>
      <p className="text-blue-400">Lowest Speed: {low}</p>
    </div>
  );
};

export default ConnectionStatusWidget;
