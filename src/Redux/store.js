import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
<<<<<<< HEAD
import vendorReducer from "./slices/vendorSlice"
=======
import wishlistReducer from "./slices/wishListSlice";

import cartReducer from "./slices/cartSlice";
>>>>>>> 9af3f38db76fdd2767eb94d33315522d70d39652
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
<<<<<<< HEAD
    vendor: vendorReducer,
=======
    wishlist: wishlistReducer,
>>>>>>> 9af3f38db76fdd2767eb94d33315522d70d39652
  },
});
