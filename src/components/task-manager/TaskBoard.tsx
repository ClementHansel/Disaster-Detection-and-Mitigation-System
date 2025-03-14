import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import { Task } from "@/types/task-manager/task";
import { Site } from "@/types/task-manager/site";
import { Department } from "@/types/task-manager/department";

interface TaskBoardProps {
  tasks: Task[];
  departments: Department[];
  sites: Site[];
  onEditTask: (task: Task) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  departments,
  sites,
  onEditTask,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {departments.map((department) => (
        <TaskColumn
          key={department.id}
          department={department}
          tasks={tasks.filter((task) => task.departmentId === department.id)}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
