"use client";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../shared/ToastNotification";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
export function CustomerFavCard({ fav }) {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const handleClick = () => {
    navigate(`/product/${fav.id}`);
  };

  return (
    <div
      className="mb-2 flex flex-col w-full max-w-[340px] mx-auto min-h-[200px] sm:min-h-[260px] rounded-2xl overflow-hidden shadow-md bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${fav.name}`}
    >
      <div className="relative w-full h-40 sm:h-48 md:h-56">
        <img
          src={fav.image}
          alt={fav.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />
        <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-app-primary/80 via-app-primary/40 to-transparent rounded-b-2xl" />
      </div>
      <div className="flex flex-col flex-grow p-2 justify-between">
        <h5 className="text-base font-bold text-app-primary mb-1 line-clamp-2">
          {fav.name}
        </h5>
        <div className="flex flex-row items-center gap-2 mb-2">
          <span className="text-app-accent font-bold text-base bg-white/90  py-0.5 rounded-full">
            {fav.price} EGP
          </span>
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="text-app-tertiary text-s truncate bg-white/70  py-0.5 rounded-full">
            {fav.brand}
          </span>
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
