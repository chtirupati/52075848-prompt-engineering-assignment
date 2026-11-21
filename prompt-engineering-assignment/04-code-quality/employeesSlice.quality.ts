// Standalone copy of the employee Redux slice for code-quality review.

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as employeeApi from '../../src/api/employeeApi';
import type { Employee, EmployeeInput } from '../../src/types/employee';

interface EmployeesState {
  items: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = { items: [], loading: false, error: null };

export const fetchEmployees = createAsyncThunk('employees/fetchAll', employeeApi.getEmployees);
export const createEmployeeThunk = createAsyncThunk('employees/create', async (data: EmployeeInput) => employeeApi.createEmployee(data));
export const updateEmployeeThunk = createAsyncThunk('employees/update', async ({ id, data }: { id: string; data: EmployeeInput }) => employeeApi.updateEmployee(id, data));
export const deleteEmployeeThunk = createAsyncThunk('employees/delete', async (id: string) => employeeApi.deleteEmployee(id));

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchEmployees.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Something went wrong'; })
      .addCase(createEmployeeThunk.fulfilled, (state, action: PayloadAction<Employee>) => { state.loading = false; state.items.push(action.payload); })
      .addCase(updateEmployeeThunk.fulfilled, (state, action: PayloadAction<Employee>) => { state.loading = false; const index = state.items.findIndex((item) => item.id === action.payload.id); if (index !== -1) state.items[index] = action.payload; })
      .addCase(deleteEmployeeThunk.fulfilled, (state, action: PayloadAction<string>) => { state.loading = false; state.items = state.items.filter((item) => item.id !== action.payload); });
  },
});

export default employeeSlice.reducer;
