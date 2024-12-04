import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface User {
  _id: string;
  role: "FACULTY" | "STUDENT" | "ADMIN"; // Add other roles as needed
}

interface AccountState {
  currentUser: User | null;
}

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
