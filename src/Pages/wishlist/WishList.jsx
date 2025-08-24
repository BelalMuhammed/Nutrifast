import React from "react";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import { FiHeart, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../hooks/useWishlist";

export default function WishList() {
  const { items } = useWishlist();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4'>
        <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center'>
          {/* Icon Section */}
          <div className='mb-8'>
            <div className='bg-app-primary rounded-full p-8 w-24 h-24 mx-auto flex items-center justify-center mb-6'>
              <FiHeart className='text-white' size={40} />
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
        <div className='text-center mb-6'>
          <div className='bg-app-primary/10 rounded-full p-3 w-14 h-14 mx-auto flex items-center justify-center mb-3'>
            <BsSuitHeartFill className='text-app-primary' size={24} />
          </div>
          <h2 className='text-3xl lg:text-4xl font-bold text-app-secondary mb-4'>
            Your Wishlist
          </h2>
          <p className='text-gray-600 max-w-xl mx-auto mb-3 text-sm'>
            Keep track of all your favorite products in one place
          </p>
          <div className='bg-app-primary/10 rounded-full px-3 py-1 inline-flex items-center gap-1'>
            <BsSuitHeartFill className='text-app-primary' size={12} />
            <span className='text-app-primary font-semibold text-sm'>
              {items.length}
            </span>
            <span className='text-gray-600 text-xs'>saved items</span>
          </div>
        </div>

        {/* Products List - No Outer Card */}
        <div className='max-w-3xl mx-auto flex flex-col gap-4 mb-8'>
          {items.map((item) => (
            <ProductCard key={item.id} product={item} viewMode='list' />
          ))}
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
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#388e3c")}>
            <FiShoppingBag size={20} />
            Continue Shopping
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
