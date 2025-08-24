import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  addToWishlistAsync,
  removeFromWishlistAsync,
  toggleWishlistItemAsync,
  clearWishlistAsync,
  toggleWishlistItem,
  removeFromWishlist,
  clearWishlist,
  setOnlineStatus,
  clearError,
  clearUserData,
} from "../Redux/slices/wishListSlice";
import { getCurrentUser } from "../lib/storage";

/**
 * Custom hook for wishlist management with online/offline support
 */
export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.wishlist);
  const { items, loading, error, isOnline, lastSyncTime } = wishlistState;

  // Check if user is authenticated
  const isAuthenticated = !!getCurrentUser()?.id;

  // Initialize wishlist (fetch from API if online and authenticated)
  useEffect(() => {
    if (isAuthenticated && isOnline) {
      dispatch(fetchWishlist());
    }
    // Do NOT clear wishlist for guests; only clear on explicit logout
  }, [dispatch, isAuthenticated, isOnline]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      dispatch(setOnlineStatus(true));
      // Sync wishlist when coming back online
      if (isAuthenticated) {
        dispatch(fetchWishlist());
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
  }, [dispatch, isAuthenticated]);

  // Wishlist actions with fallback to local storage
  const toggleItem = useCallback(
    async (product) => {
      if (isAuthenticated && isOnline) {
        return dispatch(toggleWishlistItemAsync(product));
      } else {
        return dispatch(toggleWishlistItem(product));
      }
    },
    [dispatch, isAuthenticated, isOnline]
  );

  const removeItem = useCallback(
    async (productId) => {
      if (isAuthenticated && isOnline) {
        return dispatch(removeFromWishlistAsync(productId));
      } else {
        return dispatch(removeFromWishlist(productId));
      }
    },
    [dispatch, isAuthenticated, isOnline]
  );

  const addItem = useCallback(
    async (product) => {
      const isInWishlist = items.some((item) => item.id === product.id);
      if (!isInWishlist) {
        if (isAuthenticated && isOnline) {
          return dispatch(addToWishlistAsync(product));
        } else {
          return dispatch(toggleWishlistItem(product));
        }
      }
    },
    [dispatch, isAuthenticated, isOnline, items]
  );

  const clearAllItems = useCallback(async () => {
    if (isAuthenticated && isOnline) {
      return dispatch(clearWishlistAsync());
    } else {
      return dispatch(clearWishlist());
    }
  }, [dispatch, isAuthenticated, isOnline]);

  const clearErrorState = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Utility functions
  const isItemInWishlist = useCallback(
    (productId) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const getWishlistSummary = useCallback(() => {
    return {
      totalItems: items.length,
      items: items,
    };
  }, [items]);

  // Sync wishlist with server (for manual sync)
  const syncWishlist = useCallback(() => {
    if (isAuthenticated && isOnline) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated, isOnline]);

  // Clear user data (for logout)
  const clearUserWishlistData = useCallback(() => {
    dispatch(clearUserData());
  }, [dispatch]);

  // Move item to cart (requires cart hook integration)
  const moveToCart = useCallback(
    async (product, cartActions) => {
      try {
        // Add to cart
        if (cartActions?.addItem) {
          await cartActions.addItem(product);
        }

        // Remove from wishlist
        await removeItem(product.id);

        return true;
      } catch (error) {
        console.error("Error moving item to cart:", error);
        return false;
      }
    },
    [removeItem]
  );

  return {
    // State
    items,
    loading,
    error,
    isOnline,
    lastSyncTime,
    isAuthenticated,

    // Actions
    toggleItem,
    addItem,
    removeItem,
    clearAllItems,
    clearErrorState,
    syncWishlist,
    moveToCart,

    // Utilities
    isItemInWishlist,
    getWishlistSummary,
    clearUserWishlistData,
  };
};
