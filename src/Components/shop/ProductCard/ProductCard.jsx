import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { name, price, id } = product;
  return (
    <div className='border p-4 rounded shadow-md w-[250px]'>
      <h3 className='text-lg font-bold'>{name}</h3>
      <p>{price} EGP</p>

      <Link
        to={`/product/${id}`}
        className='mt-2 inline-block bg-green-600 text-white px-3 py-1 rounded'>
        View Details{" "}
      </Link>
    </div>
  );
}

export default ProductCard;
