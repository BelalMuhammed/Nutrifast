import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import { FiHeart } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
export default function WishList() {
  const { items } = useSelector((state) => state.wishlist);

  if (items.length === 0) {
    return (
      <div className='min-h-[400px] h-[100vh]  flex flex-col items-center justify-center bg-gradient-to-b from-white to-app-quaternary/20 px-2 sm:px-4'>
        <div className='bg-white rounded-2xl   flex flex-col items-center py-10 px-4 sm:py-12 sm:px-6 max-w-md w-full'>
          <FiHeart className='text-app-primary mb-4' size={48} />
          <h2 className='text-center text-2xl font-bold text-app-secondary mb-2'>
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
    <div className=' bg-gradient-to-b from-white to-app-quaternary/20 max-w-6xl mx-auto px-2 sm:px-6 pb-4 sm:py-8'>
      <div className='w-full flex flex-col items-center justify-center  px-4'>
        <span className='bg-app-primary text-white rounded-full p-4 mb-4 shadow-lg'>
          <BsSuitHeartFill size={40} />
        </span>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight text-center mb-2'>
          Your Wishlist
        </h2>
        <p className='text-lg text-gray-700 text-center max-w-2xl mb-6'>
          Save your favorite products here and never lose track of what you
          love.
        </p>
      </div>
      <div className='flex flex-wrap gap-5 justify-center lg:justify-start'>
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
