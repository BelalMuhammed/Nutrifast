"use client";

import { useState } from "react";
import { FiMenu, FiSearch, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { HiBell, HiMoon } from "react-icons/hi";

export default function DashboardTopbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
      <div className="max-w-screen-xl ms-auto mx-auto flex items-center  px-4 py-3 md:ml-64">
        {/* Left: Hamburger Menu */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
        >
          <FiMenu size={24} />
        </button>

        {/* Center: Search */}
        {/* <div className="flex-1 px-4 min-w-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or type command..."
              className=" pl-10 pr-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div> */}

        {/* Right: Icons + Profile */}
        <div className="flex items-center gap-3 md:gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-transform hover:scale-110">
            <HiMoon size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 relative transition-transform hover:scale-110">
            <HiBell size={20} />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
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
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">admin@nutrifast.com</p>
                </div>

                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiUser className="text-gray-500" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiSettings className="text-gray-500" />
                  Settings
                </button>
                <div className="border-t my-1"></div>
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-red-500">
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
