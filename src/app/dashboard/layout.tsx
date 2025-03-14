"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen relative">
      {/* Fixed Topbar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
        <Topbar />
      </div>
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-10">
        {/* Sidebar is always expanded; toggleSidebar is a no-op */}
        <Sidebar isExpanded={true} toggleSidebar={() => {}} />
      </div>
      {/* Main content area with fixed left margin */}
      <main className="pt-16 p-6 ml-64 overflow-auto transition-all duration-300 relative z-0">
        {children}
      </main>
    </div>
  );
}
