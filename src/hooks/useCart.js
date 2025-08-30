import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCartAsync,
  removeFromCartAsync,
  updateQuantityAsync,
  clearCartAsync,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  updateQuantity,
  clearCart,
  setOnlineStatus,
  clearError,
  clearUserData,
} from "../Redux/slices/cartSlice";
import { getCurrentUser } from "../lib/storage";

/**
 * Custom hook for cart management with online/offline support
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const {
    cartItems,
    loading,
    error,
    isOnline,
    lastSyncTime,
    isProcessingPartialOrder,
  } = cartState;

  // Check if user is authenticated
  const isAuthenticated = !!getCurrentUser()?.id;

  // Initialize cart (fetch from API if online and authenticated)
  useEffect(() => {
    if (isAuthenticated && isOnline && !isProcessingPartialOrder) {
      dispatch(fetchCart());
    }
    // Do NOT clear cart for guests; only clear on explicit logout
  }, [dispatch, isAuthenticated, isOnline, isProcessingPartialOrder]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      dispatch(setOnlineStatus(true));
      // Sync cart when coming back online
      if (isAuthenticated && !isProcessingPartialOrder) {
        dispatch(fetchCart());
      }
    };

    const handleOffline = () => {
      dispatch(setOnlineStatus(false));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial status
    dispatch(setOnlineStatus(navigator.onLine));

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch, isAuthenticated, isProcessingPartialOrder]);

  // Cart actions with fallback to local storage
  const addItem = useCallback(
    async (product) => {
      if (isAuthenticated && isOnline) {
        return dispatch(addToCartAsync(product));
      } else {
        return dispatch(addToCart(product));
      }
    },
    [dispatch, isAuthenticated, isOnline]
  );

  const removeItem = useCallback(
    async (productId) => {
      if (isAuthenticated && isOnline) {
        return dispatch(removeFromCartAsync(productId));
      } else {
        return dispatch(removeFromCart(productId));
      }
    },
    [dispatch, isAuthenticated, isOnline]
  );

  const increaseQuantity = useCallback(
    async (productId) => {
      if (isAuthenticated && isOnline) {
        const item = cartItems.find((item) => item.id === productId);
        if (item) {
          return dispatch(
            updateQuantityAsync({ id: productId, quantity: item.quantity + 1 })
          );
        }
      } else {
        return dispatch(increaseQty(productId));
      }
    },
    [dispatch, isAuthenticated, isOnline, cartItems]
  );

  const decreaseQuantity = useCallback(
    async (productId) => {
      const item = cartItems.find((item) => item.id === productId);
      if (!item) return;
      if (item.quantity === 1) {
        return;
      }
      if (isAuthenticated && isOnline) {
        return dispatch(
          updateQuantityAsync({ id: productId, quantity: item.quantity - 1 })
        );
      } else {
        return dispatch(decreaseQty(productId));
      }
    },
    [dispatch, isAuthenticated, isOnline, cartItems]
  );

  const updateItemQuantity = useCallback(
    async (productId, quantity) => {
      if (isAuthenticated && isOnline) {
        return dispatch(updateQuantityAsync({ id: productId, quantity }));
      } else {
        return dispatch(updateQuantity({ id: productId, quantity }));
      }
    },
    [dispatch, isAuthenticated, isOnline]
  );

  const clearAllItems = useCallback(async () => {
    if (isAuthenticated && isOnline) {
      return dispatch(clearCartAsync());
    } else {
      return dispatch(clearCart());
    }
  }, [dispatch, isAuthenticated, isOnline]);

  const clearErrorState = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Utility functions
  const isItemInCart = useCallback(
    (productId) => {
      return cartItems.some((item) => item.id === productId);
    },
    [cartItems]
  );

  const getItemQuantity = useCallback(
    (productId) => {
      const item = cartItems.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  const getCartSummary = useCallback(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      totalItems,
      totalPrice,
      itemCount: cartItems.length,
      items: cartItems,
    };
  }, [cartItems]);

  // Sync cart with server (for manual sync)
  const syncCart = useCallback(() => {
    if (isAuthenticated && isOnline) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated, isOnline]);

  // Clear user data (for logout)
  const clearUserCartData = useCallback(() => {
    dispatch(clearUserData());
  }, [dispatch]);

  return {
    // State
    cartItems,
    loading,
    error,
    isOnline,
    lastSyncTime,
    isAuthenticated,

    // Actions
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    updateItemQuantity,
    clearAllItems,
    clearErrorState,
    syncCart,

    // Utilities
    isItemInCart,
    getItemQuantity,
    getCartSummary,
    clearUserCartData,
  };
};
