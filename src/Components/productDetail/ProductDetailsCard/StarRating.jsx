import React from "react";
import { Rating } from "flowbite-react";

export default function StarRating({ value }) {
  return (
    <Rating>
      {[...Array(5)].map((_, i) => (
        <Rating.Star key={i} filled={i < Math.round(value)} />
      ))}
      <span className='ml-2 text-sm font-medium text-app-tertiary'>
        {value}/5
      </span>
    </Rating>
  );
}
