import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../../Redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
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
      <div className='flex items-center justify-center min-h-[400px] h-[100vh]  px-2 bg-gradient-to-b from-white to-app-quaternary/30'>
        <div className='w-full max-w-md bg-white rounded-2xl  flex flex-col items-center py-10 px-4 sm:px-8'>
          <div className='flex items-center justify-center w-20 h-20 rounded-full bg-app-primary/10 mb-5'>
            <FiShoppingCart className='text-app-primary' size={48} />
          </div>
          <h2 className='text-center text-2xl font-bold text-app-secondary mb-2'>
            Your cart is empty
          </h2>
          <p className='text-gray-400 text-base mb-7 text-center max-w-xs'>
            Looks like you haven't added anything yet.
          </p>
          <button
            className='bg-app-primary text-white px-7 py-2 rounded-full font-medium shadow-sm hover:bg-app-tertiary transition text-base'
            onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-3 sm:p-6 flex flex-col   gap-8 '>
      <div className='w-full flex flex-col  items-center justify-center  px-4'>
        <span className='bg-app-primary text-white rounded-full p-4 mb-4 shadow-lg'>
          <IoIosCart size={40} />
        </span>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight text-center mb-2'>
          Your Cart
        </h2>
        <p className='text-lg text-gray-700 text-center max-w-2xl mb-6'>
          Review your selected items and proceed to checkout when you're ready
          to complete your order.
        </p>{" "}
      </div>
      <div className='flex gap-10 flex-col lg:flex-row'>
        {/* Cart Items */}
        <div className='bg-white rounded-2xl w-full   border border-gray-100 px-0 sm:px-2 py-4'>
          {cartItems.map((item, idx) => (
            <div key={item.id}>
              <div className='flex flex-col md:flex-row items-center md:items-stretch px-2 md:px-6 py-4 gap-3 md:gap-7 w-full'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-20 h-20 object-cover rounded-lg border border-gray-100 flex-shrink-0 mx-auto md:mx-0'
                />
                <div className='flex-1 flex flex-col min-w-0 items-center md:items-start justify-center md:justify-between'>
                  <span className='font-medium text-gray-700 text-base md:text-lg truncate w-full md:w-auto text-center md:text-left'>
                    {item.name}
                  </span>
                  <span className='text-green-700 font-semibold text-sm md:text-base mt-1 md:mt-0'>
                    {item.price} EGP
                  </span>
                  <span className='text-xs text-gray-400'>
                    Price includes VAT
                  </span>
                </div>
                <div className='flex items-center  rounded-full px-3 py-2 mt-2 md:mt-0 min-w-[120px] justify-between gap-3'>
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className='w-8 h-8 flex items-center justify-center rounded-full bg-transparent border border-gray-300 text-gray-600 text-lg font-semibold hover:border-gray-400 hover:text-gray-800 transition-all duration-200'
                    aria-label='Decrease quantity'>
                    −
                  </button>
                  <span className='font-semibold text-app-secondary text-base px-2 select-none text-center min-w-[24px]'>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className='w-8 h-8 flex items-center justify-center rounded-full bg-app-primary text-white text-lg font-semibold hover:bg-app-tertiary transition-all duration-200 shadow-sm'
                    aria-label='Increase quantity'>
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className='ml-0 md:ml-2 text-red-400 hover:bg-red-50 rounded-full p-2 transition mt-2 md:mt-0'
                  aria-label='Remove from cart'>
                  <FiTrash2 size={21} />
                </button>
              </div>
              {idx < cartItems.length - 1 && (
                <hr className='mx-2 md:mx-6 border-t border-gray-200' />
              )}
            </div>
          ))}
        </div>
        {/* Cart summary at the bottom */}
        <div className='w-full  mx-auto flex flex-col gap-4'>
          <div className='bg-white rounded-2xl  border border-gray-100 p-6 flex flex-col gap-2 w-full'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-semibold text-app-secondary'>Subtotal</span>
              <span className='font-bold text-green-700'>{subtotal} EGP</span>
            </div>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-semibold text-app-secondary'>Shipping</span>
              <span className='font-bold text-green-700'>Free</span>
            </div>
            <hr className='my-3 border-app-quaternary/40' />
            <div className='flex justify-between items-center mt-1'>
              <span className='text-lg font-bold text-app-primary'>Total</span>
              <span className='text-lg font-bold text-app-primary'>
                {subtotal} EGP
              </span>
            </div>
            <span className='block text-xs text-gray-400 mt-2 text-right'>
              Price includes VAT
            </span>
          </div>
          <button
            onClick={goToCheckout}
            className='w-full bg-app-primary hover:bg-app-tertiary text-white rounded-2xl py-3 text-lg font-medium shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-app-primary/40'>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
