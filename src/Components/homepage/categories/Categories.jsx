"use client";

import React from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import HomeCard from "../../categoryCard/CategoryCard";
import { getCategories } from "../../../Api/apiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const sliderRef = React.useRef();

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.Categories))
      .catch((err) => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
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
        {/* Slider with custom arrows */}
        <div className="relative app-slider flex items-center justify-center pb-8 sm:pb-10 md:pb-12">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-md rounded-full p-2 shadow text-black hover:text-green-500 transition-all duration-300"
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous"
            style={{ transform: "translateY(-50%)" }}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <div className="w-full px-2 sm:px-1 md:px-0">
            <Slider ref={sliderRef} {...settings}>
              {categories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="px-1"
                >
                  <HomeCard category={category} />
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
      </div>
    </section>
  );
}
