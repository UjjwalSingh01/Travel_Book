import React from "react";
import { BsPersonCircle } from "react-icons/bs";

export interface BannerSectionProps {
  image: string;
  title: string;
  author: string;
  updatedAt: string;
}

const Banner: React.FC<BannerSectionProps> = ({ image, title, author, updatedAt }) => {
  return (
    <div className="h-[70vh] w-full">
      <div className="relative h-full rounded-3xl overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={image}
            alt="banner"
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-3xl"></div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 w-full md:px-10 py-6 text-center text-white space-y-2">
          <p className="text-xl md:text-2xl uppercase">Only the best of</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-widest">{title}</h2>
          <div className="flex justify-center items-center mt-2">
            <BsPersonCircle className="w-8 h-8" />
            <span className="ml-2 text-lg md:text-xl font-semibold">{author}</span>
          </div>
          <p className="text-base md:text-lg mt-1">Last edit {updatedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;