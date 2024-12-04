import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import assignmentsData from "../../Database/assignments.json"; // Adjust the path if needed

interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
}

// Initialize the assignments with default values for missing fields
const initialState: { assignments: Assignment[] } = {
  assignments: assignmentsData.map((assignment: any) => ({
    ...assignment,
    description: "",        // Default empty string for description
    points: 0,              // Default 0 points
    dueDate: "",            // Default empty string for due date
    availableFrom: "",      // Default empty string for available from date
    availableUntil: "",     // Default empty string for available until date
  })),
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
