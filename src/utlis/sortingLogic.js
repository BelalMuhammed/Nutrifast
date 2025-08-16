// src/utlis/sortingLogic.js
export default function sortingLogic(products = [], sortOption = "") {
  if (!sortOption) return products;

  const sorted = [...products];

  switch (sortOption) {
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "rating-high":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
}
