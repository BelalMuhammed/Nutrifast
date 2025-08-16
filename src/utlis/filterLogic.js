export default function filterLogic(products = [], selectedFilters = {}) {
  return products.filter((product) => {
    // Categories filter
    if (
      selectedFilters.Categories?.length > 0 &&
      !selectedFilters.Categories.includes(product.category)
    ) {
      return false;
    }

    // DietTypes filter
    if (
      selectedFilters.DietTypes?.length > 0 &&
      !selectedFilters.DietTypes.some((type) =>
        product.dietTypes?.includes(type)
      )
    ) {
      return false;
    }

    // MedicalConditions filter
    if (
      selectedFilters.MedicalConditions?.length > 0 &&
      !selectedFilters.MedicalConditions.some((condition) =>
        product.medicalConditions?.includes(condition)
      )
    ) {
      return false;
    }

    // Allergens filter (exclude products containing selected allergens)
    if (
      selectedFilters.Allergens?.length > 0 &&
      selectedFilters.Allergens.some((allergen) =>
        product.allergens?.includes(allergen)
      )
    ) {
      return false; // exclude if product contains allergen
    }

    // Calories Range filter
    if (selectedFilters.CaloriesRange?.length === 2) {
      const [minCal, maxCal] = selectedFilters.CaloriesRange;
      if (product.calories < minCal || product.calories > maxCal) {
        return false;
      }
    }

    return true;
  });
}
