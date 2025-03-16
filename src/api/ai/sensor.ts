import { mockData } from "../../data/ai/mockData";

export const getSensorData = async (sensorId: string) => {
  const sensorData = mockData.filter((data) => data.sensor === sensorId);
  return new Promise((resolve) => {
    setTimeout(() => resolve(sensorData), 500); // Simulate API delay
  });
};
