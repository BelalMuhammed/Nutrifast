import React, { useEffect } from 'react'
import Loader from "../../Components/shared/Loaders/Loader"
import TableDashboard from '@/Components/TableDashboard'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from '@/Redux/slices/productSlice';

function Products() {
  const dispatch = useDispatch();


  const { products, loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)); // حذف المنتج من الـ Redux
  };

  const filteredProducts = products.map((p) => ({
    id: p.id,
    image: p.image,
    name: p.name,
    category: p.category,
    price: p.price,
    stock: p.stock,
  }));
  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <TableDashboard data={filteredProducts} type="products" onDelete={handleDelete} ></TableDashboard>
    </div>
  )
}

export default Products