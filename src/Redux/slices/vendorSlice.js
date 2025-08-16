import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: [],
  currentVendor: null,
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorRegisterStart(state) {
      state.loading = true;
      state.error = null;
    },
    vendorRegisterSuccess(state, action) {
      state.loading = false;
      state.currentVendor = action.payload; 
    },
    vendorRegisterFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  vendorRegisterStart,
  vendorRegisterSuccess,
  vendorRegisterFailure,
} = vendorSlice.actions;

export default vendorSlice.reducer;
