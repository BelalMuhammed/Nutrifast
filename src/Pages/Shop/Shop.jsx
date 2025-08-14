import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/slices/productSlice";
import SideFilter from "../../Components/shop/SideFilter/SideFilter";
import sortingLogic from "../../utlis/sortingLogic";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import MobileFilterButton from "../../Components/shop/MobileFilterButton/MobileFilterButton";
import ShopContent from "../../Components/shop/ShopContent/ShopContent";

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
          <MobileFilterButton onClick={() => setDrawerOpen(true)} />
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

      <ShopContent
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortedProducts={getSortedProducts()}
        loading={loading}
      />
    </div>
  );
}

export default Shop;
