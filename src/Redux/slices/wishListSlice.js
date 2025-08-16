import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items) => {
  localStorage.setItem("wishlist", JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadFromLocalStorage(),
  },
  reducers: {
    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);

      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id);
      } else {
        state.items.push(item);
      }
      saveToLocalStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { toggleWishlistItem, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
