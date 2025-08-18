import { Link } from "react-router-dom";
import AddButton from "../../shared/Buttons/AddButton";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistItem } from "../../../Redux/slices/wishListSlice";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useState } from "react";

function ProductCard({ product, viewMode = "grid" }) {
  const dispatch = useDispatch();
  const [showWishlistToast, setShowWishlistToast] = useState(false);
  const [wishlistToastType, setWishlistToastType] = useState("success");

  const {
    name,
    price,
    id,
    image,
    description,
    tags = [],
    calories = 0,
  } = product;
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      // Removing from wishlist
      setWishlistToastType("removed");
    } else {
      // Adding to wishlist
      setWishlistToastType("added");
    }

    dispatch(toggleWishlistItem(product));
    setShowWishlistToast(true);
    setTimeout(() => setShowWishlistToast(false), 4000);
  };

  // List View Layout
  if (viewMode === "list") {
    return (
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md group'>
        <div className='flex items-center gap-6'>
          {/* Image */}
          <div className='relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0'>
            <Link to={`/product/${id}`}>
              <img
                src={image}
                alt={name}
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-200'
              />
            </Link>
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between mb-3'>
              <Link to={`/product/${id}`}>
                <h3 className='text-xl font-bold text-app-tertiary hover:text-app-primary transition-colors duration-200 mb-2'>
                  {name}
                </h3>
              </Link>
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-200 transition-colors duration-200 hover:bg-red-50 ${
                  isInWishlist ? "text-red-500" : "text-gray-400"
                } ml-4`}
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }>
                <FaHeart size={20} />
              </button>
            </div>

            <p className='text-gray-600 mb-3 line-clamp-2'>{description}</p>

            <div className='flex items-center gap-4 mb-4'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium text-app-accent'>
                  Calories:
                </span>
                <span className='text-base font-semibold text-app-tertiary'>
                  {calories || "N/A"} kcal
                </span>
              </div>

              <div className='flex flex-wrap gap-2'>
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className='px-2 py-1 text-xs rounded-lg bg-app-quaternary/30 text-app-secondary font-medium'>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold text-app-primary'>
                {price} EGP
              </span>
              <AddButton product={product} />
            </div>
          </div>
        </div>

        {/* Wishlist Toast Notification */}
        {showWishlistToast && (
          <div className='fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] max-w-xs w-full'>
            <Toast>
              <div
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  wishlistToastType === "removed"
                    ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                    : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                }`}>
                {wishlistToastType === "removed" ? (
                  <HiX className='h-5 w-5' />
                ) : (
                  <HiCheck className='h-5 w-5' />
                )}
              </div>
              <div className='ml-3 text-sm font-normal'>
                {wishlistToastType === "removed"
                  ? `"${name}" removed from wishlist!`
                  : `"${name}" added to wishlist!`}
              </div>
              <ToastToggle onDismiss={() => setShowWishlistToast(false)} />
            </Toast>
          </div>
        )}
      </div>
    );
  }

  // Default Grid View Layout
  return (
    <div className='product bg-white rounded-2xl p-5 shadow-sm w-full max-w-[300px] md:max-w-[320px] md:w-[320px] min-w-0 relative transition-transform duration-200 hover:shadow-md group border border-gray-100 flex flex-col'>
      {/* Image and heart button */}
      <div className='relative h-[160px] rounded-xl overflow-hidden mb-4'>
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover rounded-xl border border-gray-100 hover:scale-105 transition-transform duration-200'
          />
        </Link>
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow-lg border border-gray-200 transition-colors duration-200 hover:bg-red-50 ${
            isInWishlist ? "text-red-500" : "text-gray-400"
          }`}
          style={{ backdropFilter: "blur(8px)" }}
          aria-label={
            isInWishlist ? "Remove from wishlist" : "Add to wishlist"
          }>
          <FaHeart size={18} />
        </button>
      </div>
      <Link to={`/product/${id}`}>
        <h3 className='text-lg font-bold text-gray-700 mb-2 hover:text-app-primary transition-colors duration-200'>
          {name}
        </h3>
      </Link>
      <div className='flex flex-wrap gap-2 mb-3'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='px-2 py-1 text-xs rounded-lg bg-gray-100 text-app-secondary font-medium border border-gray-200'>
            {tag}
          </span>
        ))}
      </div>

      {/* Short Description */}
      <p className='text-sm text-gray-600 mb-3 line-clamp-2'>{description}</p>

      {/* Calories */}
      <div className='flex items-center gap-2 mb-3'>
        <span className='text-sm font-medium text-app-accent'>Calories:</span>
        <span className='text-base font-bold text-app-tertiary'>
          {calories || "N/A"} kcal
        </span>
      </div>

      <div className='flex-1'></div>
      {/* Price and Add to Cart Button */}
      <div className='flex items-center justify-between mt-auto'>
        <span className='text-lg font-bold text-green-700'>{price} EGP</span>
        <AddButton product={product} />
      </div>

      {/* Wishlist Toast Notification */}
      {showWishlistToast && (
        <div className='fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] max-w-xs w-full'>
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                wishlistToastType === "removed"
                  ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                  : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
              }`}>
              {wishlistToastType === "removed" ? (
                <HiX className='h-5 w-5' />
              ) : (
                <HiCheck className='h-5 w-5' />
              )}
            </div>
            <div className='ml-3 text-sm font-normal'>
              {wishlistToastType === "removed"
                ? `"${name}" removed from wishlist!`
                : `"${name}" added to wishlist!`}
            </div>
            <ToastToggle onDismiss={() => setShowWishlistToast(false)} />
          </Toast>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
