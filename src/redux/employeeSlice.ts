import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  name: string;
  email: string;
  url: string;
  gender: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  pin: string;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    editEmployee: (
      state,
      action: PayloadAction<{
        email: string;
        updatedData: Partial<Employee>;
      }>
    ) => {
      const index = state.employees.findIndex(
        (employee) => employee.email === action.payload?.email
      );
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...action.payload.updatedData,
        };
      }
    },
  },
});

export const { addEmployee, editEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
