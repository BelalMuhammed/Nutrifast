"use client";

import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion";
import storyImg from "../../../assets/brandstory.jpg";

import TimelineItem from "./TimelineItem";
import StatsSection from "./StatsSection";
import StoryImage from "./StoryImage";

export default function OurStory({ id }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="app-container relative py-16 md:py-20 lg:py-24 bg-white overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 w-80 h-80 bg-app-primary/5 rounded-full"></div>
        <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-app-secondary/5 rounded-full"></div>
        <div className="absolute left-1/4 top-1/3 w-2 h-2 bg-app-primary/20 rounded-full"></div>
        <div className="absolute left-1/3 bottom-1/4 w-3 h-3 bg-app-secondary/20 rounded-full"></div>
      </div>

      <div className="app-container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 1.2 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-app-primary font-medium rounded-full text-sm mb-4">
            Our Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-dark tracking-tight mb-4">
            The Story Behind <span className="text-app-primary">NutriFast</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover how our passion for health and convenience created a
            revolution in nutritious eating
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20">
          {/* Left: Timeline + Stats */}
          <div className="w-full lg:w-7/12">
            <div className="relative pl-8 md:pl-0">
              {/* Timeline */}
              <TimelineItem
                icon="lightbulb"
                title="The Beginning"
                text={`At NutriFast, our journey started with a simple question: "How can we make healthy living easier for everyone?"`}
                delay={0.2}
                isInView={isInView}
              />
              <TimelineItem
                icon="users"
                title="The Realization"
                text="We noticed that busy schedules often push people towards fast food and unhealthy habits. That's why we created NutriFast — not just to offer balanced, ready-to-enjoy meals, but also to bring together the best healthy local brands in one place."
                delay={0.4}
                isInView={isInView}
              />
            </div>

            {/* Stats */}
            <StatsSection isInView={isInView} />
          </div>

          {/* Right: Image + Features */}
          <StoryImage storyImg={storyImg} isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
