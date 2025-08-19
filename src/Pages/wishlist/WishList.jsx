import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import { FiHeart, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function WishList() {
  const { items } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4'>
        <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center'>
          {/* Icon Section */}
          <div className='mb-8'>
            <div className='bg-gradient-to-br from-red-50 to-pink-50 rounded-full p-8 w-24 h-24 mx-auto flex items-center justify-center mb-6'>
              <FiHeart className='text-red-500' size={40} />
            </div>
          </div>

          {/* Content Section */}
          <div className='space-y-4 mb-8'>
            <h2 className='text-2xl font-bold text-app-secondary'>
              Your Wishlist is Empty
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Save your favorite products here and never lose track of what you
              love!
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate("/shop")}
            className='w-full bg-app-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-1 flex items-center justify-center gap-3'>
            <FiShoppingBag size={20} />
            Discover Products
            <FiArrowRight size={18} />
          </button>

        
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='bg-gradient-to-br from-red-50 to-pink-50 rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center mb-6'>
            <BsSuitHeartFill className='text-red-500' size={32} />
          </div>
          <h1 className='text-3xl lg:text-4xl font-bold text-app-secondary mb-4'>
            Your Wishlist
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto mb-6'>
            Keep track of all your favorite products in one place
          </p>
          <div className='bg-red-50 rounded-full px-6 py-2 inline-flex items-center gap-2'>
            <BsSuitHeartFill className='text-red-500' size={16} />
            <span className='text-red-600 font-semibold'>{items.length}</span>
            <span className='text-gray-600'>saved items</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className='max-w-7xl mx-auto'>
          <div className='bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-red-50/50 to-pink-50/50 px-8 py-6 border-b border-gray-100'>
              <h2 className='text-xl font-bold text-app-tertiary flex items-center gap-3'>
                <FiHeart className='text-red-500' size={20} />
                Saved Products
              </h2>
            </div>
            <div className='p-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
                {items.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className='text-center'>
            <button
              onClick={() => navigate("/shop")}
              className='text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-3'
              style={{
                backgroundColor: "#388e3c",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#4caf50")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#388e3c")
              }>
              <FiShoppingBag size={20} />
              Continue Shopping
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
