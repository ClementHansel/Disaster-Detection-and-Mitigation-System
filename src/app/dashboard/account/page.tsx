"use client";

import React from "react";
import ProfileForm from "@/components/account/ProfileForm";
import SecuritySettings from "@/components/account/SecuritySettings";
import ActivityLog from "@/components/account/ActivityLog";

const AccountPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <div className="space-y-6">
        <ProfileForm />
        <SecuritySettings />
        <ActivityLog />
      </div>
    </div>
  );
};

export default AccountPage;
