import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiMenu, FiX } from "react-icons/fi";
import logoImg from "../../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (

    <nav className='w-full bg-[#FFFFFF] shadow-md flex justify-between items-center px-[40px]'>
      <Link to='/'>
        <img className='!max-w-none w-30 me-3' src={logoImg} alt='logo' />
      </Link>

      <div className='w-full px-4 py-4 flex items-center justify-between relative'>
        <div className='hidden md:flex flex-1 me-auto  space-x-8'>

          <Link
            to="/shop"
            className="text-gray-700 hover:text-blue-600 transition duration-300 hover:scale-125 hover:translate-y-1"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition duration-300 hover:scale-125 hover:translate-y-1"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition duration-300 hover:scale-125 hover:translate-y-1"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition duration-300 hover:scale-125 hover:translate-y-1"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-blue-600 transition duration-300 hover:scale-125 hover:translate-y-1"
          >
            Sign Up
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <FiSearch className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600 transition duration-300 hover:scale-125 hover:translate-y-1" />
          <Link to="/cart">
            <FiShoppingCart className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600 transition duration-300 hover:scale-125 hover:translate-y-1" />
          </Link>
        </div>

        <button
          className="md:hidden text-2xl text-gray-700 absolute right-4 top-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FiX className="absolute right-[-120px] top-[-70px]" />
          ) : (
            <FiMenu />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link
            to="/shop"
            className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300 hover:scale-125"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <div className="flex space-x-6 mt-4">
            <FiSearch className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" />
            <Link to="/cart">
              <FiShoppingCart className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
