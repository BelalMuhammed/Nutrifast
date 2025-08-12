import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/slices/productSlice";
import SideFilter from "../../Components/shop/SideFilter/SideFilter";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import {
  Spinner,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Button,
} from "flowbite-react";
import SortSelect from "../../Components/shop/SortSelect/SortSelect";

function Shop() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  // Sorting logic
  const getSortedProducts = () => {
    if (!sortOption) return filteredProducts;

    const sorted = [...filteredProducts];
    if (sortOption === "price-high")
      return sorted.sort((a, b) => b.price - a.price);
    if (sortOption === "price-low")
      return sorted.sort((a, b) => a.price - b.price);
    if (sortOption === "rating-high")
      return sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  };

  return (
    <div className="flex gap-6 px-6 py-8 min-h-screen">
      {/* Sidebar or Drawer */}
      {isMobile ? (
        <>
          <Button onClick={() => setDrawerOpen(true)} className="mb-4">
            Filters
          </Button>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            className="transition-all duration-500 ease-in-out"
          >
            <DrawerHeader title="Filters" />
            <DrawerItems>
              <SideFilter products={products} onFilter={setFilteredProducts} />
            </DrawerItems>
          </Drawer>
        </>
      ) : (
        <div className="w-[280px] shrink-0">
          <SideFilter products={products} onFilter={setFilteredProducts} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-app-primary mb-3">
          Shop All Products
        </h1>

        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />

        {/* Product Grid */}
        <div className="flex flex-wrap gap-5 justify-center">
          {loading ? (
            <div className="w-full flex justify-center pt-10">
              <Spinner size="xl" color="success" />
            </div>
          ) : getSortedProducts().length > 0 ? (
            getSortedProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 pt-10">
              No products found matching your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
