import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define Task Type
interface Task {
  id: string;
  content: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void; // Updated to accept Task instead of string
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [taskContent, setTaskContent] = useState("");

  const handleSave = () => {
    if (taskContent.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(), // Generate a unique ID
        content: taskContent,
      };
      onSave(newTask);
      setTaskContent("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Enter task description"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
