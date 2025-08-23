import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchOrders } from "@/Redux/slices/ordersSlice";
import { getCurrentUser } from "@/lib/storage";
import CancelConfirmDialog from "@/Components/CancelConfirmDialog/CancelConfirmDialog";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiTruck,
  FiCheck,
  FiX,
  FiRotateCcw,
  FiArrowLeft,
  FiCalendar,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiStar,
  FiRefreshCw,
  FiDownload,
  FiHeadphones,
} from "react-icons/fi";
import { FaRegListAlt } from "react-icons/fa";

import { Spinner } from "flowbite-react";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list: orders, loading } = useSelector((state) => state.orders);
  const user = getCurrentUser();

  useEffect(() => {
    if (user?.id && orders.length === 0) {
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user?.id, orders.length]);

  const order = orders.find((o) => o.id.toString() === id);

  // const handleCancel = () => {
  //   if (window.confirm("Are you sure you want to cancel this order?")) {
  //     dispatch(cancelOrder(order.id));
  //   }
  // };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Shipped":
        return <FiTruck className="text-blue-600" />;
      case "Delivered":
        return <FiCheck className="text-green-600" />;
      case "Cancelled":
        return <FiX className="text-red-600" />;
      case "Returned":
        return <FiRotateCcw className="text-orange-600" />;
      default:
        return <FiPackage className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "Returned":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <div className="flex items-center gap-3">
          <Spinner size="lg" color="success" />
          <span className="text-gray-600 font-medium">
            Loading order details...
          </span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="bg-red-50 rounded-full p-6 mb-4">
          <FiX className="text-red-500" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Order Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The order you're looking for doesn't exist.
        </p>
        <Link
          to="/myOrders"
          className="flex items-center gap-2 bg-app-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-app-tertiary transition-all duration-200"
        >
          <FiArrowLeft />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/myOrders"
            className="inline-flex items-center gap-2 text-app-primary hover:text-app-tertiary font-medium mb-6 transition-colors duration-200"
          >
            <FiArrowLeft />
            Back to My Orders
          </Link>

          <div className="bg-white rounded-2xl  border-2 border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="bg-app-primary/10 p-3 rounded-xl">
                  <FiPackage className="text-app-primary" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-app-secondary">
                    Order #{order.id}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <FiCalendar size={16} />
                    <span>Placed on {order.date || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                  order.status || "Processing"
                )}`}
              >
                {getStatusIcon(order.status || "Processing")}
                {order.status || "Processing"}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl  border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-2 rounded-xl">
                <FiUser className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-app-secondary">
                Customer Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiUser className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Full Name</p>
                  <p className="text-app-tertiary font-semibold">
                    {order.customer.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Address</p>
                  <p className="text-app-tertiary">
                    {order.customer.address}, {order.customer.city},{" "}
                    {order.customer.state}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Phone Number
                  </p>
                  <p className="text-app-tertiary font-semibold">
                    {order.customer.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiCreditCard className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Payment Method
                  </p>
                  <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FiCheck size={14} />
                    {order.customer.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl  border border-gray-100 p-6 ">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-50 p-2 rounded-xl">
                <FiShoppingBag className="text-green-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-app-secondary">
                Items Ordered ({order.items.length})
              </h2>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-app-tertiary truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm text-app-primary font-medium">
                        {item.price} EGP each
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-app-primary text-lg">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br  rounded-2xl  border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className=" p-3 rounded-xl text-app-primary border-2">
                <FaRegListAlt size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-app-secondary">
                  Order Summary
                </h2>
                <p className="text-gray-500">
                  Order placed on {order.date || "N/A"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <FiClock className="text-gray-400" size={16} />
                <span className="text-sm text-gray-500">
                  Estimated Delivery
                </span>
              </div>
              <p className="font-semibold text-app-tertiary">
                3-5 Business Days
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricing Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-app-secondary mb-4">
                Pricing Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/70 rounded-xl">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-app-tertiary">
                    {order.subtotal || order.total} EGP
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/70 rounded-xl">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-semibold text-green-600">
                    {order.shipping === 0 ? "Free" : `${order.shipping} EGP`}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between p-4  rounded-xl border-3 border-gray-200">
                    <span className="text-lg font-bold text-app-secondary">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-app-primary">
                      {order.total} EGP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-app-secondary mb-4">
                Order Actions
              </h3>

              <div className="space-y-4">
                {(order.status === "delivered" ||
                  order.status === "Delivered") && (
                  <>
                    <button className="w-full bg-gradient-to-r from-app-primary to-green-600 hover:from-app-primary/90 hover:to-green-600/90 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200  hover:shadow-xl flex items-center justify-center gap-3">
                      <FiStar size={18} />
                      Rate & Review Order
                    </button>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3">
                      <FiRefreshCw size={18} />
                      Reorder Items
                    </button>
                  </>
                )}

                {/* {(order.status === "pending" ||
                  order.status === "processing" ||
                  order.status === "Pending" ||
                  order.status === "Processing") && (
                  <button
                    onClick={handleCancel}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <FiX size={18} />
                    Cancel Order
                  </button>
                )} */}

                {(order.status === "pending" ||
                  order.status === "processing" ||
                  order.status === "Pending" ||
                  order.status === "Processing") && (
                  <CancelConfirmDialog
                    orderId={order.id}
                    onConfirm={(id) => dispatch(cancelOrder(id))}
                  />
                )}

                <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3">
                  <FiDownload size={18} />
                  Download Invoice
                </button>

                <button className="w-full border-2 border-app-primary text-app-primary hover:bg-app-primary hover:text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3">
                  <FiHeadphones size={18} />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
