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
import {
  FaSignOutAlt,
  FaCog,
  FaList,
  FaUserShield,
  FaUser,
} from "react-icons/fa";
import logoImg from "/logo-light.png";
import { getCurrentUser, removeCurrentUser } from "../../lib/storage";
import NavBarSearch from "../navbarSearch/NavBarSearch";

// Helper NavLink component
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`text-sm hover:opacity-80 transition pb-1 relative text-white`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-app-primary"></span>
      )}
    </Link>
  );
}

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
    return location.pathname === path;
  };

  // Menu items array
  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  // Determine the background class based on scroll state and home page
  const navbarBackgroundClass = isHome
    ? scrolled || isOpen
      ? "bg-black/80 backdrop-blur-md"
      : "bg-transparent"
    : "bg-black/80 backdrop-blur-md";

  return (
    <nav

      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 text-white ${navbarBackgroundClass}`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to='/' className='flex items-center flex-shrink-0'>
            <img className='h-10 w-auto' src={logoImg} alt='Brand Logo' />
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}


            <div className='flex items-center space-x-6 ml-4'>
              {/* Cart and Wishlist */}

              <Link to="/cart" className="relative text-white">
                <FiShoppingCart className="w-5 h-5" />

                {cartCount > 0 && (
                  <span className='absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>


              <Link to="/wishList" className="relative text-white">
                <FiHeart className="w-5 h-5" />

                {wishlistCount > 0 && (
                  <span className='absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              {user ? (
                <div className='relative'>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}

                    className="flex items-center space-x-1 text-white"
                  >
                    <FiUser className="w-5 h-5" />
                    <span className="text-sm font-medium">

                      {userName?.username || "Account"}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-800 z-50'>
                      <div className='py-1'>
                        <Link

                          to="/myOrders"
                          className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                            isActiveLink("/myOrders") ? "text-app-primary" : ""
                          }`}
                        >
                          <FaList className="mr-3" /> My Orders
                        </Link>
                        <Link
                          to="/myProfile"
                          className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                            isActiveLink("/myProfile") ? "text-app-primary" : ""
                          }`}
                        >
                          <FaUser className="mr-3" /> My Profile
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            to="/adminDashboard"
                            className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                              isActiveLink("/adminDashboard")
                                ? "text-app-primary"
                                : ""
                            }`}
                          >
                            <FaUserShield className="mr-3" /> Admin Dashboard

                          </Link>
                        )}
                        <button
                          onClick={handleLogout}

                          className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
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
                  className={`text-sm font-medium hover:opacity-80 transition pb-1 relative text-white ${
                    isActiveLink("/login") ? "" : ""
                  }`}
                >

                  Login
                  {isActiveLink("/login") && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-app-primary"></span>
                  )}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-white">
              <FiShoppingCart className="w-5 h-5" />

              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}

              className="p-2 rounded-md hover:bg-white/10 focus:outline-none text-white"
            >

              {isOpen ? (
                <FiX className='w-5 h-5' />
              ) : (
                <FiMenu className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (

        <div className={`md:hidden ${navbarBackgroundClass} text-white`}>
          <div className="px-4 py-3 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block py-2 hover:bg-white/10 rounded px-2 text-white ${
                  isActiveLink(item.to) ? "text-app-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}


            <div className='pt-4 border-t border-white/20'>
              {user ? (
                <>
                  <Link

                    to="/myOrders"
                    className={`flex items-center py-2 hover:bg-white/10 rounded px-2 text-white ${
                      isActiveLink("/myOrders") ? "text-app-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaList className="mr-3" /> My Orders
                  </Link>
                  <Link
                    to="/myProfile"
                    className={`flex items-center py-2 hover:bg-white/10 rounded px-2 text-white ${
                      isActiveLink("/myProfile") ? "text-app-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="mr-3" /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center py-2 hover:bg-white/10 rounded px-2 text-white"
                  >
                    <FaSignOutAlt className="mr-3" /> Logout

                  </button>
                </>
              ) : (
                <Link

                  to="/login"
                  className={`block py-2 hover:bg-white/10 rounded px-2 text-white ${
                    isActiveLink("/login") ? "text-app-primary" : ""
                  }`}
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
