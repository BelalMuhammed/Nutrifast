import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../../Network/interceptors";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(
          `https://nutrifast-data.up.railway.app/orders/${id}`
        );
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading order...</p>;
  if (!order) return <p className="text-center mt-10">Order not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-app-secondary">
        Order #{order.id}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start gap-5 mb-4 ">
        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg shadow p-6 w-full md:w-1/2 h-[228px]">
          <h2 className="text-xl font-semibold mb-4 text-app-secondary">
            Customer Information
          </h2>
          <p className="text-gray-500">
            <span className="font-medium text-gray-700">Full Name:</span>{" "}
            {order.customer.fullName}
          </p>
          <p className="text-gray-500">
            <span className="font-medium text-gray-700">Address:</span>{" "}
            {order.customer.address}, {order.customer.city},{" "}
            {order.customer.state}
          </p>
          <p className="text-gray-500">
            <span className="font-medium text-gray-700">Phone:</span>{" "}
            {order.customer.phoneNumber}
          </p>
          <p className="text-gray-500">
            <span className="font-medium text-gray-700">Payment Method:</span>{" "}
            {order.customer.paymentMethod}
          </p>
        </div>

        {/* Products */}
        <div className="bg-gray-50 rounded-lg shadow p-6 w-full md:w-1/2 h-[228px]">
          <h2 className="text-xl font-semibold mb-4 text-app-secondary">
            Items Ordered
          </h2>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between border-b py-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-gray-700">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Price: {item.price} EGP
                  </p>
                </div>
              </div>
              <span className="font-semibold">
                {(item.price * item.quantity).toFixed(2)} EGP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-app-secondary">
          Order Summary
        </h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span>{order.subtotal} EGP</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Shipping</span>
          <span>{order.shipping === 0 ? "Free" : order.shipping + " EGP"}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span className="text-gray-700">{order.tax} EGP</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{order.total} EGP</span>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-right">
        <Link
          to="/myOrders"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 "
        >
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
}
