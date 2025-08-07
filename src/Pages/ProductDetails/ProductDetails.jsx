import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Redux/slices/productSlice";


function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct) return <p>Loading...</p>;

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold'>{selectedProduct.name}</h2>
      <p className='mt-2'>{selectedProduct.description}</p>
      <p className='mt-2 font-semibold'>Price : {selectedProduct.price} EGP</p>
      <p className='mt-2'>weight: {selectedProduct.weight}</p>
    </div>
  );
}

export default ProductDetails;

