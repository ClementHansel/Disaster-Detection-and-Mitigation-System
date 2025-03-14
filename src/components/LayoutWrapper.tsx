"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  // Determine if we're on the landing page (home page)
  const isHomePage = pathname === "/";

  return (
    <div className="flex h-screen">
      {/* Sidebar appears on non-home pages */}
      {!isHomePage && (
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      )}
      {/* Main content area */}
      <div
        className={`flex flex-col flex-grow ${
          isHomePage ? "justify-center" : ""
        }`}
      >
        {/* Topbar appears on non-home pages */}
        {!isHomePage && <Topbar />}

        <main
          className={`${
            isHomePage ? "flex justify-center items-center" : "p-6 mt-16"
          } flex-grow`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
