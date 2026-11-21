// employeeApi.ts

import type { Employee, EmployeeInput } from '../types/employee';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')
  ?? 'http://localhost:3001';
const BASE_URL = `${API_URL}/employees`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const body = await response.json() as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // Keep the HTTP status message when the server has no JSON body.
    }

    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function getEmployees(): Promise<Employee[]> {
  return fetch(BASE_URL).then((res) => handleResponse<Employee[]>(res));
}

export function createEmployee(data: EmployeeInput): Promise<Employee> {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => handleResponse<Employee>(res));
}

export function updateEmployee(
  id: string,
  data: EmployeeInput
): Promise<Employee> {
  return fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => handleResponse<Employee>(res));
}

export async function deleteEmployee(id: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  await handleResponse<unknown>(response);
  return id;
}