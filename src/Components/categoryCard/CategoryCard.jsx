"use client";

export function CategoryCard({ category }) {
  return (
    <div className='w-full max-w-[280px] mx-auto rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300'>
      <img
        src={category.image}
        alt={category.name}
        className='w-full h-40 sm:h-44 md:h-48 object-cover'
      />
      <div className='p-3 sm:p-4'>
        <h5 className='text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate'>
          {category.name}
        </h5>
        <a
          href={`/category/${category.slug || category.id}`}
          className='text-app-tertiary text-sm sm:text-base hover:text-app-accent transition-colors duration-200'>
          Shop {category.name}
        </a>
      </div>
    </div>
  );
}

export default CategoryCard;
