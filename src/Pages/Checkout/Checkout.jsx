import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Toast, ToastToggle } from "flowbite-react";
import {
  HiCheck,
  HiX,
  HiUser,
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiCreditCard,
  HiShieldCheck,
  HiEye,
  HiEyeOff,
  HiTrash,
  HiPlusCircle,
  HiMinusCircle,
  HiInformationCircle,
  HiLockClosed,
  HiExclamation,
} from "react-icons/hi";
import { FiPackage } from "react-icons/fi";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
} from "../../Redux/slices/cartSlice";
import { getCurrentUser, setCurrentUser } from "../../lib/storage";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get current user data
  const currentUser = getCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, isSubmitted },
    reset,
    watch,
    trigger,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      paymentMethod: "credit-card",
      // Pre-populate with user data
      fullName: currentUser?.username || currentUser?.name || "",
      email: currentUser?.email || "",
      phoneNumber: currentUser?.phone || "",
      address: currentUser?.address || "",
    },
  });

  const watchedFields = watch();
  const selectedPaymentMethod = watch("paymentMethod");

  // State management
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Redirect if cart is empty (but not after order completion)
  useEffect(() => {
    if (cartItems.length === 0 && !orderCompleted) {
      navigate("/shop");
    }
  }, [cartItems, navigate, orderCompleted]);

  // Toast helper
  const showToastMessage = (message, type = "success", duration = 4000) => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "" }),
      duration
    );
  };

  // Calculate totals - shipping is always free
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 0; // Always free shipping
  const discountAmount = promoApplied ? (subtotal * discount) / 100 : 0;
  const total = subtotal + shippingCost - discountAmount;

  // Quantity handlers
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    showToastMessage("Item removed from cart", "info");
  };

  // Promo code handler
  const handlePromoCode = () => {
    if (promoCode === "NUTRIFAST10") {
      setPromoApplied(true);
      setDiscount(10);
      showToastMessage("Promo code applied! 10% discount", "success");
    } else if (promoCode === "WELCOME15") {
      setPromoApplied(true);
      setDiscount(15);
      showToastMessage("Welcome discount applied! 15% off", "success");
    } else {
      showToastMessage("Invalid promo code", "error");
    }
  };

  // Validate form before submission
  const validateForm = async () => {
    try {
      // Trigger validation for all fields
      const isFormValid = await trigger();

      if (!isFormValid) {
        showToastMessage("Please correct the errors in the form", "error");

        // Scroll to first error
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.querySelector(`[name="${firstErrorField}"]`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.focus();
          }
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error("Validation error:", error);
      showToastMessage("Validation error occurred", "error");
      return false;
    }
  };

  // Confirmation handlers
  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    if (pendingOrderData) {
      processOrder(pendingOrderData);
    }
  };

  const handleCancelOrder = () => {
    setShowConfirmation(false);
    setPendingOrderData(null);
  };

  // Process the actual order
  const processOrder = async (data) => {
    try {
      setIsProcessing(true);

      // Update user data in localStorage if changed
      const currentUser = getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          username: data.fullName,
          email: data.email,
          phone: data.phoneNumber,
          address: data.address,
        };
        setCurrentUser(updatedUser);
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const user = getCurrentUser();

      const orderData = {
        userId: user?.id,
        orderNumber: `ORD-${Date.now()}`,
        items: cartItems,
        customer: data,
        subtotal: subtotal.toFixed(2),
        shipping: shippingCost.toFixed(2),
        discount: discountAmount.toFixed(2),
        total: total.toFixed(2),
        promoCode: promoApplied ? promoCode : null,
        status: "pending",
        date: new Date().toISOString(),
      };

      // Save to API
      await axios.post(
        "https://nutrifast-data.up.railway.app/orders",
        orderData
      );

      // Save locally for receipt
      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      // Clear cart and reset form
      dispatch(clearCart());
      reset();

      // Mark order as completed to prevent redirect to shop
      setOrderCompleted(true);

      showToastMessage("Order placed successfully! 🎉", "success");

      // Redirect to orders page
      setTimeout(() => navigate("/myOrders"), 1500);
    } catch (error) {
      console.error("Order placement failed:", error);
      showToastMessage("Failed to place order. Please try again.", "error");
    } finally {
      setIsProcessing(false);
      setPendingOrderData(null);
    }
  };

  // Form submission - now shows confirmation first
  const handlePlaceOrder = async (data) => {
    try {
      // Validate all fields manually to ensure proper error display
      const isFormValid = await trigger();

      if (!isFormValid) {
        showToastMessage("Please correct the errors in the form", "error");
        return;
      }

      // Additional validation for specific payment method
      if (data.paymentMethod === "credit-card") {
        const requiredCardFields = ["cardNumber", "expiry", "cvv", "cardName"];
        const cardValidation = await trigger(requiredCardFields);

        if (!cardValidation) {
          showToastMessage("Please complete credit card information", "error");
          return;
        }
      }

      // Store order data and show confirmation
      setPendingOrderData(data);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Order validation failed:", error);
      showToastMessage("Failed to validate order. Please try again.", "error");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 -mt-16 pt-24'>
      {/* Toast Notifications */}
      {toast.show && (
        <div className='fixed bottom-5 right-5 z-50 animate-slide-in-right'>
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toast.type === "success"
                  ? "bg-green-100 text-green-500"
                  : toast.type === "error"
                  ? "bg-red-100 text-red-500"
                  : "bg-blue-100 text-blue-500"
              }`}>
              {toast.type === "success" ? (
                <HiCheck className='h-5 w-5' />
              ) : toast.type === "error" ? (
                <HiX className='h-5 w-5' />
              ) : (
                <HiInformationCircle className='h-5 w-5' />
              )}
            </div>
            <div className='ml-3 text-sm font-medium'>{toast.message}</div>
            <ToastToggle onClick={() => setToast({ show: false })} />
          </Toast>
        </div>
      )}

      <div className='app-container py-8'>
        <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
          {/* Order Summary - Left Side */}
          <div className='xl:col-span-5 space-y-6'>
            {/* Header */}
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <h2 className='text-2xl font-bold text-app-tertiary mb-2'>
                Order Summary
              </h2>
              <p className='text-gray-600'>Review your items before checkout</p>
            </div>

            {/* Cart Items */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100'>
              <div className='p-6 border-b border-gray-100'>
                <h3 className='text-lg font-semibold text-app-tertiary'>
                  Items ({cartItems.length})
                </h3>
              </div>

              <div className='max-h-96 overflow-y-auto'>
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 transition-colors hover:bg-gray-50 ${
                      index !== cartItems.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}>
                    <div className='flex items-start gap-4'>
                      {/* Product Image */}
                      <div className='w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0'>
                        <img
                          src={item.image || "/api/placeholder/80/80"}
                          alt={item.name}
                          className='w-full h-full object-cover'
                          loading='lazy'
                        />
                      </div>

                      {/* Product Details */}
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-app-tertiary text-base mb-1 line-clamp-2'>
                          {item.name}
                        </h4>

                        {item.description && (
                          <p className='text-sm text-gray-500 mb-3 line-clamp-1'>
                            {item.description}
                          </p>
                        )}

                        <div className='flex items-center justify-between'>
                          {/* Quantity Controls */}
                          <div className='flex items-center gap-2'>
                            <button
                              type='button'
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors'>
                              <HiMinusCircle className='text-gray-600' />
                            </button>

                            <span className='px-3 py-1 bg-gray-50 rounded-lg font-medium min-w-[3rem] text-center'>
                              {item.quantity}
                            </span>

                            <button
                              type='button'
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'>
                              <HiPlusCircle className='text-gray-600' />
                            </button>
                          </div>

                          {/* Price & Remove */}
                          <div className='flex items-center gap-3'>
                            <div className='text-right'>
                              <div className='font-bold text-app-primary text-lg'>
                                {(item.price * item.quantity).toFixed(2)} EGP
                              </div>
                              {item.quantity > 1 && (
                                <div className='text-xs text-gray-500'>
                                  {item.price.toFixed(2)} EGP each
                                </div>
                              )}
                            </div>

                            <button
                              type='button'
                              onClick={() => handleRemoveItem(item.id)}
                              className='w-8 h-8 rounded-full text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors'
                              aria-label='Remove item'>
                              <HiTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <h3 className='text-lg font-semibold text-app-tertiary mb-4'>
                Promo Code
              </h3>

              {!promoApplied ? (
                <div className='flex gap-3'>
                  <input
                    type='text'
                    placeholder='Enter promo code'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className='flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-app-primary focus:outline-none transition-colors'
                  />
                  <button
                    type='button'
                    onClick={handlePromoCode}
                    disabled={!promoCode.trim()}
                    className='px-6 py-3 bg-app-primary text-white rounded-xl hover:bg-app-secondary disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all'>
                    Apply
                  </button>
                </div>
              ) : (
                <div className='flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl'>
                  <div className='flex items-center gap-2'>
                    <HiCheck className='text-green-500' />
                    <span className='font-semibold text-green-700'>
                      {promoCode} - {discount}% off applied
                    </span>
                  </div>
                  <button
                    type='button'
                    onClick={() => {
                      setPromoApplied(false);
                      setPromoCode("");
                      setDiscount(0);
                    }}
                    className='text-green-600 hover:text-green-700 font-medium'>
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Order Total */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100'>
              <div className='p-6 space-y-4'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>
                  <span className='font-medium'>{subtotal.toFixed(2)} EGP</span>
                </div>

                <div className='flex justify-between text-gray-600'>
                  <span className='flex items-center gap-2'>
                    Shipping
                    <span className='text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full'>
                      FREE
                    </span>
                  </span>
                  <span className='font-medium'>Free</span>
                </div>

                {promoApplied && (
                  <div className='flex justify-between text-green-600'>
                    <span>Discount ({discount}%)</span>
                    <span className='font-medium'>
                      -{discountAmount.toFixed(2)} EGP
                    </span>
                  </div>
                )}

                <div className='border-t border-gray-200 pt-4'>
                  <div className='flex justify-between text-lg font-bold text-app-tertiary'>
                    <span>Total</span>
                    <span className='text-app-primary'>
                      {total.toFixed(2)} EGP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form - Right Side */}
          <div className='xl:col-span-7'>
            <form
              onSubmit={handleSubmit(handlePlaceOrder)}
              className='space-y-6'>
              {/* Customer Information */}
              <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                <h3 className='text-xl font-bold text-app-tertiary mb-6 flex items-center gap-2'>
                  <HiUser className='text-app-primary' />
                  Customer Information
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Full Name */}
                  <div className='md:col-span-2 space-y-1'>
                    <div className='relative group'>
                      <input
                        type='text'
                        placeholder='Full Name'
                        {...register("fullName", {
                          required: "Full name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        className={`w-full px-4 py-3 pl-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium group-hover:bg-gray-100/50 ${
                          errors.fullName
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.fullName && !errors.fullName
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <HiUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-app-primary transition-colors' />
                    </div>
                    <div className='min-h-[1rem]'>
                      <p
                        className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                          (touchedFields.fullName || isSubmitted) &&
                          errors.fullName
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}>
                        {errors.fullName?.message}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className='space-y-1'>
                    <div className='relative group'>
                      <input
                        type='email'
                        placeholder='Email Address'
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                          },
                        })}
                        className={`w-full px-4 py-3 pl-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium group-hover:bg-gray-100/50 ${
                          errors.email
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.email && !errors.email
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <HiMail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-app-primary transition-colors' />
                    </div>
                    <div className='min-h-[1rem]'>
                      <p
                        className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                          (touchedFields.email || isSubmitted) && errors.email
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}>
                        {errors.email?.message}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className='space-y-1'>
                    <div className='relative group'>
                      <input
                        type='tel'
                        placeholder='Phone Number'
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[+]?[0-9\s\-()]{10,}$/,
                            message: "Please enter a valid phone number",
                          },
                        })}
                        className={`w-full px-4 py-3 pl-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium group-hover:bg-gray-100/50 ${
                          errors.phoneNumber
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.phoneNumber && !errors.phoneNumber
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <HiPhone className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-app-primary transition-colors' />
                    </div>
                    <div className='min-h-[1rem]'>
                      <p
                        className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                          (touchedFields.phoneNumber || isSubmitted) &&
                          errors.phoneNumber
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}>
                        {errors.phoneNumber?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                <h3 className='text-xl font-bold text-app-tertiary mb-6 flex items-center gap-2'>
                  <HiLocationMarker className='text-app-primary' />
                  Shipping Information
                </h3>

                <div className='space-y-4'>
                  {/* Address */}
                  <div className='space-y-1'>
                    <div className='relative group'>
                      <input
                        type='text'
                        placeholder='Street Address'
                        {...register("address", {
                          required: "Address is required",
                          minLength: {
                            value: 10,
                            message: "Please provide a complete address",
                          },
                        })}
                        className={`w-full px-4 py-3 pl-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium group-hover:bg-gray-100/50 ${
                          errors.address
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.address && !errors.address
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <HiLocationMarker className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-app-primary transition-colors' />
                    </div>
                    <div className='min-h-[1rem]'>
                      <p
                        className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                          (touchedFields.address || isSubmitted) &&
                          errors.address
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}>
                        {errors.address?.message}
                      </p>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {/* City */}
                    <div className='space-y-1'>
                      <input
                        type='text'
                        placeholder='City'
                        {...register("city", {
                          required: "City is required",
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium hover:bg-gray-100/50 ${
                          errors.city
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.city && !errors.city
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <div className='min-h-[1rem]'>
                        <p
                          className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                            (touchedFields.city || isSubmitted) && errors.city
                              ? "opacity-100 visible"
                              : "opacity-0 invisible"
                          }`}>
                          {errors.city?.message}
                        </p>
                      </div>
                    </div>

                    {/* State */}
                    <div className='space-y-1'>
                      <input
                        type='text'
                        placeholder='State/Province'
                        {...register("state", {
                          required: "State is required",
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium hover:bg-gray-100/50 ${
                          errors.state
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.state && !errors.state
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <div className='min-h-[1rem]'>
                        <p
                          className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                            (touchedFields.state || isSubmitted) && errors.state
                              ? "opacity-100 visible"
                              : "opacity-0 invisible"
                          }`}>
                          {errors.state?.message}
                        </p>
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div className='space-y-1'>
                      <input
                        type='text'
                        placeholder='Postal Code'
                        {...register("zipCode", {
                          required: "Postal code is required",
                          pattern: {
                            value: /^[0-9]{5}(-[0-9]{4})?$/,
                            message: "Invalid postal code format",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium hover:bg-gray-100/50 ${
                          errors.zipCode
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.zipCode && !errors.zipCode
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <div className='min-h-[1rem]'>
                        <p
                          className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                            (touchedFields.zipCode || isSubmitted) &&
                            errors.zipCode
                              ? "opacity-100 visible"
                              : "opacity-0 invisible"
                          }`}>
                          {errors.zipCode?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                <h3 className='text-xl font-bold text-app-tertiary mb-6 flex items-center gap-2'>
                  <HiCreditCard className='text-app-primary' />
                  Payment Information
                </h3>

                {/* Payment Method Selection */}
                <div className='space-y-4 mb-6'>
                  <div className='space-y-3'>
                    {/* Credit Card Option */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedPaymentMethod === "credit-card"
                          ? "border-app-primary bg-app-primary/5"
                          : "border-gray-200"
                      }`}>
                      <input
                        type='radio'
                        value='credit-card'
                        {...register("paymentMethod", {
                          required: "Please select a payment method",
                        })}
                        className='w-5 h-5 text-app-primary focus:ring-app-primary'
                      />
                      <HiCreditCard
                        className={`text-xl ${
                          selectedPaymentMethod === "credit-card"
                            ? "text-app-primary"
                            : "text-gray-400"
                        }`}
                      />
                      <div>
                        <div className='font-semibold text-app-tertiary'>
                          Credit Card
                        </div>
                        <div className='text-sm text-gray-500'>
                          Visa, Mastercard, American Express
                        </div>
                      </div>
                    </label>

                    {/* PayPal Option */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedPaymentMethod === "paypal"
                          ? "border-app-primary bg-app-primary/5"
                          : "border-gray-200"
                      }`}>
                      <input
                        type='radio'
                        value='paypal'
                        {...register("paymentMethod", {
                          required: "Please select a payment method",
                        })}
                        className='w-5 h-5 text-app-primary focus:ring-app-primary'
                      />
                      <div className='w-5 h-5 bg-blue-600 rounded flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>P</span>
                      </div>
                      <div>
                        <div className='font-semibold text-app-tertiary'>
                          PayPal
                        </div>
                        <div className='text-sm text-gray-500'>
                          Pay with your PayPal account
                        </div>
                      </div>
                    </label>

                    {/* Cash on Delivery Option */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedPaymentMethod === "cod"
                          ? "border-app-primary bg-app-primary/5"
                          : "border-gray-200"
                      }`}>
                      <input
                        type='radio'
                        value='cod'
                        {...register("paymentMethod", {
                          required: "Please select a payment method",
                        })}
                        className='w-5 h-5 text-app-primary focus:ring-app-primary'
                      />
                      <HiShieldCheck
                        className={`text-xl ${
                          selectedPaymentMethod === "cod"
                            ? "text-app-primary"
                            : "text-gray-400"
                        }`}
                      />
                      <div>
                        <div className='font-semibold text-app-tertiary'>
                          Cash on Delivery
                        </div>
                        <div className='text-sm text-gray-500'>
                          Pay when your order arrives
                        </div>
                      </div>
                    </label>
                  </div>

                  {errors.paymentMethod && (
                    <p className='text-red-500 text-sm font-medium'>
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>

                {/* Credit Card Details */}
                {selectedPaymentMethod === "credit-card" && (
                  <div className='space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
                    <h4 className='font-semibold text-app-tertiary flex items-center gap-2'>
                      <HiLockClosed className='text-app-primary' />
                      Card Details
                    </h4>

                    {/* Card Number */}
                    <div className='space-y-1'>
                      <input
                        type='text'
                        placeholder='1234 5678 9012 3456'
                        maxLength={19}
                        {...register("cardNumber", {
                          required:
                            selectedPaymentMethod === "credit-card"
                              ? "Card number is required"
                              : false,
                          pattern: {
                            value: /^[0-9\s]{13,19}$/,
                            message: "Please enter a valid card number",
                          },
                        })}
                        onChange={(e) => {
                          // Format card number with spaces
                          let value = e.target.value.replace(/\s/g, "");
                          let formattedValue =
                            value.match(/.{1,4}/g)?.join(" ") || value;
                          if (formattedValue !== e.target.value) {
                            e.target.value = formattedValue;
                          }
                        }}
                        className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium hover:bg-gray-50 ${
                          errors.cardNumber
                            ? "border-red-300 focus:border-red-400 bg-red-50/50"
                            : watchedFields.cardNumber && !errors.cardNumber
                            ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                            : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                        } placeholder-gray-400 text-app-tertiary`}
                      />
                      <div className='min-h-[1rem]'>
                        <p
                          className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                            (touchedFields.cardNumber || isSubmitted) &&
                            errors.cardNumber
                              ? "opacity-100 visible"
                              : "opacity-0 invisible"
                          }`}>
                          {errors.cardNumber?.message}
                        </p>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      {/* Expiry Date */}
                      <div className='space-y-1'>
                        <input
                          type='text'
                          placeholder='MM/YY'
                          maxLength={5}
                          {...register("expiry", {
                            required:
                              selectedPaymentMethod === "credit-card"
                                ? "Expiry date is required"
                                : false,
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                              message: "Format: MM/YY",
                            },
                          })}
                          onChange={(e) => {
                            // Format expiry date
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value =
                                value.substring(0, 2) +
                                "/" +
                                value.substring(2, 4);
                            }
                            e.target.value = value;
                          }}
                          className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium hover:bg-gray-50 ${
                            errors.expiry
                              ? "border-red-300 focus:border-red-400 bg-red-50/50"
                              : watchedFields.expiry && !errors.expiry
                              ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                              : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                          } placeholder-gray-400 text-app-tertiary`}
                        />
                        <div className='min-h-[1rem]'>
                          <p
                            className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                              (touchedFields.expiry || isSubmitted) &&
                              errors.expiry
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            }`}>
                            {errors.expiry?.message}
                          </p>
                        </div>
                      </div>

                      {/* CVV */}
                      <div className='space-y-1'>
                        <div className='relative'>
                          <input
                            type={showCVV ? "text" : "password"}
                            placeholder='CVV'
                            maxLength={4}
                            {...register("cvv", {
                              required:
                                selectedPaymentMethod === "credit-card"
                                  ? "CVV is required"
                                  : false,
                              pattern: {
                                value: /^[0-9]{3,4}$/,
                                message: "3-4 digits",
                              },
                            })}
                            className={`w-full px-4 py-3 pr-12 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium hover:bg-gray-50 ${
                              errors.cvv
                                ? "border-red-300 focus:border-red-400 bg-red-50/50"
                                : watchedFields.cvv && !errors.cvv
                                ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                                : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                            } placeholder-gray-400 text-app-tertiary`}
                          />
                          <button
                            type='button'
                            onClick={() => setShowCVV(!showCVV)}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-app-primary transition-colors'>
                            {showCVV ? <HiEyeOff /> : <HiEye />}
                          </button>
                        </div>
                        <div className='min-h-[1rem]'>
                          <p
                            className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                              (touchedFields.cvv || isSubmitted) && errors.cvv
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            }`}>
                            {errors.cvv?.message}
                          </p>
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div className='space-y-1'>
                        <input
                          type='text'
                          placeholder='Cardholder Name'
                          {...register("cardName", {
                            required:
                              selectedPaymentMethod === "credit-card"
                                ? "Cardholder name is required"
                                : false,
                          })}
                          className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-base font-medium hover:bg-gray-50 ${
                            errors.cardName
                              ? "border-red-300 focus:border-red-400 bg-red-50/50"
                              : watchedFields.cardName && !errors.cardName
                              ? "border-app-secondary focus:border-app-primary bg-green-50/30"
                              : "border-gray-200 focus:border-app-primary hover:border-gray-300"
                          } placeholder-gray-400 text-app-tertiary`}
                        />
                        <div className='min-h-[1rem]'>
                          <p
                            className={`text-red-500 text-sm font-medium transition-opacity duration-150 ${
                              (touchedFields.cardName || isSubmitted) &&
                              errors.cardName
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            }`}>
                            {errors.cardName?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-xl'>
                  <div className='flex items-center gap-2 text-green-700'>
                    <HiShieldCheck className='text-green-600' />
                    <span className='text-sm font-medium'>
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                <button
                  type='submit'
                  disabled={isProcessing || cartItems.length === 0}
                  onClick={async (e) => {
                    // If form is not valid, prevent submission and show errors
                    if (!isValid) {
                      e.preventDefault();
                      await validateForm();
                    }
                  }}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg relative overflow-hidden group ${
                    isProcessing || cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "bg-app-primary hover:bg-app-secondary text-white shadow-app-primary/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  }`}>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-app-secondary to-app-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isProcessing || !isValid || cartItems.length === 0
                        ? "hidden"
                        : ""
                    }`}></div>

                  <div className='relative z-10 flex items-center gap-3'>
                    {isProcessing ? (
                      <>
                        <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <HiShieldCheck className='text-xl' />
                        Place Order • {total.toFixed(2)} EGP
                      </>
                    )}
                  </div>
                </button>

                {/* Form Validation Summary */}
                {Object.keys(errors).length > 0 && isSubmitted && (
                  <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-xl'>
                    <div className='flex items-center gap-2 text-red-700 mb-2'>
                      <HiX className='text-red-600' />
                      <span className='text-sm font-medium'>
                        Please correct the following errors:
                      </span>
                    </div>
                    <ul className='text-sm text-red-600 space-y-1'>
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field} className='flex items-center gap-2'>
                          <span className='w-1 h-1 bg-red-600 rounded-full'></span>
                          {error.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Order Terms */}
                <div className='mt-4 text-center'>
                  <p className='text-sm text-gray-500'>
                    By placing this order, you agree to our{" "}
                    <a
                      href='/terms'
                      className='text-app-primary hover:underline'>
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href='/privacy'
                      className='text-app-primary hover:underline'>
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && pendingOrderData && (
        <div className='fixed inset-0 bg-black/70 bg-opacity-60 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 overflow-hidden'>
            {/* Modal Header */}
            <div className='bg-gradient-to-r from-app-primary to-app-secondary px-6 py-4'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                  <HiExclamation className='w-5 h-5 text-white' />
                </div>
                <h3 className='text-lg font-bold text-white'>
                  Confirm Your Order
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className='p-6'>
              <p className='text-gray-600 mb-6'>
                Are you sure you want to place this order? Please review your
                information before confirming.
              </p>

              {/* Order Summary */}
              <div className='bg-gray-50 rounded-xl p-4 mb-6 space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>Items</span>
                  <span className='font-semibold text-gray-900'>
                    {cartItems.length} item{cartItems.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>Total Amount</span>
                  <span className='font-bold text-app-primary text-xl'>
                    {total.toFixed(2)} EGP
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>Payment Method</span>
                  <span className='font-medium text-gray-900 capitalize'>
                    {pendingOrderData.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : pendingOrderData.paymentMethod === "paypal"
                      ? "PayPal"
                      : "Credit Card"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3'>
                <button
                  onClick={handleCancelOrder}
                  className='flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 border border-gray-300'>
                  Cancel
                </button>

                <button
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                  className='flex-1 px-4 py-3 bg-app-primary hover:bg-app-secondary text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
                  {isProcessing ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <HiShieldCheck className='w-4 h-4' />
                      Confirm Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
