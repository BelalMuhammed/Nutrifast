"use client";

export function HomeCard({ category }) {
  return (
    <div className="min-w-[250px] rounded-xl overflow-hidden shadow-sm bg-white">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h5 className="text-lg font-semibold text-gray-900">{category.name}</h5>
        <a
          href={`/category/${category.slug || category.id}`}
          className="text-green-600 hover:underline"
        >
          Shop {category.name}
        </a>
      </div>
    </div>
  );
}

export default HomeCard;
