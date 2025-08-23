import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaShippingFast,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaYoutube,
  FaPinterest,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white text-gray-900 mt-auto">
      {/* Top feature highlights section */}
      <div className="bg-app-primary py-6 sm:py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Free Shipping */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className=" rounded-full p-2 sm:p-3 flex-shrink-0">
                <FaShippingFast className="text-white text-lg sm:text-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Free Shipping
                </h4>
                <p className="text-gray-100 text-xs sm:text-sm">
                  On select items
                </p>
              </div>
            </div>

            {/* Give Us A Call */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className=" rounded-full p-2 sm:p-3 flex-shrink-0">
                <FaPhoneAlt className="text-white text-lg sm:text-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Give Us A Call
                </h4>
                <p className="text-gray-100 text-xs sm:text-sm font-medium break-words">
                  +20 123 456 7890
                </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className=" rounded-full p-2 sm:p-3 flex-shrink-0">
                <FaEnvelope className="text-white text-lg sm:text-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Email Us
                </h4>
                <p className="text-gray-100 text-xs sm:text-sm font-medium break-words">
                  support@nutrifast.com
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className=" rounded-full p-2 sm:p-3 flex-shrink-0">
                <FaHeart className="text-white text-lg sm:text-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Community
                </h4>
                <p className="text-gray-100 text-xs sm:text-sm">
                  Shop with purpose
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            {/* About Company */}
            <div className="lg:col-span-1 lg:pr-8">
              {/* Logo */}
              <div className="flex items-center mb-4 sm:mb-6">
                <img
                  src="../../../public/Group 12 (1).png"
                  alt="NutriFast Logo"
                  className="h-10 sm:h-12 w-auto"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">
                ABOUT NUTRIFAST
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                Delicious, organic food and drink with less packaging, less food
                waste and lower food miles. What more do you need?
              </p>
            </div>

            {/* Information */}
            <div className="lg:pl-4">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">
                INFORMATION
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                {/* <li>
                  <Link
                    to="#"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    About us
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="#"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Blog
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/checkout"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Check Out
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Contact
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="#"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Service
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">
                CATEGORIES
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <Link
                    to={`/shop?category=${encodeURIComponent(
                      "Fresh Diet Meals"
                    )}`}
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Fresh Diet Meals
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop?category=${encodeURIComponent(
                      "Dairy Products"
                    )}`}
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Dairy Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop?category=${encodeURIComponent(
                      "Healthy Bakery"
                    )}`}
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Healthy Bakery
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop?category=${encodeURIComponent("Fresh Juices")}`}
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Fresh Juices
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop?category=${encodeURIComponent(
                      "Healthy Snacks"
                    )}`}
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Healthy Snacks
                  </Link>
                </li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">
                MY ACCOUNT
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <Link
                    to="/myProfile"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    My Account
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="#"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Shipping
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/myOrders"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Order Status
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="text-gray-600 hover:text-app-accent transition text-xs sm:text-sm block py-1"
                  >
                    Our Shop
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">
                FOLLOW US
              </h3>

              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Link
                  to="#"
                  className="bg-gray-100 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0 group"
                >
                  <FaFacebookF className="text-gray-600 group-hover:text-green text-base sm:text-lg" />
                </Link>
                <Link
                  to="#"
                  className="bg-gray-100 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0 group"
                >
                  <FaTwitter className="text-gray-600 group-hover:text-green text-base sm:text-lg" />
                </Link>
                <Link
                  to="#"
                  className="bg-gray-100 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0 group"
                >
                  <FaInstagram className="text-gray-600 group-hover:text-green text-base sm:text-lg" />
                </Link>

                <Link
                  to="#"
                  className="bg-gray-100 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0 group"
                >
                  <FaYoutube className="text-gray-600 group-hover:text-green text-base sm:text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-gray-50 border-t border-gray-200 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Copyright */}
            <div className="text-gray-600 text-xs sm:text-sm text-center lg:text-left">
              Copyright © 2025 NutriFast. All Rights Reserved.
            </div>

            {/* Payment methods
            <div className='flex items-center gap-2 sm:gap-3 order-first lg:order-none'>
              <div className='bg-white rounded px-1.5 py-1 sm:px-2 shadow-sm border'>
                <FaCcMastercard className='text-red-500 text-xl sm:text-2xl' />
              </div>
              <div className='bg-white rounded px-1.5 py-1 sm:px-2 shadow-sm border'>
                <FaCcPaypal className='text-blue-600 text-xl sm:text-2xl' />
              </div>
              <div className='bg-white rounded px-1.5 py-1 sm:px-2 shadow-sm border'>
                <FaCcVisa className='text-blue-700 text-xl sm:text-2xl' />
              </div>
            </div> */}

            {/* Links */}
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                to="#"
                className="text-gray-600 hover:text-app-accent transition whitespace-nowrap"
              >
                Privacy & Cookie Policy
              </a>
              <span className="text-gray-400">|</span>
              <a
                to="#"
                className="text-gray-600 hover:text-app-accent transition whitespace-nowrap"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
