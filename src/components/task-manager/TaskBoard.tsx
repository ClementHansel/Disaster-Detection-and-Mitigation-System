import React, { useState } from "react";
import Filters from "./Filters";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High"; // Fixed type
  dueDate: string;
  progress: number;
  status: "To Do" | "In Progress" | "Completed";
  site: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Fix sensor data",
    priority: "High", // Converted from number
    dueDate: "2025-03-20",
    progress: 30,
    status: "To Do",
    site: "Site A",
  },
  {
    id: "2",
    title: "Update AI model",
    priority: "Medium", // Converted from number
    dueDate: "2025-03-18",
    progress: 50,
    status: "In Progress",
    site: "Site B",
  },
  {
    id: "3",
    title: "Optimize sluice gate control",
    priority: "Low", // Converted from number
    dueDate: "2025-03-22",
    progress: 80,
    status: "Completed",
    site: "Site C",
  },
];

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterSite, setFilterSite] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"priority" | "dueDate">("priority");

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (taskId: string) => {
    const newTitle = prompt("Enter new task title:");
    if (newTitle) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        )
      );
    }
  };

  const handleProgressChange = (id: string, newProgress: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, progress: newProgress } : task
      )
    );
  };

  const filteredTasks = filterSite
    ? tasks.filter((task) => task.site === filterSite)
    : tasks;

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortKey === "priority"
      ? a.priority.localeCompare(b.priority) // Compare as strings
      : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <Filters setSortKey={setSortKey} setFilterSite={setFilterSite} />

      <div className="grid grid-cols-3 gap-4">
        {["To Do", "In Progress", "Completed"].map((status) => (
          <div key={status} className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{status}</h2>
            {sortedTasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onProgressChange={handleProgressChange}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
