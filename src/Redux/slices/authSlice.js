import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if available
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      // Save to localStorage
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      // Save to localStorage
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      // Remove from localStorage
      localStorage.removeItem("currentUser");
    },
    updateProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.user = { ...state.user, ...action.payload };
      // Update localStorage
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    updateProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} = authSlice.actions;

export default authSlice.reducer;
