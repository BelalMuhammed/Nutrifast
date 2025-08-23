import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCurrentUser,
  setCurrentUser,
  clearUserData,
  hasUserChanged,
} from "../lib/storage";
import { logout as logoutAction } from "../Redux/slices/authSlice";
import { clearUserData as clearCartData } from "../Redux/slices/cartSlice";
import { clearUserData as clearWishlistData } from "../Redux/slices/wishListSlice";

/**
 * Professional hook for user authentication management
 * Handles login, logout, and user data cleanup
 * Integrated with Redux authSlice for consistent state management
 */
export const useAuth = () => {
  const dispatch = useDispatch();

  // Enhanced logout function - integrated with Redux
  const logout = useCallback(async () => {
    try {
      // Clear cart and wishlist data from Redux state first
      dispatch(clearCartData());
      dispatch(clearWishlistData());

      // Clear user authentication (this also clears localStorage)
      dispatch(logoutAction());

      // Additional cleanup to ensure data is cleared
      setTimeout(() => {
        // Force clear localStorage items if they still exist
        try {
          localStorage.removeItem("cartItems");
          localStorage.removeItem("wishlist");
          localStorage.removeItem("currentUser");
        } catch {
          // ignore errors
        }
      }, 100);

      console.log("User logged out successfully");
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  }, [dispatch]);

  // Enhanced login function
  const login = useCallback((userData) => {
    try {
      // Save user data
      setCurrentUser(userData);

      console.log("User logged in successfully:", userData);
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  }, []);

  // Monitor user changes (for detecting login/logout from other tabs)
  useEffect(() => {
    let previousUser = getCurrentUser();

    const handleStorageChange = (event) => {
      if (event.key === "currentUser") {
        const currentUser = getCurrentUser();

        if (hasUserChanged(previousUser, currentUser)) {
          if (!currentUser) {
            // User logged out - clear Redux state
            dispatch(clearCartData());
            dispatch(clearWishlistData());
          }
          previousUser = currentUser;
        }
      }
    };

    // Listen for changes in other tabs
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  // Get current user
  const getCurrentUserData = useCallback(() => {
    return getCurrentUser();
  }, []);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    const user = getCurrentUser();
    return !!(user && user.id);
  }, []);

  return {
    login,
    logout,
    getCurrentUserData,
    isAuthenticated,
    clearUserData, // Expose for manual cleanup if needed
  };
};
