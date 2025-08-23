import { HiOutlineShoppingBag } from "react-icons/hi";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { useState } from "react";
import { useCart } from "../../../hooks/useCart";

function AddButton({ product, ...props }) {
  const { isItemInCart, addItem } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

  // Check if product is already in cart
  const isInCart = isItemInCart(product?.id);

  const handleAddToCart = async () => {
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

      try {
        console.log("Adding product to cart");
        await addItem(product);
        // Product successfully added, show success toast
        setToastType("success");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      } catch (error) {
        console.error("Failed to add product to cart:", error);
        setToastType("error");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    } else {
      console.error("No product passed to AddButton");
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={`btn-app flex items-center ${isInCart ? "opacity-70" : ""} ${props.className}`}
        disabled={isInCart}
        >
        <HiOutlineShoppingBag size={22} className='me-2' />
        <span>{isInCart ? "In Cart" : "Add to cart"}</span>
      </button>

      {/* Flowbite Toast Notification */}
      {showToast && (
        <div className='fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] max-w-xs w-full'>
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toastType === "warning"
                  ? "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200"
                  : toastType === "error"
                  ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                  : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
              }`}>
              {toastType === "warning" || toastType === "error" ? (
                <HiExclamation className='h-5 w-5' />
              ) : (
                <HiCheck className='h-5 w-5' />
              )}
            </div>
            <div className='ml-3 text-sm font-normal'>
              {toastType === "warning"
                ? "Product is already in your cart!"
                : toastType === "error"
                ? "Failed to add product to cart. Please try again."
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
