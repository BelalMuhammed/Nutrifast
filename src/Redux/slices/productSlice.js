import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Network/interceptors";

//  Get all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
});

//  Get product details by id
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  }
);

//  Search products by name
export const searchProductsByName = createAsyncThunk(
  "products/searchByName",
  async (name) => {
    const response = await axiosInstance.get(`/products?name=${name}`);
    return response.data;
  }
);

//  Fetch search suggestions
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
//  Add new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/products", {
        ...productData,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//   Delete product by id
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      alert("product deleted successfully");
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//  Update product by id
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/products/${id}`, updatedData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
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
    clearSuggestions: (state) => {
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
      })

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

      // auto search
      .addCase(fetchSearchSuggestions.pending, (state) => {
        state.suggestionsLoading = true;
      })
      .addCase(fetchSearchSuggestions.fulfilled, (state, action) => {
        state.suggestionsLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSearchSuggestions.rejected, (state) => {
        state.suggestionsLoading = false;
      })

      // add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      //  delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      //  update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        // also update selected product if it's open
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      });
  },
});

export const { clearSelectedProduct, clearSuggestions } = productSlice.actions;
export default productSlice.reducer;
