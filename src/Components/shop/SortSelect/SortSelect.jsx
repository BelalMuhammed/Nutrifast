import { Select } from "flowbite-react";

function SortSelect({ sortOption, setSortOption }) {
  return (
    <div className='flex items-center gap-4 mb-6  px-5 py-3 '>
      <span className='text-base font-semibold text-app-primary mr-2'>
        Sort By
      </span>
      <Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className='w-56 rounded-lg border border-gray-200 focus:ring-green-500 focus:border-green-500 text-gray-700 font-medium bg-gray-50 '>
        <option value=''>-- Sort by --</option>
        <option value='price-high'>Price: High to Low</option>
        <option value='price-low'>Price: Low to High</option>
        <option value='rating-high'>Top Rated</option>
      </Select>
    </div>
  );
}

export default SortSelect;
