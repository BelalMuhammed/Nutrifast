// src/lib/isFreshDietMeal.js
// Centralized logic to determine if a product is a fresh diet meal
export default function isFreshDietMeal(product) {
  // You can adjust this logic as needed for your app
  return (
    product?.category?.toLowerCase() === "fresh diet meals" ||
    product?.tags?.some(
      (tag) =>
        tag.toLowerCase() === "fresh diet meal" ||
        tag.toLowerCase() === "fresh diet meals"
    )
  );
}
