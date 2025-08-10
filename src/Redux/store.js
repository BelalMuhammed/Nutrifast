import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import vendorReducer from "./slices/vendorSlice"
export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    vendor: vendorReducer,
  },
});
