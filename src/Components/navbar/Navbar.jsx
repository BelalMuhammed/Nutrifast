import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import logoImg from "/logo-light.png";
import { getCurrentUser, removeCurrentUser } from "../../lib/storage";

// Import components
import DesktopMenu from "./DesktopMenu";
import CartWishlistIcons from "./CartWishlistIcons";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    removeCurrentUser();
    navigate("/");
    window.location.reload();
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
