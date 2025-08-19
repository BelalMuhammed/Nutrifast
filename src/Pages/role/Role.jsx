import FloatingFoodIcons from "@/Components/shared/FloatingFoodIcons/FloatingFoodIcons";
import React from "react";
import { FiUser, FiBox } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Role() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background icons layer (does not affect layout) */}
      <FloatingFoodIcons count={26} opacity={0.09} />
      <div className="mx-auto">
        <h1 className="text-5xl font-medium mb-2 text-center text-app-tertiary">
          Welcome to NutriFast
        </h1>
        <p className="text-xl text-app-tertiary mb-6 text-center flex items-center justify-center gap-2">
          Whether you want to shop or sell, we’ve got you covered.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 max-w-3xl w-full">
        {/* User Card */}
        <div className="flex flex-col items-center text-center bg-app-softest backdrop-blur-xl rounded-xl p-8 shadow-lg flex-1">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <FiUser className="text-4xl text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-app-tertiary">
            I’m a User
          </h2>
          <p className="text-app-tertiary mb-4">
            Browse products, make purchases, and enjoy a seamless shopping
            experience
          </p>
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-app-tertiary">●</span> Secure shopping
              experience
            </li>
            <li className="flex items-center gap-2">
              <span className="text-app-tertiary">●</span> Wide variety of
              products
            </li>
            <li className="flex items-center gap-2">
              <span className="text-app-tertiary">●</span> Easy order tracking
            </li>
          </ul>
          <button
            onClick={() => navigate("/register")}
            className="btn-app text-white py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Continue as a User →
          </button>
          <p className="mt-4 text-sm">
            Already have a user account?{" "}
            <Link
              to="/login"
              className="underline cursor-pointer text-app-tertiary"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Vendor Card */}
        <div className="flex flex-col items-center text-center bg-app-softest backdrop-blur-xl rounded-xl p-8 shadow-lg flex-1">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <FiBox className="text-4xl text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-app-tertiary">
            I’m a Vendor
          </h2>
          <p className="text-app-tertiary mb-4">
            Sell your products, manage inventory, and grow your business with
            our tools
          </p>
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-app-tertiary">●</span> Easy product
              management
            </li>
            <li className="flex items-center gap-2">
              <span className="text-app-tertiary">●</span> Analytics and
              insights
            </li>
            <li className="flex items-center gap-2">
              <span className="text-app-tertiary">●</span> Secure payment
              processing
            </li>
          </ul>
          <button
            onClick={() => navigate("/vendorRegisteration")}
            className="btn-app text-white py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Continue as a Vendor →
          </button>
          <p className="mt-4 text-sm ">
            Already have a vendor account?{" "}
            <Link
              to="/login"
              className="underline cursor-pointer text-app-tertiary"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
