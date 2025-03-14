"use client";

import { useState, useEffect } from "react";

export interface Settings {
  theme: "light" | "dark";
  language: string;
  timeZone: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    // Simulate fetching settings from an API
    const fetchSettings = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSettings({
        theme: "light",
        language: "en",
        timeZone: "UTC",
      });
    };

    fetchSettings();
  }, []);

  return { settings, setSettings };
}
