import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function RelatedProducts({ category, currentProductId }) {
  const { products } = useSelector((state) => state.products);
  const related = products.filter(
    (p) => p.category === category && p.id !== currentProductId
  );
  if (related.length === 0) return null;

  // Swiper breakpoints
  const breakpoints = {
    1280: { slidesPerView: 3, spaceBetween: 24 },
    1024: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    640: { slidesPerView: 1, spaceBetween: 8 },
    0: { slidesPerView: 1, spaceBetween: 8 },
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 sm:px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight text-center mb-6 ">
        Related Products
      </h2>
      <div className="relative app-slider min-h-[340px] sm:min-h-[360px] pb-16 sm:pb-10 md:pb-12 flex items-center justify-center">
        <style>{`
          .app-slider .swiper-pagination {
            position: static;
            margin-top: 2rem;
            margin-bottom: 0.5rem;
            width: 100%;
            text-align: center;
          }
        `}</style>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={3}
          pagination={{ clickable: true }}
          navigation={false}
          breakpoints={breakpoints}
          loop={related.length > 3}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          style={{ padding: "0 8px" }}
        >
          {related.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="p-2 sm:p-4 flex justify-center">
                <Link
                  to={`/product/${item.id}`}
                  className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-sm transition-all duration-300 border border-gray-100 w-full max-w-xs mx-auto"
                >
                  <div className="relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-44 sm:h-52 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-app-muted text-app-tertiary px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col items-center">
                    <h3 className="text-base sm:text-lg font-semibold text-app-tertiary mb-1 text-center line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-app-secondary text-sm mb-2 font-medium text-center">
                      {item.price} EGP
                    </p>
                    <button className="mt-2 bg-app-tertiary text-white px-4 py-1 rounded-full text-xs font-semibold shadow hover:bg-app-primary transition-all duration-150">
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default RelatedProducts;
