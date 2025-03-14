"use client";

import Link from "next/link";
import {
  FaBars,
  FaHome,
  FaChartBar,
  FaCogs,
  FaCamera,
  FaTasks,
  FaDatabase,
  FaRobot,
  FaUser,
  FaQuestionCircle,
  FaPen,
  FaTable,
  FaMicrochip,
  FaWrench,
} from "react-icons/fa";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  return (
    <aside
      className={`h-screen bg-gray-900 text-white px-4 pt-20 pb-12 fixed transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {isExpanded && (
          <span className="text-xl font-bold text-sm">Disaster Dashboard</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded"
          title="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>
      {/* The nav occupies full height and is scrollable */}
      <nav className="overflow-y-auto h-full">
        <ul className="space-y-2 list-none">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Dashboard" : ""}
            >
              <FaHome />
              {isExpanded && <span className="text-sm">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/sensors"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Sensors" : ""}
            >
              <FaMicrochip />
              {isExpanded && <span className="text-sm">Sensors</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/cctv"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "CCTV" : ""}
            >
              <FaCamera />
              {isExpanded && <span className="text-sm">CCTV</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/control-panels"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Control Panels" : ""}
            >
              <FaWrench />
              {isExpanded && <span className="text-sm">Control Panels</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/analytics"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Analytics" : ""}
            >
              <FaChartBar />
              {isExpanded && <span className="text-sm">Analytics</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/annotation"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Annotation" : ""}
            >
              <FaPen />
              {isExpanded && <span className="text-sm">Annotation</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/dataset"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Data Set" : ""}
            >
              <FaTable />
              {isExpanded && <span className="text-sm">Data Set</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/modeling"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Modeling" : ""}
            >
              <FaDatabase />
              {isExpanded && <span className="text-sm">Modeling</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/task-manager"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Task Manager" : ""}
            >
              <FaTasks />
              {isExpanded && <span className="text-sm">Task Manager</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/corthea-ai"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Corthea AI" : ""}
            >
              <FaRobot />
              {isExpanded && <span className="text-sm">Corthea AI</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Settings" : ""}
            >
              <FaCogs />
              {isExpanded && <span className="text-sm">Settings</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/account"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Account" : ""}
            >
              <FaUser />
              {isExpanded && <span className="text-sm">Account</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/help"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              title={!isExpanded ? "Help" : ""}
            >
              <FaQuestionCircle />
              {isExpanded && <span className="text-sm">Help</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
