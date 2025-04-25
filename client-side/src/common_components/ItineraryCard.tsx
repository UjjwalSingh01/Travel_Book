import React from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ItineraryCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  location: {
    latitude: number,
    longitude: number
  };
  rating: number;
  views: number;
  addedBy: string;
  onAddToWishlist?: () => void;
  onAddToBook?: () => void;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  title,
  image,
  category,
  location,
  rating,
  views,
  addedBy,
  onAddToWishlist,
  onAddToBook
}) => {
  const navigate = useNavigate();

  const handleToggleWishlist = async() => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/`, id, {
        withCredentials: true,
      })

      if(response.data.success){

      }
    } catch (error) {
      
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full h-52 md:h-60 bg-cover bg-center p-4 sm:p-6 rounded-4xl relative overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/50"></div>
      
      <div onClick={() => {navigate(`/itineraryDescription/${id}`)}} className="flex flex-col justify-between h-full relative z-20"> 
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl italic font-semibold text-gray-100">
            {title}
          </h2>

          <div className="flex items-center justify-end w-full sm:w-auto space-x-2 sm:space-x-4 text-gray-200">
            <MdLocationPin className="h-5 w-5 sm:h-7 sm:w-7" />
            <span>⭐ {rating.toFixed(1)}</span>
            <span className="flex gap-1 sm:gap-2 items-center">
              <BsFillEyeFill className="h-4 w-4 sm:h-5 sm:w-5" />
              {views}
            </span>
          </div>
        </div>

        {/* Category and Location */}
        <div>
          <ul className="flex flex-wrap space-x-2 sm:space-x-3 text-sm md:text-base xl:text-lg text-gray-300">
            <li>• {category}</li>
            {/* <li>• {location}</li> */}
          </ul>
        </div>
        
        {/* Added By */}
        <div>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
            - {addedBy}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          {onAddToWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToWishlist();
              }}
              className="px-3 py-1 text-sm text-red-400 rounded-lg"
            >
              <FaHeart className="h-6 w-6" />
            </button>
          )}
          {onAddToBook && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToBook();
              }}
              className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
            >
              Add to Book
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ItineraryCard;