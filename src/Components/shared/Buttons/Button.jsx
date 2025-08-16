import React from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Button({
  onClick,
  text = (
    <>
      <FaShoppingCart size={16} className="inline-block mr-2" /> Add to Cart
    </>
  ),
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`max-w-[208px] w-full   bg-[#54D12B] text-black px-4 py-2 rounded-[12px] hover:bg-[#46b722] transition cursor-pointer ${className} `}
    >
      {text}
    </button>
  );
}
