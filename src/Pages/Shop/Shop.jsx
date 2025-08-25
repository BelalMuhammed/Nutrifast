import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useEffect, useState, useCallback } from "react";
import {
  FiChevronDown,
  FiGrid,
  FiList,
  FiSearch,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/shared/Loaders/Loader";
import MobileFilterButton from "../../Components/shop/MobileFilterButton/MobileFilterButton";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import SideFilter from "../../Components/shop/SideFilter/SideFilter";
import {
  fetchProducts,
  searchProductsByName,
} from "../../Redux/slices/productSlice";
import filterLogic from "../../utlis/filterLogic";

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
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [displayedCount, setDisplayedCount] = useState(12);

  // Optimistic filter states for immediate UI updates
  const [optimisticFilters, setOptimisticFilters] = useState({
    Categories: [],
    DietTypes: [],
    MedicalConditions: [],
    Allergens: [],
    CaloriesRange: [0, 1000],
  });

  const PRODUCTS_PER_PAGE = 12;

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

  // Update filtered products when products or queryParams change
  useEffect(() => {
    if (products.length === 0) return;
    const queryParams = new URLSearchParams(location.search);
    // Build filters from queryParams
    const filters = {
      Categories: queryParams.get("category")
        ? queryParams.get("category").split(",")
        : [],
      DietTypes: queryParams.get("dietTypes")
        ? queryParams.get("dietTypes").split(",")
        : [],
      MedicalConditions: queryParams.get("medicalConditions")
        ? queryParams.get("medicalConditions").split(",")
        : [],
      Allergens: queryParams.get("allergens")
        ? queryParams.get("allergens").split(",")
        : [],
      CaloriesRange: queryParams.get("caloriesRange")
        ? queryParams.get("caloriesRange").split(",").map(Number)
        : [0, 1000],
    };

    // Sync optimistic filters with URL
    setOptimisticFilters(filters);

    setFilteredProducts(filterLogic(products, filters));
    setDisplayedCount(12);
  }, [products, location.search]);

  // Handler to update filters in queryParams
  const handleFilterChange = useCallback(
    (group, values) => {
      // Immediately update optimistic state for instant UI feedback
      const newOptimisticFilters = {
        ...optimisticFilters,
        [group]: values,
      };
      setOptimisticFilters(newOptimisticFilters);

      // Apply filters immediately to products for instant visual feedback
      if (products.length > 0) {
        setFilteredProducts(filterLogic(products, newOptimisticFilters));
      }

      // Then update URL (this will eventually sync back via useEffect)
      const params = new URLSearchParams(location.search);
      if (group === "Categories") {
        if (values.length > 0) {
          params.set("category", values.join(","));
        } else {
          params.delete("category");
        }
      } else if (group === "DietTypes") {
        if (values.length > 0) {
          params.set("dietTypes", values.join(","));
        } else {
          params.delete("dietTypes");
        }
      } else if (group === "MedicalConditions") {
        if (values.length > 0) {
          params.set("medicalConditions", values.join(","));
        } else {
          params.delete("medicalConditions");
        }
      } else if (group === "Allergens") {
        if (values.length > 0) {
          params.set("allergens", values.join(","));
        } else {
          params.delete("allergens");
        }
      } else if (group === "CaloriesRange") {
        if (values[0] !== 0 || values[1] !== 1000) {
          params.set("caloriesRange", values.join(","));
        } else {
          params.delete("caloriesRange");
        }
      }
      navigate(
        { pathname: "/shop", search: params.toString() },
        { replace: true }
      );
    },
    [optimisticFilters, products, location.search, navigate]
  );

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
    setDisplayedCount(12);
    navigate("/shop");
  };

  const handleShowMore = () => {
    setDisplayedCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  const sortedProducts = getSortedProducts();
  const displayedProducts = sortedProducts.slice(0, displayedCount);
  const hasMoreProducts = sortedProducts.length > displayedCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-app-quaternary/20 overflow-x-hidden">
      {/* <Loader /> */}
      <div className="app-container  mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="text-center lg:text-left">
              <div className="min-w-0">
                <h1 className="text-2xl lg:text-3xl font-bold text-app-secondary break-words">
                  {searchName ? "Search Results" : null}
                </h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base break-words">
                  {searchName ? (
                    <>
                      Showing results for "
                      <span className="font-semibold text-app-primary">
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
        </div>

        {/* Controls Bar */}
        <div className="mb-8">
          {/* Search Bar above controls */}
          <div className="mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 px-3 lg:px-4 py-3">
                <FiSearch
                  className="text-app-primary flex-shrink-0"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search for healthy products..."
                  className="flex-1 outline-none text-app-tertiary placeholder-gray-400 font-medium min-w-0 text-sm lg:text-base"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                {localSearchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 flex-shrink-0"
                  >
                    <FiX size={18} />
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className="bg-app-primary text-white px-3 lg:px-6 py-2 rounded-xl hover:bg-app-tertiary transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm lg:text-base flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar Filters */}
          {isMobile ? (
            <>
              <MobileFilterButton onClick={() => setDrawerOpen(true)} />
              <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                className="transition-all duration-600 ease-in-out w-full max-w-[400px]"
                position="left"
              >
                <DrawerHeader title="Filters" />
                <DrawerItems>
                  <SideFilter
                    selectedCategories={optimisticFilters.Categories}
                    onFilterChange={handleFilterChange}
                    selectedDietTypes={optimisticFilters.DietTypes}
                    selectedMedicalConditions={
                      optimisticFilters.MedicalConditions
                    }
                    selectedAllergens={optimisticFilters.Allergens}
                    selectedCaloriesRange={optimisticFilters.CaloriesRange}
                    onClose={() => setDrawerOpen(false)}
                  />
                </DrawerItems>
              </Drawer>
            </>
          ) : (
            <div
              className={`transition-all duration-300 w-full lg:w-[300px] xl:w-[320px] opacity-100`}
            >
              <SideFilter
                selectedCategories={optimisticFilters.Categories}
                onFilterChange={handleFilterChange}
                selectedDietTypes={optimisticFilters.DietTypes}
                selectedMedicalConditions={optimisticFilters.MedicalConditions}
                selectedAllergens={optimisticFilters.Allergens}
                selectedCaloriesRange={optimisticFilters.CaloriesRange}
              />
            </div>
          )}

          {/* Products Content */}
          <div className="flex-1 min-w-0 w-full">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader />
              </div>
            ) : sortedProducts.length > 0 ? (
              <>
                {/* Perfect Responsive Product Count, Sort Controls, and View Mode Toggle above cards */}
                <div className="w-full flex flex-wrap items-center justify-between mb-4 gap-2 sm:gap-4">
                  <span className="text-xs sm:text-sm text-gray-500 font-normal mb-2 sm:mb-0">
                    Showing {displayedProducts.length} of{" "}
                    {sortedProducts.length} products
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                        Sort by:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() =>
                            setSortOption(
                              sortOption === "name-asc"
                                ? "name-desc"
                                : "name-asc"
                            )
                          }
                          className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${sortOption.startsWith("name")
                              ? "bg-app-primary text-white shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
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
                              sortOption === "price-asc"
                                ? "price-desc"
                                : "price-asc"
                            )
                          }
                          className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${sortOption.startsWith("price")
                              ? "bg-app-primary text-white shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
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
                          className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${sortOption.startsWith("rating")
                              ? "bg-app-primary text-white shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                          Top Rated{" "}
                          {sortOption === "rating-desc"
                            ? "⭐"
                            : sortOption === "rating-asc"
                              ? "↑"
                              : ""}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-xl p-1 mt-2 sm:mt-0">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid"
                            ? "bg-white text-app-primary shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                          }`}
                        aria-label="Grid view"
                        title="Grid View"
                      >
                        <FiGrid size={18} className="sm:size-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "list"
                            ? "bg-white text-app-primary shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                          }`}
                        aria-label="List view"
                        title="List View"
                      >
                        <FiList size={18} className="sm:size-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full ${viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6"
                    : "space-y-4"
                    }`}
                >
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Show More Button */}
                {hasMoreProducts && (
                  <div className="w-full flex justify-center mt-4">
                    <button
                      onClick={handleShowMore}
                      className="text-gray-500 font-normal text-base underline hover:text-gray-700 transition-colors duration-200 bg-transparent p-0 m-0 border-none shadow-none flex items-center gap-2"
                      style={{ background: "none" }}
                    >
                      <span>Show More Products</span>
                      <FiChevronDown size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center  px-4">
                {/* Empty State Container */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 max-w-md w-full text-center">
                  {/* Icon Section */}
                  <div>
                    <div className="bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-full w-24 h-24 mx-auto flex items-center justify-center ">
                      <FiSearch className="text-app-primary" size={40} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-app-secondary">
                      {searchName
                        ? "No Results Found"
                        : "No Products Available"}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {searchName ? (
                        <>
                          We couldn't find any products matching{" "}
                          <span className="font-semibold text-app-primary">
                            "{searchName}"
                          </span>
                          <br />
                          Try adjusting your search or browse our categories.
                        </>
                      ) : (
                        "Our shelves are currently being restocked with healthy products. Check back soon!"
                      )}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      {searchName ? (
                        <>
                          <button
                            onClick={handleClearSearch}
                            className="text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            style={{
                              backgroundColor: "#388e3c",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#4caf50")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "#388e3c")
                            }
                          >
                            <FiX size={18} />
                            Clear Search
                          </button>
                          <button
                            onClick={() => navigate("/shop")}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <FiShoppingBag size={18} />
                            Browse All
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => window.location.reload()}
                          className="text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                          style={{
                            backgroundColor: "#388e3c",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#4caf50")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#388e3c")
                          }
                        >
                          <FiSearch size={18} />
                          Reset filter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
