import React from "react";
import AddButton from "../../shared/Buttons/AddButton";
import { Rating, RatingStar } from "flowbite-react";
import { CiWarning } from "react-icons/ci";

const ProductDetailsCard = ({ selectedProduct }) => {
  return (
    <div className='flex items-start justify-center bg-white px-1 pt-2 mb-10'>
      <div className='w-full max-w-6xl xl:max-w-7xl mx-auto bg-white rounded-2xl  p-0 sm:py-4 md:py-6 flex flex-col md:flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8'>
        {/* Product Image Section */}
        <div className='flex-shrink-0 flex flex-col items-start justify-start w-full md:w-full lg:w-1/2 mb-0'>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className='w-full h-40 sm:h-56 md:h-64 lg:h-80 object-cover rounded-none sm:rounded-2xl m-0 p-0'
            style={{ padding: 0, margin: 0 }}
          />

          {/* Additional Info under image */}
          <div className='w-full mt-4 bg-gray-50/50 rounded-xl p-4 space-y-4'>
            {/* Suitable For */}
            {selectedProduct.medicalConditions?.length > 0 && (
              <div className='bg-white rounded-lg p-3 border border-blue-100 shadow-sm'>
                <div className='flex items-center gap-2 mb-3'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <h4 className='font-bold text-app-tertiary text-xs sm:text-sm'>
                    Suitable For
                  </h4>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {selectedProduct.medicalConditions.map((cond, i) => (
                    <span
                      key={i}
                      className='bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-bold border border-blue-200 hover:bg-blue-100 transition-colors duration-200'>
                      ✓ {cond}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {selectedProduct.allergens &&
              selectedProduct.allergens.length > 0 && (
                <div className='bg-white rounded-lg p-3 border border-red-100 shadow-sm'>
                  <div className='flex items-center gap-2 mb-3'>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <h4 className='font-bold text-app-tertiary text-xs sm:text-sm'>
                      Allergens
                    </h4>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {selectedProduct.allergens.map((allergen, i) => (
                      <span
                        key={i}
                        className='bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs font-bold border border-red-200 hover:bg-red-100 transition-colors duration-200 flex items-center gap-1'>
                        <CiWarning /> {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Tags */}
            {selectedProduct.tags?.length > 0 && (
              <div className='bg-white rounded-lg p-3 shadow-sm'>
                <div className='flex items-center gap-2 mb-3'>
                  <div className='w-2 h-2 bg-app-accent rounded-full'></div>
                  <h4 className='font-bold text-app-tertiary text-xs sm:text-sm'>
                    Product Tags
                  </h4>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {selectedProduct.tags.map((tag, i) => (
                    <span
                      key={i}
                      className='bg-app-accent/5 text-app-tertiary px-3 py-2 rounded-lg text-xs font-bold hover:bg-app-accent/10 transition-colors duration-200'>
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Details Section */}
        <div className='flex-1 flex flex-col justify-between min-w-0 w-full md:w-full lg:w-1/2 px-4 py-4 sm:px-6 sm:py-6'>
          <div>
            {/* Title, Category, Description */}
            <div className='mb-2'>
              <div className='flex flex-col gap-2 mb-3'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-app-tertiary'>
                  {selectedProduct.name}
                </h2>
                <span className='text-app-accent text-xs sm:text-sm font-bold tracking-wider bg-app-accent/10 px-3 py-1 rounded-full w-fit'>
                  " {selectedProduct.brand || "NutriFast"} "
                </span>
              </div>
              <div className='flex items-center justify-between mb-1'>
                <div className='text-app-secondary text-xs sm:text-sm font-medium '>
                  {selectedProduct.category}
                </div>
                <div className='flex items-center'>
                  <Rating size='sm'>
                    {[...Array(5)].map((_, i) => (
                      <RatingStar
                        key={i}
                        filled={i < Math.round(selectedProduct.rating)}
                      />
                    ))}
                  </Rating>
                  <p className='ml-2 text-xs font-medium text-app-tertiary'>
                    {selectedProduct.rating}
                  </p>
                </div>
              </div>
              <p className='text-gray-700 text-xs sm:text-sm italic mb-2'>
                {selectedProduct.description}
              </p>
            </div>
            {/* ...existing code... */}
            {/* Info block: price, stock, weight, calories with separators and tabular layout */}
            <div className='w-full mb-4 md:mb-6 mt-4 bg-gray-50/50 rounded-xl p-4 border border-gray-100'>
              {/* Price dominant with stock status on same line */}
              <div className='flex flex-row items-center justify-between w-full mb-3'>
                <div className='flex items-baseline'>
                  <span className='text-xl sm:text-2xl md:text-3xl font-extrabold text-app-primary leading-none'>
                    {selectedProduct.price}
                  </span>
                  <span className='text-sm sm:text-base font-bold text-app-tertiary ml-2'>
                    EGP
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full font-bold text-xs sm:text-sm ${
                    selectedProduct.stock === "in-stock"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : selectedProduct.stock === "low-stock"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}>
                  {selectedProduct.stock === "in-stock"
                    ? "✓ In Stock"
                    : selectedProduct.stock === "low-stock"
                    ? "⚠ Low Stock"
                    : "✗ Out of Stock"}
                </div>
              </div>
              <hr className='w-full border-t border-app-accent/20 my-3' />
              {/* Vertical info list: weight & calories */}
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='flex items-center gap-2 p-2 bg-white rounded-lg'>
                  <span className='font-bold text-app-accent text-xs sm:text-sm'>
                    Weight:
                  </span>
                  <span className='text-app-tertiary font-semibold text-xs sm:text-sm'>
                    {selectedProduct.weight}
                  </span>
                </div>
                <div className='flex items-center gap-2 p-2 bg-white rounded-lg'>
                  <span className='font-bold text-app-accent text-xs sm:text-sm'>
                    Calories:
                  </span>
                  <span className='text-app-tertiary font-semibold text-xs sm:text-sm'>
                    {selectedProduct.calories} kcal
                  </span>
                </div>
              </div>
            </div>
            <div className='w-full bg-gray-50/50 rounded-xl p-4 mb-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {selectedProduct.ingredients?.length > 0 && (
                  <div className='bg-white rounded-lg p-4 shadow-sm'>
                    <div className='flex items-center gap-2 mb-3'>
                      <div className='w-2 h-2 bg-app-primary rounded-full'></div>
                      <h4 className='font-bold text-app-tertiary text-xs sm:text-sm'>
                        Ingredients
                      </h4>
                    </div>
                    <div className='space-y-1'>
                      {selectedProduct.ingredients.map((ing, i) => (
                        <div
                          key={i}
                          className='flex items-center gap-2 p-2 bg-app-quaternary/5 rounded-md'>
                          <span className='text-app-accent text-xs'>•</span>
                          <span className='text-xs text-app-tertiary font-medium'>
                            {ing}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProduct.dietTypes?.length > 0 && (
                  <div className='bg-white rounded-lg p-4 shadow-sm'>
                    <div className='flex items-center gap-2 mb-3'>
                      <div className='w-2 h-2 bg-app-secondary rounded-full'></div>
                      <h4 className='font-bold text-app-tertiary text-xs sm:text-sm'>
                        Diet Types
                      </h4>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {selectedProduct.dietTypes.map((type, i) => (
                        <span
                          key={i}
                          className='bg-app-secondary/10 text-app-secondary px-3 py-2 rounded-lg text-xs font-bold hover:bg-app-secondary/20 transition-colors duration-200'>
                          ✓ {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Add to Cart Button at the bottom */}
          <div className='w-full mt-4 flex justify-center'>
            <AddButton product={selectedProduct} className='w-full flex sm:w-auto' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
