import { axiosInstance } from "../Network/interceptors";
import { getCurrentUser } from "../lib/storage";

/**
 * Wishlist API Service
 * Handles all wishlist-related API operations with the JSON server
 */

// Get user's wishlist from the server
export const getWishlist = async () => {
  try {
    const user = getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const response = await axiosInstance.get(`/wishlist`);
    const userWishlist = response.data.find(
      (wishlist) => wishlist.userId === user.id
    );

    if (!userWishlist) {
      // Create a new wishlist for the user if it doesn't exist
      return await createWishlist();
    }

    return userWishlist;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Create a new wishlist for the user
export const createWishlist = async () => {
  try {
    const user = getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const newWishlist = {
      userId: user.id,
      items: [],
      updatedAt: new Date().toISOString(),
    };

    const response = await axiosInstance.post("/wishlist", newWishlist);
    return response.data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};

// Update the entire wishlist
export const updateWishlist = async (wishlistData) => {
  try {
    if (!wishlistData?.id) {
      throw new Error("Wishlist ID is required for update");
    }

    const updatedWishlist = {
      ...wishlistData,
      updatedAt: new Date().toISOString(),
    };

    const response = await axiosInstance.put(
      `/wishlist/${wishlistData.id}`,
      updatedWishlist
    );
    return response.data;
  } catch (error) {
    console.error("Error updating wishlist:", error);
    throw error;
  }
};

// Add item to wishlist
export const addItemToWishlist = async (product) => {
  try {
    const wishlist = await getWishlist();
    const existingItem = wishlist.items.find((item) => item.id === product.id);

    if (!existingItem) {
      // Add new item to wishlist
      wishlist.items.push({
        ...product,
        addedAt: new Date().toISOString(),
      });
      return await updateWishlist(wishlist);
    }

    return wishlist; // Item already exists, no change needed
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    throw error;
  }
};

// Remove item from wishlist
export const removeItemFromWishlist = async (productId) => {
  try {
    const wishlist = await getWishlist();
    wishlist.items = wishlist.items.filter((item) => item.id !== productId);
    return await updateWishlist(wishlist);
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    throw error;
  }
};

// Toggle item in wishlist (add if not exists, remove if exists)
export const toggleItemInWishlist = async (product) => {
  try {
    const wishlist = await getWishlist();
    const existingItemIndex = wishlist.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // Remove item if it exists
      wishlist.items.splice(existingItemIndex, 1);
    } else {
      // Add item if it doesn't exist
      wishlist.items.push({
        ...product,
        addedAt: new Date().toISOString(),
      });
    }

    return await updateWishlist(wishlist);
  } catch (error) {
    console.error("Error toggling item in wishlist:", error);
    throw error;
  }
};

// Clear entire wishlist
export const clearWishlist = async () => {
  try {
    const wishlist = await getWishlist();
    wishlist.items = [];
    return await updateWishlist(wishlist);
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    throw error;
  }
};

// Check if item exists in wishlist
export const isItemInWishlist = (wishlistItems, productId) => {
  return wishlistItems.some((item) => item.id === productId);
};

// Move item from wishlist to cart
export const moveToCartFromWishlist = async (product, cartService) => {
  try {
    // Add to cart
    await cartService.addItemToCart(product);
    // Remove from wishlist
    await removeItemFromWishlist(product.id);
    return true;
  } catch (error) {
    console.error("Error moving item to cart:", error);
    throw error;
  }
};
