import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiHeart,
  FiUser,
  FiSearch,
} from "react-icons/fi";
import { FaSignOutAlt, FaCog, FaList, FaUserShield, FaUser } from "react-icons/fa";
import logoImg from "/logo-light.png";
import NavBarSearch from "../navbarSearch/NavBarSearch";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
    window.location.reload();
  };

  const isHome = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isHome
          ? scrolled || isOpen
            ? "bg-black/70 text-white shadow-lg backdrop-blur-md"
            : "bg-transparent text-white"
          : "bg-white text-black shadow-md"
      }`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img className="h-10 w-auto" src={logoImg} alt="Brand Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:opacity-80 transition"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-sm font-medium hover:opacity-80 transition"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:opacity-80 transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:opacity-80 transition"
            >
              Contact
            </Link>

            <div className="flex items-center space-x-6 ml-4">
              {/* Search Bar */}
              <NavBarSearch />

              {/* Cart and Wishlist */}
              <Link to="/cart" className="relative">
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              <Link to="/wishList" className="relative">
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1"
                  >
                    <FiUser className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {userName?.username || "Account"}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-800 z-50">
                      <div className="py-1">
                        <Link
                          to="/myOrders"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FaList className="mr-3" /> My Orders
                        </Link>
                        <Link
                          to="/myProfile"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FaUser className="mr-3" /> My Profile
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            to="/adminDashboard"
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <FaUserShield className="mr-3" /> Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FaSignOutAlt className="mr-3" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium hover:opacity-80 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none"
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

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`md:hidden ${
            isHome ? "bg-black/90" : "bg-white"
          } text-white`}
        >
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block py-2 hover:bg-white/10 rounded px-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 hover:bg-white/10 rounded px-2"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block py-2 hover:bg-white/10 rounded px-2"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block py-2 hover:bg-white/10 rounded px-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-white/20">
              {user ? (
                <>
                  <Link
                    to="/myOrders"
                    className="flex items-center py-2 hover:bg-white/10 rounded px-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaList className="mr-3" /> My Orders
                  </Link>
                  <Link
                    to="/myProfile"
                    className="flex items-center py-2 hover:bg-white/10 rounded px-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="mr-3" /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center py-2 hover:bg-white/10 rounded px-2"
                  >
                    <FaSignOutAlt className="mr-3" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 hover:bg-white/10 rounded px-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
