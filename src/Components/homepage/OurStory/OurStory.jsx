"use client";

import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import storyImg from "../../../assets/brandstory.jpg";
import { HiStar, HiHeart, HiBookOpen } from "react-icons/hi2";

export default function OurStory() {
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
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 sm:py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
    >
      <div className="app-container mx-auto flex flex-col lg:flex-row items-center gap-10 px-4 sm:px-6 lg:px-8">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <motion.img
              src={storyImg}
              alt="Our Story - NutriFast"
              className="object-cover w-full h-full rounded-3xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 max-w-xl"
        >
          <span className="text-app-primary font-semibold text-sm uppercase tracking-wide">
            Our Journey
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-app-dark mt-2 mb-6">
            Our <span className="text-app-primary">Story</span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
            At NutriFast, our journey started with a simple question:
            <span className="font-medium text-app-dark">
              {" "}
              “How can we make healthy living easier for everyone?”
            </span>
          </p>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            Busy schedules often push people towards fast food and unhealthy
            habits. That’s why we created NutriFast — not just to offer
            balanced, ready-to-enjoy meals, but to bring together the best
            healthy local brands in one place.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-xl bg-app-primary text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            Learn More →
          </motion.button>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
            {stats.map((stat, i) => (
              <CounterCard key={i} {...stat} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* Smooth Counter */
function CounterCard({ value, label, suffix, icon, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (val) => Math.floor(val));

  useEffect(() => {
    if (inView) springValue.set(value);
  }, [inView, value, springValue]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } },
      }}
      className="bg-white p-4 rounded-2xl shadow border border-gray-100 text-center"
    >
      <div className="flex justify-center items-baseline mb-2">
        <motion.span className="text-3xl sm:text-4xl font-bold text-app-dark">
          {displayValue}
        </motion.span>
        {suffix && <span className="text-xl ml-1">{suffix}</span>}
        {icon}
      </div>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
    </motion.div>
  );
}
