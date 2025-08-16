import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import vendorReducer from "./slices/vendorSlice";
import wishlistReducer from "./slices/wishListSlice";
import ordersReducer from "./slices/ordersSlice";

import cartReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    vendor: vendorReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});
