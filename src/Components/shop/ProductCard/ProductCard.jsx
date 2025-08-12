import { Link } from "react-router-dom";
import AddButton from "../../shared/Buttons/AddButton";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistItem } from "../../../Redux/slices/wishListSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { name, price, id, image, description, tags = [] } = product;
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className='product bg-white rounded-2xl p-5 shadow-lg w-[280px] relative'>
      {/* Wishlist Heart Button on top of image */}
      <div className='relative h-[155px] rounded-2xl overflow-hidden mb-4'>
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className='w-full  h-full object-cover mb-4 '
          />
        </Link>
        <button
          onClick={() => dispatch(toggleWishlistItem(product))}
          className={`text-xl absolute top-2 right-2 ${
            isInWishlist ? "text-red-500" : "text-gray-600"
          }`}>
          <FaHeart />
        </button>
      </div>

      {/* Name */}
      <h3 className='text-lg font-semibold text-app-secondary mb-2'>{name}</h3>

      {/* Tags */}
      <div className='flex flex-wrap gap-2 mb-3'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='px-2 py-1 text-xs rounded-full bg-app-quaternary text-app-secondary font-medium'>
            {tag}
          </span>
        ))}
      </div>

      {/* Short Description */}
      <p className='text-sm text-app-secondary mb-4 line-clamp-2'>
        {description}
      </p>

      {/* Price */}
      <span className='text-lg font-bold text-app-secondary mb-4 block'>
        {price} EGP
      </span>

      {/* Add to Cart Button */}
      <div className='flex justify-between '>
        <AddButton product={product} />
      </div>
    </div>
  );
}

export default ProductCard;
