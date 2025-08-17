import { Spinner } from "flowbite-react";
import ProductCard from "../ProductCard/ProductCard";
import { FiSearch, FiFilter, FiRefreshCw, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

function ProductsGrid({ products, loading }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Reset pagination when products change
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedProducts(products.slice(0, productsPerPage));
  }, [products]);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * productsPerPage;

    setDisplayedProducts(products.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  const hasMoreProducts = currentPage * productsPerPage < products.length;

  return (
    <div className='w-full'>
      <div className='flex flex-wrap gap-5 justify-center lg:justify-start'>
        {loading ? (
          <div className='w-full flex justify-center pt-10'>
            <Spinner size='xl' color='success' />
          </div>
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : products.length === 0 ? (
          <div className='w-full flex flex-col items-center justify-center py-16 px-4'>
            <div className='bg-app-quaternary/10 rounded-full p-6 mb-6'>
              <FiSearch className='text-6xl text-app-tertiary/40' />
            </div>

            <h3 className='text-2xl font-bold text-app-tertiary mb-3'>
              No Products Found
            </h3>

            <p className='text-app-tertiary/70 text-center mb-6 max-w-md leading-relaxed'>
              We couldn't find any products matching your current filters. Try
              adjusting your search criteria to discover more items.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 items-center'>
              <div className='flex items-center gap-2 text-sm text-app-tertiary/60'>
                <FiFilter className='text-app-accent' />
                <span>Try removing some filters</span>
              </div>

              <div className='flex items-center gap-2 text-sm text-app-tertiary/60'>
                <FiRefreshCw className='text-app-accent' />
                <span>Browse all categories</span>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className='mt-6 bg-app-primary hover:bg-app-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'>
              Reset All Filters
            </button>
          </div>
        ) : null}
      </div>

      {/* Show More Button */}
      {!loading && hasMoreProducts && displayedProducts.length > 0 && (
        <div className='w-full flex justify-center mt-12'>
          <button
            onClick={handleShowMore}
            className='group flex items-center gap-3 bg-app-primary hover:bg-app-tertiary text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg'>
            <span>Show More Products</span>
            <FiChevronDown className='text-xl group-hover:animate-bounce' />
          </button>
        </div>
      )}

      {/* Products Counter */}
      {!loading && products.length > 0 && (
        <div className='w-full flex justify-center mt-6'>
          <p className='text-sm text-app-tertiary/70'>
            Showing {displayedProducts.length} of {products.length} products
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductsGrid;
