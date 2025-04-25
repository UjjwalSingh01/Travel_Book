import React from "react";
import newsletterImg from "../../../assets/newsletter.jpeg"

const Newsletter: React.FC = () => {

  return (
    <section
      className="relative flex flex-col gap-10 justify-center items-center bg-cover bg-green-400 h-[625px] bg-center py-16 px-4 text-white"
      style={{
        backgroundImage: `url(${newsletterImg})`,
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

      <div className="flex flex-col justify-center items-center w-[90%] h-[345px]">
        <div className="flex flex-col w-full gap-5 text-center mb-24">
          <h2 className="font-arialRounded text-3xl sm:text-4xl md:text-6xl font-bold mb-5">
            Subscribe to our newsletter
          </h2>
          <p className="font-montserrat text-xl sm:text-2xl md:text-3xl">
            Enjoy wellbeing content and exclusive
            offers delivered to your inbox.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 w-full mx-auto">
          {/* Input Field */}
          <input
            type="email"
            placeholder="Enter email"
            // onChange={(e) => setEmail(e.target.value)}
            className="bg-white font-montserrat h-14 md:h-20 text-xl md:text-2xl w-[80%] md:w-[70%] lg:w-[60%] rounded-xl px-6 py-4 text-gray-800 mb-8 focus:outline-none"
          />

          {/* Subscribe Button */}
          <button
            className="bg-gray-900 font-poppins text-lg sm:text-xl md:text-2xl hover:bg-gray-800 text-white py-5 px-8 rounded-full w-52 shadow-xl"
            // onClick={() => subscribe()}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;