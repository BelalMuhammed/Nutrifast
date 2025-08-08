import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Components/shop/ProductCard/ProductCard";
import { fetchProducts } from "../../Redux/slices/productSlice";
import LoaderSpinner from "../../Components/shared/Loaders/Loader";

function Shop() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {loading ? (
        // <p>Loading...</p>
        <LoaderSpinner />
      ) : (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      )}
    </div>
  );
}

export default Shop;
