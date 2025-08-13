import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RelatedProducts({ category, currentProductId }) {
  const { products } = useSelector((state) => state.products);

  const related = products.filter(
    (p) => p.category === category && p.id !== currentProductId
  );

  if (related.length === 0) return null;

  const settings = {
    dots: true,
    infinite: related.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className='max-w-6xl mx-auto py-10 px-2 sm:px-4'>
      <h2 className='text-2xl sm:text-3xl font-bold text-app-primary mb-8 text-center tracking-tight'>
        Related Products
      </h2>
      <Slider {...settings}>
        {related.map((item) => (
          <div key={item.id} className='p-2 sm:p-4 flex justify-center'>
            <Link
              to={`/product/${item.id}`}
              className='block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 w-full max-w-xs mx-auto'>
              <div className='relative group'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-44 sm:h-52 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300'
                />
                <span className='absolute top-3 left-3 bg-app-quaternary text-app-tertiary px-3 py-1 rounded-full text-xs font-medium shadow-sm'>
                  {item.category}
                </span>
              </div>
              <div className='p-4 flex flex-col items-center'>
                <h3 className='text-base sm:text-lg font-semibold text-app-tertiary mb-1 text-center line-clamp-2'>
                  {item.name}
                </h3>
                <p className='text-app-secondary text-sm mb-2 font-medium text-center'>
                  {item.price} EGP
                </p>
                <button className='mt-2 bg-app-tertiary text-white px-4 py-1 rounded-full text-xs font-semibold shadow hover:bg-app-primary transition-all duration-150'>
                  View Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RelatedProducts;
