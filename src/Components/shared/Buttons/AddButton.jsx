import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { useState } from "react";

function AddButton({ product }) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success"); // Track toast type

  // Check if product is already in cart
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const isInCart = cartItems.some((item) => item.id === product?.id);

  const handleAddToCart = () => {
    console.log("Button clicked!", { product, isInCart });

    if (product) {
      if (isInCart) {
        // Product is already in cart, show warning toast
        console.log("Product already in cart, showing warning");
        setToastType("warning");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
        return;
      }

      console.log("Adding product to cart");
      dispatch(addToCart(product));
      // Product successfully added, show success toast
      setToastType("success");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } else {
      console.error("No product passed to AddButton");
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={`btn-app flex items-center ${isInCart ? "opacity-70" : ""}`}>
        <HiOutlineShoppingBag size={22} className='me-2' />
        <span>{isInCart ? "Already in Cart" : "Add to cart"}</span>
      </button>

      {/* Flowbite Toast Notification */}
      {showToast && (
        <div className='fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] max-w-xs w-full'>
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toastType === "warning"
                  ? "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200"
                  : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
              }`}>
              {toastType === "warning" ? (
                <HiExclamation className='h-5 w-5' />
              ) : (
                <HiCheck className='h-5 w-5' />
              )}
            </div>
            <div className='ml-3 text-sm font-normal'>
              {toastType === "warning"
                ? "Product is already in your cart!"
                : `"${product?.name || "Product"}" successfully added to cart!`}
            </div>
            <ToastToggle
              onDismiss={() => {
                console.log("Toast dismissed");
                setShowToast(false);
              }}
            />
          </Toast>
        </div>
      )}
    </>
  );
}

export default AddButton;
