// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// --- Persistence helpers ---
function loadCart() {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    // Ignore localStorage errors
    return [];
  }
}

function saveCart(cartItems) {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch {
    // Ignore localStorage errors
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.id === item.id);
      // If item already exists, don't increase quantity
      // User should increase quantity from cart page itself
      if (!existItem) {
        state.cartItems.push({ ...item, quantity: 1 });
        saveCart(state.cartItems);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveCart(state.cartItems);
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.cartItems);
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveCart(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCart(state.cartItems);
    },
    // Helper to check if item is in cart
    isInCart: (state, action) => {
      return state.cartItems.some((item) => item.id === action.payload);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  isInCart,
} = cartSlice.actions;
export default cartSlice.reducer;
