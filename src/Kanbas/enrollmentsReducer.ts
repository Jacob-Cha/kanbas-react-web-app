import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the enrollment state
interface EnrollmentState {
  enrollments: { [courseId: string]: boolean };
  showAllCourses: boolean;
}

const initialState: EnrollmentState = {
  enrollments: JSON.parse(localStorage.getItem("enrollments") || "{}"),
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleCourseView(state) {
      state.showAllCourses = !state.showAllCourses;
    },
    enroll(state, action: PayloadAction<string>) {
      state.enrollments[action.payload] = true;
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
    unenroll(state, action: PayloadAction<string>) {
      delete state.enrollments[action.payload];
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
  },
});

export const { toggleCourseView, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;

// Add this line to make the file a module
export {};
