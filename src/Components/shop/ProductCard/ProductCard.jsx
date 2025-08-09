import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { name, price, id, image, description, tags = [] } = product;

  return (
    <div className= 'product bg-white rounded-2xl p-5 shadow-lg w-[300px] '>
      {/* Product Image */}
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className=' w-full object-contain  mb-4  rounded-2xl'
        />
      </Link>

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
      <div>
        {/* Price & CTA */}
        <span className='text-lg font-bold text-app-secondary'>
          {price} EGP
        </span>
      </div>
      {/* add tocar & product details */}

      <div>
        <Link to={`/product/${id}`} className='btn-app flex items-center'>
          <HiOutlineShoppingBag size={22} className='me-2' />{" "}
          <span>Add to cart</span>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
