import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../../Redux/slices/cartSlice";
import Button from "../../Components/shared/Buttons/Button";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="text-center mt-10">Your cart is empty</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      <div className="bg-green-50 rounded-md p-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap justify-center items-center sm:justify-between border-b border-gray-200 py-4 last:border-b-0 gap-4"
          >
            <div className="flex items-center gap-4 flex-1 sm:justify-start">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="text-center sm:text-left">
                <h2 className="font-medium">{item.name}</h2>
                <p className="text-green-700">{item.price} EGP</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQty(item.id))}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQty(item.id))}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4 text-center sm:text-left">
        <span className="font-bold text-lg mb-6 block">Subtotal</span>
        <div className="flex justify-between py-1">
          <span className="text-green-700">Subtotal</span>
          <span>{subtotal} EGP</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-green-700">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-green-700">Taxes</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span>{subtotal} EGP</span>
      </div>

      <div className="flex justify-center sm:justify-end">
        <Button text="Proceed to Checkout" />
      </div>
    </div>
  );
}

export default Cart;
