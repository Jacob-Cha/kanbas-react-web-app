// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import enrollmentsReducer from "./enrollmentsReducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";  // Add this import

const store = configureStore({
  reducer: {
    assignmentsReducer,
    modulesReducer,
    accountReducer,
    enrollments: enrollmentsReducer,
    quizzesReducer,  // Add this line
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;