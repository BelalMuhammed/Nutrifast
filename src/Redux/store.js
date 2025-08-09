import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import wishlistSlice from "./slices/wishListSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    WishList: wishlistSlice,
  },
});
