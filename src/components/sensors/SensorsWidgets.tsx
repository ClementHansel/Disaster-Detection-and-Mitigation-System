// src/components/sensors/SensorsWidgets.tsx
"use client";

import SiteStatusWidget from "@/components/widgets/SiteStatusWidget";
import SensorStatusWidget from "@/components/widgets/SensorStatusWidget";
import CameraStatusWidget from "@/components/widgets/CameraStatusWidget";
import ConnectionStatusWidget from "@/components/widgets/ConnectionStatusWidget";
import TaskStatusWidget from "@/components/widgets/TaskStatusWidget";
import {
  SiteStatus,
  SensorStatus,
  CameraStatus,
  ConnectionStatus,
  TaskStatus,
} from "@/types/sensors";

interface SensorsWidgetsProps {
  siteStatus: SiteStatus;
  sensorStatus: SensorStatus;
  cameraStatus: CameraStatus;
  connectionStatus: ConnectionStatus;
  taskStatus: TaskStatus;
}

export default function SensorsWidgets({
  siteStatus,
  sensorStatus,
  cameraStatus,
  connectionStatus,
  taskStatus,
}: SensorsWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
      <SiteStatusWidget {...siteStatus} />
      <SensorStatusWidget {...sensorStatus} />
      <CameraStatusWidget {...cameraStatus} />
      <ConnectionStatusWidget {...connectionStatus} />
      <TaskStatusWidget {...taskStatus} />
    </div>
  );
}
