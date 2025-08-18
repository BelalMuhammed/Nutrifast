import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart, FiMenu, FiX, FiHeart, FiUser } from "react-icons/fi";
import {
  FaSignOutAlt,
  FaCog,
  FaList,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

import logoImg from "/logo.png";

import NavBarSearch from "../navbarSearch/NavBarSearch";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userName = useSelector((state) => state.auth.user);

  // Get cart and wishlist data from Redux
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  // Calculate counts - count unique products, not total quantity
  const cartCount = cartItems.length; // Count unique products in cart
  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className='w-full bg-white shadow-lg sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto flex flex-wrap items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3'>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center gap-2 min-w-[50px] flex-shrink-0'>
          <img
            className='w-32 sm:w-36 md:w-40 lg:w-43 h-12 sm:h-14 md:h-15 lg:h-16 object-contain'
            src={logoImg}
            alt='logo'
          />
        </Link>

        {/* Desktop Menu */}
        <div className='hidden lg:flex flex-1 items-center justify-between ml-4 xl:ml-8 min-w-0'>
          <div className='flex flex-wrap space-x-4 xl:space-x-6 min-w-0'>
            <Link
              to='/'
              className='text-sm lg:text-base font-semibold text-app-tertiary hover:text-app-primary transition whitespace-nowrap'>
              Home
            </Link>
            <Link
              to='/shop'
              className='text-sm lg:text-base font-semibold text-app-tertiary hover:text-app-primary transition whitespace-nowrap'>
              Shop
            </Link>
            <Link
              to='/about'
              className='text-sm lg:text-base font-semibold text-app-tertiary hover:text-app-primary transition whitespace-nowrap'>
              About Us
            </Link>
            <Link
              to='/contact'
              className='text-sm lg:text-base font-semibold text-app-tertiary hover:text-app-primary transition whitespace-nowrap'>
              Contact
            </Link>

            {!user && (
              <>
                <Link
                  to='/login'
                  className='text-sm lg:text-base font-semibold text-app-tertiary hover:text-app-primary transition whitespace-nowrap'>
                  Login
                </Link>
                <Link
                  to='/choose-role'
                  className='text-sm lg:text-base font-semibold text-app-tertiary hover:text-app-primary transition whitespace-nowrap'>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className='flex items-center space-x-2 lg:space-x-4 ml-4 xl:ml-8 min-w-0 flex-shrink-0'>
            <NavBarSearch />

            {/* Cart and Wishlist Icons */}
            {user && (
              <>
                <Link
                  to='/cart'
                  className='relative p-2 text-app-tertiary hover:text-app-primary transition-colors duration-300'>
                  <FiShoppingCart className='w-6 h-6' />
                  {cartCount > 0 && (
                    <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center'>
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to='/wishList'
                  className='relative p-2 text-app-tertiary hover:text-app-primary transition-colors duration-300'>
                  <FiHeart className='w-6 h-6' />
                  {wishlistCount > 0 && (
                    <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center'>
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>

          <div>
            {user && (
              <div className='relative'>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center gap-1 lg:gap-2 focus:outline-none'>
                  <FiUser className='w-5 h-5 lg:w-6 lg:h-6 text-app-tertiary' />
                  <span className='font-semibold text-sm lg:text-base text-app-tertiary hover:text-app-primary whitespace-nowrap'>
                    {userName?.username || "account"}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className='absolute -right-10 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50'>
                    <Link
                      to='/myOrders'
                      className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary'>
                      <FaList /> My Orders
                    </Link>
                    <Link
                      to='/myProfile'
                      className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary'>
                      <FaUser /> My Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to='/adminDashboard'
                        className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary'>
                        <FaUserShield /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className='w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-base font-semibold text-app-tertiary hover:text-app-primary'>
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
          className='lg:hidden text-2xl sm:text-3xl text-app-tertiary ml-2 p-1 sm:p-2 rounded focus:outline-none focus:ring-2 focus:ring-app-primary flex-shrink-0'
          style={{ minWidth: 0 }}
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='lg:hidden bg-white shadow-lg rounded-b-xl px-3 sm:px-4 py-3 sm:py-4 animate-slideDown overflow-x-hidden'>
          <div className='flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4'>
            <Link
              to='/'
              className='text-sm sm:text-base font-semibold text-app-tertiary hover:text-app-primary transition py-1'
              onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
              to='/shop'
              className='text-sm sm:text-base font-semibold text-app-tertiary hover:text-app-primary transition py-1'
              onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <Link
              to='/about'
              className='text-sm sm:text-base font-semibold text-app-tertiary hover:text-app-primary transition py-1'
              onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link
              to='/contact'
              className='text-sm sm:text-base font-semibold text-app-tertiary hover:text-app-primary transition py-1'
              onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            {!user && (
              <>
                <Link
                  to='/login'
                  className='text-sm sm:text-base font-semibold text-app-tertiary hover:text-app-primary transition py-1'
                  onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link
                  to='/choose-role'
                  className='text-sm sm:text-base font-semibold text-app-tertiary hover:text-app-primary transition py-1'
                  onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  to='/myOrders'
                  className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded text-sm sm:text-base'
                  onClick={() => setIsOpen(false)}>
                  <FaList className='w-4 h-4' /> My Orders
                </Link>
                <Link
                  to='/myProfile'
                  className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded text-sm sm:text-base'
                  onClick={() => setIsOpen(false)}>
                  <FaUser className='w-4 h-4' /> My Profile
                </Link>
                {user.role === "admin" && (
                  <Link
                    to='/adminDashboard'
                    className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded text-sm sm:text-base'
                    onClick={() => setIsOpen(false)}>
                    <FaUserShield className='w-4 h-4' /> Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className='w-full text-left flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded text-sm sm:text-base'>
                  <FaSignOutAlt className='w-4 h-4' /> Logout
                </button>
              </>
            )}
          </div>
          <div className='flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4 mt-3 border-t pt-3'>
            <div className='flex-1 max-w-xs'>
              <NavBarSearch />
            </div>
            <Link
              to='/cart'
              className='relative'
              onClick={() => setIsOpen(false)}>
              <FiShoppingCart className='w-7 h-7 sm:w-8 sm:h-8 p-1.5 sm:p-2 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition' />
              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center'>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              to='/wishList'
              className='relative'
              onClick={() => setIsOpen(false)}>
              <FiHeart className='w-7 h-7 sm:w-8 sm:h-8 p-1.5 sm:p-2 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition' />
              {wishlistCount > 0 && (
                <span className='absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center'>
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
