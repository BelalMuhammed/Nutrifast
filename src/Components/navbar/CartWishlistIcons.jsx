import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

function CartWishlistIcons({ cartCount, wishlistCount }) {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Link
        to="/cart"
        className="relative text-white p-2 rounded-lg hover:bg-white/10 transition"
      >
        <FiShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        )}
      </Link>

      <Link
        to="/wishList"
        className="relative text-white p-2 rounded-lg hover:bg-white/10 transition"
      >
        <FiHeart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {wishlistCount > 9 ? "9+" : wishlistCount}
          </span>
        )}
      </Link>
    </div>
  );
}

export default CartWishlistIcons;
