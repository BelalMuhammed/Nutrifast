import { Link } from "react-router-dom";
import AddButton from "../../shared/Buttons/AddButton";
import { FaHeart } from "react-icons/fa";
import ToastNotification from "../../shared/ToastNotification";
import { HiOutlineClock } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useWishlist } from "../../../hooks/useWishlist";
import isFreshDietMeal from "../../../lib/isFreshDietMeal";

function ProductCard({ product, viewMode = "grid" }) {
  const { isItemInWishlist, toggleItem } = useWishlist();
  const [wishlistToast, setWishlistToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // Auto-dismiss toast after 2.5 seconds
  useEffect(() => {
    if (wishlistToast.show) {
      const timer = setTimeout(() => {
        setWishlistToast((prev) => ({ ...prev, show: false }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [wishlistToast.show]);

  // Destructure product properties
  const { id, name, image, description, calories, price, tags = [] } = product;

  const freshDiet = isFreshDietMeal(product);

  const isInWishlist = isItemInWishlist(id);

  const handleWishlistToggle = () => {
    toggleItem(product);
    setWishlistToast({
      show: true,
      type: isInWishlist ? "removed" : "success",
      message: isInWishlist ? "Removed from wishlist." : "Added to wishlist!",
    });
  };

  let CardContent;
  if (viewMode === "list") {
    CardContent = (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center bg-white rounded-2xl p-4 sm:p-5 shadow-sm w-full min-w-0 relative transition-transform duration-200 hover:shadow-md group border border-gray-100">
        {/* Floating favorite button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow-lg border border-gray-200 transition-colors duration-200 hover:bg-red-50 z-20 ${
            isInWishlist ? "text-red-500" : "text-gray-400"
          }`}
          style={{ backdropFilter: "blur(8px)" }}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FaHeart size={18} />
        </button>
        {/* Image */}
        <div className="w-full sm:w-32 h-40 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden relative mb-3 sm:mb-0">
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl border border-gray-100 hover:scale-105 transition-transform duration-200"
            />
            {/* Preorder Tag */}
            {freshDiet && (
              <div
                className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-yellow-300 flex items-center gap-1 animate-fadeIn z-10"
                style={{
                  letterSpacing: "0.5px",
                  boxShadow: "0 2px 8px 0 rgba(255,180,0,0.15)",
                }}
              >
                <HiOutlineClock className="h-4 w-4 mr-1 text-orange-600 bg-yellow-100 rounded-full p-[2px]" />
                <span style={{ fontWeight: 600 }}>Preorder</span>
              </div>
            )}
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
            <Link to={`/product/${id}`}>
              <h3 className="text-lg sm:text-xl font-bold text-app-tertiary hover:text-app-primary transition-colors duration-200 mb-1 sm:mb-2">
                {name}
              </h3>
            </Link>
          </div>

          <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base line-clamp-2">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-app-accent">
                Calories:
              </span>
              <span className="text-sm sm:text-base font-semibold text-app-tertiary">
                {calories || "N/A"} kcal
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-lg bg-app-quaternary/30 text-app-secondary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg sm:text-2xl font-bold text-app-primary">
              {price} EGP
            </span>
            <AddButton product={product} />
          </div>
        </div>
      </div>
    );
  } else {
    CardContent = (
      <div className="product bg-white rounded-2xl p-5 shadow-sm w-full flex-1 min-w-0 relative transition-transform duration-200 hover:shadow-md group border border-gray-100 flex flex-col">
        {/* Image and heart button */}
        <div className="relative h-[160px] rounded-xl overflow-hidden mb-4">
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl border border-gray-100 hover:scale-105 transition-transform duration-200"
            />
            {/* Preorder Tag */}
            {freshDiet && (
              <div
                className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-yellow-300 flex items-center gap-1 animate-fadeIn z-10"
                style={{
                  letterSpacing: "0.5px",
                  boxShadow: "0 2px 8px 0 rgba(255,180,0,0.15)",
                }}
              >
                <HiOutlineClock className="h-4 w-4 mr-1 text-orange-600 bg-yellow-100 rounded-full p-[2px]" />
                <span style={{ fontWeight: 600 }}>Preorder required</span>
              </div>
            )}
          </Link>
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow-lg border border-gray-200 transition-colors duration-200 hover:bg-red-50 ${
              isInWishlist ? "text-red-500" : "text-gray-400"
            }`}
            style={{ backdropFilter: "blur(8px)" }}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <FaHeart size={18} />
          </button>
        </div>
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-700 mb-2 hover:text-app-primary transition-colors duration-200">
            {name}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-lg bg-gray-100 text-app-secondary font-medium border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        {/* Calories */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-app-accent">Calories:</span>
          <span className="text-base font-bold text-app-tertiary">
            {calories || "N/A"} kcal
          </span>
        </div>

        <div className="flex-1"></div>
        {/* Price and Add to Cart Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-md font-bold text-green-700">{price} EGP</span>
          <AddButton product={product} />
        </div>
      </div>
    );
  }

  return (
    <>
      {CardContent}
      <ToastNotification
        show={wishlistToast.show}
        message={wishlistToast.message}
        type={wishlistToast.type === "removed" ? "error" : "success"}
        onClose={() => setWishlistToast({ ...wishlistToast, show: false })}
      />
    </>
  );
}

export default ProductCard;
