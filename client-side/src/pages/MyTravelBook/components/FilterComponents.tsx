import React from "react";
import { motion } from "framer-motion"

interface FilterProps {
  selectedStatus: "Explored" | "Planning";
  setSelectedStatus: (status: "Explored" | "Planning") => void;
}

export const FilterComponents: React.FC<FilterProps> = ({ selectedStatus, setSelectedStatus }) => {
  return (
    <div className="flex gap-4 my-10 py-2 px-10">
      <motion.button
        onClick={() => setSelectedStatus("Explored")}
        className={`px-6 py-2 rounded-full text-xl font-semibold transition-colors ${
          selectedStatus === "Explored"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explored
      </motion.button>

      <motion.button
        onClick={() => setSelectedStatus("Planning")}
        className={`px-6 py-2 rounded-full text-xl font-semibold transition-colors ${
          selectedStatus === "Planning"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Planning
      </motion.button>
    </div>
  );
};
