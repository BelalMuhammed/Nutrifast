import { Select } from "flowbite-react";

function SortSelect({ sortOption, setSortOption }) {
  return (
    <div className='flex items-center gap-4 mb-6  '>
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 bg-app-primary rounded-full'></div>
        <span className='text-lg font-bold text-app-tertiary tracking-wide'>
          Sort By
        </span>
      </div>
      <Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className='w-56 rounded-lg border border-gray-200 focus:ring-green-500 focus:border-green-500 text-gray-700 font-medium bg-gray-50 '>
        <option value=''>Sort Products</option>
        <option value='price-high'>Price: High to Low</option>
        <option value='price-low'>Price: Low to High</option>
        <option value='rating-high'>Top Rated</option>
      </Select>
    </div>
  );
}

export default SortSelect;
