import React from "react";
import HighlightCard from "./HighlightCard";
import { Highlight } from "../ItineraryDescription";

interface HighlightSectionProps {
  highlights: Highlight[];
}

const HighlightSection: React.FC<HighlightSectionProps> = ({ highlights }) => {
  return (
    <div className="bg-gray-900 h-[80vh] text-white py-16 px-8 rounded-xl mb-10">
      <div>
        <h2 className="text-5xl font-bold text-center mb-10">Highlights</h2>
      </div>
      <div className="flex flex-col md:flex-row h-[80%] gap-6 justify-center items-stretch overflow-y-auto scrollbar-hide">
        {highlights.map((highlight, index) => (
          <HighlightCard key={index} image={highlight.image} />
        ))}
      </div>
    </div>
  );
};

export default HighlightSection;