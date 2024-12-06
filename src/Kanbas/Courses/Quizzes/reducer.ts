// src/Kanbas/Quizzes/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, QuizQuestion } from "./types";

interface QuizzesState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
  selectedQuiz: Quiz | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  loading: false,
  error: null,
  selectedQuiz: null
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
      state.loading = false;
      state.error = null;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
      if (state.selectedQuiz?._id === action.payload._id) {
        state.selectedQuiz = action.payload;
      }
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
      if (state.selectedQuiz?._id === action.payload) {
        state.selectedQuiz = null;
      }
    },
    setSelectedQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.selectedQuiz = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addQuestion: (state, action: PayloadAction<QuizQuestion>) => {
      if (state.selectedQuiz) {
        state.selectedQuiz.questions.push(action.payload);
      }
    },
    updateQuestion: (state, action: PayloadAction<QuizQuestion>) => {
      if (state.selectedQuiz) {
        state.selectedQuiz.questions = state.selectedQuiz.questions.map((q) =>
          q._id === action.payload._id ? action.payload : q
        );
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      if (state.selectedQuiz) {
        state.selectedQuiz.questions = state.selectedQuiz.questions.filter(
          (q) => q._id !== action.payload
        );
      }
    }
  }
});

export const {
  setQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setSelectedQuiz,
  setLoading,
  setError,
  addQuestion,
  updateQuestion,
  deleteQuestion
} = quizzesSlice.actions;

export default quizzesSlice.reducer;