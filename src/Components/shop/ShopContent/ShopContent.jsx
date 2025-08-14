import SortSelect from "../SortSelect/SortSelect";
import ShopHeader from "../ShopHeader/ShopHeader";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

function ShopContent({ sortOption, setSortOption, sortedProducts, loading }) {
  return (
    <div className='flex-1'>
      <div className="flex justify-between  flex-col sm:flex-row items-center mb-6">
        <ShopHeader />
        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <ProductsGrid products={sortedProducts} loading={loading} />
    </div>
  );
}

export default ShopContent;
