"use client";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/slices/cartSlice";
import ToastNotification from "../shared/ToastNotification";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
export function CustomerFavCard({ fav }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const isInCart = cartItems.some((item) => item.id === fav?.id);

  const handleClick = () => {
    navigate(`/product/${fav.id}`);
  };

  return (
    <div
      className='flex flex-col w-full max-w-[340px] mx-auto min-h-[340px] sm:min-h-[340px] rounded-2xl overflow-hidden shadow-lg bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer'
      onClick={handleClick}
      tabIndex={0}
      role='button'
      aria-label={`View details for ${fav.name}`}>
      <div className='relative w-full h-40 sm:h-48 md:h-56'>
        <img
          src={fav.image}
          alt={fav.name}
          className='w-full h-full object-cover rounded-t-2xl'
        />
        <div className='absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-app-primary/80 via-app-primary/40 to-transparent rounded-b-2xl' />
      </div>
      <div className='flex flex-col flex-grow p-2 justify-between'>
        <h5 className='text-base font-bold text-app-primary mb-1 line-clamp-2'>
          {fav.name}
        </h5>
        <div className='flex flex-row items-center gap-2 mb-2'>
          <span className='text-app-accent font-bold text-base bg-white/90 px-2 py-0.5 rounded-full'>
            {fav.price} EGP
          </span>
        </div>
        <div className='flex flex-row items-center justify-between gap-2'>
          <span className='text-app-tertiary text-xs truncate bg-white/70 px-2 py-0.5 rounded-full'>
            {fav.brand}
          </span>
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-app-primary shadow-lg transition-all duration-200 ${
              isInCart ? "opacity-60" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isInCart) {
                dispatch(addToCart(fav));
                setToast({
                  show: true,
                  type: "success",
                  message: `"${
                    fav?.name || "Product"
                  }" successfully added to cart!`,
                });
                setTimeout(
                  () => setToast({ show: false, type: "success", message: "" }),
                  4000
                );
              } else {
                setToast({
                  show: true,
                  type: "warning",
                  message: "Product is already in your cart!",
                });
                setTimeout(
                  () => setToast({ show: false, type: "warning", message: "" }),
                  4000
                );
              }
            }}
            aria-label='Add to cart'>
            <FiShoppingCart size={22} color='white' />
          </button>
        </div>
        <ToastNotification
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </div>
    </div>
  );
}

export default CustomerFavCard;
