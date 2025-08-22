// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { HiStar, HiHeart, HiBookOpen } from "react-icons/hi2";
import CounterCard from "./CounterCard";

export default function StatsSection({ isInView }) {
  const stats = [
    {
      label: "Happy Customers",
      value: 1000,
      suffix: "+",
      icon: <HiHeart className="text-red-400 w-5 h-5" />,
    },
    {
      label: "Healthy Recipes",
      value: 50,
      suffix: "+",
      icon: <HiBookOpen className="text-green-400 w-5 h-5" />,
    },
    {
      label: "Customer Rating",
      value: 5,
      suffix: "",
      icon: <HiStar className="text-yellow-400 w-5 h-5" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.8, duration: 1.5 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mt-16 bg-gray-50 p-6 rounded-2xl"
    >
      {stats.map((stat, i) => (
        <CounterCard key={i} {...stat} delay={i * 0.1} isInView={isInView} />
      ))}
    </motion.div>
  );
}
