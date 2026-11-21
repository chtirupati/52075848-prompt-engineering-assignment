// Messy standalone copy for the refactoring exercise.

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  deleteEmployeeThunk,
  fetchEmployees,
} from "../../src/store/employeeSlice";
import type { Employee } from "../../src/types/employee";
import Modal from "../../src/components/Modal";
import EmployeeForm from "../../src/components/EmployeeForm";

export default function EmployeeList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.employees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(
    undefined,
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  function openAddModal() {
    setEditingEmployee(undefined);
    setIsModalOpen(true);
  }

  function openEditModal(employee: Employee) {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingEmployee(undefined);
  }

  function handleDelete(employee: Employee) {
    if (window.confirm(`Delete ${employee.name}?`))
      dispatch(deleteEmployeeThunk(employee.id));
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Employees">
      <EmployeeForm initialValue={editingEmployee} onClose={closeModal} />
    </Modal>
  );
}
