import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

// For development: set isLoggedIn to true with mockUser
// For production: set isLoggedIn to false with user: null
const initialState: AuthState = {
  user: {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+65 9123 4567",
  },
  isLoggedIn: true,
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
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
