import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Network/interceptors";

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
// search products by name
export const searchProductsByName = createAsyncThunk(
  "products/searchByName",
  async (name) => {
    const response = await axiosInstance.get(`/products?name=${name}`);
    return response.data;
  }
);

export const fetchSearchSuggestions = createAsyncThunk(
  "products/fetchSuggestions",
  async (name) => {
    const res = await axiosInstance.get(`/products`);
    const searchTerm = name.toLowerCase();
    return res.data
      .filter((product) => product.name.toLowerCase().includes(searchTerm))
      .slice(0, 8);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    suggestions: [],
    suggestionsLoading: false,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearSuggestions(state) {
      state.suggestions = [];
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
    builder
      // search by name
      .addCase(searchProductsByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProductsByName.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(searchProductsByName.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      //auto search
      .addCase(fetchSearchSuggestions.pending, (state) => {
        state.suggestionsLoading = true;
      })
      .addCase(fetchSearchSuggestions.fulfilled, (state, action) => {
        state.suggestionsLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSearchSuggestions.rejected, (state) => {
        state.suggestionsLoading = false;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const { clearSuggestions } = productSlice.actions;
export default productSlice.reducer;
