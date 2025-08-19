"use client";

import { Card } from "flowbite-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiRefreshCw, FiStar } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import cover from "../../assets/why-us-cover1.png"; // Use your actual cover image path

export default function WhyChooseNutriFast() {
  const features = [
    {
      icon: <LuLeaf className="w-8 h-8 text-app-secondary" />,
      title: "Quality Ingredients",
      description: "We source only the finest organic and non-GMO ingredients.",
    },
    {
      icon: <FiStar className="w-8 h-8 text-app-secondary" />,
      title: "Expertly Curated",
      description:
        "Our products are selected by nutrition experts for optimal health benefits.",
    },
    {
      icon: <FiRefreshCw className="w-8 h-8 text-app-secondary" />,
      title: "Sustainable Practices",
      description:
        "We are committed to environmentally responsible sourcing and packaging.",
    },
  ];

  return (
    <section
      className="relative w-full py-20 min-h-[600px] flex items-center justify-center text-white app-container"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Content */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            Why Choose NutriFast
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white max-w-xl leading-relaxed mx-auto">
            We are committed to your health with quality, expertise, and
            sustainability.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border border-white/20 bg-white/10 backdrop-blur-md shadow-none hover:shadow-lg transition rounded-2xl min-h-[220px] flex flex-col justify-between">
                <div className="flex flex-col items-start space-y-3 text-left">
                  {feature.icon}
                  <h4 className="text-lg font-semibold text-white drop-shadow">
                    {feature.title}
                  </h4>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
