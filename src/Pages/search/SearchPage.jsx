import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  searchProductsByName,
  fetchProducts,
} from "../../Redux/slices/productSlice";
import EmptyState from "../../Components/shared/EmptyState/EmptyState";
import Loader from "../../Components/shared/Loaders/Loader";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import PaginationComponent from "../../Components/pagination/Pagination";

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchName = queryParams.get("name");

  useEffect(() => {
    if (searchName && searchName.trim() !== "") {
      dispatch(searchProductsByName(searchName));
    } else {
      dispatch(fetchProducts());
    }
  }, [searchName, dispatch]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white p-6 w-[85%] mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {searchName ? (
          <>
            Search results for:{" "}
            <span className="text-green-600">{searchName}</span>
          </>
        ) : (
          "All Products"
        )}
      </h1>

      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <>
          <p className="mb-4 text-gray-500">{products.length} results found</p>
          <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 justify-center">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState message="No products found." />
      )}
    </div>
  );
}
