import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DepartmentModal from "@/components/task-manager/DepartmentModal";

interface Department {
  id: string;
  name: string;
}

const defaultDepartments: Department[] = [
  { id: "1", name: "Engineering Department" },
  { id: "2", name: "IT Department" },
  { id: "3", name: "Operational Department" },
  { id: "4", name: "Security Department" },
];

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] =
    useState<Department[]>(defaultDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState<Department | null>(null);

  const handleSaveDepartment = (department: Department) => {
    if (editDepartment) {
      // Editing existing department
      setDepartments(
        departments.map((dept) =>
          dept.id === department.id ? department : dept
        )
      );
    } else {
      // Adding a new department
      setDepartments([...departments, department]);
    }
    setEditDepartment(null);
    setIsModalOpen(false);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartments(departments.filter((dept) => dept.id !== departmentId));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Departments</h2>
      <ul>
        {departments.map((department) => (
          <li
            key={department.id}
            className="flex justify-between items-center p-2 border-b"
          >
            {department.name}
            <div>
              <Button
                onClick={() => {
                  setEditDepartment(department);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteDepartment(department.id)}
                className="ml-2"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Button
        className="mt-2"
        onClick={() => {
          setEditDepartment(null);
          setIsModalOpen(true);
        }}
      >
        Add Department
      </Button>

      {/* Department Modal */}
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDepartment}
        department={editDepartment}
      />
    </div>
  );
};

export default DepartmentList;
