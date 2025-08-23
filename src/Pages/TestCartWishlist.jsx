import React from "react";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const TestCartWishlist = () => {
  const { cartItems, addItem: addToCart, getCartSummary } = useCart();
  const {
    items: wishlistItems,
    toggleItem: toggleWishlist,
    isItemInWishlist,
  } = useWishlist();

  const testProduct = {
    id: "test-1",
    name: "Test Product",
    price: 25.99,
    image: "https://via.placeholder.com/150",
    description: "This is a test product for cart and wishlist functionality",
  };

  const cartSummary = getCartSummary();

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        🧪 Cart & Wishlist Test
      </h2>

      {/* Test Product */}
      <div className='border rounded-lg p-4 mb-6'>
        <h3 className='font-semibold text-lg'>{testProduct.name}</h3>
        <p className='text-gray-600 mb-2'>{testProduct.description}</p>
        <p className='text-green-600 font-bold mb-4'>${testProduct.price}</p>

        <div className='flex gap-3'>
          <button
            onClick={() => addToCart(testProduct)}
            className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'>
            Add to Cart
          </button>

          <button
            onClick={() => toggleWishlist(testProduct)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isItemInWishlist(testProduct.id)
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}>
            {isItemInWishlist(testProduct.id)
              ? "❤️ In Wishlist"
              : "🤍 Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* Status Display */}
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='border rounded-lg p-4'>
          <h4 className='font-semibold mb-2'>Cart Status</h4>
          <p>Items: {cartSummary.totalItems}</p>
          <p>Total: ${cartSummary.totalPrice.toFixed(2)}</p>
          <div className='mt-2'>
            {cartItems.map((item) => (
              <div key={item.id} className='text-sm text-gray-600'>
                {item.name} x{item.quantity}
              </div>
            ))}
          </div>
        </div>

        <div className='border rounded-lg p-4'>
          <h4 className='font-semibold mb-2'>Wishlist Status</h4>
          <p>Items: {wishlistItems.length}</p>
          <div className='mt-2'>
            {wishlistItems.map((item) => (
              <div key={item.id} className='text-sm text-gray-600'>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
        <h5 className='font-medium mb-2'>✅ Test Instructions:</h5>
        <ol className='text-sm space-y-1 list-decimal list-inside'>
          <li>Click "Add to Cart" and "Add to Wishlist" buttons</li>
          <li>Refresh the page - data should persist</li>
          <li>Open browser dev tools → Network tab → set to offline mode</li>
          <li>Try adding items again - should work offline</li>
          <li>Go back online - data should sync with your JSON server</li>
        </ol>

        <div className='mt-3 text-xs text-gray-600'>
          <p>
            🌐 Online: Data syncs with JSON Server at /cart and /wishlist
            endpoints
          </p>
          <p>💾 Offline: Data saves to localStorage</p>
        </div>
      </div>
    </div>
  );
};

export default TestCartWishlist;
