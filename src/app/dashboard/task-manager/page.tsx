"use client";

import React, { useState } from "react";
import { Task } from "@/types/task-manager/task";
import { Site } from "@/types/task-manager/site";
import { Department } from "@/types/task-manager/department";
import { mockTasks } from "@/data/mockTasks";
import { mockSites } from "@/data/mockSites";
import { mockDepartments } from "@/data/mockDepartments";
import { Button } from "@/components/ui/button";
import SiteModal from "@/components/task-manager/SiteModal";
import TaskList from "@/components/task-manager/TaskList";
import SiteList from "@/components/task-manager/SiteList";
import DepartmentList from "@/components/task-manager/DepartmentList";
import DepartmentModal from "@/components/task-manager/DepartmentModal";
import TaskModal from "@/components/task-manager/TaskModal";

const TaskManagerPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Get site name by siteId
  const getSiteName = (siteId: string) => {
    return sites.find((site) => site.id === siteId)?.name || "Unknown Site";
  };

  // Get department name by departmentId
  const getDepartmentName = (departmentId: string) => {
    return (
      departments.find((department) => department.id === departmentId)?.name ||
      "Unknown Department"
    );
  };

  const handleDeleteSite = (siteId: string) => {
    setSites(sites.filter((site) => site.id !== siteId));
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.siteId === siteId ? { ...task, siteId: "" } : task
      )
    );
  };

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartments(
      departments.filter((department) => department.id !== departmentId)
    );
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.departmentId === departmentId
          ? { ...task, departmentId: "" }
          : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSaveSite = (newSite: Site) => {
    setSites((prevSites) => [...prevSites, newSite]);
    setIsSiteModalOpen(false);
  };

  const handleSaveDepartment = (newDepartment: Department) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
    setIsDepartmentModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      {/* Task List Section */}
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        getSiteName={getSiteName}
        getDepartmentName={getDepartmentName}
      />

      {/* Site Management Section */}
      <SiteList sites={sites} onDeleteSite={handleDeleteSite} />
      <Button className="mt-2" onClick={() => setIsSiteModalOpen(true)}>
        Add Site
      </Button>

      {/* Site Modal */}
      <SiteModal
        isOpen={isSiteModalOpen}
        onClose={() => setIsSiteModalOpen(false)}
        onSave={handleSaveSite}
      />

      {/* Department Management Section */}
      <DepartmentList
        departments={departments}
        onDelete={handleDeleteDepartment}
        onEdit={() => {}}
      />
      <Button className="mt-2" onClick={() => setIsDepartmentModalOpen(true)}>
        Add Department
      </Button>

      {/* Department Modal */}
      <DepartmentModal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(false)}
        onSave={handleSaveDepartment}
      />

      {/* Task Modal for Editing */}
      {selectedTask && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          task={selectedTask}
          onSave={handleSaveTask}
          sites={sites}
          departments={departments}
        />
      )}
    </div>
  );
};

export default TaskManagerPage;
