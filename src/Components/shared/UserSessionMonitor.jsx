import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser, hasUserChanged } from "../lib/storage";
import { clearUserData as clearCartData } from "../Redux/slices/cartSlice";
import { clearUserData as clearWishlistData } from "../Redux/slices/wishListSlice";

/**
 * User Session Monitor Component
 * Automatically handles user changes and data cleanup
 * Place this at the app root level
 */
const UserSessionMonitor = () => {
  const dispatch = useDispatch();
  const previousUserRef = useRef(getCurrentUser());

  useEffect(() => {
    const checkUserChanges = () => {
      const currentUser = getCurrentUser();
      const previousUser = previousUserRef.current;

      if (hasUserChanged(previousUser, currentUser)) {
        console.log("User change detected:", {
          from: previousUser?.id || "anonymous",
          to: currentUser?.id || "anonymous",
        });

        // If user logged out (currentUser is null)
        if (!currentUser && previousUser) {
          console.log("User logged out - clearing data");
          dispatch(clearCartData());
          dispatch(clearWishlistData());
        }

        // If user switched to different user
        if (currentUser && previousUser && currentUser.id !== previousUser.id) {
          console.log("User switched - clearing previous user data");
          dispatch(clearCartData());
          dispatch(clearWishlistData());
        }

        // Update the reference
        previousUserRef.current = currentUser;
      }
    };

    // Check immediately
    checkUserChanges();

    // Set up interval to check for changes (useful for detecting changes from other tabs)
    const interval = setInterval(checkUserChanges, 1000);

    // Listen for storage changes (changes from other tabs)
    const handleStorageChange = (event) => {
      if (event.key === "currentUser") {
        checkUserChanges();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default UserSessionMonitor;
