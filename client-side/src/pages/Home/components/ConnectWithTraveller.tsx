import React from "react";
import travelImg from "../../../assets/Travel Wallpaper _ WhatsPaper.jpeg";

const ConnectWithTravelers: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] p-8 md:p-16 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center h-full max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-xl transition-shadow duration-300">
          <img
            src={travelImg}
            alt="Travel Scene"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 text-slate-800 p-8 md:p-12 rounded-2xl mt-8 md:mt-0 md:ml-12 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Connect with Fellow Travelers
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-6">
          Join a vibrant community of passionate explorers sharing their unique journeys and 
          hidden discoveries. Exchange valuable insights, create meaningful connections, and 
          uncover breathtaking destinations through authentic travel stories and experiences.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-8">
          Whether you're planning your next adventure or looking to share your travel expertise, 
          our platform brings together like-minded individuals to inspire and guide each other 
          in exploring the world's wonders.
        </p>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
          Join the Community
        </button>
      </div>
    </div>
  );
};

export default ConnectWithTravelers;