"use client";

import React from "react";
import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationPreferences from "@/components/settings/NotificationPreferences";
import DeviceConfiguration from "@/components/settings/DeviceConfiguration";

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-6">
        <GeneralSettings />
        <NotificationPreferences />
        <DeviceConfiguration />
      </div>
    </div>
  );
};

export default SettingsPage;
