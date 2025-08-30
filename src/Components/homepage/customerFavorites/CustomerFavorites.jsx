"use client";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomerFavCard from "../../customerFavCard/CustomerFavCard";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getCustomerFavorites } from "@/Api/apiService";

export default function CustomerFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    getCustomerFavorites()
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  }, []);

  // إعدادات Swiper
  const breakpoints = {
    1280: { slidesPerView: 4, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    0: { slidesPerView: 1, spaceBetween: 8 },
  };

  // Custom arrow handlers
  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };
  const handleNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  return (
    <section className="app-container mx-auto py-8 sm:py-10 md:py-12">
      {/* Heading */}
      <div className="flex flex-col mb-6 sm:mb-8 px-4 items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight mb-2">
          Customer Favorites
        </h2>
        <div className="w-12 sm:w-16 h-1 rounded-full mb-2" />
        <p className="text-sm sm:text-base md:text-lg text-app-dark max-w-xl leading-relaxed text-center">
          See what our customers love most! Discover top-rated healthy picks and
          trending products.
        </p>
      </div>

      {/* Swiper Slider */}
      <div className="relative app-slider min-h-[340px] sm:min-h-[360px] pb-16 sm:pb-10 md:pb-12">
        <style>{`
          .app-slider .swiper-pagination {
            position: static;
            margin-top: 2rem;
            margin-bottom: 0.5rem;
            width: 100%;
            text-align: center;
          }
        `}</style>
        {/* Custom Arrows */}
        <button
          className="hidden sm:flex items-center justify-center absolute left-2 top-[40%] -translate-y-1/2 z-20 bg-white/70 backdrop-blur-md rounded-full w-10 h-10 shadow text-black hover:text-green-500 transition-all duration-300 border border-gray-200"
          onClick={handlePrev}
          aria-label="Previous"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="hidden sm:flex items-center justify-center absolute right-2 top-[40%] -translate-y-1/2 z-20 bg-white/70 backdrop-blur-md rounded-full w-10 h-10 shadow text-black hover:text-green-500 transition-all duration-300 border border-gray-200"
          onClick={handleNext}
          aria-label="Next"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={4}
          pagination={{ clickable: true }}
          navigation={false}
          breakpoints={breakpoints}
          loop={true}
          style={{ padding: "0 8px" }}
          onSwiper={setSwiperInstance}
        >
          {favorites.map((fav, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center min-w-0"
              >
                <div className="w-full max-w-full min-w-0">
                  <CustomerFavCard fav={fav} />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
