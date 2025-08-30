"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import HomeCard from "../../categoryCard/CategoryCard";
import { getCategories } from "../../../Api/apiService";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.Categories))
      .catch((err) => console.error(err));
  }, []);

  // Swiper breakpoints
  const breakpoints = {
    1280: { slidesPerView: 4, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    640: { slidesPerView: 1, spaceBetween: 8 },
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
    <section className="mx-auto py-12 sm:py-16 md:py-20  ">
      <div className="app-container">
        {/* Heading */}
        <div className="flex flex-col mb-8 sm:mb-10 px-4 items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight mb-2 ">
            Our Categories
          </h2>
          <div className="w-16 sm:w-20 h-1 rounded-full mb-2" />
          <p className="text-sm sm:text-base md:text-lg text-app-dark max-w-xl leading-relaxed text-center">
            Find the perfect healthy option for your lifestyle from our curated
            categories.
          </p>
        </div>
        {/* Swiper with custom arrows */}
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
          <div className="w-full px-2 sm:px-1 md:px-0">
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
              {categories.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="px-1"
                  >
                    <HomeCard category={category} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
        </div>
      </div>
    </section>
  );
}
