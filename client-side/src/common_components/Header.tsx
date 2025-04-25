import React, { useState } from "react";
import { BiBell } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineMenuOpen, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../pages/Login/Login";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-100 h-24 w-full border-b border-slate-200 shadow-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:to-blue-500">
              TravelBook
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 ml-4">
            {["Home", "Map", "Itinerary", "My Travel Book"].map((link) => (
              <Link
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="relative text-slate-600 font-medium text-lg hover:text-slate-900 transition-colors duration-200 group/nav"
              >
                {link}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover/nav:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Notification */}
            <div className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
              <BiBell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full -translate-y-1/2 translate-x-1/2 shadow-sm">
                4
              </span>
            </div>

            {/* Profile */}
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="relative">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full ring-2 ring-blue-400/30 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-50"></div>
              </div>
              <div className="flex flex-col -space-y-1">
                <p className="text-sm font-semibold text-slate-800">Traveller</p>
              </div>
            </div>

            <Login />

            {/* Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <MdClose className="h-8 w-8" />
                ) : (
                  <MdOutlineMenuOpen className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 md:hidden"
      onClick={() => setIsMenuOpen(false)}
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pb-6 border-b border-slate-200"
          >
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              TravelBook
            </span>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
            className="flex flex-col mt-6 gap-4"
          >
            {["Home", "Map", "Itinerary", "Create Book", "My Travel Book"].map((link) => (
              <motion.div
                key={link}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Link
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg font-medium">{link}</span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-auto pt-6 border-t border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full ring-2 ring-blue-400/30 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-50" />
              </div>
              <div className="flex flex-col -space-y-1">
                <p className="text-sm font-semibold text-slate-800">Diti Abhir</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
};

export default Header;