import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  registrationEmail: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

// Note: Token is now managed by HttpOnly cookies (Sanctum SPA mode)
// No need to store token in localStorage or state

const initialState: AuthState = {
  user: null,
  registrationEmail: null,
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setRegistrationEmail: (state, action: PayloadAction<string | null>) => {
      state.registrationEmail = action.payload;
    },
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.registrationEmail = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.registrationEmail = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUser,
  setRegistrationEmail,
  login,
  logout,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
