import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";

function AddButton({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    } else {
      console.error("No product passed to AddButton");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn-app flex items-center"
    >
      <HiOutlineShoppingBag size={22} className="me-2" />
      <span>Add to cart</span>
    </button>
  );
}

export default AddButton;
