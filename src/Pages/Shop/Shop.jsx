import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchProducts,
  searchProductsByName,
} from "../../Redux/slices/productSlice";
import SideFilter from "../../Components/shop/SideFilter/SideFilter";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import MobileFilterButton from "../../Components/shop/MobileFilterButton/MobileFilterButton";
import {
  FiSearch,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
  FiSliders,
  FiShoppingBag,
} from "react-icons/fi";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import Loader from "../../Components/shared/Loaders/Loader";
import EmptyState from "../../Components/shared/EmptyState/EmptyState";

function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading } = useSelector((state) => state.products);

  // States
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  // Get search term from URL
  const queryParams = new URLSearchParams(location.search);
  const searchName = queryParams.get("name");

  // Fetch products based on search term
  useEffect(() => {
    if (searchName && searchName.trim() !== "") {
      setLocalSearchTerm(searchName);
      dispatch(searchProductsByName(searchName));
    } else {
      dispatch(fetchProducts());
      setLocalSearchTerm("");
    }
  }, [searchName, dispatch]);

  // Update filtered products when products change
  useEffect(() => {
    setFilteredProducts(products || []);
  }, [products]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1030);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSortedProducts = () => {
    if (!sortOption) return filteredProducts;

    const sorted = [...filteredProducts].sort((a, b) => {
      const [field, order] = sortOption.split("-");
      let aValue = a[field];
      let bValue = b[field];

      if (field === "rating") {
        // Handle rating sorting - higher ratings first for desc, lower first for asc
        aValue = a.rating || 0;
        bValue = b.rating || 0;
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sorted;
  };

  const handleSearch = () => {
    if (localSearchTerm.trim()) {
      navigate(`/shop?name=${localSearchTerm.trim()}`);
    } else {
      navigate("/shop");
    }
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    navigate("/shop");
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-app-quaternary/20 overflow-x-hidden'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6'>
            <div className='text-center lg:text-left'>
              <div className='flex items-center justify-center lg:justify-start gap-3 mb-3'>
                <div className='bg-app-primary/10 p-3 rounded-xl'>
                  <FiShoppingBag className='text-app-primary' size={32} />
                </div>
                <div className='min-w-0'>
                  <h1 className='text-2xl lg:text-3xl font-bold text-app-secondary break-words'>
                    {searchName ? "Search Results" : "Shop All Products"}
                  </h1>
                  <p className='text-gray-600 mt-1 text-sm lg:text-base break-words'>
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
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className='w-full lg:max-w-md'>
              <div className='flex items-center gap-2 bg-white rounded-2xl shadow-lg border border-gray-200 px-3 lg:px-4 py-3'>
                <FiSearch
                  className='text-app-primary flex-shrink-0'
                  size={20}
                />
                <input
                  type='text'
                  placeholder='Search for healthy products...'
                  className='flex-1 outline-none text-app-tertiary placeholder-gray-400 font-medium min-w-0 text-sm lg:text-base'
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                {localSearchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className='text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 flex-shrink-0'>
                    <FiX size={18} />
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className='bg-app-primary text-white px-3 lg:px-6 py-2 rounded-xl hover:bg-app-tertiary transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm lg:text-base flex-shrink-0'>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-3 lg:p-4 mb-8'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
            {/* Results Count & Filter Toggle */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start gap-4'>
              <span className='text-gray-600 font-medium text-sm lg:text-base'>
                {loading
                  ? "Loading..."
                  : `${sortedProducts.length} products found`}
              </span>
              {!isMobile && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className='flex items-center gap-2 text-app-primary hover:text-app-tertiary transition-colors duration-200 font-medium text-sm lg:text-base'>
                  <FiSliders size={16} />
                  Filters
                  <FiChevronDown
                    className={`transition-transform duration-200 ${
                      showFilters ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>
              )}
            </div>

            {/* View Controls */}
            <div className='flex flex-col xl:flex-row items-start xl:items-center gap-4'>
              {/* Sort Options */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 w-full xl:w-auto'>
                <span className='text-gray-600 text-sm font-medium whitespace-nowrap'>
                  Sort by:
                </span>
                <div className='flex items-center gap-2 flex-wrap'>
                  <button
                    onClick={() =>
                      setSortOption(
                        sortOption === "name-asc" ? "name-desc" : "name-asc"
                      )
                    }
                    className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      sortOption.startsWith("name")
                        ? "bg-app-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    Name{" "}
                    {sortOption === "name-asc"
                      ? "↑"
                      : sortOption === "name-desc"
                      ? "↓"
                      : ""}
                  </button>
                  <button
                    onClick={() =>
                      setSortOption(
                        sortOption === "price-asc" ? "price-desc" : "price-asc"
                      )
                    }
                    className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      sortOption.startsWith("price")
                        ? "bg-app-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    Price{" "}
                    {sortOption === "price-asc"
                      ? "↑"
                      : sortOption === "price-desc"
                      ? "↓"
                      : ""}
                  </button>
                  <button
                    onClick={() =>
                      setSortOption(
                        sortOption === "rating-desc"
                          ? "rating-asc"
                          : "rating-desc"
                      )
                    }
                    className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      sortOption.startsWith("rating")
                        ? "bg-app-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    Top Rated{" "}
                    {sortOption === "rating-desc"
                      ? "⭐"
                      : sortOption === "rating-asc"
                      ? "↑"
                      : ""}
                  </button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className='flex items-center bg-gray-100 rounded-xl p-1 ml-auto xl:ml-0'>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white text-app-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label='Grid view'
                  title='Grid View'>
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white text-app-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label='List view'
                  title='List View'>
                  <FiList size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-8'>
          {/* Sidebar Filters */}
          {isMobile ? (
            <>
              <MobileFilterButton onClick={() => setDrawerOpen(true)} />
              <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                className='transition-all duration-600 ease-in-out w-full max-w-[400px]'
                position='left'>
                <DrawerHeader title='Filters' />
                <DrawerItems>
                  <SideFilter
                    products={products}
                    onFilter={setFilteredProducts}
                  />
                </DrawerItems>
              </Drawer>
            </>
          ) : (
            <div
              className={`transition-all duration-300 ${
                showFilters
                  ? "w-full lg:w-[300px] xl:w-[320px] opacity-100"
                  : "w-0 opacity-0 overflow-hidden"
              }`}>
              {showFilters && (
                <SideFilter
                  products={products}
                  onFilter={setFilteredProducts}
                />
              )}
            </div>
          )}

          {/* Products Content */}
          <div className='flex-1 min-w-0 w-full'>
            {loading ? (
              <div className='flex justify-center items-center py-20'>
                <Loader />
              </div>
            ) : sortedProducts.length > 0 ? (
              <div
                className={`w-full ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6"
                    : "space-y-4"
                }`}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
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
      </div>
    </div>
  );
}

export default Shop;
