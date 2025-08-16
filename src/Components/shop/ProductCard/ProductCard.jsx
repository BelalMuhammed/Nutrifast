import { Link } from "react-router-dom";
import AddButton from "../../shared/Buttons/AddButton";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistItem } from "../../../Redux/slices/wishListSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const {
    name,
    price,
    id,
    image,
    description,
    tags = [],
    calories = 0,
  } = product;
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className='product bg-white rounded-2xl p-5 shadow-sm w-full max-w-[300px] md:max-w-[320px] md:w-[320px] min-w-0 relative transition-transform duration-200 hover:shadow-md group border border-gray-100 flex flex-col'>
      {/* Image and heart button */}
      <div className='relative h-[160px] rounded-xl overflow-hidden mb-4'>
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover rounded-xl border border-gray-100 hover:scale-105 transition-transform duration-200'
          />
        </Link>
        <button
          onClick={() => dispatch(toggleWishlistItem(product))}
          className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow-lg border border-gray-200 transition-colors duration-200 hover:bg-red-50 ${
            isInWishlist ? "text-red-500" : "text-gray-400"
          }`}
          style={{ backdropFilter: "blur(8px)" }}
          aria-label={
            isInWishlist ? "Remove from wishlist" : "Add to wishlist"
          }>
          <FaHeart size={18} />
        </button>
      </div>
      <h3 className='text-lg font-bold text-gray-700 mb-2'>{name}</h3>
      <div className='flex flex-wrap gap-2 mb-3'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='px-2 py-1 text-xs rounded-lg bg-gray-100 text-app-secondary font-medium border border-gray-200'>
            {tag}
          </span>
        ))}
      </div>

      {/* Short Description */}
      <p className='text-sm text-gray-600 mb-3 line-clamp-2'>{description}</p>

      {/* Calories */}
      <div className='flex items-center gap-2 mb-3'>
        <span className='text-sm font-medium text-app-accent'>
          Calories:
        </span>
        <span className='text-base font-bold text-app-tertiary'>
          {calories || "N/A"} kcal
        </span>
      </div>

      <div className='flex-1'></div>
      {/* Price and Add to Cart Button */}
      <div className='flex items-center justify-between mt-auto'>
        <span className='text-lg font-bold text-green-700'>{price} EGP</span>
        <AddButton product={product} />
      </div>
    </div>
  );
}

export default ProductCard;
