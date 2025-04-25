import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  status: "Explored" | "Planning";
  image: string;
  visibility?: "Public" | "Private";
  addedBy?: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, status, visibility, addedBy }) => {
  return (
    <Link 
      to={status === "Explored" ? `/bookdescription/${id}` : `/bookplanning/${id}`} 
      className="block"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group w-64 h-80 md:w-72 md:h-96 rounded-xl overflow-hidden shadow-2xl hover:shadow-xl cursor-pointer"
      >
        {/* Image Section */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent" />
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex flex-col gap-2">
            {/* Status Badge */}
            {visibility && (<motion.span
              className="self-start px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: status === "Explored" ? "#4CAF50" : "#2196F3",
                color: "white"
              }}
              whileHover={{ scale: 1.05 }}
            >
              {status}
            </motion.span>)}
            
            {/* Title and Author */}
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              whileHover={{ x: 5 }}
              transition={{ type: "spring" }}
            >
              {title}
            </motion.h3>
            
            {addedBy && (
              <p className="text-sm text-gray-200 font-medium">
                Added by: {addedBy}
              </p>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent"
          whileHover={{
            borderColor: "rgba(96, 165, 250, 0.3)",
            transition: { duration: 0.3 }
          }}
        />
      </motion.div>
    </Link>
  );
};

export default BookCard;