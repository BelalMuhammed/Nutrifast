import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingCart, FiMenu, FiX, FiHeart, FiUser } from "react-icons/fi";
import { FaSignOutAlt, FaList, FaUserShield, FaUser } from "react-icons/fa";
import { logout } from "../../Redux/slices/authSlice";
import { clearUserData as clearCartData } from "../../Redux/slices/cartSlice";
import { clearUserData as clearWishlistData } from "../../Redux/slices/wishListSlice";
import logoImg from "/logo-light.png";
import { getCurrentUser } from "../../lib/storage";
// Import components
import DesktopMenu from "./DesktopMenu";
import CartWishlistIcons from "./CartWishlistIcons";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";

// Helper NavLink component
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`text-sm hover:opacity-80 transition pb-1 relative text-white`}>
      {children}
      {isActive && (
        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-app-primary'></span>
      )}
    </Link>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = getCurrentUser();
  const userName = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    // Clear cart and wishlist data from Redux state first
    dispatch(clearCartData());
    dispatch(clearWishlistData());

    // Clear user authentication (this also clears localStorage)
    dispatch(logout());

    // Additional cleanup to ensure data is cleared
    setTimeout(() => {
      // Force clear localStorage items if they still exist
      try {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("wishlist");
        localStorage.removeItem("currentUser");
      } catch {
        // ignore errors
      }
    }, 100);

    navigate("/login");
  };

  const isHome = location.pathname === "/";

  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    if (path.includes("#")) {
      const [pathname, hash] = path.split("#");
      return location.pathname === pathname && location.hash === `#${hash}`;
    }
    return location.pathname === path && !location.hash;
  };

  // Function to handle Home link click
  const handleHomeClick = () => {
    if (location.pathname === "/") {
      // If we're already on the home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If we're on another page, navigate to home
      navigate("/");
    }
    // Close mobile menu if open
    setIsOpen(false);
  };

  // Menu items array
  const menuItems = [
    { to: "/", label: "Home", onClick: handleHomeClick },
    { to: "/shop", label: "Shop" },
    { to: "/#about", label: "About Us", isHashLink: true },
    { to: "/contact", label: "Contact" },
  ];

  // Determine the background class based on scroll state and home page
  const navbarBackgroundClass = isHome
    ? scrolled || isOpen
      ? "bg-black/90 backdrop-blur-md"
      : "bg-transparent"
    : "bg-black/90 backdrop-blur-md";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 text-white ${navbarBackgroundClass}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center flex-shrink-0"
              onClick={handleHomeClick}
            >
              <img className="h-10 w-auto" src={logoImg} alt="Brand Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <DesktopMenu menuItems={menuItems} />

          <div className="flex items-center space-x-4">
            {/* Desktop Cart and Wishlist */}
            <CartWishlistIcons
              cartCount={cartCount}
              wishlistCount={wishlistCount}
            />

            {/* Account */}
            {user ? (
              <UserDropdown
                user={user}
                userName={userName}
                onLogout={handleLogout}
                isActiveLink={isActiveLink}
              />
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center py-2 px-4 bg-app-primary rounded-md text-white text-sm hover:bg-app-primary/90 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none text-white"
            >
              {isOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={menuItems}
        user={user}
        userName={userName}
        onLogout={handleLogout}
        isActiveLink={isActiveLink}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </motion.nav>
  );
}

export default Navbar;