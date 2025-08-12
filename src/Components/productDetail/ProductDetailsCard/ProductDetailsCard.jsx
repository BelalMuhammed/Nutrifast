import React from "react";
import AddButton from "../../shared/Buttons/AddButton";
import { Rating, RatingStar } from "flowbite-react";

const ProductDetailsCard = ({ selectedProduct }) => {
  return (
    <div className='flex items-start justify-center bg-white px-1 pt-2 mb-10'>
      <div className='w-full max-w-6xl xl:max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-0 sm:p-4 md:p-6 flex flex-col md:flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8'>
        {/* Product Image Section */}
        <div className='flex-shrink-0 flex items-start justify-start w-full md:w-full lg:w-1/2 mb-0'>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className='w-full h-40 sm:h-56 md:h-64 lg:h-80 object-cover rounded-none sm:rounded-2xl shadow-none sm:shadow-lg m-0 p-0'
            style={{ padding: 0, margin: 0 }}
          />
        </div>
        {/* Details Section */}
        <div className='flex-1 flex flex-col justify-between min-w-0 w-full md:w-full lg:w-1/2 px-4 py-4 sm:px-6 sm:py-6'>
          <div>
            {/* Title, Category, Description */}
            <div className='mb-2'>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-app-tertiary mb-1'>
                {selectedProduct.name}
              </h2>
              <div className='text-app-secondary text-xs sm:text-sm md:text-base font-medium opacity-80 mb-1'>
                {selectedProduct.category}
              </div>
              <p className='text-gray-700 text-xs sm:text-sm md:text-base italic mb-2'>
                {selectedProduct.description}
              </p>
            </div>
            {/* ...existing code... */}
            {/* Info block: price, stock, weight, calories with separators and tabular layout */}
            <div className='w-full mb-4 md:mb-6 mt-4'>
              {/* Price dominant with stock status on same line */}
              <div className='flex flex-row items-center justify-between w-full mb-2'>
                <div className='flex items-baseline'>
                  <span className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-tertiary leading-none'>
                    {selectedProduct.price}
                  </span>
                  <span className='text-xs sm:text-sm md:text-base font-semibold text-gray-500 ml-2'>
                    EGP
                  </span>
                </div>
                <span
                  className={`font-semibold text-xs sm:text-sm md:text-base ${
                    selectedProduct.stock === "in-stock"
                      ? "text-gray-700"
                      : "text-red-800"
                  }`}>
                  {selectedProduct.stock === "in-stock"
                    ? "In Stock"
                    : "Out of Stock"}
                </span>
              </div>
              <hr className='w-full border-t border-gray-200 my-2 md:my-4' />
              {/* Vertical info list: weight & calories */}
              <div className='w-full flex flex-col gap-1 sm:gap-2'>
                <div className='flex items-center gap-1 sm:gap-2'>
                  <span className='font-semibold text-gray-700 text-xs sm:text-sm md:text-base'>
                    Weight:
                  </span>
                  <span className='text-gray-700 text-xs sm:text-sm md:text-base'>
                    {selectedProduct.weight}
                  </span>
                </div>
                <div className='flex items-center gap-1 sm:gap-2'>
                  <span className='font-semibold text-gray-700 text-xs sm:text-sm md:text-base'>
                    Calories:
                  </span>
                  <span className='text-gray-700 text-xs sm:text-sm md:text-base'>
                    {selectedProduct.calories} kcal
                  </span>
                </div>
              </div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 mb-4'>
              {selectedProduct.ingredients?.length > 0 && (
                <div>
                  <h4 className='font-semibold text-app-tertiary mb-1 sm:mb-2 text-xs sm:text-sm md:text-base'>
                    Ingredients
                  </h4>
                  <ul className='list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 space-y-1 font-semibold'>
                    {selectedProduct.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedProduct.dietTypes?.length > 0 && (
                <div>
                  <h4 className='font-semibold text-app-tertiary mb-1 sm:mb-2 text-xs sm:text-sm md:text-base'>
                    Diet Types
                  </h4>
                  <div className='flex flex-wrap gap-1 sm:gap-2 md:gap-3'>
                    {selectedProduct.dietTypes.map((type, i) => (
                      <span
                        key={i}
                        className='bg-app-quaternary text-app-tertiary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm md:text-base font-semibold'>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedProduct.medicalConditions?.length > 0 && (
                <div>
                  <h4 className='font-semibold text-app-tertiary mb-1 sm:mb-2 text-xs sm:text-sm md:text-base'>
                    Suitable For
                  </h4>
                  <div className='flex flex-wrap gap-1 sm:gap-2 md:gap-3'>
                    {selectedProduct.medicalConditions.map((cond, i) => (
                      <span
                        key={i}
                        className='bg-blue-100 text-app-tertiary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm md:text-base font-semibold'>
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedProduct.allergens &&
                selectedProduct.allergens.length > 0 && (
                  <div className='border-t-1 border-app-primary pt-4 mt-2'>
                    <h4 className='font-semibold text-red-700 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base'>
                      Allergens
                    </h4>
                    <div className='flex flex-wrap gap-1 sm:gap-2 md:gap-3'>
                      {selectedProduct.allergens.map((allergen, i) => (
                        <span
                          key={i}
                          className='bg-red-100 text-red-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm md:text-base font-semibold'>
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* Tags above reviews/add to cart */}
          {selectedProduct.tags?.length > 0 && (
            <div className='flex flex-wrap gap-1 sm:gap-2 md:gap-3 mt-6'>
              {selectedProduct.tags.map((tag, i) => (
                <span
                  key={i}
                  className='px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-full bg-app-quaternary text-app-primary font-semibold border border-app-primary shadow'>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {/* Add to Cart Button and Rating at the bottom */}
          <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mt-4'>
            <div className='flex items-center w-full sm:w-auto mb-2 sm:mb-0'>
              <Rating>
                {[...Array(5)].map((_, i) => (
                  <RatingStar
                    key={i}
                    filled={i < Math.round(selectedProduct.rating)}
                  />
                ))}
                <p className='ml-2 text-xs sm:text-sm md:text-base font-medium text-app-tertiary'>
                  {selectedProduct.rating} out of 5
                </p>
              </Rating>
            </div>
            <div className='w-full sm:w-auto flex justify-center px-4 py-3 sm:px-0 sm:py-0'>
              <AddButton product={selectedProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
