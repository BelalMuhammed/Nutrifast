import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/slices/productSlice";
import SideFilter from "../../Components/shop/SideFilter/SideFilter";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import sortingLogic from "../../utlis/sortingLogic";

import {
  Spinner,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Button,
} from "flowbite-react";
import SortSelect from "../../Components/shop/SortSelect/SortSelect";
import { FiMenu } from "react-icons/fi";

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

  const getSortedProducts = () => {
    return sortingLogic(filteredProducts, sortOption);
  };
  return (
    <div className='flex gap-6 px-6 py-8 min-h-screen'>
      {/* Sidebar or Drawer */}
      {isMobile ? (
        <>
          <div className='fixed bottom-8 left-6 z-30'>
            <Button
              onClick={() => setDrawerOpen(true)}
              color='success'
              className='rounded-full shadow-lg px-6 py-2 font-medium flex items-center gap-2 bg-white cursor-pointer'>
              <FiMenu size={20} />
              Filters
            </Button>
          </div>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            className='transition-all duration-600 ease-in-out w-[370px]'
            position='left'>
            <DrawerHeader title='Filters' />
            <DrawerItems>
              <SideFilter products={products} onFilter={setFilteredProducts} />
            </DrawerItems>
          </Drawer>
        </>
      ) : (
        <div className='w-[280px] shrink-0'>
          <SideFilter products={products} onFilter={setFilteredProducts} />
        </div>
      )}
      <div className='flex-1'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-app-primary  tracking-tight text-center'>
            Shop All Products
          </h1>
        </div>
        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
        {/* Product Grid */}
        <div className='flex flex-wrap gap-5 justify-center '>
          {loading ? (
            <div className='w-full flex justify-center pt-10'>
              <Spinner size='xl' color='success' />
            </div>
          ) : getSortedProducts().length > 0 ? (
            getSortedProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className='text-gray-500 pt-10'>
              No products found matching your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
