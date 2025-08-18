"use client";
export function CustomerFavCard({ fav }) {
  return (
    <div className="flex flex-col w-full max-w-[280px] mx-auto h-[280px] sm:h-[300px] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-300">
      <img
        src={fav.image}
        alt={fav.name}
        className="w-full h-40 sm:h-44 md:h-48 object-cover"
      />
      <div className="flex flex-col flex-grow p-3 sm:p-4">
        <h5 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
          {fav.name}
        </h5>
        <div className="flex flex-col gap-1 sm:gap-2">
          <span className="text-app-tertiary font-semibold text-base sm:text-lg">
            {fav.price} EGP
          </span>
          <span className="text-app-tertiary text-xs sm:text-sm truncate">
            From: {fav.brand}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CustomerFavCard;
