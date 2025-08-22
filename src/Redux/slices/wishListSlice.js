import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as wishlistService from "../../Api/wishlistService";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items) => {
  try {
    // Only save if user is authenticated
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && items) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  } catch {
    // Ignore errors
  }
};

// --- Async Thunks for API operations ---

// Fetch wishlist from server
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    try {
      const wishlist = await wishlistService.getWishlist();
      return wishlist.items || [];
    } catch (error) {
      console.warn(
        "Failed to fetch wishlist from API, using local storage:",
        error
      );
      const localItems = loadFromLocalStorage();
      return localItems;
    }
  }
);

// Add item to wishlist
export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlistAsync",
  async (product, { rejectWithValue }) => {
    try {
      const updatedWishlist = await wishlistService.addItemToWishlist(product);
      return updatedWishlist.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from wishlist
export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/removeFromWishlistAsync",
  async (productId, { rejectWithValue }) => {
    try {
      const updatedWishlist = await wishlistService.removeItemFromWishlist(
        productId
      );
      return updatedWishlist.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Toggle item in wishlist
export const toggleWishlistItemAsync = createAsyncThunk(
  "wishlist/toggleWishlistItemAsync",
  async (product, { rejectWithValue }) => {
    try {
      const updatedWishlist = await wishlistService.toggleItemInWishlist(
        product
      );
      return updatedWishlist.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clear entire wishlist
export const clearWishlistAsync = createAsyncThunk(
  "wishlist/clearWishlistAsync",
  async (_, { rejectWithValue }) => {
    try {
      await wishlistService.clearWishlist();
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadFromLocalStorage(),
    loading: false,
    error: null,
    lastSyncTime: null,
    isOnline: true,
  },
  reducers: {
    // Local-only actions (for offline mode)
    toggleWishlistItemLocal: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);

      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id);
      } else {
        state.items.push(item);
      }
      saveToLocalStorage(state.items);
    },
    removeFromWishlistLocal: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearWishlistLocal: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
    // New action to handle user logout
    clearUserData: (state) => {
      state.items = [];
      state.error = null;
      state.lastSyncTime = null;
      state.loading = false;
      // Clear localStorage - don't call saveToLocalStorage here!
      try {
        localStorage.removeItem("wishlist");
      } catch {
        // ignore errors
      }
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSyncTime = Date.now();
        saveToLocalStorage(state.items);
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to wishlist
      .addCase(addToWishlistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSyncTime = Date.now();
        saveToLocalStorage(state.items);
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from wishlist
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSyncTime = Date.now();
        saveToLocalStorage(state.items);
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle wishlist item
      .addCase(toggleWishlistItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlistItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSyncTime = Date.now();
        saveToLocalStorage(state.items);
      })
      .addCase(toggleWishlistItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear wishlist
      .addCase(clearWishlistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastSyncTime = Date.now();
        saveToLocalStorage(state.items);
      })
      .addCase(clearWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  toggleWishlistItemLocal,
  removeFromWishlistLocal,
  clearWishlistLocal,
  clearUserData,
  setOnlineStatus,
  clearError,
} = wishlistSlice.actions;

// Backwards compatibility exports (use async versions when possible)
export const toggleWishlistItem = toggleWishlistItemLocal;
export const removeFromWishlist = removeFromWishlistLocal;
export const clearWishlist = clearWishlistLocal;

export default wishlistSlice.reducer;
