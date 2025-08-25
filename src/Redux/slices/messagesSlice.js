import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Network/interceptors";

export const fetchMessages = createAsyncThunk(
  "Messages/fetchMessages",
  async () => {
    const response = await axiosInstance.get(`/messages`);
    return response.data;
  }
);

export const deleteMessage = createAsyncThunk(
  "Messages/deleteMessage",
  async (MessageId) => {
    await axiosInstance.delete(`/messages/${MessageId}`);
    return MessageId;
  }
);

export const clearMessages = createAsyncThunk(
  "Messages/clearMessages",
  async (Id) => {
    await axiosInstance.delete(`/messages/?id=${Id}`);
    return [];
  }
);

const messagesSlice = createSlice({
  name: "Messages",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (Message) => Message.id !== action.payload
        );
      })
      .addCase(clearMessages.fulfilled, (state) => {
        state.list = [];
      });
  },
});

export default messagesSlice.reducer;
