"use client";

import dynamic from "next/dynamic";

// Import sensor widgets
import SiteStatusWidget from "@/components/widgets/SiteStatusWidget";
import SensorStatusWidget from "@/components/widgets/SensorStatusWidget";
import CameraStatusWidget from "@/components/widgets/CameraStatusWidget";
import ConnectionStatusWidget from "@/components/widgets/ConnectionStatusWidget";
import TaskStatusWidget from "@/components/widgets/TaskStatusWidget";

// Import modularized notifications component
import Notifications from "@/components/sensors/Notification";

// Import sensor status data from a dedicated mock data file
import {
  siteStatus,
  sensorStatus,
  cameraStatus,
  connectionStatus,
  taskStatus,
} from "@/data/sensors/mockSensorsStatus";

// Dynamically import sensor-specific map to avoid SSR issues
const IndonesiaSensorMap = dynamic(
  () => import("@/components/maps/IndonesiaSensorMap"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

export default function DashboardSensorsPage() {
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

      {/* Indonesia Sensor Map Section */}
      <div className="mb-6">
        <IndonesiaSensorMap />
      </div>

      {/* Notifications Section */}
      <div>
        <Notifications />
      </div>
    </div>
  );
}
