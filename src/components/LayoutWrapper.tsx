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
      {!isHomePage && (
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      )}
      <div className="flex flex-col flex-grow">
        {!isHomePage && <Topbar />}
        <main
          className={
            isHomePage
              ? "flex justify-center items-center flex-grow"
              : "p-4 mt-16 flex-grow"
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}
