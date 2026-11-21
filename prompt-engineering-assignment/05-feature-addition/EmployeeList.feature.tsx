// Reference copy of EmployeeList with name and department filtering.

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  deleteEmployeeThunk,
  fetchEmployees,
} from "../../src/store/employeeSlice";

export default function EmployeeListFeatureReference() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.employees);
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
    return items.filter(
      (employee) =>
        (!query ||
          employee.name.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query)) &&
        (!department || employee.department === department),
    );
  }, [items, searchText, department]);

  return (
    <div>
      <input
        type="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search by name or department"
        aria-label="Search employees"
      />
      <select
        value={department}
        onChange={(event) => setDepartment(event.target.value)}
      >
        <option value="">All departments</option>
        {departments.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      {filteredEmployees.map((employee) => (
        <div key={employee.id}>
          {employee.name} – {employee.department}
        </div>
      ))}
    </div>
  );
}
