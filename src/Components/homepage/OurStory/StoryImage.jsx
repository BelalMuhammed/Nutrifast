// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { HiShieldCheck, HiStar, HiHeart, HiBookOpen } from "react-icons/hi2";

export default function StoryImage({ storyImg, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 120 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="w-full lg:w-5/12"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img
            src={storyImg}
            alt="Our Story - NutriFast"
            className="object-cover w-full h-full"
            initial={{ scale: 1.2 }}
            animate={isInView ? { scale: 1 } : { scale: 1.2 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

        {/* Image badge */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md">
          <div className="flex items-center">
            <HiShieldCheck className="w-5 h-5 text-app-primary mr-2" />
            <span className="font-medium text-gray-800">Since 2025</span>
          </div>
        </div>
      </div>

      {/* Feature points */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="mt-8 space-y-4"
      >
        <div className="flex items-center">
          <div className="bg-app-primary/10 p-2 rounded-lg mr-4">
            <HiStar className="w-5 h-5 text-app-accent" />
          </div>
          <p className="text-gray-700">
            Premium quality ingredients sourced locally
          </p>
        </div>
        <div className="flex items-center">
          <div className="bg-app-primary/10 p-2 rounded-lg mr-4">
            <HiHeart className="w-5 h-5 text-app-accent" />
          </div>
          <p className="text-gray-700">
            Created with passion for healthy living
          </p>
        </div>
        <div className="flex items-center">
          <div className="bg-app-primary/10 p-2 rounded-lg mr-4">
            <HiBookOpen className="w-5 h-5 text-app-accent" />
          </div>
          <p className="text-gray-700">Nutritionist-approved recipes</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
