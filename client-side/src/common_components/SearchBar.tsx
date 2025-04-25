import React from 'react'
import { motion } from "framer-motion";
import { BiSearch } from 'react-icons/bi';


export const SearchBar: React.FC = () => {
  return (
    <>
    {/* Search Bar */}
    <div className="flex items-center justify-center pt-10 xl:pt-6 w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-[70%] xl:w-[50%]"
      >
        <input
          type="text"
          placeholder="Search"
          className="px-6 py-4 pr-16 text-lg md:text-xl lg:text-2xl w-full h-12 md:h-16 lg:h-20 rounded-full border border-gray-300 bg-white text-gray-800 shadow-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-all duration-300"
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <BiSearch className="h-6 md:h-8 w-6 md:w-8" />
        </motion.div>
      </motion.div>
    </div>
    </>
  )
}
