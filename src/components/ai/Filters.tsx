// 📌 File: src/components/ai/Filters.tsx
import { useState, useEffect } from "react";
import { FilterOptions } from "@/types/ai";
import { mockData } from "@/data/ai/mockData";

interface FiltersProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [sites, setSites] = useState<string[]>([]);
  const [sensors, setSensors] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique site names
    const uniqueSites = Array.from(new Set(mockData.map((item) => item.site)));
    setSites(uniqueSites);
  }, []);

  useEffect(() => {
    if (filters.site) {
      // Extract unique sensors for the selected site
      const filteredSensors = Array.from(
        new Set(
          mockData
            .filter((item) => item.site === filters.site)
            .map((item) => item.sensor)
        )
      );
      setSensors(filteredSensors);
    } else {
      setSensors([]);
    }
  }, [filters.site]);

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-lg font-bold mb-2">Filters</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Site Dropdown */}
        <div>
          <label className="block text-sm font-medium" htmlFor="site">
            Site
          </label>
          <select
            id="site"
            value={filters.site || ""}
            onChange={(e) =>
              setFilters({ ...filters, site: e.target.value, sensor: "" })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Site</option>
            {sites.map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </select>
        </div>

        {/* Sensor Dropdown */}
        <div>
          <label className="block text-sm font-medium" htmlFor="sensor">
            Sensor
          </label>
          <select
            id="sensor"
            value={filters.sensor || ""}
            onChange={(e) => setFilters({ ...filters, sensor: e.target.value })}
            className="w-full p-2 border rounded"
            disabled={!filters.site} // Disable until a site is selected
          >
            <option value="">Select a Sensor</option>
            {sensors.map((sensor) => (
              <option key={sensor} value={sensor}>
                {sensor}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time Pickers in Same Row */}
        <div className="grid grid-cols-2 gap-4 col-span-2">
          {/* Date From */}
          <div>
            <label className="block text-sm font-medium" htmlFor="dateFrom">
              Date From
            </label>
            <input
              id="dateFrom"
              type="date"
              value={filters.dateFrom || ""}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium" htmlFor="dateTo">
              Date To
            </label>
            <input
              id="dateTo"
              type="date"
              value={filters.dateTo || ""}
              onChange={(e) =>
                setFilters({ ...filters, dateTo: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 col-span-2">
          {/* Time From */}
          <div>
            <label className="block text-sm font-medium" htmlFor="timeFrom">
              Time From
            </label>
            <input
              id="timeFrom"
              type="time"
              value={filters.timeFrom || ""}
              onChange={(e) =>
                setFilters({ ...filters, timeFrom: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Time To */}
          <div>
            <label className="block text-sm font-medium" htmlFor="timeTo">
              Time To
            </label>
            <input
              id="timeTo"
              type="time"
              value={filters.timeTo || ""}
              onChange={(e) =>
                setFilters({ ...filters, timeTo: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
