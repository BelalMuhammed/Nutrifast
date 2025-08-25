// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { HiLightBulb, HiUserGroup } from "react-icons/hi2";

export default function TimelineItem({ icon, title, text, delay, isInView }) {
  const IconComponent = icon === "lightbulb" ? HiLightBulb : HiUserGroup;

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ delay, duration: 1 }}
      className="relative mb-10 md:flex items-start"
    >
      <div className="absolute h-8 rounded-full bg-app-primary/10 flex items-center justify-center hidden md:flex">
        <IconComponent className="w-5 h-5 text-app-primary" />
      </div>
      <div className="md:ml-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700">{text}</p>
      </div>
    </motion.div>
  );
}
