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

function Footer() {
  return (
    <footer className='bg-app-primary text-white mt-auto'>
      {/* Top feature highlights section */}
      <div className='bg-app-primary/90 py-6 sm:py-8 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {/* Free Shipping */}
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='bg-app-accent rounded-full p-2 sm:p-3 flex-shrink-0'>
                <FaShippingFast className='text-white text-lg sm:text-xl' />
              </div>
              <div className='min-w-0'>
                <h4 className='font-bold text-white text-sm sm:text-base'>
                  Free Shipping
                </h4>
                <p className='text-app-quaternary text-xs sm:text-sm'>
                  On select items
                </p>
              </div>
            </div>

            {/* Give Us A Call */}
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='bg-app-accent rounded-full p-2 sm:p-3 flex-shrink-0'>
                <FaPhoneAlt className='text-white text-lg sm:text-xl' />
              </div>
              <div className='min-w-0'>
                <h4 className='font-bold text-white text-sm sm:text-base'>
                  Give Us A Call
                </h4>
                <p className='text-amber-400 text-xs sm:text-sm font-medium break-words'>
                  +20 123 456 7890
                </p>
              </div>
            </div>

            {/* Email Us */}
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='bg-app-accent rounded-full p-2 sm:p-3 flex-shrink-0'>
                <FaEnvelope className='text-white text-lg sm:text-xl' />
              </div>
              <div className='min-w-0'>
                <h4 className='font-bold text-white text-sm sm:text-base'>
                  Email Us
                </h4>
                <p className='text-amber-400 text-xs sm:text-sm font-medium break-words'>
                  support@nutrifast.com
                </p>
              </div>
            </div>

            {/* Community */}
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='bg-app-accent rounded-full p-2 sm:p-3 flex-shrink-0'>
                <FaHeart className='text-white text-lg sm:text-xl' />
              </div>
              <div className='min-w-0'>
                <h4 className='font-bold text-white text-sm sm:text-base'>
                  Community
                </h4>
                <p className='text-app-quaternary text-xs sm:text-sm'>
                  Shop with purpose
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className='bg-app-primary py-8 sm:py-10 md:py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8'>
            {/* About Company */}
            <div className='lg:col-span-1'>
              {/* Logo */}
              <div className='flex items-center mb-4 sm:mb-6'>
                <img
                  src='/logo-white.png'
                  alt='NutriFast Logo'
                  className='h-10 sm:h-12 w-auto'
                />
              </div>
              <h3 className='text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white'>
                ABOUT NUTRIFAST
              </h3>
              <p className='text-app-quaternary text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed'>
                Delicious, organic food and drink with less packaging, less food
                waste and lower food miles. What more do you need?
              </p>
            </div>

            {/* Information */}
            <div>
              <h3 className='text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white'>
                INFORMATION
              </h3>
              <ul className='space-y-1 sm:space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Check Out
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className='text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white'>
                CATEGORIES
              </h3>
              <ul className='space-y-1 sm:space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Fruits & Vegetables
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Dairy Products
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Healthy Bakery
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Fresh Juices
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Healthy Snacks
                  </a>
                </li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h3 className='text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white'>
                MY ACCOUNT
              </h3>
              <ul className='space-y-1 sm:space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Shipping
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Order Status
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Shopping Cart
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-app-quaternary hover:text-white transition text-xs sm:text-sm block py-1'>
                    Our Shop
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className='text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white'>
                FOLLOW US
              </h3>

              {/* Social Media Icons */}
              <div className='flex flex-wrap gap-2 sm:gap-3'>
                <a
                  href='#'
                  className='bg-white/10 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0'>
                  <FaFacebookF className='text-white text-base sm:text-lg' />
                </a>
                <a
                  href='#'
                  className='bg-white/10 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0'>
                  <FaTwitter className='text-white text-base sm:text-lg' />
                </a>
                <a
                  href='#'
                  className='bg-white/10 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0'>
                  <FaInstagram className='text-white text-base sm:text-lg' />
                </a>
               
                <a
                  href='#'
                  className='bg-white/10 hover:bg-app-accent p-2 rounded-xl transition flex-shrink-0'>
                  <FaYoutube className='text-white text-base sm:text-lg' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className='bg-app-primary/80 border-t border-white/10 py-4 sm:py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10'>
          <div className='flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4'>
            {/* Copyright */}
            <div className='text-app-quaternary text-xs sm:text-sm text-center lg:text-left'>
              Copyright © 2025 NutriFast. All Rights Reserved.
            </div>

            {/* Payment methods */}
            <div className='flex items-center gap-2 sm:gap-3 order-first lg:order-none'>
              <div className='bg-white rounded px-1.5 py-1 sm:px-2'>
                <FaCcMastercard className='text-red-500 text-xl sm:text-2xl' />
              </div>
              <div className='bg-white rounded px-1.5 py-1 sm:px-2'>
                <FaCcPaypal className='text-blue-600 text-xl sm:text-2xl' />
              </div>
              <div className='bg-white rounded px-1.5 py-1 sm:px-2'>
                <FaCcVisa className='text-blue-700 text-xl sm:text-2xl' />
              </div>
            </div>

            {/* Links */}
            <div className='flex gap-4 sm:gap-6 text-xs sm:text-sm'>
              <a
                href='#'
                className='text-app-quaternary hover:text-white transition whitespace-nowrap'>
                Privacy & Cookie Policy
              </a>
              <span className='text-app-quaternary'>|</span>
              <a
                href='#'
                className='text-app-quaternary hover:text-white transition whitespace-nowrap'>
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
