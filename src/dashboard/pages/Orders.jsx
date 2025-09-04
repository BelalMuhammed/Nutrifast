import LoaderSpinner from "@/Components/shared/Loaders/Loader";
import { formatDateTime } from "../../lib/dateFormat";
import TableDashboard from "@/Components/TableDashboard";
import { fetchAdminOrders, fetchOrders } from "@/Redux/slices/ordersSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Orders() {
  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const filteredOrders =
    orders?.map((order) => {
      const totalQuantity =
        order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      return {
        orderId: order.id,
        date: formatDateTime(order.date),
        name: order.customer?.fullName || "N/A",
        numberOfItems: order.items?.length || 0,
        totalQuantity,
        total: order.total,
        status: order.status
      };
    }) || [];

  if (loading) return <LoaderSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <TableDashboard data={filteredOrders} type='orders' />
    </div>
  );
}

export default Orders;
