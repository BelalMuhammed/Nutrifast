import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProducts,
} from "../../Redux/slices/productSlice";
import RelatedProducts from "../../Components/productDetail/RelatedProducts/RelatedProducts";
import ProductDetailsCard from "../../Components/productDetail/ProductDetailsCard/ProductDetailsCard";
import LoaderSpinner from "../../Components/shared/Loaders/Loader";
import ProductReview from "../../Components/productDetail/ProductReview/ProductReview";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Fetch all products if not loaded (for RelatedProducts)
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  if (loading || !selectedProduct) return <LoaderSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Product Details Section */}
        <section className="mb-16">
          <ProductDetailsCard selectedProduct={selectedProduct} />
        </section>

        {/* Reviews Section */}
        <section className="mb-16">
          <div className=" border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-app-primary/5 to-app-secondary/5 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl lg:text-3xl font-bold text-app-tertiary mb-2">
                <span className="text-lg lg:text-xl font-semibold text-app-tertiary">
                  Customer Reviews
                </span>
              </h2>
              <p className="text-gray-600">
                See what our customers are saying about this product
              </p>
            </div>
            <div className="p-8">
              <ProductReview
                productId={selectedProduct.id}
                reviews={selectedProduct.reviews || []}
              />
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section>
          <div className="  border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-app-secondary/5 to-app-accent/5 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl lg:text-3xl font-bold text-app-tertiary mb-2">
                <span className="text-lg lg:text-xl font-semibold text-app-tertiary">
                  You Might Also Like
                </span>
              </h2>
              <p className="text-gray-600">
                Discover similar products in the same category
              </p>
            </div>
            <div className="p-8">
              <RelatedProducts
                category={selectedProduct.category}
                currentProductId={selectedProduct.id}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
