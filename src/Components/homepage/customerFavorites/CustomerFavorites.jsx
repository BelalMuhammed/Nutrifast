"use client";

import React from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import CustomerFavCard from "../../customerFavCard/CustomerFavCard";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getCustomerFavorites } from "@/Api/apiService";

export default function CustomerFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getCustomerFavorites()
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  }, []);

  const sliderRef = React.useRef();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
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

      {/* Slider with custom arrows */}
      <div className="relative app-slider min-h-[340px] sm:min-h-[360px] pb-8 sm:pb-10 md:pb-12 flex items-center">
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-md rounded-full p-2 shadow text-black hover:text-green-500 transition-all duration-300"
          onClick={() => sliderRef.current?.slickPrev()}
          aria-label="Previous"
          style={{ transform: "translateY(-50%)" }}
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <div className="w-full px-2">
          <Slider ref={sliderRef} {...settings}>
            {favorites.map((fav, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                viewport={{ once: true }}
                className="px-2 sm:px-3 md:px-4 flex justify-center"
              >
                <CustomerFavCard fav={fav} />
              </motion.div>
            ))}
          </Slider>
        </div>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-md rounded-full p-2 shadow text-black hover:text-green-500 transition-all duration-300"
          onClick={() => sliderRef.current?.slickNext()}
          aria-label="Next"
          style={{ transform: "translateY(-50%)" }}
        >
          <FiChevronRight className="text-2xl" />
        </button>
      </div>
    </section>
  );
}
