import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiShoppingCart,
  FiSearch,
  FiMenu,
  FiX,
  FiHeart,
  FiUser,
} from "react-icons/fi";
import { FaSignOutAlt, FaCog, FaList, FaUserShield } from "react-icons/fa";
import logoImg from "../../assets/logo.png";
import NavBarSearch from "../navbarSearch/NavBarSearch";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userName = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-2 sm:px-4 md:px-8 py-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 min-w-[60px] flex-shrink-0"
        >
          <img className="w-32 h-16 object-contain" src={logoImg} alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-2 sm:ml-8 min-w-0">
          <div className="flex flex-wrap space-x-3 sm:space-x-6 min-w-0">
            <Link
              to="/"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              Contact
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
                >
                  Login
                </Link>
                <Link
                  to="/choose-role"
                  className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-8 min-w-0 flex-shrink-0">
            <NavBarSearch />
          </div>

          <div>
            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <FiUser className="w-6 h-6 text-app-tertiary" />
                  <span className="font-semibold text-base font-semibold text-app-tertiary hover:text-app-primary">
                    {userName?.username || "account"}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute -right-10 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                    <Link
                      to="/cart"
                      className="relative flex items-center gap-2 px-2 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary"
                    >
                      <FiShoppingCart className="w-8 h-7" />
                      Cart
                    </Link>
                    <Link
                      to="/wishList"
                      className="relative flex items-center gap-2 px-2 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary"
                    >
                      <FiHeart className="w-8 h-7" />
                      wishList
                    </Link>
                    <Link
                      to="/myOrders"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary"
                    >
                      <FaList /> My Orders
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary"
                    >
                      <FaCog /> Settings
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/adminDashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary"
                      >
                        <FaUserShield /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-3xl text-app-tertiary ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-app-primary flex-shrink-0"
          style={{ minWidth: 0 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg rounded-b-xl px-2 py-4 animate-slideDown overflow-x-hidden">
          <div className="flex flex-col gap-2 mb-4">
            <Link
              to="/"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
            >
              Contact
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
                >
                  Login
                </Link>
                <Link
                  to="/choose-role"
                  className="text-base font-semibold text-app-tertiary hover:text-app-primary transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  to="/myOrders"
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100"
                >
                  <FaList /> My Orders
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100"
                >
                  <FaCog /> Settings
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/adminDashboard"
                    className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100"
                  >
                    <FaUserShield /> Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-2 py-2 hover:bg-gray-100"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <NavBarSearch />
            <Link to="/cart" className="relative">
              <FiShoppingCart className="w-8 h-8 p-2 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition" />
            </Link>
            <Link to="/wishList" className="relative">
              <FiHeart className="w-8 h-8 p-2 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
