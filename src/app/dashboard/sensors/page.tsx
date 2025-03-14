"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import SiteStatusWidget from "@/components/widgets/SiteStatusWidget";
import SensorStatusWidget from "@/components/widgets/SensorStatusWidget";
import CameraStatusWidget from "@/components/widgets/CameraStatusWidget";
import ConnectionStatusWidget from "@/components/widgets/ConnectionStatusWidget";
import TaskStatusWidget from "@/components/widgets/TaskStatusWidget";
import Notification from "@/components/Notification";

// Fix: Ensure IndonesiaMap is only loaded on the client
const IndonesiaMap = dynamic(
  () => import("@/components/maps/IndonesiaSensorMap"),
  {
    ssr: false, // Prevent server-side rendering
    loading: () => <p>Loading map...</p>, // Optional: Show a fallback UI while loading
  }
);

export default function DashboardSensorsPage() {
  // Mock Data (Replace with real API data)
  const siteStatus = { online: 10, offline: 2, calibration: 1 };
  const sensorStatus = { online: 50, offline: 5, calibration: 3 };
  const cameraStatus = { online: 8, offline: 2 };
  const connectionStatus = { avg: "50 Mbps", high: "100 Mbps", low: "10 Mbps" };
  const taskStatus = { completed: 20, progress: 5, notCompleted: 3 };

  return (
    <div className="p-6">
      {/* Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        <SiteStatusWidget {...siteStatus} />
        <SensorStatusWidget {...sensorStatus} />
        <CameraStatusWidget {...cameraStatus} />
        <ConnectionStatusWidget {...connectionStatus} />
        <TaskStatusWidget {...taskStatus} />
      </div>

      {/* Indonesia Map Section */}
      <div className="mb-6">
        <IndonesiaMap />
      </div>

      {/* Notifications Section */}
      <div>
        <Notification />
      </div>
    </div>
  );
}
