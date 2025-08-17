"use client";

import { Card } from "flowbite-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiRefreshCw, FiStar } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";

export default function WhyChooseNutriFast() {
  const features = [
    {
      icon: <LuLeaf className="w-8 h-8 text-green-600" />,
      title: "Quality Ingredients",
      description: "We source only the finest organic and non-GMO ingredients.",
    },
    {
      icon: <FiStar className="w-8 h-8 text-green-600" />,
      title: "Expertly Curated",
      description:
        "Our products are selected by nutrition experts for optimal health benefits.",
    },
    {
      icon: <FiRefreshCw className="w-8 h-8 text-green-600" />,
      title: "Sustainable Practices",
      description:
        "We are committed to environmentally responsible sourcing and packaging.",
    },
  ];

  return (
    <section className="py-16 app-container">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight mb-5">
            Why Choose NutriFast
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-app-dark max-w-xl leading-relaxed mx-auto">
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
              <Card className="border border-green-100 bg-gray-50 shadow-none hover:shadow-md transition">
                <div className="flex flex-col items-start space-y-3 text-left">
                  {feature.icon}
                  <h4 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
