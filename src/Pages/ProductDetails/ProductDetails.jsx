import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Redux/slices/productSlice";
import RelatedProducts from "../../Components/productDetail/RelatedProducts/RelatedProducts";
import ProductDetailsCard from "../../Components/productDetail/ProductDetailsCard/ProductDetailsCard";
import LoaderSpinner from "../../Components/shared/Loaders/Loader";
import ProductReview from "../../Components/productDetail/ProductDetailsCard/ProductReview";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct) return <LoaderSpinner />;

  return (
    <>
      <ProductDetailsCard selectedProduct={selectedProduct} />
      <ProductReview
        productId={selectedProduct.id}
        reviews={selectedProduct.reviews || []}
      />
      <RelatedProducts
        category={selectedProduct.category}
        currentProductId={selectedProduct.id}
      />
    </>
  );
}

export default ProductDetails;
