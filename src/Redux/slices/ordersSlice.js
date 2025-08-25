import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Network/interceptors";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId) => {
    const response = await axiosInstance.get(`/orders?userId=${userId}`);
    console.log("Orders API response:", response.data);
    return response.data;
  }
);

export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async () => {
    const response = await axiosInstance.get(`/orders`);
    console.log("Orders API response:", response.data);
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
    const response = await axiosInstance.get(`/orders?userId=${userId}`);
    const userOrders = response.data;
    await Promise.all(
      userOrders.map((order) => axiosInstance.delete(`/orders/${order.id}`))
    );
    return userId;
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

        const userId = action.meta.arg;
        state.list = action.payload.filter((order) => order.userId === userId);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((order) => order.id !== action.payload);
      })
      .addCase(clearOrders.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (order) => order.userId !== action.payload
        );
      })

      // ✅ Admin Orders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
