# Cart and Wishlist Implementation Guide

## Overview

This implementation provides a professional cart and wishlist system that works both online (with API integration) and offline (with localStorage fallback). The system is compatible with your JSON Server endpoints and follows modern React patterns.

## Architecture

### API Services

- **cartService.js**: Handles all cart operations with the `/cart` endpoint
- **wishlistService.js**: Handles all wishlist operations with the `/wishlist` endpoint

### Redux Slices

- **cartSlice.js**: Manages cart state with async thunks for API operations
- **wishListSlice.js**: Manages wishlist state with async thunks for API operations

### Custom Hooks

- **useCart.js**: Provides cart operations with online/offline support
- **useWishlist.js**: Provides wishlist operations with online/offline support

### Components

- **CartWishlistInitializer.jsx**: Initializes data when the app loads
- **NotificationProvider.jsx**: Provides toast notifications

## Data Structure

### Cart Endpoint (`/cart`)

```json
{
  "id": "unique-id",
  "userId": "user-id",
  "items": [
    {
      "id": "product-id",
      "name": "Product Name",
      "price": 29.99,
      "image": "image-url",
      "description": "Product description",
      "quantity": 2,
      "addedAt": "2025-08-22T12:00:00.000Z"
    }
  ],
  "updatedAt": "2025-08-22T12:00:00.000Z"
}
```

### Wishlist Endpoint (`/wishlist`)

```json
{
  "id": "unique-id",
  "userId": "user-id",
  "items": [
    {
      "id": "product-id",
      "name": "Product Name",
      "price": 29.99,
      "image": "image-url",
      "description": "Product description",
      "addedAt": "2025-08-22T12:00:00.000Z"
    }
  ],
  "updatedAt": "2025-08-22T12:00:00.000Z"
}
```

## Usage Examples

### Using Cart Hook

```jsx
import { useCart } from "../hooks/useCart";

function ProductComponent({ product }) {
  const {
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    isItemInCart,
    getItemQuantity,
    loading,
    error,
  } = useCart();

  const handleAddToCart = async () => {
    try {
      await addItem(product);
      console.log("Added to cart successfully");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading || isItemInCart(product.id)}>
        {loading
          ? "Adding..."
          : isItemInCart(product.id)
          ? "In Cart"
          : "Add to Cart"}
      </button>
    </div>
  );
}
```

### Using Wishlist Hook

```jsx
import { useWishlist } from "../hooks/useWishlist";

function ProductComponent({ product }) {
  const { toggleItem, isItemInWishlist, removeItem, loading } = useWishlist();

  const handleToggleWishlist = async () => {
    try {
      await toggleItem(product);
      console.log("Wishlist updated successfully");
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  return (
    <div>
      <button onClick={handleToggleWishlist} disabled={loading}>
        {isItemInWishlist(product.id) ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
```

## Features

### Online/Offline Support

- **Online**: Data syncs with JSON Server endpoints
- **Offline**: Falls back to localStorage
- **Auto-sync**: Syncs data when connection is restored

### Error Handling

- Graceful fallback to localStorage if API fails
- Comprehensive error messages
- Toast notifications for user feedback

### Performance Optimizations

- Debounced API calls
- Local state updates for immediate UI feedback
- Minimal re-renders with optimized selectors

### User Authentication

- Automatically detects user authentication
- Creates user-specific cart/wishlist entries
- Handles guest users with localStorage

## API Operations

### Cart Operations

- `GET /cart` - Fetch all carts, filter by userId
- `POST /cart` - Create new cart for user
- `PUT /cart/:id` - Update entire cart
- `DELETE /cart/:id` - Delete cart (optional)

### Wishlist Operations

- `GET /wishlist` - Fetch all wishlists, filter by userId
- `POST /wishlist` - Create new wishlist for user
- `PUT /wishlist/:id` - Update entire wishlist
- `DELETE /wishlist/:id` - Delete wishlist (optional)

## Migration from Old System

### For Components Already Using Redux

Replace direct dispatch calls:

```jsx
// Old way
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const dispatch = useDispatch();
const handleAdd = () => dispatch(addToCart(product));

// New way
import { useCart } from "../hooks/useCart";

const { addItem } = useCart();
const handleAdd = () => addItem(product);
```

### Backward Compatibility

The old Redux actions are still available for gradual migration:

```jsx
// These still work
import { addToCart, removeFromCart } from "../slices/cartSlice";
```

## Testing

### Manual Testing Steps

1. **Online Mode**:

   - Add items to cart/wishlist
   - Verify data appears in JSON Server
   - Refresh page and verify data persists

2. **Offline Mode**:

   - Disconnect internet
   - Add items to cart/wishlist
   - Verify data saves to localStorage
   - Reconnect and verify sync

3. **Error Handling**:
   - Stop JSON Server
   - Try cart/wishlist operations
   - Verify graceful fallback behavior

## Troubleshooting

### Common Issues

1. **User Not Authenticated**:

   - Ensure `getCurrentUser()` returns valid user object with `id`
   - Check localStorage for user data

2. **API Connection Failed**:

   - Verify JSON Server is running
   - Check network connectivity
   - Verify API endpoint URLs

3. **Data Not Syncing**:
   - Check browser console for errors
   - Verify user ID matches between sessions
   - Clear localStorage and test fresh

### Debug Mode

Enable debug logging:

```jsx
// In development, you can add console logs to track operations
const { addItem } = useCart();

const handleAdd = async (product) => {
  console.log("Adding product:", product);
  try {
    await addItem(product);
    console.log("Product added successfully");
  } catch (error) {
    console.error("Add failed:", error);
  }
};
```

## Performance Considerations

### Optimization Tips

- Use React.memo() for product components
- Implement virtualization for large product lists
- Add loading states for better UX
- Debounce quantity changes
- Cache API responses when appropriate

### Monitoring

- Track API call frequency
- Monitor localStorage size
- Watch for memory leaks in long-running sessions

This implementation provides a robust, scalable solution for cart and wishlist functionality that will grow with your application.
