// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartService from "../../Api/cartService";

// --- Persistence helpers (fallback for offline mode) ---
function loadCart() {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(cartItems) {
  try {
    // Always save cart, even for guests
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  } catch {
    // Ignore localStorage errors
  }
}

// --- Async Thunks for API operations ---

// Fetch cart from server
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const cart = await cartService.getCart();
    return cart.items || [];
  } catch (error) {
    // Fallback to localStorage if API fails
    console.warn("Failed to fetch cart from API, using local storage:", error);
    const localItems = loadCart();
    return localItems;
  }
});

// Add item to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (product, { rejectWithValue }) => {
    try {
      const updatedCart = await cartService.addItemToCart(product);
      return updatedCart.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (productId, { rejectWithValue }) => {
    try {
      const updatedCart = await cartService.removeItemFromCart(productId);
      return updatedCart.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update item quantity
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const updatedCart = await cartService.updateItemQuantity(id, quantity);
      return updatedCart.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clear cart
export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCart(),
    loading: false,
    error: null,
    lastSyncTime: null,
    isOnline: true,
    isProcessingPartialOrder: false,
  },
  reducers: {
    // Local-only actions (for offline mode)
    addToCartLocal: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.id === item.id);
      if (!existItem) {
        state.cartItems.push({ ...item, quantity: 1 });
        saveCart(state.cartItems);
      }
    },
    removeFromCartLocal: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveCart(state.cartItems);
    },
    increaseQtyLocal: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.cartItems);
    },
    decreaseQtyLocal: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart(state.cartItems);
      }
    },
    updateQuantityLocal: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        saveCart(state.cartItems);
      }
    },
    clearCartLocal: (state) => {
      state.cartItems = [];
      saveCart(state.cartItems);
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      saveCart(state.cartItems);
    },
    // New action to handle user logout
    clearUserData: (state) => {
      state.cartItems = [];
      state.error = null;
      state.lastSyncTime = null;
      state.loading = false;
      // Clear localStorage - don't call saveCart here!
      try {
        localStorage.removeItem("cartItems");
      } catch {
        // ignore errors
      }
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    setProcessingPartialOrder: (state, action) => {
      state.isProcessingPartialOrder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastSyncTime = Date.now();
        saveCart(state.cartItems);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastSyncTime = Date.now();
        saveCart(state.cartItems);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastSyncTime = Date.now();
        saveCart(state.cartItems);
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update quantity
      .addCase(updateQuantityAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastSyncTime = Date.now();
        saveCart(state.cartItems);
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear cart
      .addCase(clearCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastSyncTime = Date.now();
        saveCart(state.cartItems);
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  increaseQtyLocal,
  decreaseQtyLocal,
  updateQuantityLocal,
  clearCartLocal,
  setCartItems,
  clearUserData,
  setOnlineStatus,
  setProcessingPartialOrder,
  clearError,
} = cartSlice.actions;

// Backwards compatibility exports (use async versions when possible)
export const addToCart = addToCartLocal;
export const removeFromCart = removeFromCartLocal;
export const increaseQty = increaseQtyLocal;
export const decreaseQty = decreaseQtyLocal;
export const updateQuantity = updateQuantityLocal;
export const clearCart = clearCartLocal;

export default cartSlice.reducer;
