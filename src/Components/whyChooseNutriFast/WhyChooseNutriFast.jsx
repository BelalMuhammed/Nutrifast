"use client";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiStar } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
export default function WhyChooseNutriFast() {
  const features = [
    {
      icon: <LuLeaf className='w-10 h-10 text-primary' />,
      title: "Quality Ingredients",
      description: "We source only the finest organic and non-GMO ingredients.",
    },
    {
      icon: <FiStar className='w-10 h-10 text-primary' />,
      title: "Expertly Curated",
      description:
        "Our products are selected by nutrition experts for optimal health benefits.",
    },
    {
      icon: <FiRefreshCw className='w-10 h-10 text-primary' />,
      title: "Sustainable Practices",
      description:
        "We are committed to environmentally responsible sourcing and packaging.",
    },
  ];

  return (
    <section className='py-12 sm:py-16 md:py-20 bg-app-muted'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8 sm:mb-10 md:mb-12'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight mb-2'>
            Why Choose NutriFast
          </h2>
          <p className='mt-2 text-secondary text-center max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed'>
            We are committed to your health with quality, expertise, and
            sustainability.
          </p>
        </div>

        <div className='grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: "easeOut",
              }}>
              <Card className='border-0 bg-white/95 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col text-center relative overflow-visible group h-full'>
                <div className='flex flex-col items-center'>
                  <div className='flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border-2 border-primary mb-3 sm:mb-4 shadow-md'>
                    {feature.icon}
                  </div>
                  <h4 className='text-lg sm:text-xl font-bold text-app-primary mb-2 tracking-tight'>
                    {feature.title}
                  </h4>
                  <p className='text-secondary text-sm sm:text-base leading-relaxed'>
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
