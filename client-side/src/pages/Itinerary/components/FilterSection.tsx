// TravelFilterBar.tsx
import React, { useState } from "react";

interface TravelFilterBarProps {
  onFilterChange: (filter: "Books" | "Itinerary") => void;
}

const TravelFilterBar: React.FC<TravelFilterBarProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<"Books" | "Itinerary">("Books");

  const handleFilterChange = (filter: "Books" | "Itinerary") => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 my-7 w-full rounded-xl">
      {/* Filter Options */}
      <nav className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 my-2 md:my-0">
        {["Books", "Itinerary"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter as "Books" | "Itinerary")}
            className={`relative px-3 py-1.5 text-lg lg:text-xl xl:text-2xl font-medium transition-all duration-300 ${
              selectedFilter === filter
                ? "text-blue-600"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            {filter}
            {selectedFilter === filter && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full animate-underline" />
            )}
          </button>
        ))}
      </nav>

      {/* Apply Filter Button */}
      <button
        className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm md:text-base lg:text-lg xl:text-xl font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default TravelFilterBar;



// import React, { useState } from "react";

// const TravelFilterBar: React.FC = () => {
//   const [selectedFilter, setSelectedFilter] = useState<string>("Hots");

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 my-7 w-full rounded-xl">
//       {/* Filter Options */}
//       <nav className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 my-2 md:my-0">
//         {["Hots", "Places", "Restaurants", "Hotels"].map((filter) => (
//           <button
//             key={filter}
//             onClick={() => setSelectedFilter(filter)}
//             className={`relative px-3 py-1.5 text-lg lg:text-xl xl:text-2xl font-medium transition-all duration-300 ${
//               selectedFilter === filter
//                 ? "text-blue-600"
//                 : "text-slate-600 hover:text-slate-800"
//             }`}
//           >
//             {filter}
//             {selectedFilter === filter && (
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full animate-underline" />
//             )}
//           </button>
//         ))}
//       </nav>
      
//       {/* Apply Filter Button */}
//       <button 
//         className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm md:text-base lg:text-lg xl:text-xl font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
//       >
//         Apply Filter
//       </button>
//     </div>
//   );
// };

// export default TravelFilterBar;