import { DataPoint } from "@/types/ai";

/**
 * Filters data based on selected site, sensor, date, and time.
 * @param {DataPoint[]} data - The dataset to filter.
 * @param {string | null} site - Selected site.
 * @param {string | null} sensor - Selected sensor.
 * @param {string | null} dateFrom - Start date filter.
 * @param {string | null} dateTo - End date filter.
 * @param {string | null} timeFrom - Start time filter.
 * @param {string | null} timeTo - End time filter.
 * @returns {DataPoint[]} - Filtered data.
 */
export const filterData = (
  data: DataPoint[],
  site: string | null,
  sensor: string | null,
  dateFrom: string | null,
  dateTo: string | null,
  timeFrom: string | null,
  timeTo: string | null
): DataPoint[] => {
  return data.filter((point) => {
    const dataDate = new Date(point.timestamp);
    const dataTime = new Date(
      `1970-01-01T${dataDate.toISOString().split("T")[1]}`
    );

    return (
      (!site || point.site === site) &&
      (!sensor || point.sensor === sensor) &&
      (!dateFrom || dataDate >= new Date(dateFrom)) &&
      (!dateTo || dataDate <= new Date(dateTo)) &&
      (!timeFrom || dataTime >= new Date(`1970-01-01T${timeFrom}:00Z`)) &&
      (!timeTo || dataTime <= new Date(`1970-01-01T${timeTo}:00Z`))
    );
  });
};
