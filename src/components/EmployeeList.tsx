import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteEmployeeThunk, fetchEmployees } from "../store/employeeSlice";
import type { Employee } from "../types/employee";
import Modal from "./Modal";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.employees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee>();
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const departments = useMemo(
    () => [...new Set(items.map((employee) => employee.department))].sort(),
    [items],
  );

  const filteredEmployees = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return items.filter((employee) => {
      const matchesName = !query || employee.name.toLowerCase().includes(query);
      const matchesDepartment =
        !department || employee.department === department;
      return matchesName && matchesDepartment;
    });
  }, [items, searchText, department]);

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
    if (window.confirm(`Delete ${employee.name}?`)) {
      dispatch(deleteEmployeeThunk(employee.id));
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
        <button
          type="button"
          onClick={openAddModal}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Add Employee
        </button>
      </div>

      <div className="mb-4 flex gap-3">
        <input
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by name"
          aria-label="Search employees by name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1"
        />
        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          aria-label="Filter employees by department"
          className="min-w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1"
        >
          <option value="">All departments</option>
          {departments.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="divide-x divide-gray-200">
              {["Name", "Email", "Department", "Position", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className={
                      heading === "Actions"
                        ? "px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                        : "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    }
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filteredEmployees.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  {items.length === 0
                    ? "No employees yet."
                    : "No employees match the filters."}
                </td>
              </tr>
            )}

            {!loading &&
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                    {employee.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                    {employee.department}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                    {employee.position}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                    <button
                      type="button"
                      onClick={() => openEditModal(employee)}
                      className="mr-3 font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(employee)}
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
      >
        <EmployeeForm initialValue={editingEmployee} onClose={closeModal} />
      </Modal>
    </div>
  );
}
