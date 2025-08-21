"use client";

import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import storyImg from "../../../assets/brandstory.jpg";
import { HiStar, HiHeart, HiBookOpen } from "react-icons/hi2";

export default function OurStory() {
  // Stats for animation
  const stats = [
    {
      label: "Happy Customers",
      value: 1000,
      suffix: "+",
      icon: <HiHeart className="text-red-500 w-5 h-5 ml-1" />,
    },
    {
      label: "Healthy Recipes",
      value: 50,
      suffix: "+",
      icon: <HiBookOpen className="text-green-500 w-5 h-5 ml-1" />,
    },
    {
      label: "Customer Rating",
      value: 5,
      suffix: "",
      icon: <HiStar className="text-yellow-500 w-5 h-5 ml-1" />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
    >
      <div className="app-container mx-auto flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-6 w-full max-w-full">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 flex justify-center items-center overflow-hidden rounded-3xl shadow-2xl"
        >
          <motion.div
            className="relative w-full h-80 md:h-96"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={storyImg}
              alt="Our Story - NutriFast"
              className="object-cover w-full h-full rounded-3xl"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-2"
          >
            <span className="text-app-primary font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-app-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our <span className="text-app-primary">Story</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              At NutriFast, our journey started with a simple question:
              <span className="font-medium text-app-dark">
                {" "}
                "How can we make healthy living easier for everyone?"
              </span>
            </p>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              We noticed that busy schedules often push people towards fast food
              and unhealthy habits. That's why we created NutriFast — not just
              to offer balanced, ready-to-enjoy meals, but also to bring
              together the best healthy local brands in one place.
            </p>
          </motion.div>

          {/* Interactive Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-app-primary text-white font-semibold flex items-center gap-2 group"
            >
              Learn More
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <CounterCard
                key={i}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                icon={stat.icon}
                delay={i * 0.1}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* Enhanced Counter Component */
function CounterCard({ value, label, suffix, icon, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / value));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= value) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 text-center w-full"
    >
      <div className="flex justify-center items-baseline mb-2">
        <h3 className="text-3xl sm:text-4xl font-bold text-app-dark">
          {count}
        </h3>
        {suffix && <span className="text-app-dark text-xl ml-1">{suffix}</span>}
        {icon}
      </div>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
    </motion.div>
  );
}
