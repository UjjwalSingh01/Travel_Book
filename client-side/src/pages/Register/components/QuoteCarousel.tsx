"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "../constants/constants";

const QuoteCarousel = ({ quotes }: { quotes: Quote[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="relative h-full w-full flex items-center justify-center p-8">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute text-white text-center px-8"
        >
          <p className="text-2xl xl:text-3xl font-medium leading-snug whitespace-pre-line">
            {quotes[currentIndex].text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuoteCarousel;