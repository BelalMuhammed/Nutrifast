import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function CounterCard({
  value,
  label,
  suffix,
  icon,
  delay = 0,
  isInView,
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTimestamp = null;
      const duration = 4000;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: { delay, duration: 1.2, ease: "easeOut" },
            }
          : { opacity: 0, y: 80 }
      }
      className="text-center p-4"
    >
      <div className="flex justify-center items-baseline mb-2">
        <h3 className="text-3xl font-bold text-gray-900">{count}</h3>
        {suffix && <span className="text-gray-900 text-xl ml-1">{suffix}</span>}
        <span className="ml-2">{icon}</span>
      </div>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
    </motion.div>
  );
}
