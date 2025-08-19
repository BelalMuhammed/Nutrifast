import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../../Redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";
import { IoIosCart } from "react-icons/io";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4'>
        <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-12 max-w-md w-full text-center'>
          {/* Icon Section */}
          <div className='mb-8'>
            <div className='bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-full p-8 w-24 h-24 mx-auto flex items-center justify-center mb-6'>
              <FiShoppingCart className='text-app-primary' size={40} />
            </div>
          </div>

          {/* Content Section */}
          <div className='space-y-4 mb-8'>
            <h2 className='text-2xl font-bold text-app-secondary'>
              Your Cart is Empty
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Start shopping now and discover our amazing collection of healthy
              products!
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate("/shop")}
            className='w-full text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3'
            style={{
              backgroundColor: "#388e3c",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4caf50")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#388e3c")}>
            <FiShoppingBag size={20} />
            Start Shopping
            <FiArrowRight size={18} />
          </button>

          {/* Decorative Elements */}
          <div className='mt-8 flex justify-center space-x-2'>
            <div className='w-2 h-2 bg-app-primary/30 rounded-full animate-pulse'></div>
            <div className='w-2 h-2 bg-app-secondary/30 rounded-full animate-pulse delay-75'></div>
            <div className='w-2 h-2 bg-app-primary/30 rounded-full animate-pulse delay-150'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center mb-6'>
            <IoIosCart className='text-app-primary' size={32} />
          </div>
          <h1 className='text-3xl lg:text-4xl font-bold text-app-secondary mb-4'>
            Shopping Cart
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Review your selected items and proceed to checkout when you're ready
          </p>
          <div className='mt-6 bg-app-primary/5 rounded-full px-6 py-2 inline-flex items-center gap-2'>
            <span className='text-app-primary font-semibold'>
              {cartItems.length}
            </span>
            <span className='text-gray-600'>items in cart</span>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {/* Cart Items Section */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden'>
              <div className='bg-gradient-to-r from-app-primary/5 to-app-secondary/5 px-8 py-6 border-b border-gray-100'>
                <h2 className='text-xl font-bold text-app-tertiary'>
                  Your Items
                </h2>
              </div>
              <div className='divide-y divide-gray-100'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='p-6 hover:bg-gray-50/50 transition-colors duration-200'>
                    <div className='flex flex-col md:flex-row items-center gap-6'>
                      {/* Product Image */}
                      <div className='relative flex-shrink-0'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-24 h-24 object-cover rounded-2xl border border-gray-200 shadow-sm'
                        />
                        <div className='absolute -top-2 -right-2 bg-app-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold'>
                          {item.quantity}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className='flex-1 text-center md:text-left'>
                        <h3 className='font-bold text-lg text-app-tertiary mb-2'>
                          {item.name}
                        </h3>
                        <div className='flex items-center justify-center md:justify-start gap-3 mb-2'>
                          <span className='text-2xl font-bold text-app-primary'>
                            {item.price} EGP
                          </span>
                          <span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
                            per unit
                          </span>
                        </div>
                        <p className='text-sm text-gray-500'>
                          Total:{" "}
                          <span className='font-semibold text-app-secondary'>
                            {(item.price * item.quantity).toFixed(2)} EGP
                          </span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center bg-gray-100 rounded-xl p-1'>
                          <button
                            onClick={() => dispatch(decreaseQty(item.id))}
                            className='w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:text-app-primary hover:bg-app-primary/10 transition-all duration-200 shadow-sm'
                            aria-label='Decrease quantity'>
                            <FiMinus size={16} />
                          </button>
                          <span className='px-4 py-2 font-bold text-app-secondary min-w-[3rem] text-center'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(increaseQty(item.id))}
                            className='w-10 h-10 flex items-center justify-center rounded-lg bg-app-primary text-white hover:bg-app-secondary transition-all duration-200 shadow-sm'
                            aria-label='Increase quantity'>
                            <FiPlus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className='p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200'
                          aria-label='Remove from cart'>
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Cart Summary Section */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8'>
              {/* Order Summary */}
              <div className='bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6'>
                <div className='bg-gradient-to-r from-app-secondary/5 to-app-accent/5 px-6 py-4 border-b border-gray-100'>
                  <h3 className='text-lg font-bold text-app-tertiary'>
                    Order Summary
                  </h3>
                </div>
                <div className='p-6 space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className='font-semibold text-app-secondary'>
                      {subtotal.toFixed(2)} EGP
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='font-semibold text-green-600'>Free</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Tax</span>
                    <span className='font-semibold text-gray-800'>
                      Included
                    </span>
                  </div>
                  <hr className='border-gray-200' />
                  <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold text-app-primary'>
                      Total
                    </span>
                    <span className='text-xl font-bold text-app-primary'>
                      {subtotal.toFixed(2)} EGP
                    </span>
                  </div>
                  <p className='text-xs text-gray-500 text-center'>
                    VAT included in all prices
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={goToCheckout}
                className='w-full text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3'
                style={{
                  backgroundColor: "#388e3c",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4caf50")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#388e3c")
                }>
                Proceed to Checkout
                <FiArrowRight size={20} />
              </button>

              {/* Security Badge */}
              <div className='mt-6 bg-gray-50 rounded-2xl p-4 text-center'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-sm font-semibold text-gray-700'>
                    Secure Checkout
                  </span>
                </div>
                <p className='text-xs text-gray-500'>
                  Your payment information is protected with end-to-end
                  encryption
                </p>
              </div>

              {/* Continue Shopping Link */}
              <div className='mt-6 text-center'>
                <button
                  onClick={() => navigate("/shop")}
                  className='text-app-primary hover:text-app-secondary font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2 mx-auto'>
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
