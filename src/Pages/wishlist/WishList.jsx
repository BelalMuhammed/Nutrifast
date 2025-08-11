import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";

export default function WishList() {
  const { items } = useSelector((state) => state.wishlist);

  if (items.length === 0) {
    return <h2 className="text-center mt-10">Your wishlist is empty</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
