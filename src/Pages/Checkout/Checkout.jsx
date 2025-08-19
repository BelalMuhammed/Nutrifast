import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { clearCart } from "../../Redux/slices/cartSlice";


export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: { paymentMethod: "Credit Card" },
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(null);

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = (data) => {
    if (cartItems.length === 0) {
      showToastMessage("Your cart is empty!", "error");
      return;
    }
    setFormData(data);
    setShowConfirm(true);
  };

  const confirmOrder = async () => {
    setShowConfirm(false);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const userId = user.id;

    const orderData = {
      userId: userId,
      items: cartItems,
      customer: formData,
      subtotal: subtotal.toFixed(2),
      shipping,
      total: total.toFixed(2),
      date: new Date().toISOString(),
    };

    try {
      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      await axios.post(
        "https://nutrifast-data.up.railway.app/orders",
        orderData
      );
      showToastMessage("Order placed successfully!", "success");
      reset();
      dispatch(clearCart());
    } catch (error) {
      console.error("Error placing order:", error);
      showToastMessage("Failed to place order!", "error");
    }
  };

  return (
    <div className="app-container py-8 flex flex-col lg:flex-row gap-8">
      
      {/* LEFT: Product Summary */}
      <div className="w-full md:w-1/2 space-y-4 max-w-md mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-app-tertiary">
          Order Summary
        </h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate text-app-tertiary">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold mt-2 sm:mt-0">
                {(item.price * item.quantity).toFixed(2)} EGP
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        <div className="p-4 bg-app-quaternary rounded-lg mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-app-tertiary">Subtotal</span>
            <span>{subtotal.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-app-tertiary">Shipping</span>
            <span>{shipping === 0 ? "Free" : `${shipping} EGP`}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-app-tertiary">Total</span>
            <span>{total.toFixed(2)} EGP</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Checkout Form */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow p-6 relative">
        {toast.show && (
          <div className="fixed bottom-5 right-5 z-50">
            <Toast>
              <div
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  toast.type === "success"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {toast.type === "success" ? (
                  <HiCheck className="h-5 w-5" />
                ) : (
                  <HiX className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 text-sm font-normal">{toast.message}</div>
            </Toast>
          </div>
        )}

        <form onSubmit={handleSubmit(handlePlaceOrder)}>
          <h1 className="text-2xl font-semibold text-app-tertiary mb-6">
            Checkout
          </h1>

          {/* Shipping Information */}
          <h2 className="text-lg font-medium text-app-tertiary mb-4">
            Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/** Full Name */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-app-quaternary p-3 rounded-lg w-full"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && (
                <span className="top-full left-0 mt-1 text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/** Address */}
            <div className="relative w-full md:col-span-2">
              <input
                type="text"
                placeholder="Address"
                className="bg-app-quaternary p-3 rounded-lg w-full"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className="top-full left-0 mt-1 text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/** City */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="City"
                className="bg-app-quaternary p-3 rounded-lg w-full"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <span className="top-full left-0 mt-1 text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>

            {/** State */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="State"
                className="bg-app-quaternary p-3 rounded-lg w-full"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <span className="top-full left-0 mt-1 text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>

            {/** Zip Code */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Zip Code"
                className="bg-app-quaternary p-3 rounded-lg w-full"
                {...register("zipCode", {
                  required: "Zip Code is required",
                  pattern: { value: /^[0-9]{5}$/, message: "Invalid Zip Code" },
                })}
              />
              {errors.zipCode && (
                <span className=" top-full left-0 mt-1 text-red-500 text-sm">
                  {errors.zipCode.message}
                </span>
              )}
            </div>

            {/** Phone Number */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Phone Number"
                className="bg-app-quaternary p-3 rounded-lg w-full"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers allowed",
                  },
                })}
              />
              {errors.phoneNumber && (
                <span className="top-full left-0 mt-1 text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="text-lg font-medium text-app-tertiary mb-4">
            Payment Method
          </h2>
          <div className="space-y-4 mb-6">
            <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
              <input
                type="radio"
                value="Credit Card"
                {...register("paymentMethod", {
                  required: "Select a payment method",
                })}
              />
              <span>
                <span className="font-medium text-app-tertiary">
                  Credit Card
                </span>
                <br />
                <span className="text-sm text-app-tertiary">
                  Visa, Mastercard, American Express
                </span>
              </span>
            </label>

            <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
              <input
                type="radio"
                value="PayPal"
                {...register("paymentMethod", {
                  required: "Select a payment method",
                })}
              />
              <span>
                <span className="font-medium text-app-tertiary">PayPal</span>
                <br />
                <span className="text-sm text-app-tertiary">
                  Pay with your PayPal account
                </span>
              </span>
            </label>

            {errors.paymentMethod && (
              <span className="text-red-500 text-sm">
                {errors.paymentMethod.message}
              </span>
            )}
          </div>

          {watch("paymentMethod") === "Credit Card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/** Card Number */}
              <div className="relative w-full md:col-span-2">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="bg-app-quaternary p-3 rounded-lg w-full"
                  {...register("cardNumber", {
                    required: "Card Number is required",
                    pattern: {
                      value: /^[0-9]{16}$/,
                      message: "Invalid card number",
                    },
                  })}
                />
                {errors.cardNumber && (
                  <span className="top-full left-0 mt-1 text-red-500 text-sm">
                    {errors.cardNumber.message}
                  </span>
                )}
              </div>

              {/** Expiry */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="bg-app-quaternary p-3 rounded-lg w-full"
                  {...register("expiry", {
                    required: "Expiry date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                      message: "Invalid format MM/YY",
                    },
                  })}
                />
                {errors.expiry && (
                  <span className="top-full left-0 mt-1 text-red-500 text-sm">
                    {errors.expiry.message}
                  </span>
                )}
              </div>

              {/** CVV */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="CVV"
                  className="bg-app-quaternary p-3 rounded-lg w-full"
                  {...register("cvv", {
                    required: "CVV is required",
                    pattern: { value: /^[0-9]{3,4}$/, message: "Invalid CVV" },
                  })}
                />
                {errors.cvv && (
                  <span className="top-full left-0 mt-1 text-red-500 text-sm">
                    {errors.cvv.message}
                  </span>
                )}
              </div>
            </div>
          )}

          <button type="submit" className="btn-app w-full">
            Place Order
          </button>
        </form>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 md:w-96 text-center">
              <h2 className="text-lg font-bold text-app-tertiary mb-4">
                Confirm Payment
              </h2>
              <p className="mb-6 text-app-tertiary">
                Are you sure you want to place this order?
              </p>
              <div className="flex justify-center gap-4">
                <button className="btn-app" onClick={confirmOrder}>
                  Confirm
                </button>
                <button
                  className="btn-app-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
