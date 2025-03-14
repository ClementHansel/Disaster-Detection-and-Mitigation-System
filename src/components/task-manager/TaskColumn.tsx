import React from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  content: string;
}

interface DepartmentColumnProps {
  title: string;
  tasks: Task[];
  departmentId: string;
  onAddTask: () => void;
  onDeleteDepartment: () => void;
}

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      className="p-2 bg-white shadow-sm rounded-md cursor-grab"
    >
      <CardContent>{task.content}</CardContent>
    </Card>
  );
};

const DepartmentColumn: React.FC<DepartmentColumnProps> = ({
  title,
  tasks,
  departmentId,
  onAddTask,
  onDeleteDepartment,
}) => {
  const { setNodeRef } = useDroppable({ id: departmentId });

  return (
    <div className="flex flex-col w-64 bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button variant="destructive" onClick={onDeleteDepartment}>
          Delete
        </Button>
      </div>
      <div
        ref={setNodeRef}
        className="min-h-40 flex flex-col space-y-2 border-2 border-dashed p-2"
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      <Button className="mt-4" onClick={onAddTask}>
        + Add Task
      </Button>
    </div>
  );
};

export default DepartmentColumn;
