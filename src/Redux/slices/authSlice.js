import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  setCurrentUser,
  clearUserData,
} from "../../lib/storage";

// Async thunk for login with cart/wishlist fetching
export const loginWithDataFetch = createAsyncThunk(
  "auth/loginWithDataFetch",
  async (userData, { dispatch }) => {
    // Set user data
    setCurrentUser(userData);

    // Import these dynamically to avoid circular dependencies
    const { fetchCart } = await import("./cartSlice");
    const { fetchWishlist } = await import("./wishListSlice");

    // Fetch user's cart and wishlist data
    dispatch(fetchCart());
    dispatch(fetchWishlist());

    return userData;
  }
);

const initialUser = getCurrentUser();

const initialState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
  loading: false,
  error: null,
};

const authSlice = createSlice(
  {
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
        setCurrentUser(action.payload);
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
        setCurrentUser(action.payload);
      },
      loginFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
      logout(state) {
        state.user = null;
        state.isAuthenticated = false;
        // Clear all user data including cart and wishlist
        clearUserData();
      },
      updateProfileStart(state) {
        state.loading = true;
        state.error = null;
      },
      updateProfileSuccess(state, action) {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        // Update localStorage
        setCurrentUser(state.user);
      },
      updateProfileFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
    },
  },
  {
    extraReducers: (builder) => {
      builder
        // Handle loginWithDataFetch
        .addCase(loginWithDataFetch.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginWithDataFetch.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        })
        .addCase(loginWithDataFetch.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  }
);

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
