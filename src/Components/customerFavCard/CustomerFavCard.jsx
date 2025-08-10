"use client";

import { Button } from "flowbite-react";

export function CustomerFavCard({ fav }) {
  return (
    <div className="flex flex-col w-64 h-[350px] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      <img
        src={fav.image}
        alt={fav.name}
        className="w-full h-48 object-cover"
      />

      <div className="flex flex-col flex-grow p-4">
        <h5 className="text-base font-semibold text-gray-900 mb-1 truncate">
          {fav.name}
        </h5>

        <p className="text-sm mb-3">
          <span className="text-green-600 font-semibold">{fav.price} EGP</span>
          <span className="text-gray-500"> · {fav.brand}</span>
        </p>

        <div className="flex-grow" />

        <Button
          color="success"
          className="w-full rounded-lg btn-app text-sm font-medium"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default CustomerFavCard;
