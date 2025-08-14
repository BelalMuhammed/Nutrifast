import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Network/interceptors";


export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    
    const response = await axiosInstance.get(`/orders`);
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId) => {
    await axiosInstance.delete(`/orders/${orderId}`);
    return orderId;
  }
);

export const clearOrders = createAsyncThunk(
  "orders/clearOrders",
  async (userId) => {
    await axiosInstance.delete(`/orders/?userId=${userId}`);
    return [];
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((order) => order.id !== action.payload);
      })
      .addCase(clearOrders.fulfilled, (state) => {
        state.list = [];
      });
  },
});

export default ordersSlice.reducer;
