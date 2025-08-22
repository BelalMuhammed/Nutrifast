import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiChevronDown } from "react-icons/fi";
import { FaSignOutAlt, FaList, FaUserShield, FaUser } from "react-icons/fa";
import { removeCurrentUser } from "../../lib/storage";

function UserDropdown({ user, userName, onLogout, isActiveLink }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;

    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    setDropdownOpen(false);
    removeCurrentUser();
    onLogout();
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-3 text-white p-2 rounded-lg hover:bg-white/10 transition"
      >
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-app-primary flex items-center justify-center">
            <FiUser className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">
              {userName?.username || "User"}
            </p>
          </div>
        </div>
        <div className="md:hidden">
          <FiUser className="w-5 h-5" />
        </div>
        <FiChevronDown
          className={`w-4 h-4 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg text-gray-800 z-50 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold">
              {userName?.username || "User"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.email || "user@example.com"}
            </p>
          </div>
          <div className="py-1">
            <Link
              to="/myOrders"
              className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                isActiveLink("/myOrders") ? "text-app-primary" : ""
              }`}
              onClick={() => setDropdownOpen(false)}
            >
              <FaList className="mr-3 opacity-70" /> My Orders
            </Link>
            <Link
              to="/myProfile"
              className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                isActiveLink("/myProfile") ? "text-app-primary" : ""
              }`}
              onClick={() => setDropdownOpen(false)}
            >
              <FaUser className="mr-3 opacity-70" /> My Profile
            </Link>
            {user.role === "admin" && (
              <Link
                to="/adminDashboard"
                className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                  isActiveLink("/adminDashboard") ? "text-app-primary" : ""
                }`}
                onClick={() => setDropdownOpen(false)}
              >
                <FaUserShield className="mr-3 opacity-70" /> Admin Dashboard
              </Link>
            )}
            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
            >
              <FaSignOutAlt className="mr-3 opacity-70" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
