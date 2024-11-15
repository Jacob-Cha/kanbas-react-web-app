import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface User {
  _id: string;
  username: string; // Add username if it exists
  email?: string; // Optional email
  firstName?: string; // Optional first name
  lastName?: string; // Optional last name
  role: "FACULTY" | "STUDENT" | "ADMIN"; // Add other roles as needed
  // Add other properties for the user if necessary
}

interface AccountState {
  currentUser: User | null;
}

// Initialize the state with AccountState
const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
