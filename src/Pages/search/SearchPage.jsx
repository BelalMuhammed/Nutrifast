import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  searchProductsByName,
  fetchProducts,
} from "../../Redux/slices/productSlice";
import EmptyState from "../../Components/shared/EmptyState/EmptyState";
import Loader from "../../Components/shared/Loaders/Loader";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import PaginationComponent from "../../Components/pagination/Pagination";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
  FiSliders,
} from "react-icons/fi";

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const itemsPerPage = 12;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchName = queryParams.get("name");

  useEffect(() => {
    if (searchName && searchName.trim() !== "") {
      setLocalSearchTerm(searchName);
      dispatch(searchProductsByName(searchName));
    } else {
      dispatch(fetchProducts());
    }
  }, [searchName, dispatch]);

  // Sorting logic
  const sortedProducts = React.useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sorted;
  }, [products, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = () => {
    if (localSearchTerm.trim()) {
      navigate(`/search?name=${localSearchTerm.trim()}`);
    } else {
      navigate("/search");
    }
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    navigate("/search");
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-app-quaternary/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-app-secondary mb-2'>
                {searchName ? "Search Results" : "All Products"}
              </h1>
              <p className='text-gray-600'>
                {searchName ? (
                  <>
                    Showing results for "
                    <span className='font-semibold text-app-primary'>
                      {searchName}
                    </span>
                    "
                  </>
                ) : (
                  "Discover our complete collection of healthy products"
                )}
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className='flex items-center gap-2 bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-3 min-w-[300px]'>
              <FiSearch className='text-gray-400' size={20} />
              <input
                type='text'
                placeholder='Search for products...'
                className='flex-1 outline-none text-app-tertiary placeholder-gray-400'
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {localSearchTerm && (
                <button
                  onClick={handleClearSearch}
                  className='text-gray-400 hover:text-red-500 transition-colors duration-200'>
                  <FiX size={18} />
                </button>
              )}
              <button
                onClick={handleSearch}
                className='bg-app-primary text-white px-4 py-2 rounded-xl hover:bg-app-tertiary transition-all duration-200 font-medium'>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            {/* Results Count & Filter Toggle */}
            <div className='flex items-center gap-4'>
              <span className='text-gray-600 font-medium'>
                {loading
                  ? "Loading..."
                  : `${sortedProducts.length} products found`}
              </span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='flex items-center gap-2 text-app-primary hover:text-app-tertiary transition-colors duration-200 font-medium'>
                <FiSliders size={16} />
                Filters
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              </button>
            </div>

            {/* View Controls */}
            <div className='flex items-center gap-4'>
              {/* Sort Options */}
              <div className='flex items-center gap-2'>
                <span className='text-gray-600 text-sm font-medium'>
                  Sort by:
                </span>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => handleSortChange("name")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      sortBy === "name"
                        ? "bg-app-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    Name{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                  <button
                    onClick={() => handleSortChange("price")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      sortBy === "price"
                        ? "bg-app-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    Price{" "}
                    {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className='flex items-center bg-gray-100 rounded-lg p-1'>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white text-app-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label='Grid view'>
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white text-app-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label='List view'>
                  <FiList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Price Range
                  </label>
                  <select className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-app-primary focus:border-transparent'>
                    <option>All Prices</option>
                    <option>Under 50 EGP</option>
                    <option>50 - 100 EGP</option>
                    <option>100 - 200 EGP</option>
                    <option>Over 200 EGP</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Category
                  </label>
                  <select className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-app-primary focus:border-transparent'>
                    <option>All Categories</option>
                    <option>Supplements</option>
                    <option>Protein</option>
                    <option>Vitamins</option>
                    <option>Healthy Snacks</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Rating
                  </label>
                  <select className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-app-primary focus:border-transparent'>
                    <option>All Ratings</option>
                    <option>4+ Stars</option>
                    <option>3+ Stars</option>
                    <option>2+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <Loader />
          </div>
        ) : sortedProducts.length > 0 ? (
          <>
            {/* Products Grid/List */}
            <div
              className={`mb-8 ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }`}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-center'>
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className='py-20'>
            <EmptyState
              message={
                searchName
                  ? `No products found for "${searchName}"`
                  : "No products available"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
