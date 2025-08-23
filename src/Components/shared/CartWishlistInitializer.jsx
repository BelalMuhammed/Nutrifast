import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Redux/slices/cartSlice";
import { fetchWishlist } from "../../Redux/slices/wishListSlice";
import { getCurrentUser } from "../../lib/storage";

/**
 * Component to handle cart and wishlist initialization
 * This syncs data when the app starts and when authentication state changes
 */
const CartWishlistInitializer = () => {
  const dispatch = useDispatch();

  // Listen to authentication state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Keep track of previous authentication state to detect changes
  const prevAuthState = useRef({ isAuthenticated: false, userId: null });

  useEffect(() => {
    // Check both Redux state and localStorage as fallback
    const reduxUser = isAuthenticated && user?.id;
    const localStorageUser = getCurrentUser()?.id;
    const currentUserId = reduxUser || localStorageUser;

    // Detect if user just logged in or switched users
    const justLoggedIn =
      !prevAuthState.current.isAuthenticated &&
      (isAuthenticated || localStorageUser);
    const userChanged = prevAuthState.current.userId !== currentUserId;

    if ((justLoggedIn || userChanged) && currentUserId) {
      console.log(
        "Authentication change detected - fetching cart and wishlist data..."
      );
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }

    // Update previous state
    prevAuthState.current = {
      isAuthenticated: isAuthenticated || !!localStorageUser,
      userId: currentUserId,
    };
  }, [dispatch, isAuthenticated, user?.id]); // Re-run when authentication changes

  // Initial mount check - fetch data if user is already logged in
  useEffect(() => {
    const initialUser = getCurrentUser();
    if (initialUser?.id) {
      console.log("App start: User already logged in, fetching data...");
      dispatch(fetchCart());
      dispatch(fetchWishlist());

      // Set initial previous state
      prevAuthState.current = {
        isAuthenticated: true,
        userId: initialUser.id,
      };
    }
  }, [dispatch]); // Only run once on mount

  // This component doesn't render anything
  return null;
};

export default CartWishlistInitializer;
