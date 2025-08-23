import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Professional logout component with confirmation
 * Clears all user data including cart and wishlist
 */
const LogoutButton = ({ className, children, showConfirmation = true }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const success = await logout();
      if (success) {
        // Redirect to home or login page after logout
        navigate("/");
        // Optional: Show success message
        console.log("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handleClick = () => {
    if (showConfirmation) {
      setShowModal(true);
    } else {
      handleLogout();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${className} ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        {isLoading ? "Logging out..." : children || "Logout"}
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
            <h3 className='text-lg font-semibold mb-4'>Confirm Logout</h3>
            <p className='text-gray-600 mb-6'>
              Are you sure you want to logout? This will clear your cart and
              wishlist data.
            </p>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'
                disabled={isLoading}>
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors disabled:opacity-50'>
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
