"use client";
export function CustomerFavCard({ fav }) {
  return (
    <div className="flex flex-col w-full max-w-[340px] mx-auto min-h-[260px] sm:min-h-[280px] rounded-2xl overflow-hidden shadow-lg bg-white/80 backdrop-blur-md transition-all duration-300">
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
          <span className="text-app-accent font-bold text-base bg-white/90 px-2 py-0.5 rounded-full">
            {fav.price} EGP
          </span>
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="text-app-tertiary text-xs truncate bg-white/70 px-2 py-0.5 rounded-full">
            From: {fav.brand}
          </span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-app-primary shadow-lg transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 17h8.7a1 1 0 00.95-.68L21 9M7 13V6h13"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerFavCard;
