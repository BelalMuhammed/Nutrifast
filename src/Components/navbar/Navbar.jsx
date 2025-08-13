import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiHeart } from "react-icons/fi";
import logoImg from "../../assets/logo.png";
import NavBarSearch from "../navbarSearch/NavBarSearch";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='w-full bg-white shadow-lg  sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <img className='w-35 h-20 object-contain' src={logoImg} alt='logo' />
        </Link>
        {/* Desktop Menu */}
        <div className='hidden md:flex flex-1 items-center justify-between ml-8'>
          <div className='flex space-x-6'>
            <Link
              to='/'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Home
            </Link>
            <Link
              to='/shop'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Shop
            </Link>
            <Link
              to='/about'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              About Us
            </Link>
            <Link
              to='/contact'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Contact
            </Link>
            <Link
              to='/login'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Login
            </Link>
            <Link
              to='/choose-role'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Sign Up
            </Link>
          </div>
          <div className='flex items-center space-x-4 ml-8'>
            <div className='relative w-48'>
              <input
                type='text'
                placeholder='Search...'
                className='bg-app-quaternary/20 w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-app-primary text-app-tertiary'
              />
              <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-app-primary text-xl cursor-pointer' />
            </div>
                      <NavBarSearch/>
            <Link to='/cart' className='relative'>
              <FiShoppingCart className='w-8 h-8 p-1 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition' />
            </Link>
            <Link to='/wishList' className='relative'>
              <FiHeart className='w-8 h-8 p-1 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition' />
            </Link>
          </div>
        </div>
        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-3xl text-app-tertiary ml-2'
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white shadow-lg rounded-b-xl px-4 py-4 animate-slideDown'>
          <div className='flex flex-col gap-2 mb-4'>
            <Link
              to='/'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Home
            </Link>
            <Link
              to='/shop'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Shop
            </Link>
            <Link
              to='/about'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              About Us
            </Link>
            <Link
              to='/contact'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Contact
            </Link>
            <Link
              to='/login'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Login
            </Link>
            <Link
              to='/choose-role'
              className='text-base font-semibold text-app-tertiary hover:text-app-primary transition'>
              Sign Up
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='relative w-40'>
              <input
                type='text'
                placeholder='Search...'
                className='bg-app-quaternary/20 w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-app-primary text-app-tertiary'
              />
              <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-app-primary text-xl cursor-pointer' />
            </div>
            <Link to='/cart' className='relative'>
              <FiShoppingCart className='w-8 h-8 p-1 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition' />
            </Link>
            <Link to='/wishList' className='relative'>
              <FiHeart className='w-8 h-8 p-1 rounded-md bg-app-quaternary/20 text-app-tertiary hover:text-app-primary transition' />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
