"use client";

import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/types/task-manager/task";
import { Site } from "@/types/task-manager/site";
import { Department } from "@/types/task-manager/department";
import { mockTasks } from "@/data/mockTasks";
import { mockSites } from "@/data/mockSites";
import { mockDepartments } from "@/data/mockDepartments";
import { Button } from "@/components/ui/button";
import TaskBoard from "@/components/task-manager/TaskBoard";
import SiteList from "@/components/task-manager/SiteList";
import DepartmentList from "@/components/task-manager/DepartmentList";
import TaskModal from "@/components/task-manager/TaskModal";
import SiteModal from "@/components/task-manager/SiteModal";
import DepartmentModal from "@/components/task-manager/DepartmentModal";

const generateId = () => crypto.randomUUID();

const TaskManagerPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

  const handleSaveTask = (task: Task) => {
    setTasks((prevTasks) =>
      task.id
        ? prevTasks.map((t) => (t.id === task.id ? task : t))
        : [...prevTasks, { ...task, id: generateId() }]
    );
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id.toString();
    const departmentId = over.id.toString();

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, departmentId } : task
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Task Manager</h1>

        <div className="flex gap-4">
          <Button onClick={() => setIsTaskModalOpen(true)}>Add Task</Button>
          <Button onClick={() => setIsSiteModalOpen(true)}>Add Site</Button>
          <Button onClick={() => setIsDepartmentModalOpen(true)}>
            Add Department
          </Button>
        </div>

        <TaskBoard
          tasks={tasks}
          departments={departments}
          sites={sites}
          onEditTask={setSelectedTask}
        />

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleSaveTask}
          sites={sites}
          departments={departments}
          task={selectedTask}
        />
        <SiteModal
          isOpen={isSiteModalOpen}
          onClose={() => setIsSiteModalOpen(false)}
        />
        <DepartmentModal
          isOpen={isDepartmentModalOpen}
          onClose={() => setIsDepartmentModalOpen(false)}
        />
      </div>
    </DndContext>
  );
};

export default TaskManagerPage;
