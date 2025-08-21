"use client";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import storyImg from "../../../assets/brandstory.jpg";

export default function OurStory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="py-20 bg-white"
    >
      <div className="app-container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="basis-full md:basis-1/2 flex justify-center items-center overflow-hidden rounded-2xl"
          style={{ width: "100%", height: "100%" }}
        >
          <motion.img
            src={storyImg}
            alt="Our Story - NutriFast"
            className=" shadow-xl object-cover w-full h-full transition-transform duration-500 cursor-pointer"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="basis-full md:basis-1/2"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-app-dark mb-6
          "
          >
            Our Story
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At NutriFast, our journey started with a simple question: “How can
            we make healthy living easier for everyone?” We noticed that busy
            schedules often push people towards fast food and unhealthy habits.
            That’s why we created NutriFast — not just to offer balanced,
            ready-to-enjoy meals, but also to bring together the best healthy
            local brands in one place. From fresh meals to wholesome snacks and
            drinks, we make it simple to discover nutritious options that fit
            into your busy lifestyle — whether you’re at work, at home, or on
            the go.
          </p>

          {/* Interactive Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-app-accent hover:!bg-app-primary text-white font-semibold shadow-lg transition-colors"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
