import { axiosInstance } from "../Network/interceptors";
import { getCurrentUser } from "../lib/storage";

/**
 * Cart API Service
 * Handles all cart-related API operations with the JSON server
 */

// Get user's cart from the server
export const getCart = async () => {
  try {
    const user = getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const response = await axiosInstance.get(`/cart`);
    const userCart = response.data.find((cart) => cart.userId === user.id);

    if (!userCart) {
      // Create a new cart for the user if it doesn't exist
      return await createCart();
    }

    return userCart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Create a new cart for the user
export const createCart = async () => {
  try {
    const user = getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const newCart = {
      userId: user.id,
      items: [],
      updatedAt: new Date().toISOString(),
    };

    const response = await axiosInstance.post("/cart", newCart);
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

// Update the entire cart
export const updateCart = async (cartData) => {
  try {
    if (!cartData?.id) {
      throw new Error("Cart ID is required for update");
    }

    const updatedCart = {
      ...cartData,
      updatedAt: new Date().toISOString(),
    };

    const response = await axiosInstance.put(
      `/cart/${cartData.id}`,
      updatedCart
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

// Add item to cart
export const addItemToCart = async (product) => {
  try {
    const cart = await getCart();
    const existingItemIndex = cart.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      cart.items.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }

    return await updateCart(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Remove item from cart
export const removeItemFromCart = async (productId) => {
  try {
    const cart = await getCart();
    cart.items = cart.items.filter((item) => item.id !== productId);
    return await updateCart(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Update item quantity in cart
export const updateItemQuantity = async (productId, quantity) => {
  try {
    if (quantity <= 0) {
      return await removeItemFromCart(productId);
    }

    const cart = await getCart();
    const itemIndex = cart.items.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].updatedAt = new Date().toISOString();
    }

    return await updateCart(cart);
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const cart = await getCart();
    cart.items = [];
    return await updateCart(cart);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Get cart summary (total items, total price, etc.)
export const getCartSummary = (cartItems) => {
  return {
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    itemCount: cartItems.length,
  };
};
