import React from "react";

export default function Button({
  onClick,
  text = "Add to Cart",
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
