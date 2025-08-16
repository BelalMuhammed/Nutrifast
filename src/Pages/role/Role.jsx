import React from "react";
import { FiUser, FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Role() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="mx-auto">
        <h1 className="text-5xl w-fit mx-auto mb-10">
          Welcome to <span className="text-[#54D12B]">NutriFast</span>
        </h1>
        <p className="mb-12 max-w-[750px]">
          Choose your role to get started with our platform. Whether you're
          looking to browse and purchase or sell your products, we've got you
          covered.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 max-w-3xl w-full">
        {/* User Card */}
        <div className="flex flex-col items-center text-center bg-green-50 rounded-2xl p-8 shadow-sm flex-1">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <FiUser className="text-4xl text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">I’m a User</h2>
          <p className="text-gray-600 mb-4">
            Browse products, make purchases, and enjoy a seamless shopping
            experience
          </p>
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500">●</span> Secure shopping
              experience
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500">●</span> Wide variety of products
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500">●</span> Easy order tracking
            </li>
          </ul>
          <button
            onClick={() => navigate("/register")}
            className="bg-black text-white py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Continue as a User →
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Already have a user account?{" "}
            <span className="underline cursor-pointer">Sign in</span>
          </p>
        </div>

        {/* Vendor Card */}
        <div className="flex flex-col items-center text-center bg-green-50 rounded-2xl p-8 shadow-sm flex-1">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <FiBox className="text-4xl text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">I’m a Vendor</h2>
          <p className="text-gray-600 mb-4">
            Sell your products, manage inventory, and grow your business with
            our tools
          </p>
          <ul className="text-left mb-6 space-y-2">
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500">●</span> Easy product management
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500">●</span> Analytics and insights
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500">●</span> Secure payment
              processing
            </li>
          </ul>
          <button
            onClick={() => navigate("/vendorRegisteration")}
            className="bg-black text-white py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Continue as a Vendor →
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Already have a vendor account?{" "}
            <span className="underline cursor-pointer">Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}
