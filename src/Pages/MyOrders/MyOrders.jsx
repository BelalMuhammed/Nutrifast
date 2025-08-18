import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrders,
  deleteOrder,
  clearOrders,
} from "../../Redux/slices/ordersSlice";
import { FaEnvelope, FaShopify } from "react-icons/fa";

function MyOrders() {
  const dispatch = useDispatch();
  const { list: orders, loading } = useSelector((state) => state.orders);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user?.id]);

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div className='max-w-4xl mx-auto p-6 min-h-[400px] h-[100vh] '>
      <div className='w-full flex flex-col items-center justify-center pt-12 px-4'>
        <span className='bg-app-primary text-white rounded-full p-4 mb-4 shadow-lg'>
          <FaShopify size={40} />
        </span>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight text-center mb-2'>
          My Orders
        </h2>
        <p className='text-lg  text-gray-700 text-center max-w-2xl mb-2'>
          Track and manage all your orders in one place. View order details,
          check delivery status, and manage your purchase history.
        </p>
      </div>

      {/* Tabs */}
      <div className='flex flex-col sm:flex-row bg-transparent sm:bg-green-100 sm:rounded-full overflow-hidden mb-8'>
        {["All", "Shipped", "Delivered", "Cancelled", "Returned"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full sm:flex-1 py-2 text-sm font-medium text-center md:text-base ${
              activeTab === tab
                ? "bg-[#dde0ddff] text-[#4F964F] rounded-full mb-2 sm:mb-0 sm:mr-2 last:mr-0"
                : "bg-[#E8F2E8] text-[#4F964F] rounded-full mb-2 sm:mb-0 sm:mr-2 last:mr-0"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <p className='text-center'>Loading orders...</p>
      ) : filteredOrders.length > 0 ? (
        <div className='space-y-2'>
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className='flex flex-col items-center md:flex-row md:items-center justify-between bg-white rounded-lg p-4 shadow-sm transition-transform duration-300 hover:translate-x-1'>
              <div className='flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto'>
                <img
                  src={order.items?.[0]?.image}
                  alt={order.items?.[0]?.name}
                  className='w-16 h-16 rounded-md object-cover flex-shrink-0'
                />
                <div className='flex flex-col items-center md:items-start flex-1 min-w-0 text-center md:text-left'>
                  <p className='font-semibold text-app-secondary truncate'>
                    Order #{order.id}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    {order.items?.[0]?.name}
                  </p>
                  <p className='text-sm text-gray-400 truncate'>
                    {order.date} · {order.items?.[0]?.price} · {order.status}
                  </p>
                </div>
              </div>
              <div className='flex flex-wrap md:flex-nowrap gap-2 mt-2 md:mt-0'>
                <Link
                  to={`/order/${order.id}`}
                  className='px-4 py-2 bg-[#dde0ddff] w-full md:w-1/2 text-app-secondary rounded-full text-sm font-medium hover:bg-[#cacecaff] transition text-center'>
                  View Order
                </Link>
                <button
                  onClick={() => dispatch(deleteOrder(order.id))}
                  className='px-4 py-2 bg-red-100 w-full md:w-1/2 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition'>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>No orders found.</p>
      )}

      {/* Delete Actions */}
      {orders.length > 0 && (
        <div className='mt-8 flex justify-center md:justify-end'>
          <button
            onClick={() => dispatch(clearOrders(user.id))}
            className='px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200'>
            Remove All
          </button>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
