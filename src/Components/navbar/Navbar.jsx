import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart, FiMenu, FiX, FiHeart, FiUser } from "react-icons/fi";
import { FaSignOutAlt, FaCog, FaList, FaUserShield } from "react-icons/fa";
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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
    window.location.reload();
  };

  // Home page path
  const isHome = location.pathname === "/";

  return (
    <nav
      className={`${
        isHome ? "fixed" : "sticky"
      } top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isHome
          ? scrolled || isOpen
            ? "bg-black/70 text-white shadow-lg backdrop-blur-md"
            : "bg-transparent text-white"
          : "bg-white text-black shadow-lg"
      }`}
    >
      <div className="app-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img className="h-10 w-auto" src={logoImg} alt="Nutrifast" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-app-primary/20 transition"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-app-primary/20 transition"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-app-primary/20 transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-app-primary/20 transition"
            >
              Contact
            </Link>

            <div className="flex items-center space-x-4 ml-4">
              <NavBarSearch variant="light" />

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-1.5 bg-app-primary rounded-md text-sm font-medium bg-app-primary/10 hover:bg-app-primary/20 transition"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <FiUser className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">
                      {userName?.username || "Account"}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg text-gray-800 z-50">
                      <div className="py-1">
                        <Link
                          to="/cart"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FiShoppingCart className="mr-3" />
                          Cart
                        </Link>
                        <Link
                          to="/wishList"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FiHeart className="mr-3" />
                          Wishlist
                        </Link>
                        <Link
                          to="/myOrders"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FaList className="mr-3" />
                          My Orders
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FaCog className="mr-3" />
                          Settings
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            to="/adminDashboard"
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <FaUserShield className="mr-3" />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FaSignOutAlt className="mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-white">
              <FiShoppingCart className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-app-primary/20 focus:outline-none"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`md:hidden ${
            isHome
              ? "bg-black/70 text-white backdrop-blur-md"
              : "bg-white text-black"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-app-primary/20"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-app-primary/20"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-app-primary/20"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-app-primary/20"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-app-primary/20"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/choose-role"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-app-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <FiShoppingCart className="mr-3" />
                  Cart
                </Link>
                <Link
                  to="/wishList"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <FiHeart className="mr-3" />
                  Wishlist
                </Link>
                <Link
                  to="/myOrders"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <FaList className="mr-3" />
                  My Orders
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <FaCog className="mr-3" />
                  Settings
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/adminDashboard"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUserShield className="mr-3" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-white/20"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </>
            )}
          </div>
          <div className="px-4 py-3 border-t border-white/20">
            <NavBarSearch variant="light" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
