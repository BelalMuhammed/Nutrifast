import { HiOutlineShoppingBag, HiCheck } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";
import { Toast, ToastToggle } from "flowbite-react";
import { useState } from "react";

function AddButton({ product }) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      console.error("No product passed to AddButton");
    }
  };

  return (
    <>
      <button onClick={handleAddToCart} className='btn-app flex items-center'>
        <HiOutlineShoppingBag size={22} className='me-2' />
        <span>Add to cart</span>
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className='fixed bottom-5 right-5 z-50'>
          <Toast>
            <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
              <HiCheck className='h-5 w-5' />
            </div>
            <div className='ml-3 text-sm font-normal'>
              Product added to cart!
            </div>
            <ToastToggle onClick={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
}

export default AddButton;
