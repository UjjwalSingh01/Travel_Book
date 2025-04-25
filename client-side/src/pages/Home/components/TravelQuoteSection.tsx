import React from "react";
import quoteImg from "../../../assets/quote.png"

const TravelQuoteSection: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center text-center"
      style={{ 
        backgroundImage: `url(${quoteImg})`,
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-90"></div> */}
      
      {/* Quote Content */}
      <div className="max-w-4xl text-white">
        <div className="flex flex-col py-12">
          <p className="text-2xl md:text-5xl italic font-light leading-16">
            "Traveling -- it leaves you speechless, then turns you into a storyteller."
          </p>
          <p className="text-3xl mt-7 text-right">– Ibn Battuta</p>
        </div>
      </div>
    </div>
  );
};

export default TravelQuoteSection;
