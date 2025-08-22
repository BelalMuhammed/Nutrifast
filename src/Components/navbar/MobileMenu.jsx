import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";

function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  user,
  isActiveLink,
  cartCount,
  wishlistCount,
}) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-app-dark text-white">
      <div className="px-4 py-3 space-y-3">
        {menuItems.map((item) =>
          item.isHashLink ? (
            <HashLink
              key={item.to}
              smooth
              to={item.to}
              className={`block py-2 hover:bg-white/10 rounded px-2 text-white ${
                isActiveLink(item.to) ? "text-app-primary" : ""
              }`}
              onClick={() => {
                if (item.onClick) item.onClick();
                else onClose();
              }}
            >
              {item.label}
            </HashLink>
          ) : (
            <Link
              key={item.to}
              to={item.to}
              className={`block py-2 hover:bg-white/10 rounded px-2 text-white ${
                isActiveLink(item.to) ? "text-app-primary" : ""
              }`}
              onClick={() => {
                if (item.onClick) item.onClick();
                else onClose();
              }}
            >
              {item.label}
            </Link>
          )
        )}

        {/* Mobile Cart and Wishlist */}
        <div className="py-2 border-t border-white/20 flex justify-around">
          <Link
            to="/cart"
            className="flex flex-col items-center py-2 hover:bg-white/10 rounded px-4 text-white transition"
            onClick={onClose}
          >
            <div className="relative">
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link>

          <Link
            to="/wishList"
            className="flex flex-col items-center py-2 hover:bg-white/10 rounded px-4 text-white transition"
            onClick={onClose}
          >
            <div className="relative">
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Wishlist</span>
          </Link>
        </div>

        {/* Login Button */}
        {!user && (
          <div className="pt-2 border-t border-white/20">
            <Link
              to="/login"
              className="flex items-center justify-center py-2 px-4 bg-app-primary rounded-md text-white font-medium hover:bg-app-primary/90 transition"
              onClick={onClose}
            >
              <FiUser className="mr-2" />
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
