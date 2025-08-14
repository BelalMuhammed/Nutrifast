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
    <section className='py-20 bg-app-muted'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-4xl md:text-5xl font-extrabold text-app-tertiary text-center mb-3 tracking-tight drop-shadow-sm'>
          Why Choose NutriFast
        </h2>
        <p className='mt-2 text-secondary text-center max-w-2xl mx-auto text-lg mb-10'>
          We are committed to your health with quality, expertise, and
          sustainability.
        </p>

        <div className='mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
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
              <Card className='border-0 bg-white/95 shadow-xl hover:shadow-2xl transition rounded-3xl p-2 md:p-3 flex flex-col text-center relative overflow-visible group'>
                <div className='flex flex-col items-center'>
                  <div className='flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border-2 border-primary mb-4 shadow-md'>
                    {feature.icon}
                  </div>
                  <h4 className='text-xl font-bold text-app-primary mb-2 tracking-tight'>
                    {feature.title}
                  </h4>
                  <p className='text-secondary text-base'>
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
