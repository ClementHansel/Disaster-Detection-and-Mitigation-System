"use client";

import Link from "next/link";
import {
  FaBars,
  FaHome,
  FaChartBar,
  FaCogs,
  FaQuestionCircle,
} from "react-icons/fa";

interface SidebarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
}

const ChatSidebar: React.FC<SidebarProps> = ({ isSidebarOpen, onClose }) => {
  return (
    <aside
      className={`h-screen bg-gray-900 text-white px-4 pt-20 pb-12 fixed top-0 right-0 transition-all duration-300 z-50 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {/* Sidebar title, shown only when expanded */}
        {isSidebarOpen && (
          <span className="text-xl font-bold text-sm">Corthea AI</span>
        )}
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded"
          title="Close Sidebar"
        >
          <FaBars />
        </button>
      </div>
      {/* The nav occupies full height and is scrollable */}
      <nav className="overflow-y-auto h-full">
        <ul className="space-y-2 list-none">
          <li>
            <Link
              href="/dashboard/cortheaAI"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isSidebarOpen ? "Home" : ""}
            >
              <FaHome />
              {isSidebarOpen && <span className="text-sm">Home</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/cortheaAI/analytics"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isSidebarOpen ? "Analytics" : ""}
            >
              <FaChartBar />
              {isSidebarOpen && <span className="text-sm">Analytics</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/cortheaAI/settings"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isSidebarOpen ? "Settings" : ""}
            >
              <FaCogs />
              {isSidebarOpen && <span className="text-sm">Settings</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/cortheaAI/help"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isSidebarOpen ? "Help" : ""}
            >
              <FaQuestionCircle />
              {isSidebarOpen && <span className="text-sm">Help</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ChatSidebar;
