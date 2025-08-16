import React, { useEffect } from 'react'

import TableDashboard from '@/Components/TableDashboard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/Redux/slices/productSlice';

function Products() {
  const dispatch = useDispatch();

  // نجيب الـ state من الـ slice
  const { products, loading, error } = useSelector((state) => state.products);

  // نعمل dispatch للـ fetchProducts أول ما الكومبوننت يركب
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

const filteredProducts = products.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  stock: p.stock,
  // status: p.status, // بس الحقول اللي محتاجها
}));
if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
<TableDashboard  data={filteredProducts} type="products" ></TableDashboard>
    </div>
  )
}

export default Products