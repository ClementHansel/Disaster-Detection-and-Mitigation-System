import { Site } from "./site";
import { Department } from "./department";

export interface Task {
  id: string;
  title: string;
  description: string;
  siteId: string; // Reference to a Site by ID
  departmentId: string; // Reference to a Department by ID
  assignedTo: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  createdAt: string;
}
