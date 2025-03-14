"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <div className="h-screen relative">
      {/* Fixed Topbar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
        <Topbar />
      </div>
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-10">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      {/* Main content area with margin-left based on sidebar width */}
      <main
        className={`pt-16 p-6 overflow-auto transition-all duration-300 z-0 relative ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
