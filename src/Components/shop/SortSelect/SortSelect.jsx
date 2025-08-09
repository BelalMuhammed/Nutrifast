import { Select } from "flowbite-react";

function SortSelect({ sortOption, setSortOption }) {
  return (
    <div className='flex items-center gap-3 mb-6'>
      <span className='text-sm font-semibold text-gray-800'>Sort By</span>
      <Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className='w-64'
      >
        <option value=''>--Sort by--</option>
        <option value='price-high'>Price: High to Low</option>
        <option value='price-low'>Price: Low to High</option>
        <option value='rating-high'>Top Rated</option>
      </Select>
    </div>
  );
}

export default SortSelect;
