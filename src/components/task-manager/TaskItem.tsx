import React from "react";

interface Task {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  progress: number;
  status: "To Do" | "In Progress" | "Completed";
}

interface TaskItemProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onProgressChange: (taskId: string, progress: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onProgressChange,
}) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white flex flex-col gap-2">
      {/* Task Title */}
      <h3 className="text-lg font-semibold">{task.title}</h3>

      {/* Priority */}
      <div>
        <label htmlFor={`priority-${task.id}`} className="text-sm font-medium">
          Priority:
        </label>
        <span
          id={`priority-${task.id}`}
          className="ml-2 font-bold text-blue-600"
        >
          {task.priority}
        </span>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor={`dueDate-${task.id}`} className="text-sm font-medium">
          Due Date:
        </label>
        <span id={`dueDate-${task.id}`} className="ml-2">
          {task.dueDate}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        <label htmlFor={`progress-${task.id}`} className="text-sm font-medium">
          Progress:
        </label>
        <input
          id={`progress-${task.id}`}
          type="range"
          min="0"
          max="100"
          value={task.progress}
          onChange={(e) => onProgressChange(task.id, Number(e.target.value))}
          className="w-full"
          title="Task progress"
        />
        <span>{task.progress}%</span>
      </div>

      {/* Status */}
      <div>
        <label htmlFor={`status-${task.id}`} className="text-sm font-medium">
          Status:
        </label>
        <select
          id={`status-${task.id}`}
          name={`status-${task.id}`}
          className="border p-2 w-full"
          title="Select task status"
        >
          <option value="To Do" selected={task.status === "To Do"}>
            To Do
          </option>
          <option value="In Progress" selected={task.status === "In Progress"}>
            In Progress
          </option>
          <option value="Done" selected={task.status === "Completed"}>
            Done
          </option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onEdit(task.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
