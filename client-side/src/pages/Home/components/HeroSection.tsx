import React from "react";
import heroImg from "../../../assets/hero_image.png"

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center flex flex-col"
      style={{ 
        backgroundImage: `url(${heroImg})`
      }}
    >
      {/* Content */}
      <div className="absolute top-36 left-16 max-w-3xl text-white">
        <h2 className="text-4xl md:text-7xl font-extrabold mb-4">Your Adventures, <br /> Your Story!</h2>
        <p className="text-lg md:text-4xl mb-12">Create your own travel book, capture unforgettable moments, and inspire others to explore the world.</p>
        <button className="bg-blue-950 hover:bg-blue-900 text-white text-xl font-medium py-4 px-8 rounded-full shadow-xl">
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
