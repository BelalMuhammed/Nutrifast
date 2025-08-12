"use client";
import { Card } from "flowbite-react";
import { FiStar, FiRefreshCw } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-2xl font-bold mb-8 text-app-secondary">
          Why Choose NutriFast
        </h2>
        <h2 className="text-3xl font-bold text-app-secondary mt-2">
          Our Commitment to Your Health
        </h2>
        <p className="mt-4 text-app-secondary max-w-2xl ">
          At NutriFast, we believe in providing you with the best possible
          products to support your wellness journey. Our commitment to quality,
          expertise, and sustainability sets us apart.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="border border-green-200 bg-app-muted shadow-none hover:shadow-md transition"
            >
              <div className="flex flex-col items-start space-y-3 text-left">
                {feature.icon}
                <h4 className="text-lg font-semibold text-app-secondary">
                  {feature.title}
                </h4>
                <p className="text-app-tertiary text-sm">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
