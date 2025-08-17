import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import { FiHeart } from "react-icons/fi";

export default function WishList() {
  const { items } = useSelector((state) => state.wishlist);

  if (items.length === 0) {
    return (
      <div className='min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-app-quaternary/20 px-2 sm:px-4'>
        <div className='bg-white rounded-2xl shadow border border-gray-100 flex flex-col items-center py-10 px-4 sm:py-12 sm:px-6 max-w-md w-full'>
          <FiHeart className='text-app-primary mb-4' size={48} />
          <h2 className='text-lg sm:text-xl font-bold text-app-secondary mb-2 text-center'>
            Your wishlist is empty
          </h2>
          <p className='text-gray-400 text-base text-center max-w-xs mb-6'>
            Browse products and add your favorites to see them here.
          </p>
          <button
            onClick={() => (window.location.href = "/shop")}
            className='bg-app-primary text-white px-7 py-2 rounded-full font-semibold shadow hover:bg-app-tertiary transition text-base'>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[60vh] bg-gradient-to-b from-white to-app-quaternary/20 max-w-6xl mx-auto px-2 sm:px-6 py-4 sm:py-8'>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-app-primary text-center'>
        Your Wishlist
      </h1>
      <div className='flex flex-wrap gap-5 justify-center lg:justify-start'>
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
