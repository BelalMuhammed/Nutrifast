import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    paymentMethod: "Credit Card",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.025;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("auth:user"));
    const userId = user.id;

    const orderData = {
      userId: userId,
      items: cartItems,
      customer: formData,
      subtotal: subtotal.toFixed(2),
      shipping,
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      date: new Date().toISOString(),
    };

    try {
      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      await axios.post(
        "https://nutrifast-data.up.railway.app/orders",
        orderData
      );

      // Clear form data
      setFormData({
        fullName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        paymentMethod: "Credit Card",
      });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="app-container py-8 flex flex-col lg:flex-row gap-8">
      {/* LEFT: Product Summary */}
      <div className="w-1/2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">
                {(item.price * item.quantity).toFixed(2)}EGP
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        {/* Summary */}
        <div className="p-4 bg-app-quaternary rounded-lg mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}EGP</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{tax.toFixed(2)}EGP</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total.toFixed(2)}EGP</span>
          </div>
        </div>
      </div>

      {/* Right Side - Checkout Form */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold text-app-secondary mb-6">
          Checkout
        </h1>

        {/* Shipping Information */}
        <h2 className="text-lg font-medium text-app-secondary mb-4">
          Shipping Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="bg-app-quaternary p-3 rounded-lg w-full"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            type="text"
            placeholder="Address"
            className="bg-app-quaternary p-3 rounded-lg w-full md:col-span-2"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            type="text"
            placeholder="City"
            className="bg-app-quaternary p-3 rounded-lg"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            type="text"
            placeholder="State"
            className="bg-app-quaternary p-3 rounded-lg"
          />
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            type="text"
            placeholder="Zip Code"
            className="bg-app-quaternary p-3 rounded-lg"
          />
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            type="text"
            placeholder="Phone Number"
            className="bg-app-quaternary p-3 rounded-lg"
          />
        </div>

        {/* Payment Method */}
        <h2 className="text-lg font-medium text-app-secondary mb-4">
          Payment Method
        </h2>
        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Credit Card"
              checked={formData.paymentMethod === "Credit Card"}
              onChange={handleChange}
            />
            <span>
              <span className="font-medium text-app-secondary">
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
              name="paymentMethod"
              value="PayPal"
              checked={formData.paymentMethod === "PayPal"}
              onChange={handleChange}
            />
            <span>
              <span className="font-medium text-app-secondary">PayPal</span>
              <br />
              <span className="text-sm text-app-tertiary">
                Pay with your PayPal account
              </span>
            </span>
          </label>
        </div>

        {/* Card Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            type="text"
            placeholder="Card Number"
            className="bg-app-quaternary p-3 rounded-lg w-full md:col-span-2"
          />
          <input
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            type="text"
            placeholder="MM/YY"
            className="bg-app-quaternary p-3 rounded-lg"
          />
          <input
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            type="text"
            placeholder="CVV"
            className="bg-app-quaternary p-3 rounded-lg"
          />
        </div>

        <button onClick={handlePlaceOrder} className="btn-app w-full">
          Place Order
        </button>
      </div>
    </div>
  );
}
