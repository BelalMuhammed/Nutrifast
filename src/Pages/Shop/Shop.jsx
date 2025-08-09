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
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1030);
    };
    handleResize(); // check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const sortedProducts =
  sortOption === ""
    ? products
    : [...products].sort((a, b) => {
        if (sortOption === "price-high") return b.price - a.price;
        if (sortOption === "price-low") return a.price - b.price;
        if (sortOption === "rating-high") return b.rating - a.rating;
        return 0;
      });

  return (
    <div className='flex gap-6 px-6 py-8 min-h-screen'>
      {/* Sidebar or Drawer */}
      {isMobile ? (
        <>
          <Button onClick={() => setDrawerOpen(true)} className='mb-4'>
            Filters
          </Button>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}
              className="transition-all duration-500 ease-in-out">
            <DrawerHeader title='Filters' />
            <DrawerItems>
              <SideFilter />
            </DrawerItems>
          </Drawer>
        </>
      ) : (
        <div className='w-[280px] shrink-0'>
          <SideFilter />
        </div>
      )}

      {/* Main Content */}
      <div className='flex-1'>
        <h1 className='text-2xl font-semibold text-app-primary mb-3'>
          Shop All Products
        </h1>

        <div className='flex flex-wrap gap-2 mb-6'>
          {["Plant-Based", "Free from Gluten", "0-200 Calories"].map((tag) => (
            <span
              key={tag}
              className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium'>
              {tag}
            </span>
          ))}
        </div>

        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />

        <div className='flex flex-wrap gap-6 justify-center'>
          {loading ? (
            <div className='w-full flex justify-center pt-10'>
              <Spinner size='xl' color='success' />
            </div>
          ) : (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
