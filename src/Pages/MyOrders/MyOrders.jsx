import React, { useEffect, useState, useRef } from "react";
import { formatDateTime } from "../../lib/dateFormat";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrders,
  deleteOrder,
  clearOrders,
} from "../../Redux/slices/ordersSlice";
import { getCurrentUser } from "../../lib/storage";
import {
  FiPackage,
  FiEye,
  FiTrash2,
  FiTruck,
  FiCheck,
  FiX,
  FiRotateCcw,
} from "react-icons/fi";
import { Spinner } from "flowbite-react";

function MyOrders() {
  const dispatch = useDispatch();
  const { list: orders, loading } = useSelector((state) => state.orders);
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState("All");
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    orderId: null,
    type: null, // 'single' or 'all'
  });
  const cancelButtonRef = useRef();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user?.id]);

  const filteredOrders = (
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab)
  )
    .slice()
    .reverse();

  const getStatusIcon = (status) => {
    switch (status) {
      case "Shipped":
        return <FiTruck className='text-blue-600' />;
      case "Delivered":
        return <FiCheck className='text-green-600' />;
      case "Cancelled":
        return <FiX className='text-red-600' />;
      case "Returned":
        return <FiRotateCcw className='text-orange-600' />;
      default:
        return <FiPackage className='text-gray-600' />;
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

  if (orders.length === 0 && !loading) {
    return (
      <div className='min-h-[400px] h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-app-quaternary/20 px-2 sm:px-4'>
        <div className='bg-white rounded-2xl  flex flex-col items-center py-12 px-8 max-w-md w-full'>
          <div className='bg-app-primary/10 rounded-full p-6 mb-6'>
            <FiPackage className='text-app-primary' size={48} />
          </div>
          <h2 className='text-xl font-bold text-app-secondary mb-3 text-center'>
            No Orders Yet
          </h2>
          <p className='text-gray-500 text-center mb-6 leading-relaxed'>
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </p>
          <Link
            to='/shop'
            className='bg-app-primary text-white px-8 py-3 rounded-xl font-medium shadow hover:bg-app-tertiary transition-all duration-200 transform hover:scale-105'>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[100vh] bg-gradient-to-b from-white to-app-quaternary/20'>
      {/* Delete/Clear Confirmation Modal */}
      {deleteModal.open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
          <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100 flex flex-col items-center'>
            <div
              className={`rounded-full p-4 mb-4 ${
                deleteModal.type === "all" ? "bg-orange-100" : "bg-red-100"
              }`}>
              <FiTrash2
                className={
                  deleteModal.type === "all"
                    ? "text-orange-500"
                    : "text-red-500"
                }
                size={32}
              />
            </div>
            <h2 className='text-xl font-bold text-app-secondary mb-2 text-center'>
              {deleteModal.type === "all"
                ? "Clear All Orders?"
                : "Delete Order?"}
            </h2>
            <p className='text-gray-600 mb-6 text-center'>
              {deleteModal.type === "all"
                ? "Are you sure you want to clear all your orders? This action cannot be undone."
                : "Are you sure you want to delete this order? This action cannot be undone."}
            </p>
            <div className='flex gap-4 w-full'>
              <button
                className='flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200'
                onClick={() =>
                  setDeleteModal({ open: false, orderId: null, type: null })
                }
                ref={cancelButtonRef}>
                Cancel
              </button>
              <button
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  deleteModal.type === "all"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                onClick={() => {
                  if (deleteModal.type === "all") {
                    dispatch(clearOrders(user.id));
                  } else {
                    dispatch(deleteOrder(deleteModal.orderId));
                  }
                  setDeleteModal({ open: false, orderId: null, type: null });
                }}>
                {deleteModal.type === "all" ? "Clear All" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-8'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='bg-app-primary text-white rounded-full p-4 mb-6 shadow-lg inline-flex'>
            <FiPackage size={32} />
          </div>
          <h1 className='text-3xl sm:text-4xl font-bold text-app-secondary mb-4'>
            My Orders
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Track and manage all your orders in one place. View order details,
            check delivery status, and manage your purchase history.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8'>
          <div className='flex flex-wrap gap-2'>
            {["All", "Shipped", "Delivered", "Cancelled", "Returned"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-app-primary text-white shadow-md transform scale-105"
                      : "text-app-tertiary hover:bg-app-quaternary/10 hover:text-app-primary"
                  }`}>
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <Spinner size='xl' color='success' />
            <span className='ml-3 text-gray-600'>Loading your orders...</span>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className='space-y-4'>
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md '>
                {/* Order Header */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-100'>
                  <div className='flex items-center gap-3 mb-3 sm:mb-0'>
                    <div className='bg-app-primary/10 p-2 rounded-xl'>
                      <FiPackage className='text-app-primary' size={20} />
                    </div>
                    <div>
                      <Link
                        to={`/order/${order.id}`}
                        className='font-bold text-app-secondary text-lg hover:text-app-primary transition-colors duration-200 underline-offset-2 hover:underline focus:underline focus:outline-none'
                        tabIndex={0}
                        aria-label={`View details for order #${order.id}`}
                      >
                        Order #{order.id}
                      </Link>
                      <p className='text-sm text-gray-500'>
                        Placed on {formatDateTime(order.date)}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      order.status
                    )}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                {/* Order Content */}
                <div className='flex flex-col md:flex-row gap-6'>
                  {/* Product Info */}
                  <div className='flex items-center gap-4 flex-1'>
                    <img
                      src={order.items?.[0]?.image}
                      alt={order.items?.[0]?.name}
                      className='w-20 h-20 rounded-xl object-cover border border-gray-200'
                    />
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-semibold text-app-tertiary mb-1 truncate'>
                        {order.items?.[0]?.name}
                      </h4>
                      <p className='text-app-primary font-bold text-lg'>
                        {order.items?.[0]?.price} EGP
                      </p>
                      {order.items?.length > 1 && (
                        <p className='text-sm text-gray-500'>
                          +{order.items.length - 1} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                    <Link
                      to={`/order/${order.id}`}
                      className='flex items-center justify-center gap-2 bg-app-primary/10 text-app-primary px-6 py-3 rounded-xl font-medium hover:bg-app-primary hover:text-white transition-all duration-200'>
                      <FiEye size={16} />
                      View Details
                    </Link>
                    <button
                      onClick={() =>
                        setDeleteModal({
                          open: true,
                          orderId: order.id,
                          type: "single",
                        })
                      }
                      className='flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-100 transition-all duration-200'>
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='bg-gray-100 rounded-full p-6 mb-4 inline-flex'>
              <FiPackage className='text-gray-400' size={32} />
            </div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>
              No orders found
            </h3>
            <p className='text-gray-500'>
              No orders match the selected filter.
            </p>
          </div>
        )}

        {/* Bulk Actions */}
        {orders.length > 0 && !loading && (
          <div className='mt-8 flex justify-end'>
            <button
              onClick={() =>
                setDeleteModal({ open: true, orderId: null, type: "all" })
              }
              className='flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-100 transition-all duration-200 border border-red-200'>
              <FiTrash2 size={16} />
              Clear All Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
