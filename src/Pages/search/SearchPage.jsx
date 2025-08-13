import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProductsByName } from "../../Redux/slices/productSlice";
import EmptyState from "../../Components/shared/EmptyState/EmptyState";
import Loader from "../../Components/shared/Loaders/Loader";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchName = queryParams.get("name");

  useEffect(() => {
    if (searchName) {
      dispatch(searchProductsByName(searchName));
    }
  }, [searchName, dispatch]);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-green-600">{searchName}</span>
      </h1>

      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <>
          <p className="mb-4 text-gray-500">{products.length} results found</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState message="No products found matching your search." />
      )}
    </div>
  );
}
