import React, { useEffect } from "react";
import { FaHeart, FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import Button from "../../Components/shared/Buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../Redux/slices/wishListSlice";
import { addToCart } from "../../Redux/slices/cartSlice";

export default function WishList() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <FaHeart className="text-pink-500 w-6 h-6" />
        <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <FaHeart className="mx-auto text-gray-400 w-12 h-12 mb-4" />
          <p className="text-gray-500">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="font-semibold text-lg mb-2">{item.name}</h2>
              <p className="text-gray-700 font-medium mb-4">
                ${item.price.toFixed(2)}
              </p>
              <div className="mt-auto flex items-center justify-between gap-2">
                <Button
                  text="Add to Cart"
                  onClick={() => dispatch(addToCart(item))}
                />
                <button
                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-500"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
