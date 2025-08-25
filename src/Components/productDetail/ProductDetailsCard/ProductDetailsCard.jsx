import React, { useState, useEffect } from "react";
import AddButton from "../../shared/Buttons/AddButton";
import { CiWarning } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistItem } from "../../../Redux/slices/wishListSlice";
import ToastNotification from "../../shared/ToastNotification";
import { HiCheck, HiX } from "react-icons/hi";
import {
  FiStar,
  FiShield,
  FiHeart,
  FiPackage,
  FiActivity,
  FiTag,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";

const ProductDetailsCard = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [wishlistToast, setWishlistToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(
    (item) => item.id === selectedProduct.id
  );

  const handleWishlistToggle = () => {
    dispatch(toggleWishlistItem(selectedProduct));
    setWishlistToast({
      show: true,
      type: isInWishlist ? "removed" : "success",
      message: isInWishlist
        ? `"${selectedProduct.name}" removed from wishlist!`
        : `"${selectedProduct.name}" added to wishlist!`,
    });
  };

  // Auto-dismiss toast after 2.5 seconds
  useEffect(() => {
    if (wishlistToast.show) {
      const timer = setTimeout(() => {
        setWishlistToast((prev) => ({ ...prev, show: false }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [wishlistToast.show]);
  return (
    <div className='bg-white rounded-2xl shadow border border-gray-100 overflow-hidden  mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:min-h-[600px] items-stretch'>
        {/* Product Image Section */}
        <div className='relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-full flex flex-col'>
          {/* Main Product Image */}
          <div className='flex-1 relative'>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className='w-full h-full object-cover'
            />
            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent'></div>

            {/* Stock Badge */}
            <div className='absolute top-4 left-4'>
              <div
                className={`px-3 py-1.5 rounded-full font-medium text-xs backdrop-blur-sm border ${
                  selectedProduct.stock === "in-stock"
                    ? "bg-green-100/90 text-green-800 border-green-200"
                    : selectedProduct.stock === "low-stock"
                    ? "bg-yellow-100/90 text-yellow-800 border-yellow-200"
                    : "bg-red-100/90 text-red-800 border-red-200"
                }`}>
                {selectedProduct.stock === "in-stock"
                  ? "✓ In Stock"
                  : selectedProduct.stock === "low-stock"
                  ? "⚠ Low Stock"
                  : "✗ Out of Stock"}
              </div>
            </div>

            {/* Rating Badge */}
            <div className='absolute top-4 right-4'>
              <div className='bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-200 flex items-center gap-1.5'>
                <FiStar className='text-yellow-500 fill-current' size={14} />
                <span className='font-medium text-gray-800 text-xs'>
                  {selectedProduct.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className='p-4 flex gap-2'>
            <div className='bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 flex-1'>
              <div className='flex items-center gap-1.5'>
                <FiActivity className='text-app-primary' size={14} />
                <div>
                  <p className='text-xs font-medium text-gray-600'>Calories</p>
                  <p className='font-semibold text-gray-800 text-sm'>
                    {selectedProduct.calories} kcal
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 flex-1'>
              <div className='flex items-center gap-1.5'>
                <FiPackage className='text-app-secondary' size={14} />
                <div>
                  <p className='text-xs font-medium text-gray-600'>Weight</p>
                  <p className='font-semibold text-gray-800 text-sm'>
                    {selectedProduct.weight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Product Details Section */}
        <div className='p-3 lg:p-4 flex flex-col justify-between h-full'>
          {/* Header Section */}
          <div className='space-y-2'>
            {/* Title and Brand */}
            <div className='space-y-1'>
              <div className='flex items-start justify-between gap-3'>
                <div className='flex-1'>
                  <span className='inline-block px-2.5 py-1 bg-app-accent/10 text-app-accent text-sm font-medium rounded-full mb-2'>
                    {selectedProduct.brand || "NutriFast"}
                  </span>
                  <h1 className='text-xl lg:text-2xl font-bold text-gray-900 leading-tight'>
                    {selectedProduct.name}
                  </h1>
                </div>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors duration-200 group ${
                    isInWishlist
                      ? "bg-red-50 hover:bg-red-100"
                      : "bg-gray-50 hover:bg-red-50"
                  }`}
                  aria-label={
                    isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }>
                  <FiHeart
                    className={`transition-colors ${
                      isInWishlist
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 group-hover:text-red-500"
                    }`}
                    size={18}
                  />
                </button>
              </div>

              {/* Category and Rating */}
              <div className='flex items-center gap-3'>
                <span className='px-3 py-1 bg-app-primary/10 text-app-primary text-sm font-medium rounded-full'>
                  {selectedProduct.category}
                </span>
                <div className='flex items-center gap-1.5'>
                  <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(selectedProduct.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-sm text-gray-600'>
                    ({selectedProduct.rating})
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className='text-gray-600 text-sm leading-relaxed'>
              {selectedProduct.description}
            </p>

            {/* Price */}
            <div className='bg-gradient-to-r from-app-primary/5 to-app-secondary/5 rounded-lg py-3 border-app-primary/10'>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl lg:text-3xl font-bold text-app-primary'>
                  {selectedProduct.price}
                </span>
                <span className='text-base font-medium text-gray-600'>EGP</span>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className='grid grid-cols-2 gap-3'>
              {/* Suitable For */}
              {selectedProduct.medicalConditions?.length > 0 && (
                <div className='bg-green-50 rounded-lg p-3 border border-green-100'>
                  <div className='flex items-center gap-1.5 mb-2'>
                    <FiShield className='text-green-600' size={14} />
                    <h4 className='font-semibold text-green-800 text-sm'>
                      Suitable For
                    </h4>
                  </div>
                  <div className='space-y-1'>
                    {selectedProduct.medicalConditions
                      .slice(0, 2)
                      .map((cond, i) => (
                        <div key={i} className='flex items-center gap-1'>
                          <FiCheck className='text-green-600' size={12} />
                          <span className='text-xs text-green-700'>{cond}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Allergens */}
              {selectedProduct.allergens?.length > 0 && (
                <div className='bg-red-50 rounded-lg p-3 border border-red-100'>
                  <div className='flex items-center gap-1.5 mb-2'>
                    <FiAlertTriangle className='text-red-600' size={14} />
                    <h4 className='font-semibold text-red-800 text-sm'>
                      Allergens
                    </h4>
                  </div>
                  <div className='space-y-1'>
                    {selectedProduct.allergens
                      .slice(0, 2)
                      .map((allergen, i) => (
                        <div key={i} className='flex items-center gap-1'>
                          <CiWarning className='text-red-600' size={12} />
                          <span className='text-xs text-red-700'>
                            {allergen}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {selectedProduct.tags?.length > 0 && (
              <div className='space-y-2'>
                <h4 className='font-semibold text-gray-900 flex items-center gap-2 text-sm'>
                  <FiTag className='text-app-accent' size={16} />
                  Product Tags
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {selectedProduct.tags.map((tag, i) => (
                    <span
                      key={i}
                      className='px-3 py-1.5  text-sm  text-app-primary '>
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {/* Ingredients */}
              {selectedProduct.ingredients?.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900 text-sm'>
                    Ingredients
                  </h4>
                  <div className='bg-gray-50 p-3 rounded-lg'>
                    <div className='space-y-1'>
                      {selectedProduct.ingredients.slice(0, 6).map((ing, i) => (
                        <div key={i} className='flex items-start gap-1.5'>
                          <span className='text-app-accent text-sm mt-0.5'>
                            •
                          </span>
                          <span className='text-sm text-gray-700'>{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Diet Types */}
              {selectedProduct.dietTypes?.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900 text-sm'>
                    Diet Types
                  </h4>
                  <div className='space-y-1.5'>
                    {selectedProduct.dietTypes.slice(0, 4).map((type, i) => (
                      <div
                        key={i}
                        className='flex items-center gap-1.5 bg-app-secondary/5 rounded-md px-3 py-1.5'>
                        <FiCheck className='text-app-secondary' size={14} />
                        <span className='text-sm font-medium text-app-secondary'>
                          {type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className='mt-4 pt-4 border-t border-gray-100'>
            <AddButton
              product={selectedProduct}
              className='w-full justify-center py-4 text-lg font-semibold rounded-xl shadow hover:shadow-xl transition-all duration-200'
            />
            <p className='text-sm text-gray-500 text-center mt-3'>
              30-day return policy • Secure payment • Fast delivery
            </p>
          </div>
        </div>
      </div>

      {/* Wishlist Toast Notification */}
      <ToastNotification
        show={wishlistToast.show}
        message={wishlistToast.message}
        type={wishlistToast.type === "removed" ? "error" : "success"}
        onClose={() => setWishlistToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default ProductDetailsCard;
