// 📌 File: src/types/ai.ts

export interface DataPoint {
  site: string; // The site name
  sensor: string; // The sensor name
  value: number; // Sensor reading value
  timestamp: string; // Timestamp in ISO format (YYYY-MM-DDTHH:mm:ss)
}

export interface FilterOptions {
  site: string | null; // Selected site
  sensor: string | null; // Selected sensor
  dateFrom: string | null; // Start date (YYYY-MM-DD)
  dateTo: string | null; // End date (YYYY-MM-DD)
  timeFrom: string | null; // Start time (HH:mm)
  timeTo: string | null; // End time (HH:mm)
}

export interface AIAnalysisResult {
  summary: string;
  comparison: string;
  conclusion: string;
}
