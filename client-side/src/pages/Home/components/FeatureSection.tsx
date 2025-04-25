import React, { useState } from "react";
import featureImg1 from "../../../assets/Explore.jpeg";
import { motion, AnimatePresence } from "framer-motion";


const features = [
  {
    title: "Create & Inspire Your Own Travel Story",
    description: "Turn your trips into beautiful digital books. Share your adventures and help others plan their dream trips.",
    image: featureImg1,
  },
  {
    title: "Discover Hidden Gems",
    description: "Explore curated destinations and tips from fellow travelers around the world.",
    image: featureImg1, // Replace with actual image
  },
  {
    title: "Plan Your Next Adventure",
    description: "Get inspired and organize your next trip with our easy-to-use tools.",
    image: featureImg1, // Replace with actual image
  },
];

const FeatureSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const variants = {
    enter: (direction: string) => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div className="relative flex flex-col h-[90vh] md:flex-row items-center justify-center p-8 md:p-16">
      <div className="flex flex-col md:w-1/2 h-full justify-center text-center md:text-left p-4 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-6xl font-bold text-blue-400 mb-4"
            >
              {features[currentIndex].title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl text-gray-300 leading-relaxed mb-8"
            >
              {features[currentIndex].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex gap-4 justify-center md:justify-start">
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Image Content */}
      <div className="md:w-1/2 h-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={currentIndex}
            src={features[currentIndex].image}
            alt="Feature"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-xl shadow-lg w-full max-w-2xl"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeatureSection;