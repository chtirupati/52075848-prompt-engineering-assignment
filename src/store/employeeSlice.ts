import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import * as employeeApi from '../api/employeeApi';
import type { Employee, EmployeeInput } from '../types/employee';

interface EmployeesState {
  items: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  employeeApi.getEmployees
);

export const createEmployeeThunk = createAsyncThunk(
  'employees/create',
  async (data: EmployeeInput) => employeeApi.createEmployee(data)
);

export const updateEmployeeThunk = createAsyncThunk(
  'employees/update',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: EmployeeInput;
    }
  ) => employeeApi.updateEmployee(id, data)
);

export const deleteEmployeeThunk = createAsyncThunk(
  'employees/delete',
  async (id: string) => employeeApi.deleteEmployee(id)
);

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Something went wrong';
}

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error);
      })

      .addCase(createEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        createEmployeeThunk.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          state.items.push(action.payload);
        }
      )

      .addCase(createEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error);
      })

      .addCase(updateEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        updateEmployeeThunk.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          const index = state.items.findIndex(
            (employee) => employee.id === action.payload.id
          );

          if (index !== -1) state.items[index] = action.payload;
        }
      )

      .addCase(updateEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error);
      })

      .addCase(deleteEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        deleteEmployeeThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.items = state.items.filter(
            (employee) => employee.id !== action.payload
          );
        }
      )

      .addCase(deleteEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error);
      });
  },
});

export default employeeSlice.reducer;