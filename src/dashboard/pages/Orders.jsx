import TableDashboard from '@/Components/TableDashboard';
import { fetchOrders } from '@/Redux/slices/ordersSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Orders() {
      const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

const filteredOrders = orders.map(order => {
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    orderId: order.id,
    date: new Date(order.date).toLocaleDateString(), // ممكن تضيف الوقت كمان
    customerName: order.customer.fullName || "N/A",
    numberOfItems: order.items.length,
    totalQuantity,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total
  };
});


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
     <div>
  <TableDashboard  data={filteredOrders} type="products" ></TableDashboard>
      </div>
  )
}

export default Orders