export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
}

export type EmployeeInput = Omit<Employee, 'id'>;