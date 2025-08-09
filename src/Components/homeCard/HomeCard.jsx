"use client";

import { Card } from "flowbite-react";

export function HomeCard({ category }) {
  return (
    <Card
      className="max-w-sm"
      renderImage={() => (
        <img width={500} height={500} src={category.image} alt="" />
      )}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {category.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </Card>
  );
}

export default HomeCard;
