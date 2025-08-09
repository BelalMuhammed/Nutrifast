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
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-app-primary  mb-6 text-center">
        Related Products
      </h2>
      <Slider {...settings}>
        {related.map((item) => (
          <div key={item.id} className="p-3">
            <Link
              to={`/product/${item.id}`}
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-app-tertiary mb-2">
                  {item.name}
                </h3>
                <p className="text-app-secondary text-sm mb-3">
                  {item.price} EGP
                </p>
                <span className="bg-app-quaternary text-app-tertiary px-3 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RelatedProducts;
