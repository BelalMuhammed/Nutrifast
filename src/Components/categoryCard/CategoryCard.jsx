"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

export function CategoryCard({ category }) {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to shop with category filter as query param
    navigate(`/shop?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div
      className="relative w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`View products in ${category.name}`}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-52 sm:h-56 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 w-full h-20 sm:h-24 z-10 bg-gradient-to-t from-black/100 to-transparent pointer-events-none rounded-b-2xl" />
      <div className="absolute bottom-0 left-0 w-full p-2 z-20 flex flex-col items-start">
        <h5 className="text-base font-bold text-white mb-0.5 truncate mb-2">
          {category.name}
        </h5>
        <span
          className="text-white text-xs mb-2 font-semibold bg-white/20 backdrop-blur-md px-4 py-1 rounded-full shadow 
             hover:bg-black/20 hover:text-app-primary transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-app-primary"
        >
          Discover More
        </span>
      </div>
    </div>
  );
}

export default CategoryCard;
