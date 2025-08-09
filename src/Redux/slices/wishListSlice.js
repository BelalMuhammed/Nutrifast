import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  const res = await fetch('/api/wishlist');
  return res.json();
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [], status: 'idle' },
  reducers: {
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
