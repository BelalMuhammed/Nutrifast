import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/slices/productSlice";
import SideFilter from "../../Components/shop/SideFilter/SideFilter";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import { Spinner } from "flowbite-react";

function Shop() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex gap-6 px-6 py-8 bg-app-muted min-h-screen">
      {/* Sidebar Filters */}
      <div className="w-[280px] shrink-0">
        <SideFilter />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Page Header */}
        <h1 className="text-2xl font-semibold text-app-primary mb-3">Shop All Products</h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Plant-Based", "Free from Gluten", "0-200 Calories"].map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-3 mb-15">
          <span className="text-sm font-semibold text-gray-800">Sort By</span>
          {["Price", "Popularity", "Rating", "Newest"].map((option) => (
            <button
              key={option}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex flex-wrap gap-15 justify-center">
          {loading ? (
            <div className="w-full flex justify-center pt-10">
              <Spinner size="xl" color="success" />
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
