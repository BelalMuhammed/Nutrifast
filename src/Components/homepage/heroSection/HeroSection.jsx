// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import banner from "../../../assets/banner.png";
import banner2 from "../../../assets/why-us-cover1.png";

function HeroSection() {
  // Typing animation states
  const headingText = "Your Journey to Wellness Starts Here";
  const paragraphText =
    "Discover a curated selection of organic produce, wholesome snacks, and nutritional supplements to fuel your healthy lifestyle.";
  const [typedHeading, setTypedHeading] = useState("");
  const [typedParagraph, setTypedParagraph] = useState("");

  // Title: word-by-word typing
  useEffect(() => {
    const words = headingText.split(" ");
    let i = 0;
    const typeHeading = () => {
      if (i <= words.length) {
        setTypedHeading(words.slice(0, i).join(" "));
        i++;
        setTimeout(typeHeading, 350);
      }
    };
    typeHeading();
  }, []);

  // Paragraph: letter-by-letter typing (starts after heading)
  useEffect(() => {
    let j = 0;
    const typeParagraph = () => {
      if (j <= paragraphText.length) {
        setTypedParagraph(paragraphText.slice(0, j));
        j++;
        setTimeout(typeParagraph, 45); // typing speed
      }
    };
    if (typedHeading === headingText) {
      typeParagraph();
    }
  }, [typedHeading]);

  const images = [banner, banner2];
  const [current, setCurrent] = useState(0);

  // Auto-swipe every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full min-h-[400px] h-[100vh] flex items-center justify-center overflow-hidden -mt-16 bg-black">
      {/* Solid black background (prevents white flash) */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Slider Images */}
      {images.map((img, idx) => (
        <motion.img
          key={idx}
          src={img}
          alt={`Hero Slide ${idx + 1}`}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: current === idx ? 1 : 0,
            scale: current === idx ? [1, 1.8] : 1, // zoom in and out only for active image
          }}
          transition={{
            opacity: { duration: 1, ease: "easeInOut" },
            scale: {
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-all duration-1000 ${
            current === idx ? "" : "pointer-events-none"
          }`}
          style={{ filter: "brightness(0.65) blur(0px)" }}
        />
      ))}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-4xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-mono font-bold tracking-wide mb-2 drop-shadow bg-gradient-to-r from-white via-app-primary to-white bg-clip-text text-transparent"
        >
          Eat Good Food
        </motion.h2>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg mb-4 sm:mb-6 text-white"
        >
          Fresh <span className="text-app-secondary">Energy</span> Everyday
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-normal drop-shadow leading-relaxed"
        >
          <span className="inline-block text-white">
            {typedParagraph}
            {typedParagraph.length < paragraphText.length && (
              <span className="animate-pulse">|</span>
            )}
          </span>
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="btn-app text-sm sm:text-base  px-6 sm:px-8 py-2.5 sm:py-3S shadow-lg"
          onClick={() => (window.location.href = "/shop")}
        >
          Find Your Energy
        </motion.button>
      </motion.div>

      {/* Slider Dashes */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-3 z-30">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block w-4 h-1 rounded-full transition-all duration-300 ${
              current === idx ? "bg-app-primary scale-x-125" : "bg-white/40"
            }`}
            style={{ boxShadow: current === idx ? "0 0 8px #22c55e" : "none" }}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
