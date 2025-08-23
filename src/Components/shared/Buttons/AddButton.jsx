import { HiOutlineShoppingBag } from "react-icons/hi";
import ToastNotification from "../../shared/ToastNotification";
import { useState } from "react";
import { useCart } from "../../../hooks/useCart";

function AddButton({ product, ...props }) {
  const { isItemInCart, addItem } = useCart();
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // Check if product is already in cart
  const isInCart = isItemInCart(product?.id);

  const handleAddToCart = async () => {
    if (product) {
      if (isInCart) {
        setToast({
          show: true,
          type: "warning",
          message: "Product is already in your cart!",
        });
        setTimeout(
          () => setToast({ show: false, type: "warning", message: "" }),
          4000
        );
        return;
      }
      try {
        await addItem(product);
        setToast({
          show: true,
          type: "success",
          message: `"${
            product?.name || "Product"
          }" successfully added to cart!`,
        });
        setTimeout(
          () => setToast({ show: false, type: "success", message: "" }),
          4000
        );
      } catch {
        setToast({
          show: true,
          type: "error",
          message: "Failed to add product to cart. Please try again.",
        });
        setTimeout(
          () => setToast({ show: false, type: "error", message: "" }),
          4000
        );
      }
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={`btn-app flex items-center ${isInCart ? "opacity-70" : ""} ${
          props.className
        }`}
        disabled={isInCart}>
        <HiOutlineShoppingBag size={22} className='me-2' />
        <span>{isInCart ? "In Cart" : "Add to cart"}</span>
      </button>
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
}

export default AddButton;
