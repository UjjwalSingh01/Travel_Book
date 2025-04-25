import { useState } from "react";
import Loading from "@/app/common_components/Loading";
import { BlogDetails } from "../../(Blog)/blog/types/BlogTypes";
import BlogCard from "./BlogCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface BlogsProps {
  blogs: BlogDetails[];
}

const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  return (
    <section className="mx-auto w-[90%] max-w-7xl px-4 py-16 relative overflow-hidden">
      {/* Section Title */}
      <div className="flex flex-col items-center text-center gap-5 mb-12">
        <h3 className="font-montserrat font-normal text-2xl md:text-3xl lg:text-4xl">Our Blog</h3>
        <h2 className="font-nunito text-3xl md:text-5xl lg:text-6xl font-bold mt-2">LATEST POST</h2>
      </div>

      {/* Carousel Container */}
      {(blogs.length === 0) ? (
        <Loading />
      ) : (
        <div className="relative w-full h-[600px]">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <FaChevronLeft className="text-2xl text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <FaChevronRight className="text-2xl text-gray-800" />
          </button>

          {/* Slides Container */}
          <div className="flex items-center justify-center h-full">
            {blogs.map((blog, index) => {
              let position = "next";
              if (index === currentSlide) position = "active";
              if (
                index === currentSlide - 1 ||
                (currentSlide === 0 && index === blogs.length - 1)
              ) {
                position = "prev";
              }

              return (
                <div
                  key={index}
                  className={`absolute w-full max-w-2xl transition-all duration-500 ${
                    position === "active"
                      ? "opacity-100 scale-100 z-20"
                      : position === "prev"
                      ? "-translate-x-[80%] opacity-60 scale-75 z-10"
                      : "translate-x-[80%] opacity-60 scale-75 z-10"
                  }`}
                >
                  <BlogCard 
                    blog={blog} 
                    // isActive={position === "active"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;