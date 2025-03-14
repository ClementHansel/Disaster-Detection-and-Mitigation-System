"use client";

export default function ColorLegend() {
  return (
    <div className="bg-white bg-opacity-90 p-4 rounded shadow-md text-sm">
      <h4 className="text-red-500 font-bold mb-2">Legend (Should be RED)</h4>
      <ul className="space-y-1 list-none">
        <li className="flex items-center">
          <span className="inline-block w-4 h-4 mr-2 rounded-full bg-green-500"></span>
          Online (All OK)
        </li>
        <li className="flex items-center">
          <span className="inline-block w-4 h-4 mr-2 rounded-full bg-yellow-500"></span>
          Slow Connection
        </li>
        <li className="flex items-center">
          <span className="inline-block w-4 h-4 mr-2 rounded-full bg-red-500"></span>
          Sensor/Cam Problem
        </li>
        <li className="flex items-center">
          <span className="inline-block w-4 h-4 mr-2 rounded-full bg-gray-500"></span>
          Offline
        </li>
        <li className="flex items-center">
          <span className="inline-block w-4 h-4 mr-2 rounded-full bg-blue-500"></span>
          Under Maintenance
        </li>
        <li className="flex items-center">
          <span className="inline-block w-4 h-4 mr-2 rounded-full bg-purple-500"></span>
          In Progress
        </li>
      </ul>
    </div>
  );
}
