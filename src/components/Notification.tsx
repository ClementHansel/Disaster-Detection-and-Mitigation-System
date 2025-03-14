"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const mockNotifications = Array.from({ length: 25 }, (_, i) => {
  const messages = [
    {
      message: "Sensor 3 requires calibration",
      categories: ["sensor status", "task status"],
    },
    {
      message: "Site A is offline",
      categories: ["site status", "connection status"],
    },
    {
      message: "Camera 5 is back online",
      categories: ["camera status", "connection status", "task status"],
    },
    { message: "Task completed: System check", categories: ["task status"] },
    {
      message: "Connection lost to Server 2",
      categories: ["connection status", "site status"],
    },
    {
      message: "New update available for Camera 3",
      categories: ["camera status", "task status"],
    },
  ];

  const data = messages[i % messages.length];

  return {
    id: i + 1,
    message: data.message,
    type: ["error", "warning", "success"][i % 3],
    categories: data.categories,
    site: `Site ${String.fromCharCode(65 + (i % 5))}`,
    timestamp: `2025-03-${String(11 - (i % 10)).padStart(2, "0")} ${
      10 + (i % 10)
    }:30`,
  };
}).sort(
  (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
);

export default function Notification() {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  const filteredNotifications = mockNotifications.filter(
    (notif) =>
      (filter === "all" || notif.categories.includes(filter)) &&
      notif.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      {/* Notification Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
        />
        <label htmlFor="filter" className="sr-only">
          Filter Notifications
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md text-sm"
        >
          <option value="all">All</option>
          <option value="sensor status">Sensor Status</option>
          <option value="site status">Site Status</option>
          <option value="camera status">Camera Status</option>
          <option value="connection status">Connection Status</option>
          <option value="task status">Task Status</option>
        </select>
      </div>

      {/* Notification List */}
      <div
        ref={containerRef}
        className={`mt-3 space-y-2 overflow-y-auto transition-all duration-300 ${
          expanded ? "max-h-96" : "max-h-48"
        }`}
      >
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex justify-between items-center p-3 rounded-md text-sm ${
              {
                error: "bg-red-100 text-red-700",
                warning: "bg-yellow-100 text-yellow-700",
                success: "bg-green-100 text-green-700",
              }[notif.type]
            }`}
          >
            <p className="text-sm">
              <span className="font-medium">{notif.timestamp}</span> -{" "}
              {notif.message} ({notif.categories.join(", ")}, {notif.site})
            </p>
          </div>
        ))}
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute bottom-4 right-4 p-1 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
        title={
          expanded ? "Show fewer notifications" : "Show more notifications"
        }
      >
        <ChevronDown
          className={`w-5 h-5 transform transition ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
