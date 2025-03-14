import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Department {
  id: string;
  name: string;
}

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (department: Department) => void;
  department?: Department | null; // Optional for editing
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  department,
}) => {
  const [departmentName, setDepartmentName] = useState("");

  // Prefill when editing
  useEffect(() => {
    if (department) {
      setDepartmentName(department.name);
    } else {
      setDepartmentName("");
    }
  }, [department]);

  const handleSave = () => {
    if (departmentName.trim()) {
      onSave({
        id: department?.id || crypto.randomUUID(),
        name: departmentName,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "Add New Department"}
          </DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Enter department name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {department ? "Update Department" : "Save Department"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentModal;
