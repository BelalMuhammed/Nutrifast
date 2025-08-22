import React from "react";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

// Test component to verify cart and wishlist functionality
const CartWishlistTest = () => {
  const {
    cartItems,
    addItem: addToCart,
    removeItem: removeFromCart,
    getCartSummary,
    loading: cartLoading,
    error: cartError,
  } = useCart();

  const {
    items: wishlistItems,
    toggleItem: toggleWishlist,
    isItemInWishlist,
    loading: wishlistLoading,
    error: wishlistError,
  } = useWishlist();

  const testProduct = {
    id: "test-product-1",
    name: "Test Product",
    price: 29.99,
    image: "/api/placeholder/200/200",
    description: "A test product for cart and wishlist functionality",
  };

  const cartSummary = getCartSummary();

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Cart & Wishlist Test</h2>

      {/* Test Product */}
      <div className='border rounded-lg p-4 mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Test Product</h3>
        <p className='text-gray-600 mb-4'>{testProduct.description}</p>
        <div className='flex gap-4'>
          <button
            onClick={() => addToCart(testProduct)}
            disabled={cartLoading}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'>
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>
          <button
            onClick={() => toggleWishlist(testProduct)}
            disabled={wishlistLoading}
            className={`px-4 py-2 rounded ${
              isItemInWishlist(testProduct.id)
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}>
            {wishlistLoading
              ? "Loading..."
              : isItemInWishlist(testProduct.id)
              ? "❤️ Remove from Wishlist"
              : "🤍 Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {cartError && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          Cart Error: {cartError}
        </div>
      )}
      {wishlistError && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          Wishlist Error: {wishlistError}
        </div>
      )}

      <div className='grid md:grid-cols-2 gap-6'>
        {/* Cart Status */}
        <div className='border rounded-lg p-4'>
          <h3 className='text-lg font-semibold mb-3'>Cart Status</h3>
          <div className='space-y-2'>
            <p>
              <strong>Items:</strong> {cartSummary.totalItems}
            </p>
            <p>
              <strong>Total:</strong> ${cartSummary.totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Unique Products:</strong> {cartSummary.itemCount}
            </p>
          </div>

          {cartItems.length > 0 && (
            <div className='mt-4'>
              <h4 className='font-medium mb-2'>Items in Cart:</h4>
              <ul className='space-y-1'>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className='flex justify-between items-center text-sm'>
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className='text-red-500 hover:text-red-700 text-xs'>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Wishlist Status */}
        <div className='border rounded-lg p-4'>
          <h3 className='text-lg font-semibold mb-3'>Wishlist Status</h3>
          <div className='space-y-2'>
            <p>
              <strong>Items:</strong> {wishlistItems.length}
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className='mt-4'>
              <h4 className='font-medium mb-2'>Items in Wishlist:</h4>
              <ul className='space-y-1'>
                {wishlistItems.map((item) => (
                  <li
                    key={item.id}
                    className='flex justify-between items-center text-sm'>
                    <span>{item.name}</span>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className='text-red-500 hover:text-red-700 text-xs'>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
        <h4 className='font-medium mb-2'>Test Instructions:</h4>
        <ul className='text-sm space-y-1'>
          <li>• Add the test product to cart and wishlist</li>
          <li>• Check if data persists after page refresh</li>
          <li>• Test with network disconnected (offline mode)</li>
          <li>• Verify data syncs with JSON Server endpoints</li>
        </ul>
      </div>
    </div>
  );
};

export default CartWishlistTest;
