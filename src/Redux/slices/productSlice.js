import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../assets/Network/interceptors";

// Get all product
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
});

// get product details
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // fetch by id
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
