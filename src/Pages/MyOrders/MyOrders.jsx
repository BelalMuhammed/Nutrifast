import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrders,
  deleteOrder,
  clearOrders,
} from "../../Redux/slices/ordersSlice";

function MyOrders() {
  const dispatch = useDispatch();
  const { list: orders, loading } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    dispatch(fetchOrders(1));
  }, [dispatch]);

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-app-secondary mb-6">My Orders</h1>

      {/* Tabs */}
      <div className="flex bg-green-100 rounded-full overflow-hidden mb-8">
        {["All", "Shipped", "Delivered", "Cancelled", "Returned"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === tab
                ? "bg-[#dde0ddff] text-[#4F964F] rounded-full"
                : "bg-[#E8F2E8] text-[#4F964F]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm transition-transform duration-300 hover:translate-x-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={order.items?.[0]?.image}
                  alt={order.items?.[0]?.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold text-app-secondary">
                    Order #{order.id}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.items?.[0]?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {order.date} · {order.items?.[0]?.price} · {order.status}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/product/${order.items?.[0]?.id}`}
                  className="px-4 py-2 bg-[#dde0ddff] text-app-secondary rounded-full text-sm font-medium hover:bg-[#cacecaff] transition"
                >
                  View Order
                </Link>
                <button
                  onClick={() => dispatch(deleteOrder(order.id))}
                  className=" px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}

      {/* Delete Actions */}
      {orders.length > 0 && (
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => dispatch(clearOrders(user.id))}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            Remove All
          </button>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
