import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "./Database";

interface EnrollmentState {
  enrollments: Record<string, boolean>; // Maps course IDs to enrollment status
  showAllCourses: boolean;
}

// Initialize with data from the database
const initialState: EnrollmentState = {
  enrollments: db.enrollments.reduce((acc: Record<string, boolean>, enrollment: any) => {
    acc[enrollment.course] = true;
    return acc;
  }, {}),
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<string>) => {
      state.enrollments[action.payload] = true;
    },
    unenroll: (state, action: PayloadAction<string>) => {
      delete state.enrollments[action.payload];
    },
    toggleCourseView: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
  },
});

export const { enroll, unenroll, toggleCourseView } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
