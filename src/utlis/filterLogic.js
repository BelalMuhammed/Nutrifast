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
      !selectedFilters.MedicalConditions.some((cond) =>
        product.medicalConditions?.includes(cond)
      )
    ) {
      return false;
    }

    // Allergens filter (exclude if product contains selected allergen)
    if (
      selectedFilters.Allergens?.length > 0 &&
      selectedFilters.Allergens.some((allergen) =>
        product.allergens?.includes(allergen)
      )
    ) {
      return false;
    }

    return true;
  });
}
