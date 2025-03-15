import { mockData } from "../../data/ai/mockData";

export const getMockData = async (): Promise<typeof mockData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500); // Simulate API delay
  });
};
