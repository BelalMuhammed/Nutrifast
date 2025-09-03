"use client";

import { logout } from "@/Redux/slices/authSlice";
import { useState } from "react";
import { FiMenu, FiSearch, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { HiBell, HiMoon } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData as clearCartData } from "../../Redux/slices/cartSlice";
import { clearUserData as clearWishlistData } from "../../Redux/slices/wishListSlice";
export default function DashboardTopbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    navigate("/");
  };

  const handleOpenNewTab = () => {
    window.open("/", "_blank");
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-50 z-40">
      <div className="flex justify-between items-center px-4 py-3 app-container mx-auto">
        {/* Left: Logo */}
        <img
          src="/logo-dark.png" // ✅ use / for public folder
          alt="Nutrifast Logo"
          className="h-10 w-auto object-contain"
        />

        {/* Right: Menu + Icons + Profile */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Hamburger Menu (mobile only) */}

          {/* Home button */}
          <button
            onClick={handleOpenNewTab}
            className="p-2 rounded-full hover:bg-gray-100 transition-transform hover:scale-110"
          >
            <IoMdHome size={20} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 rounded-full focus:outline-none hover:bg-gray-100 p-1 transition-all"
            >
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline font-medium">Admin</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-slide-fade">
                <div className="px-4 py-3">
                  <p className="font-semibold text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">admin@nutrifast.com</p>
                </div>
                <div className="my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-red-500"
                >
                  <FiLogOut />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
