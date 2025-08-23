/* eslint-disable no-unused-vars */
export const USER_KEY = "currentUser";
export const CART_KEY = "cartItems";
export const WISHLIST_KEY = "wishlist";

export function setCurrentUser(user) {
  try {
    if (user === undefined || user === null) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (_) {
    // ignore localStorage errors
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function removeCurrentUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (_) {
    // noop
  }
}

// Enhanced logout function that clears all user-related data
export function clearUserData() {
  try {
    // Clear user authentication
    localStorage.removeItem(USER_KEY);

    // Clear cart data
    localStorage.removeItem(CART_KEY);

    // Clear wishlist data
    localStorage.removeItem(WISHLIST_KEY);

    // Clear any other user-specific data
    // Add more keys here if you have other user-specific localStorage items
    const keysToRemove = [
      "lastOrder",
      "userPreferences",
      "recentlyViewed",
      // Add any other user-specific keys here
    ];

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (_) {
    // ignore localStorage errors
  }
}

// Function to check if user has changed (for detecting login/logout)
export function hasUserChanged(previousUser, currentUser) {
  // Both null - no change
  if (!previousUser && !currentUser) return false;

  // One null, other not - user changed
  if (!previousUser || !currentUser) return true;

  // Different user IDs - user changed
  return previousUser.id !== currentUser.id;
}
